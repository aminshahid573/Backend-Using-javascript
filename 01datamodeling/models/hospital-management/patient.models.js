import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dignosedWith: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: true,
    },
    admittedIn:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
    },
    associatedWith:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    }
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);
