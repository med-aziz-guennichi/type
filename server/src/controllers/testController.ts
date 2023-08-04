import { NextFunction, Request, Response } from "express";
import Test from "../models/Test";
import createHttpError from "http-errors";
import Machine from "../models/Machine";
import { ObjectId } from "mongoose";
import Logging from "../utils/log";

interface testBody {
  name?: string;
  etat?: string;
  description?: string;
}
/**
 * @description create a test
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 */

export const createTest = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const { name, etat, description } = req.body as testBody;
    if (!name || !description) {
      Logging.error("Please provide all fields");
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const newTest = new Test({
      name,
      etat,
      description,
    });
    const savedTest = await newTest.save();
    res.status(201).json(savedTest);
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
/**
 * @description get all the tests
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @returns {object}
 */
export const getAllTests = async (req: Request,res: Response,next: NextFunction) => {
  try {
    // find the tests from the Test Model
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error: any) {
    // handle errors
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
/**
 * @description Get One test with her id
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @returns {object}
 */
export const getOneTest = async (req: Request,res: Response,next: NextFunction) => {
  try {
    // give the test id in the Request Params
    const { testId } = req.params;
    // find the test with her id
    const test = await Test.findById(testId);
    if (!test) {
      // if he didint find the test return 404 status code
      Logging.error("Test not found");
      return res.status(404).json({ message: "Test not found" });
    }
    // return the test
    res.status(200).json(test);
  } catch (error: any) {
    // handle errors with 500 status code
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
/**
 * @description Update test with her id
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @returns {object}
 */
export const updateTest = async (req: Request,res: Response,next: NextFunction) => {
  try {
    // give the test id in the Request Params
    const { testId } = req.params;
    // find test with her id and update all data in the req.body
    const updateTest = await Test.findByIdAndUpdate(
      testId,
      {
        $set: req.body,
      },
      { new: true }
    );
    // if he didint find the test return 404 status code
    if (!updateTest) {
      Logging.error("Test not found");
      return res.status(404).json({ message: "Test not found" });
    }
    // return success message and the object of the updated test
    res.status(200).json({ message: "Test updated successfuly", updateTest });
  } catch (error: any) {
    // handle errors with 500 status code
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
/**
 * @description delete test with her id
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 * @returns {object}
 */
export const deleteTest = async (req: Request,res: Response,next: NextFunction) => {
  try {
    // give the test id in the Request Params
    const { testId } = req.params;
    // find the test with her id
    const test = await Test.findById(testId);
    // if he didint find the test return 404 status code
    if (!test) {
      Logging.error("Test not found");
      return res.status(404).json({ message: "test not found" });
    }
    // delete the test
    test && (await test.deleteOne());
    // return success message
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error: any) {
    // handle errors with 500 status code
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
