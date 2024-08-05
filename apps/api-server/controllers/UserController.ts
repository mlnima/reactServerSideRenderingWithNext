// @ts-nocheck
import { Request, Response } from 'express';
import settingSchema from '@schemas/settingSchema';
import nodemailer from 'nodemailer';
import userSchema from '@schemas/userSchema';
import { emailValidator, passwordValidatorRegisterForm, usernameValidatorRegisterForm } from '@util/data-validators';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import postSchema from '@schemas/postSchema';
import mongoose from 'mongoose';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import uuidAPIKey from 'uuid-apikey';
import { reqQueryToMongooseOptions } from '@util/database-util';
import {postStatuses, userStatus} from "@repo/data-structures";

let transporter: nodemailer.Transporter<SentMessageInfo>;
const tokenExpireTime = '365d';

class UserController {
    static async register(req: Request, res: Response) {
        try {
            const initialSettings = await settingSchema
                .findOne({
                    type: 'initialSettings',
                })
                .exec()
                .then(initialSettings => initialSettings.data);

            const shouldSendVerificationEmail =
                process.env.MAIL_SERVER === 'true' && initialSettings?.membershipSettings?.verificationRequired;

            if (shouldSendVerificationEmail) {
                transporter = nodemailer.createTransport({
                    host: process.env.MAIL_SERVER_HOST,
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: 'verification',
                        pass: process.env.JWT_KEY,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });
            }

            if (!initialSettings?.membershipSettings?.anyoneCanRegister) {
                return res.status(400).json({ message: 'Registration Is Disabled' });
            }

            const { password, password2 } = req.body;
            const username = req.body.username.toLowerCase();
            const email = req.body.email.toLowerCase();

            const user = await userSchema
                .findOne({
                    $or: [{ username: { $regex: new RegExp(`^${username}$`, 'i') } }, { email: { $regex: new RegExp(`^${email}$`, 'i') } }],
                })
                .exec();

            if (user) {
                return res.status(409).json({ message: 'Username or Email already exists' });
            }
            if (!usernameValidatorRegisterForm(username)) {
                return res.status(400).json({ message: 'Invalid Username' });
            }
            if (!passwordValidatorRegisterForm(password)) {
                return res.status(400).json({ message: 'Invalid Password' });
            }
            if (!emailValidator(email)) {
                return res.status(400).json({ message: 'Invalid Email' });
            }
            if (password !== password2) {
                return res.status(400).json({ message: 'Passwords Do Not Match' });
            }
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.error(err);
                    return res.status(503).json({
                        message: 'Unable to process your request at this time, please try again later',
                    });
                }
                const userData = {
                    username,
                    email,
                    role: 'subscriber',
                    password: hash,
                    keyMaster: false,
                    verificationToken: initialSettings?.membershipSettings?.verificationRequired
                        ? jwt.sign({ type: 'accountVerification' }, process.env.JWT_KEY, { expiresIn: '1h' })
                        : '',
                };
                const newUserData = new userSchema(userData);
                newUserData
                    .save()
                    .then(() => {
                        if (shouldSendVerificationEmail && newUserData.verificationToken) {
                            const mailOptions = {
                                from: `verification@${process.env.MAIL_EXTENSION}`,
                                to: email,
                                subject: 'Account Verification',
                                html: `<p>
                                     Thank you for registering on MyApp. Please click on the following 
                                     <a href="${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/v1/users/verification/${newUserData.verificationToken}">
                                     link
                                     </a> 
                                     to verify your account.
                                   </p>`,
                                text: 'Thank you for registering on MyApp.',
                            };

                            transporter.sendMail(
                                mailOptions,
                                (
                                    error: any,
                                    info: {
                                        response: any;
                                    },
                                ) => {
                                    if (error) {
                                        console.error('Error sending email:', error);
                                    } else {
                                        console.log('Email sent:', info.response);
                                    }
                                },
                            );

                            res.json({
                                message:
                                    'Verification Email Has Been Sent To Your Email Address. Please Check Your Email To Verify Your Account.',
                            });
                        } else {
                            res.json({
                                message: 'Your account has been successfully created. You can login now.',
                            });
                        }
                    })
                    .catch((error: any) => {
                        console.log(error);
                        res.status(503).json({
                            message: 'Unable to process your request at this time, please try again later',
                        });
                    });
            });
        } catch (error) {
            console.log(`error=> `, error);

            res.status(503).json({
                message: 'Unable to process your request at this time, please try again later',
            });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const password = req.query?.password;
            const username = req.query?.username?.toLowerCase();

            if (!username || !password) {
                return res.status(400).json({ message: 'username or password missing' });
            }

            const user: any | null = await userSchema
                .findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } })
                .populate({
                    path: 'profileImage',
                    select: 'filePath',
                    model: 'file',
                    options: { strictPopulate: false },
                })
                .exec();

            if (!user) {
                return res.status(404).json({ message: 'Invalid username or password' });
            }

            const isPasswordCorrect: boolean = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const token: string = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_KEY, {
                expiresIn: tokenExpireTime,
            });

            const { username: userDataUsername, draftPost, role, keyMaster, profileImage, _id } = user;
            const userData = { username: userDataUsername, draftPost, role, keyMaster, profileImage, _id };

            res.json({ token, userData, message: 'Login successful' });
        } catch (err) {
            console.log(err);
            res.status(503).json({ message: 'Something went wrong. Please try again later.' });
        }
    }

    static async getSignedInUserData(req: Request, res: Response) {
        try {
            const { _id } = req.userData;
            const { fields } = req.body;

            const user = await userSchema
                .findById(_id)
                .select(fields || ['username', 'role', 'profileImage'])
                .populate({
                    path: 'profileImage',
                    select: 'filePath',
                    model: 'file',
                    options: { strictPopulate: false },
                })
                .exec();

            if (!user) {
                return res.status(404).send();
            }

            res.json({ userData: user });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Something Went Wrong' });
        }
    }

    static async resetPassword(req: Request, res: Response) {
        const userId = req.userData._id;
        if (!userId) return res.status(403).json({ message: 'Unauthorized Access' });
        userSchema
            .findById(userId)
            .exec()
            .then(userData => {
                bcrypt.compare(req.body.data.password, userData.password, async function (err, isCorrect) {
                    if (err || isCorrect === false) {
                        res.status(403).json({ message: 'Wrong Password' });
                    } else if (isCorrect) {
                        if (req.body.data.newPassword === req.body.data.repeatNewPassword) {
                            bcrypt.hash(req.body.data.newPassword, 10, function (err, hash) {
                                if (err) {
                                    console.log(err);
                                    res.status(400).json({ message: 'Something went wrong please try again later' });
                                } else if (hash) {
                                    userSchema
                                        .findByIdAndUpdate(userId, { $set: { password: hash } }, { new: true })
                                        .exec()
                                        .then(() => {
                                            res.json({ message: 'Your Password Has Been Changed' });
                                        });
                                }
                            });
                        } else {
                            res.status(400).json({ message: 'Mismatch Passwords' });
                        }
                    }
                });
            });
    }

    static async updateUserData(req: Request, res: Response) {
        const userID = req.userData._id;
        userSchema
            .findByIdAndUpdate(userID, { ...req.body.data }, { new: true })
            .exec()
            .then(savedData => {
                res.json({ updatedData: savedData });
            })
            .catch(err => {
                console.log(err);
                res.end();
            });
    }

    static async getInitialPageData(req: Request, res: Response) {
        try {
            const { username, userWhoRequestIt, fields } = req.query;

            const pipeline = [
                {
                    $match: { username },
                },
                {
                    $lookup: {
                        from: 'files',
                        localField: 'profileImage',
                        foreignField: '_id',
                        as: 'profileImage',
                    },
                },
                {
                    $unwind: {
                        path: '$profileImage',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        username: 1,
                        profileImage: '$profileImage.filePath',
                        followersCount: { $size: '$followers' },
                        followingCount: { $size: '$following' },
                        didThisUserBlockRequester: { $in: [userWhoRequestIt, '$blockList'] },
                        isFollowed: { $in: [userWhoRequestIt, '$followers'] },
                    },
                },
            ];

            const [userData] = await userSchema.aggregate(pipeline).exec();

            if (!userData) {
                return res.status(404).json({ message: 'UserModel not found' });
            }

            const [didRequesterBlockThisUser, didRequesterFollowThisUser, postsCount] = await Promise.all([
                userSchema.exists({ blockList: { $in: [userData._id] } }),
                userSchema.exists({ following: { $in: [userData._id] } }),
                postSchema.countDocuments({ $and: [{ author: userData._id }, { status: 'published' }] }),
            ]);

            userData.didRequesterBlockThisUser = !!didRequesterBlockThisUser;
            userData.didRequesterFollowThisUser = !!didRequesterFollowThisUser;
            userData.postsCount = postsCount;

            res.status(200).json(userData);
        } catch (error) {
            console.error('Error in getUserPageData function:', error);
            return res.status(500).json({ message: 'Something Went Wrong' });
        }
    }

    static async follow(req: Request, res: Response) {
        try {
            const senderFollowReqUser = req.userData;
            const receiverFollowReqUserId = new mongoose.Types.ObjectId(req.body._id);
            const senderFollowReqUserId = new mongoose.Types.ObjectId(senderFollowReqUser._id);

            await userSchema.findByIdAndUpdate(receiverFollowReqUserId, { $addToSet: { followers: senderFollowReqUserId } }).exec();

            await userSchema
                .findByIdAndUpdate(senderFollowReqUserId, { $addToSet: { following: receiverFollowReqUserId } }, { new: true })
                .exec();

            res.status(200).json({ message: 'Followed successfully' });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Something Went Wrong' });
        }
    }

    static async unfollow(req: Request, res: Response) {
        try {
            const senderUnFollowReqUser = req.userData;
            const receiverUnFollowReqUserId = req.body._id;

            await userSchema.findByIdAndUpdate(receiverUnFollowReqUserId, { $pull: { followers: senderUnFollowReqUser._id } }).exec();

            await userSchema
                .findByIdAndUpdate(senderUnFollowReqUser._id, { $pull: { following: receiverUnFollowReqUserId } }, { new: true })
                .exec();

            res.status(200).json({ message: 'Unfollowed successfully' });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Something Went Wrong' });
        }
    }

    //---------------------Dashboard--------------------

    static async dashboardNewApiKey(req: Request, res: Response) {
        const newAPIKey = uuidAPIKey.create();
        const newUserData = {
            ...req.userData,
            API_KEY: newAPIKey.apiKey,
            uuid: newAPIKey.uuid,
        };
        userSchema
            .findByIdAndUpdate(req.userData._id, newUserData)
            .exec()
            .then(savedData => {
                res.json({ updatedData: savedData });
            })
            .catch(err => {
                console.log(err);
                res.end();
            });
    }

    static async dashboardGetUsers(req: Request, res: Response) {
        try {
            const { keyword, status, role } = req.query;

            const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
            const searchQuery = !decodedKeyword
                ? []
                : [{ $or: [{ username: new RegExp(decodedKeyword, 'i') }, { email: new RegExp(decodedKeyword, 'i') }] }];
            const statusQuery = status ? [{ status }] : [];
            const roleQuery = role ? [{ role }] : [];
            const findOptions = [...searchQuery, ...statusQuery,...roleQuery]
            const findUsersQuery = findOptions.length>0 ?{
                $and: [...searchQuery, ...statusQuery,...roleQuery],
            } : {}

            const totalCount = await userSchema.countDocuments(findUsersQuery).exec();

            let statusesCount ={}

            for await (const status of userStatus){
                statusesCount[status] = await userSchema.countDocuments({status}).exec();
            }



            const users = await userSchema.find(findUsersQuery, null, reqQueryToMongooseOptions(req)).exec();




            res.json({ users, totalCount,statusesCount });
        } catch (error) {
            console.log(error);
            res.end();
        }
    }

    static async dashboardDeleteUser(req: Request, res: Response) {
        userSchema
            .findByIdAndDelete(req.query._id)
            .exec()
            .then(result => {
                if (!result) {
                    return res.status(404).json({ message: 'No user found with this id' });
                }
                res.json({ message: 'UserModel deleted' });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ message: 'Something Went Wrong' });
            });
    }

    static async dashboardGetUser(req: Request, res: Response) {
        userSchema
            .findById(req.query._id)
            .exec()
            .then(user => {
                res.json({ user });
            });
    }
}

