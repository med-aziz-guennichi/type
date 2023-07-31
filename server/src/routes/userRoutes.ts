import { Router } from "express";
import {createUser,deleteUser,getAllUsers,getUserById,updateUser,updateUserPassword,updateUserPasswordWithAdmin} from "../controllers/userController"

const route: Router = Router();

route.post("/add-user", createUser);
route.get("/all-users", getAllUsers);
route.get("/get-user/:userId", getUserById);
route.patch("/update-user/:userId", updateUser);
route.delete("/delete-user/:userId", deleteUser);
route.put("/update-user-password/:userId", updateUserPassword);
route.put(
  "/update-user-password-with-admin/:userId",
  updateUserPasswordWithAdmin
);


export default route