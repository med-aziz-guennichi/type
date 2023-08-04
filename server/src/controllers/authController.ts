import User from "../models/User";
import { NextFunction, RequestHandler, Response, Request } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { Types } from "mongoose";
import Logging from "../utils/log";

// Interface representing the request body for login function.
interface LoginBody {
  email?: string;
  password?: string;
}
/**
 * @description Sing in user to get the token
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @returns {object}
 */
export const login: RequestHandler<unknown,unknown,LoginBody,unknown> = async (req, res, next) => {
  try {
    const { email, password } = req.body as LoginBody;
    // if password === undefined || email === undefined return bad request response
    if (!email || !password) {
      Logging.error("Parametre missing");
      return res.status(400).json({ message: "Parametre missing" });
    }
    // find the user with email
    const user = await User.findOne({ email })
      .select("+password +email")
      .exec();
    // if the user dosent exist return bad response
    if (!user) {
      Logging.error("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // compare the req.body.password and the password in DB
    const passwordMatch = await bcrypt.compare(password, user.password!);
    // if the passwords dont match return a bad request
    if (!passwordMatch) {
      Logging.error("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // generate token
    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_SECRET!
    );
    // return a success response with accessToken
    return res
      .status(200)
      .json({ message: "Login success", accessToken: token });
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
// Interface representing the request body for reset password.
interface ResetPasswordBody {
  email?: string;
}
/**
 * @description reset the user password
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 */
export const resetPassword = async (req: Request<unknown, unknown, ResetPasswordBody>,res: Response,next: NextFunction) => {
  try {
    const { email } = req.body;
    // find the user with email
    const user = await User.findOne({ email });
    // if the user dosent exist return bad request
    if (!user) {
      return res
        .status(400)
        .json({ message: `User not found with this email : ${email}` });
    }
    // get the specefic information from the user
    const { _id, firstName, lastName, password, role } = user;
    const userData = { _id, firstName, lastName, email, password, role };
    // generate a token
    const activationToken = createActivationToken(userData);
    // link with the frontUrl to reset the password
    const link = `${process.env.FRONT_URL}/reset-password/${activationToken}`;

    const transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net", // OVH SMTP server hostname
      port: 465, // OVH SMTP server port for SSL
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_ADDRESS!,
        pass: process.env.EMAIL_PASS!,
      },
    });
    // send the email with the link
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS!,
      to: email,
      subject: "Link to change your password",
      html: `<h3>Click the link to reset your password: <a href="${link}">${link}</a></h3>`,
    });
    // return a success response
    res.status(200).json({
      message: "The password reset link has been sent successfully",
      userId: user._id,
    });
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};

// Interface representing the userData for the token.
interface UserData {
  _id?: Types.ObjectId | string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
}
/**
 * @description create the activation token valable for 5 minutes
 * @author Med Aziz Guennichi
 * @param userData {object}
 * @returns
 */
const createActivationToken = (userData: UserData): string => {
  try {
    // generate a token
    const token = jwt.sign(userData, process.env.ACTIVATION_SECRET!, {
      expiresIn: "5m",
    });
    // return the token
    return token;
  } catch (error) {
    // return error
    console.error(error);
    throw new Error("Failed to create activation token");
  }
};
// Interface representing the request body for new password.
interface NewPasswordData {
  name: string;
  email: string;
  _id: string;
}
/**
 * @description update the password by link verification
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 */
export const updatePasswordByLinkVerification = async (req: Request<unknown,unknown,{ activation_token: string; password: string }>,res: Response, next: NextFunction) => {
  try {
    const { activation_token, password } = req.body;

    // Verify the activation token using the secret
    const newPasswordData = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET!
    ) as NewPasswordData | null;

    // If the activation token is invalid, return an error response
    if (!newPasswordData) {
      Logging.error("Invalid activation token");
      return res.status(403).json({ message: "Invalid activation token" });
    }

    const { email } = newPasswordData;

    // Find the user with the given email
    let user = await User.findOne({ email });

    // If the user is not found, return an error response
    if (!user) {
      Logging.error("User not found");
      return res.status(403).json({ message: "User not found" });
    }

    // Hash the new password and update the user's password field
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    // Return a success response
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
