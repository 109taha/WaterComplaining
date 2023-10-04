const mongoose = require("mongoose");

const ComplaintResolvedSchme = new mongoose.Schema(
  {
    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Complaint"
    },
    text: {
      type: String,
    },
    pics: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true }
);

const ComplaintResolved = mongoose.model(
  "ComplaintResolved",
  ComplaintResolvedSchme
);
module.exports = ComplaintResolved;