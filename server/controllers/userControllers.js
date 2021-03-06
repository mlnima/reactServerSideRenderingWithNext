let userControllers = {};
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema');
const tokenExpireTime = '30 days';
const dataEncoder = require('../tools/dataEncoder')
const uuidAPIKey = require('uuid-apikey');

// userControllers.register = (req, res) => {
//
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;
//     const password2 = req.body.password2;
//
//     userSchema.findOne({ $or: [ { username }, { email } ] }).exec()
//         .then(user => {
//             if (user) {
//                 res.json({ response: 'exist', type: 'error' });
//                 res.end()
//             } else {
//                 // Hashing
//                 if (password === password2) {
//                     bcrypt.hash(password, 10, function (err, hash) {
//                         if (err) {
//                             console.log(err)
//                             res.json({ response: 'bcrypt', type: 'error' });
//                             res.end()
//                         } else if (hash) {
//                             let userData = {
//                                 username: username,
//                                 email: email,
//                                 role: 'subscriber',
//                                 password: hash,
//                             };
//                             let newUserData = userSchema(userData);
//                             newUserData.save().then(() => {
//                                 console.log(userData.username, ' registered')
//                                 res.json({ response: 'You are Registered', type: 'success' });
//                                 res.end()
//                             }).catch(err => {
//                                 console.log(err)
//                                 res.json({ response: 'something went wrong', type: 'error' });
//                                 res.end()
//                             });
//
//                         }
//                     });
//                 } else {
//                     res.json({ response: 'Password Mismatch', type: 'error' });
//                     res.end()
//                 }
//
//             }
//         }).catch(err => {
//         console.log(err);
//         res.json({ response: 'server Error', type: 'error' });
//         res.end()
//     })
//
// };

// userControllers.login = async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     await userSchema.findOne({ username })
//         .then(user => {
//             if (user) {
//                 bcrypt.compare(password, user.password, function (err, isCorrect) {
//                     if (err || isCorrect === false ) {
//                         console.log( err)
//                         res.json({ response: 'wrong username or password !', type: 'error' });
//                         res.end()
//                     } else if (isCorrect) {
//                         const token = jwt.sign({
//                                 username: user.username,
//                                 _id: user._id,
//                             },
//                             process.env.REACT_APP_JWT_KEY,
//                             { expiresIn: tokenExpireTime });
//                         res.json({
//                             token: token,
//                             response: 'successfully logged in ',
//                             type: 'success'
//                         });
//
//                         res.end()
//                     }
//
//                 })
//             } else if (!user) {
//                 res.json({ response: 'account with this Username does not exist !', type: 'error' });
//                 res.end()
//             }
//         }).catch(err => {
//             console.log(err);
//             res.json({ response: 'server Error !', type: 'error' })
//         })
// };
// userControllers.resetPassword = (req, res) => {
//     const userId = req.userData._id
//     userSchema.findById(userId).exec().then(userData => {
//         console.log(userData)
//         bcrypt.compare(req.body.oldPass, userData.password, async function (err, isCorrect) {
//             if (err || isCorrect === false) {
//                 res.json({ response: 'Old Password is wrong !', type: 'error' });
//                 res.end()
//             } else if (isCorrect) {
//                 if (req.body.newPass === req.body.newPass2) {
//                    await bcrypt.hash(req.body.newPass, 10, function (err, hash) {
//                         if (err) {
//                             console.log( err)
//                             res.json({ response: 'Something Went Wrong', type: 'error' });
//                             res.end()
//                         } else if (hash) {
//                             userSchema.findByIdAndUpdate(userId, { $set: { password: hash } },{new:true}).exec().then(()=>{
//                                 res.json({ response: 'Password Is Changed', type: 'success' });
//                                 res.end()
//                             })
//                         }
//                     });
//
//                 } else {
//                     res.json({ response: 'new Passwords are not match !', type: 'error' });
//                     res.end()
//                 }
//
//             }
//         })
//     })
//
// };

// userControllers.getUserInfo = (req, res) => {
//     userSchema.findById(req.userData._id).exec().then(user => {
//         let userDataToSend = user.toObject()
//         delete userDataToSend.password
//         res.json({ userData: userDataToSend });
//         res.end()
//     }).catch(err => {
//         console.log(err);
//         res.sendStatus(500);
//         res.end()
//     })
// };