export default UserController;

// static async getUser(req: Request, res: Response) {
//     try {
//         const {username, _id, fields} = req.query
//         const defaultFields = ['username', 'role', 'profileImage', 'about', 'firstName', 'lastName', 'nickName'];
//         const selectedFields = fields ? [...defaultFields, ...fields] : defaultFields;
//
//         userSchema
//             .findOne({$or: [{username}, {_id}]})
//             .select(selectedFields)
//             .populate([
//                 {path: 'profileImage', select: {'filePath': 1}, model: 'file'},
//                 {path: 'images', select: {'filePath': 1}, model: 'file'},
//             ])
//             .exec()
//             .then((user) => {
//                 res.json({userData: user});
//             })
//             .catch((err) => {
//                 console.error('Error fetching user:', err);
//                 res.status(500).json({message: 'Something went wrong'});
//             });
//     } catch (e) {
//         console.error('Error in getUser function:', e);
//         res.status(500).json({message: 'Something went wrong'});
//     }
// };

// static async getUsers(req: Request, res: Response) {
//     try {
//         const {usersList} = req.body;
//
//         const users = await userSchema
//             .find({_id: {$in: usersList}})
//             .select(['username', 'role', 'profileImage', 'name', 'lastName', 'gender'])
//             .populate([
//                 {
//                     path: 'users',
//                     select: ['username', 'profileImage'],
//                     populate: {
//                         path: 'profileImage',
//                         model: 'file',
//                     }
//                 },
//             ])
//             .exec();
//
//         res.json({users});
//     } catch (err) {
//         console.error('Error fetching users:', err);
//         res.status(500).json({message: 'Something went wrong'});
//     }
// };

