const mongoose = require("mongoose");

const ComplaintSchme = new mongoose.Schema(
  {
    nameOfComplainter: {
      type: String,
      required: true,
    },
    waterPlant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
    },
    complaintCategory: {
      type: String,
      required: true,
      enum: [
        "Water Quality and Taste",
        "Service and Billing",
        "Water leaking",
        "Safety Concerns",
        "Customer Service",
        "Availability and Stock",
        "Delivery Issues",
        "Communication and Transparency",
        "Environmental Concerns",
        "Technical Problems",
        "General Hygiene and Cleanliness",
        "Accessibility Issues",
        "Other",
      ],
    },
    complaint: {
      type: String,
      required: true,
    },
    pics: {
      type: Array,
    },
    status: {
      type: String,
      emnum: ["Pending", "Assigned", "Resolved"],
      default: "Pending",
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    resolvedComplaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ComplaintResolved",
    },
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    adminID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    role: {
      type: String,
      enum: ["Client", "Admin", "Staff"],
      require: true,
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", ComplaintSchme);
module.exports = Complaint;