//
// userControllers.getUserPreviewData = (req, res) => {
//     // console.log(req.body.username)
//     // res.end()
//     userSchema.findOne({username: req.body.username}).select('username role profileImage coverImage friends').exec().then(user=>{
//         res.json({ userData: user });
//         res.end()
//     }).catch(err => {
//         console.log(err);
//         res.sendStatus(500);
//         res.end()
//     })
// }

// userControllers.getMultipleUserDataById = (req, res) => {
//     const usersList = req.body.usersList
//
//     userSchema.find({'_id': { $in: usersList}}).select('username role profileImage name lastName').exec().then(users=>{
//         res.json({  users });
//         res.end()
//     }).catch(err => {
//         console.log(err);
//         res.sendStatus(500);
//         res.end()
//     })
// }

// userControllers.followUser = async (req, res) => {
//     try{
//         const senderFollowReqUser = req.userData;
//         const receiverFollowReqUserId = req.body._id;
//         const updateReceiverFollowReqData = await userSchema.findByIdAndUpdate(receiverFollowReqUserId,{$addToSet:{followers:[senderFollowReqUser._id]}}).exec();
//         const updateSenderFollowReqData = await userSchema.findByIdAndUpdate(senderFollowReqUser._id,{$addToSet:{following:[receiverFollowReqUserId]}}, {new: true}).exec();
//         Promise.all([updateReceiverFollowReqData,updateSenderFollowReqData]).then(actionsResults=>{
//             const updatedRequestSenderData = {
//                 following:actionsResults[1]?.following || []
//             }
//             console.log(actionsResults)
//             res.json({ updatedRequestSenderData });
//             res.end();
//         }).catch(err=>{
//             console.log(err)
//             res.sendStatus(500);
//             res.end()
//         })
//     }catch (err) {
//         console.log(err)
//         res.sendStatus(500);
//         res.end()
//     }
//
// }
//
// userControllers.unFollowUser = async (req, res) => {
//     try{
//         const senderUnFollowReqUser = req.userData;
//         const receiverUnFollowReqUserId = req.body._id;
//         const updateReceiverUnFollowReqData = await userSchema.findByIdAndUpdate(receiverUnFollowReqUserId,{$pull:{followers:senderUnFollowReqUser._id}}).exec();
//         const updateSenderUnFollowReqData = await userSchema.findByIdAndUpdate(senderUnFollowReqUser._id,{$pull:{following:receiverUnFollowReqUserId}}, {new: true}).exec();
//         Promise.all([updateReceiverUnFollowReqData,updateSenderUnFollowReqData]).then(actionsResults=>{
//             const updatedRequestSenderData = {
//                 following:actionsResults[1]?.following || []
//             }
//             console.log(actionsResults)
//             res.json({ updatedRequestSenderData });
//             res.end();
//         }).catch(err=>{
//             console.log(err)
//             res.sendStatus(500);
//             res.end()
//         })
//     }catch (err) {
//         console.log(err)
//         res.sendStatus(500);
//         res.end()
//     }
//
// }





// userControllers.updateUserData = (req, res) => {
//
//     const userID = req.body.data._id
//     console.log(req.body)
//     console.log(req.userData)
//     userSchema.findByIdAndUpdate(userID, {...req.body.data}, { new: true }).exec().then(savedData => {
//         res.json({ updatedData: savedData })
//         res.end()
//     }).catch(err => {
//         console.log(err)
//         res.end()
//     })
//
// }

// userControllers.newAPIKey = (req, res) => {
//
//     // console.log(uuidAPIKey.create());
//     console.log(req.body);
//     console.log(req.userData);
//
//     const newAPIKey = uuidAPIKey.create()
//     const newUserData = {
//         ...req.userData,
//         API_KEY: newAPIKey.apiKey,
//         uuid: newAPIKey.uuid
//     }
//
//     userSchema.findByIdAndUpdate(req.userData._id, newUserData).exec().then(savedData => {
//         res.json({ updatedData: savedData })
//         res.end()
//     }).catch(err => {
//         console.log(err)
//         res.end()
//     })
//     // res.json({newUserData})
//     // res.end()
// }



// userControllers.getUsersList = (req, res) => {
//     userSchema.find({}).exec().then(users => {
//         res.json({ users });
//         res.end
//     })
// };

// userControllers.getUserData = (req, res) => {
//     userSchema.findById(req.body._id).exec().then(user => {
//         res.json({ user });
//         res.end
//     })
// }

// userControllers.getUsersListAsAdmin = (req, res) => {
//     userSchema.find({}).exec().then(users => {
//         res.json({ users });
//         res.end
//     })
// };

module.exports = userControllers;