// static async getUserPageData(req: Request, res: Response) {
//     try {
//         console.log('getUserPageData=>')
//         const {username, userWhoRequestIt, fields} = req.query
//         const defaultFields = ['username', 'role', 'profileImage', 'following', 'followers', 'blockList'];
//         const selectedFields = fields ? [...new Set([...defaultFields, ...fields])] : defaultFields;
//
//         const userWhoRequestItData = userWhoRequestIt
//             ? await userSchema.findById(userWhoRequestIt).lean().select('blockList _id').exec()
//             : null;
//
//         const userData = await userSchema
//             .findOne({username})
//             .lean()
//             .select(selectedFields.join(' '))
//             .populate([
//                 {path: 'profileImage', select: 'filePath', model: 'file'},
//                 {path: 'images', select: 'filePath', model: 'file'},
//             ])
//             .exec();
//
//
//         if (!userData) {
//             return res.status(404).json({message: 'UserModel not found'});
//         }
//
//
//         const responseData = {
//             _id: userData._id,
//             username: userData.username,
//             profileImage: userData.profileImage,
//             followersCount: userData.followers?.length || 0,
//             followingCount: userData.following?.length || 0,
//             isBlocked: (userWhoRequestItData?.blockList || []).includes(userData?._id) || (userData?.blockList || []).includes(userWhoRequestItData?._id) || false,
//             isFollowed: (userData?.followers || []).includes(userWhoRequestItData?._id ? userWhoRequestItData?._id?.toString() : null) || false,
//         }
//
//         res.status(200).json(responseData);
//
//     } catch (error) {
//         console.error('Error in getUserPageData function:', error);
//         res.status(500).json({message: 'Something went wrong'});
//     }
// };

// static async getStartConversation(req: Request, res: Response) {
//     try {
//         const senderId = req.userData._id;
//         const receiverId = req.body._id;
//         const conversationData = {
//             users: [senderId, receiverId].sort()
//         }
//
//         const conversation = await conversationSchema.findOneAndUpdate({users: {"$eq": [senderId, receiverId].sort()}}, {...conversationData}, {new: true, upsert: true}).exec()
//
//         res.json({conversation})
//
//     } catch (err) {
//         res.status(500);
//     }
// }

// static async dashboardUpdateUser(req: Request, res: Response) {
//     const userID = req.body.data._id
//     userSchema.findByIdAndUpdate(userID, {...req.body.data}, {new: true}).exec().then(savedData => {
//         res.json({updatedData: savedData})
//     }).catch(err => {
//         console.log(err)
//         res.end()
//     })
// }
