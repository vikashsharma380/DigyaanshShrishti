import mongoose from "mongoose";

const sweeperSchema = new mongoose.Schema({
  district: String,
  block: String,
  schoolName: String,
  sweeperName: String,
  toilets: Number,
  accountNumber: String,
  ifsc: String,
  salary: Number,
  utrNumber: {
  type: String,
  default: "",   
},


});

const Sweeper = mongoose.models.Sweeper || mongoose.model("Sweeper", sweeperSchema);

export default Sweeper;
