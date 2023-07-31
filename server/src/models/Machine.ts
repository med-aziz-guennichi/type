import mongoose, { InferSchemaType, model } from "mongoose";

const machineSchema = new mongoose.Schema({
    serialNumber:{type:String,required:true},
    macAdress:{type:String,required:true},
    productModel:{type:String,required:true},
    probelength:{type:String,required:true},
    potdiam:{type:String,required:true},
    potlength:{type:String,required:true},
    potwidth:{type:String,required:true},
    sprinkleduration:{type:String,required:true},
    sprinklefreq:{type:String,required:true},
    sprinkletargettimestamp:{type:String,required:true},
    sprinklemode:{type:String,required:true},
    thresholdmin:{type:String,required:true},
    thresholdmax:{type:String,required:true},
    probecurrent:{type:String,required:true},
    batterycurrent:{type:String,required:true},
    testStatus:[{type:mongoose.Types.ObjectId,ref:"Test"}],
    operateurId:{type:mongoose.Types.ObjectId,ref:"User"},
    testGlobale:{type:String,required:true,enum:["pass","fail"]}
},
{timestamps:true}
)
type Machine = InferSchemaType<typeof machineSchema>;
export default model <Machine> ("Machine",machineSchema);