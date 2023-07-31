import { NextFunction, Request, Response } from "express";
import Test from "../models/Test";
import createHttpError from "http-errors";
import Machine from "../models/Machine";
import { ObjectId } from "mongoose";
import Logging from "../utils/log";

interface testBody {
  name?: string;
  etat?: string;
}
/**
 * @description create a test
 * @author Med Aziz Guennichi
 * @param req {object}
 * @param res {object}
 * @param next {function}
 */

export const createTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, etat } = req.body as testBody;
    if (!name || !etat) {
      Logging.error("Please provide all fields");
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const newTest = new Test({
      name,
      etat,
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
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @returns {object}
 */
export const getAllTests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};

export const getOneTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { testId } = req.params;
    const test = await Test.findById(testId);
    if (!test) {
      Logging.error("Test not found");
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json(test);
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};

export const updateTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { testId } = req.params;
    const updateTest = await Test.findByIdAndUpdate(
      testId,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updateTest) {
      Logging.error("Test not found");
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test updated successfuly", updateTest });
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};

export const deleteTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { testId } = req.params;
    const test = await Test.findById(testId);
    if (!test) {
      Logging.error("Test not found");
      return res.status(404).json({ message: "test not found" });
    }
    test && (await test.deleteOne());
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
