import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()


const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 9000;

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.menvh.mongodb.net/db`;
const LOCAL_MONGO = process.env.MONGO_LOCAL || '';


export const config = {
  mongo:{
      // username:MONGO_USERNAME,
      // password:MONGO_PASSWORD,
      // url:MONGO_URL
      url:LOCAL_MONGO
  },
  server : {
      port:SERVER_PORT
  }
}
