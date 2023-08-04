import User from "../models/User";
import generatePasswordHashed from "../utils/generatePassword";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { NextFunction, Response, Request } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Logging from "../utils/log";

//---------- interfaces
// Interface representing the request body for creating a user.
interface CreateUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}
// Interface representing the request body for update password with admin.
interface UpdatePasswordWithAdminBody {
  newPassword: string;
}
// Interface representing the request body for update user password.
interface UpdatePasswordBody {
  currentPassword: string;
  newPassword: string;
}
//---------functions
/**
 * @description create user
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @returns {object}
 */
export const createUser = async (req: Request<unknown, unknown, CreateUser>,res: Response,next: NextFunction) => {
  try {
    const { firstName, lastName, email, role } = req.body;

    // Check if the email already exists
    const emailExists = await User.exists({ email });
    if (emailExists) {
      Logging.error("Email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate a hashed password
    const { hashedPassword, plainPassword } = await generatePasswordHashed(
      8,
      20
    );

    // Create a new user object
    const user = new User({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Create the transporter for sending emails
    const transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net", // OVH SMTP server hostname
      port: 465, // OVH SMTP server port for SSL
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_ADDRESS!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    // Create the mail options for the welcome email
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS!,
      to: savedUser.email,
      subject: "Welcome to our platform",
      html: `<html>
            <body>
              <h1>Welcome to our platform</h1>
              <h1>Your password is: ${plainPassword}</h1>
            </body>
          </html>`,
    };

    // Send the welcome email
    await transporter.sendMail(mailOptions);

    // Return the saved user
    res.status(201).json(savedUser);
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
/**
 * @description Get All users
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @returns {object}
 */
export const getAllUsers = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
  try {
    // Find all users
    const users = await User.find({});
    // Return all users
    res.status(200).json(users);
  } catch (error: any) {
    // Return the error message with a 500 status code
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
/**
 * @description Get user by id
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @returns {object}
 */
export const getUserById = async (req: Request<{ userId: string }>,res: Response<any | { message: string }>,next: NextFunction) => {
  const { userId } = req.params;
  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      Logging.error("User not found");
      return res.status(403).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error: any) {
    // handle errors
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
/**
 * @description update user
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @returns {object}
 */
export const updateUser = async (req: Request<{ userId: string }>,res: Response,next: NextFunction) => {
  // Get the user ID from request parameters
  const { userId } = req.params;
  try {
    // Find and update the user by ID
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: req.body as any,
      },
      {
        new: true,
      }
    );

    // If user is found, return the updated user
    // Otherwise, return a 404 error message
    if (!user) {
      Logging.error("User not found");
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ message: "user update successfylly", user });
  } catch (error: any) {
    let data: any = error.message;
    Logging.error(data);
    res.status(500).json(data);
  }
};
/**
 * @description delete user
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @returns {object}
 */
export const deleteUser = async (req: Request<{ userId: string }>,res: Response<{ message: string }> | Response<{ message: string }>) => {
  // Get the user ID from request parameters
  const { userId } = req.params;
  try {
    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(userId);
    // User was found and deleted successfully
    if (!user) {
      Logging.error("User not found");
      return res.status(400).json({ message: "User not found" });
    }
    Logging.info("User deleted successfully");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    let data: any = error.message;
    Logging.error(data);
    res.status(500).json(data);
  }
};
/**
 * @description update user password
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @returns {object}
 */
export const updateUserPassword = async (req: Request<{ userId: string }, {}, UpdatePasswordBody>,res: Response<{ message: string }>,next: NextFunction) => {
  // Extracting userId, currentPassword, and newPassword from request parameters and body
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;
  try {
    // Find user by userId
    const user = await User.findById(userId);
    if (!user) {
      Logging.error("User not found");
      return res.status(400).json({ message: "User not found" });
    }
    // Check if current password is correct
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password!
    );
    if (!isPasswordCorrect) {
      Logging.error("Invalid current password");
      return res.status(400).json({ message: "Invalid current password" });
    }
    // Check if new password length is valid
    if (newPassword && newPassword.length < 8) {
      Logging.error(
        "The length of the new password is under the minimum required length"
      );
      return res
        .status(422)
        .json({
          message:
            "The length of the new password is under the minimum required length",
        });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update user password and save
    user.password = hashedPassword;
    await user.save();
    // Return success message
    Logging.info("Password updated successfully");
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error: any) {
    let data: any = error.message;
    Logging.error(data);
    res.status(500).json(data);
  }
};
/**
 * @description update user password without the current password
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @returns {object}
 */
export const updateUserPasswordWithAdmin = async (req: Request<{ userId: string }, {}, UpdatePasswordWithAdminBody>,res: Response<{ message: string }>,next: NextFunction) => {
  const { userId } = req.params;
  try {
    // Check if userId is a valid ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      Logging.error(`Invalid user id ${userId}`);
      return res.status(400).json({ message: `Invalid user id ${userId}` });
    }
    // Find the user by userId
    const user = await User.findById(userId);
    // Return 400 if user is not found
    if (!user) {
      Logging.error("User not found");
      return res.status(400).json({ message: "User not found" });
    }
    // Check if the new password meets the minimum length requirement
    if (req.body.newPassword && req.body.newPassword.length < 8) {
      Logging.error(
        "The length of the new password is under the minimum required length"
      );
      return res
        .status(422)
        .json({
          message:
            "The length of the new password is under the minimum required length",
        });
    }
    // Update user's password with the new hashed password
    user.password = await bcrypt.hash(req.body.newPassword, 10);
    await user.save();
    // Return success message
    Logging.info("Password updated successfully");
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error: any) {
    let data: any = error.message;
    Logging.error(data);
    res.status(500).json(data);
  }
};
