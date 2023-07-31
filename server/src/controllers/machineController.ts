import { NextFunction, Request, Response } from "express";
import Machine from "../models/Machine";
import createHttpError from "http-errors";
import Test from "../models/Test";
import Logging from "../utils/log";

interface machine {
  serialNumber?: string;
  macAdress?: string;
  productModel?: string;
  probelength?: string;
  potdiam?: string;
  potlength?: string;
  potwidth?: string;
  sprinkleduration?: string;
  sprinklefreq?: string;
  sprinkletargettimestamp?: string;
  sprinklemode?: string;
  thresholdmin?: string;
  thresholdmax?: string;
  probecurrent?: string;
  batterycurrent?: string;
  testStatus?: string[];
}
export const createMachine = async (
  req: Request<unknown, unknown, machine>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      serialNumber,
      macAdress,
      productModel,
      probelength,
      potdiam,
      potlength,
      potwidth,
      sprinkleduration,
      sprinklefreq,
      sprinkletargettimestamp,
      sprinklemode,
      thresholdmin,
      thresholdmax,
      probecurrent,
      batterycurrent,
      testStatus,
    } = req.body as machine;
    const newMachine = new Machine({
      serialNumber,
      macAdress,
      productModel,
      probelength,
      potdiam,
      potlength,
      potwidth,
      sprinkleduration,
      sprinklefreq,
      sprinkletargettimestamp,
      sprinklemode,
      thresholdmin,
      thresholdmax,
      probecurrent,
      batterycurrent,
      testStatus,
      testGlobale: "pass",
    });
    var savedMachine = await newMachine.save();
    // If testStatus contains test IDs, associate the machine with the tests
    if (testStatus && Array.isArray(testStatus) && testStatus.length > 0) {
      // Find the tests using the provided IDs
      const tests = await Test.find({ _id: { $in: testStatus } }).exec();

      // Check the status of each test and update the machine's testGlobale accordingly
      let testGlobale = "pass";
      tests.forEach(async (test: any) => {
        if (test.status === "fail") {
          testGlobale = "fail";
        }
        test.machine = savedMachine._id; // Assuming 'machine' is the field in the Test model that stores the Machine's ID
        await test.save();
      });

      // Update the testGlobale field in the machine schema
      savedMachine.testGlobale = testGlobale;
      await savedMachine.save();
    }
    res.status(201).json(savedMachine);
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
export const getAllMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const machine = await Machine.find({});
    res.status(200).json(machine);
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};

export const getMachineById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { machineId } = req.params;
    const machine = await Machine.findById(machineId);
    if (!machine) {
      Logging.error("Machine not found");
      return res.status(404).json({ message: "Machine not found" });
    }
    res.status(200).json(machine);
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};

export const updateMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { machineId } = req.params;
    const machine = await Machine.findByIdAndUpdate(
      machineId,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!machine) {
      Logging.error("Machine not found");
      return res.status(404).json({ message: "Machine not found" });
    }
    res.status(200).json({ message: "Machine updated successfully", machine });
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};

export const deleteMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { machineId } = req.params;
    const machine = await Machine.findById(machineId);
    if (!machine) {
      Logging.error("Machine not found");
      return res.status(404).json({ message: "Machine not found" });
    }
    await machine.deleteOne();
    res.status(200).json({ message: "Machine deleted succeessfully" });
  } catch (error: any) {
    Logging.error(error.message);
    res.status(500).json({ message: error });
  }
};
