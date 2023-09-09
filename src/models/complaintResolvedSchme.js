const mongoose = require("mongoose");

const ComplaintResolvedSchme = new mongoose.Schema(
  {
    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    resolved: {
      type: Boolean,
      default: false,
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
