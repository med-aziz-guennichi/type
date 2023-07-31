import mongoose, { InferSchemaType, model } from "mongoose";

const testSchema = new mongoose.Schema({
    machineId:{type:mongoose.Types.ObjectId,ref:"Machine"},
    name:{type:String,require:[true,"please provide the name"]},
    etat:{type:String,required:[true,"please provide etat"],enum:["pass","fail","pending"],default:"pending"}
})
type Test = InferSchemaType<typeof testSchema>;
export default model <Test> ("Test",testSchema);