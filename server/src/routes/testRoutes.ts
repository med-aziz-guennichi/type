import { Router } from "express";
import {
  createTest,
  deleteTest,
  getAllTests,
  getOneTest,
  updateTest,
} from "../controllers/testController";

const route: Router = Router();

route.post("/add-test", createTest);
route.get("/getAllTests", getAllTests);
route.get("/getOneTest/:testId", getOneTest);
route.patch("/updateTest/:testId", updateTest);
route.delete("/deleteTest/:testId", deleteTest);

export default route;
