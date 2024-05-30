import bcrypt from 'bcryptjs';
import {userSchema} from 'models';
import {usernameValidatorRegisterForm, passwordValidatorRegisterForm} from "custom-util";
import {emailValidator} from "custom-util";
import {jwtTokenGenerator} from "custom-server-util";
import nodemailer from "nodemailer";
import * as process from "process";
import {Request, Response} from "express";
let transporter
const shouldSendVerificationEmail = process.env.MAIL_SERVER === 'true' &&
    global.initialSettings?.membershipSettings?.verificationRequired;

if (shouldSendVerificationEmail){
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
            rejectUnauthorized: false
        }
    });
}




const register = (req:Request, res:Response) => {

    if (!global.initialSettings?.membershipSettings?.anyoneCanRegister) {
        return res.status(400).json({message: 'Registration Is Disabled'});
    }

    const {username, email, password, password2} = req.body;

    userSchema.findOne({$or: [{username}, {email}]}).exec()
        .then(user => {
            if (user) {
                return res.status(409).json({message: 'Username or Email already exists'});
            }
            if (!usernameValidatorRegisterForm(username)) {
                return res.status(400).json({message: 'Invalid Username'});
            }
            if (!passwordValidatorRegisterForm(password)) {
                return res.status(400).json({message: 'Invalid Password'});
            }
            if (!emailValidator(email)) {
                return res.status(400).json({message: 'Invalid Email'});
            }
            if (password !== password2) {
                return res.status(400).json({message: 'Passwords Do Not Match'});
            }
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.error(err);
                    return res.status(503).json({message: 'Unable to process your request at this time, please try again later'});
                }
                const userData = {
                    username,
                    email,
                    role: 'subscriber',
                    password: hash,
                    keyMaster: false,
                    verificationToken: global.initialSettings?.membershipSettings?.verificationRequired ?
                        jwtTokenGenerator('1h',{type:'accountVerification'})
                        : ''
                };
                const newUserData = new userSchema(userData);
                newUserData.save().then(() => {
                    if (shouldSendVerificationEmail && newUserData.verificationToken){

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

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.error('Error sending email:', error);
                            } else {
                                console.log('Email sent:', info.response);
                            }
                        });

                        res.json({message: 'Verification Email Has Been Sent To Your Email Address. Please Check Your Email To Verify Your Account.'});
                    }else{
                        res.json({message: 'Your account has been successfully created. You can login now.'});
                    }


                }).catch(err => {
                    console.error(err);
                    res.status(503).json({message: 'Unable to process your request at this time, please try again later'});
                });
            });
        }).catch(err => {
        console.error(err);
        res.status(503).json({message: 'Unable to process your request at this time, please try again later'});
    })
}

export default register;



// import bcrypt from 'bcryptjs';
// import {userSchema} from 'models';
// import {usernameValidatorRegisterForm, passwordValidatorRegisterForm} from "custom-util";
//
// const register = (req, res) => {
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;
//     const password2 = req.body.password2;
//
//     userSchema.findOne({$or: [{username}, {email}]}).exec()
//         .then(user => {
//             if (user) {
//                 res.status(409).json({message: 'This username already exists'})
//             } else {
//                 if (!usernameValidatorRegisterForm(username)) {
//                     res.status(400).json({message: 'Invalid username'})
//                 }
//                 if (!passwordValidatorRegisterForm(password)) {
//                     res.status(400).json({message: 'Invalid Password'})
//                 }
//                 if (password !== password2) {
//                     res.status(400).json({message: 'Password Mismatch'})
//                 }
//
//
//                 bcrypt.hash(password, 10, function (err, hash) {
//                     if (err) {
//                         console.log(err)
//                         res.status(503).json({message: 'Something went wrong please try again later'})
//                     } else if (hash) {
//                         let userData = {
//                             username: username,
//                             email: email,
//                             role: 'subscriber',
//                             password: hash,
//                             keyMaster: false
//                         };
//                         let newUserData = new userSchema(userData);
//                         newUserData.save().then(() => {
//                             res.json({message: 'Your account has been successfully created you can login now'})
//                         }).catch(err => {
//                             console.log(err)
//                             // res.json({ message: 'something went wrong', type: 'error' });
//                             res.status(503).json({message: 'Something went wrong please try again later'})
//                         });
//
//                     }
//                 });
//
//             }
//         }).catch(err => {
//         console.log(err);
//         res.status(503).json({message: 'Something went wrong please try again later'})
//
//     })
// }
//
// export default register