import mongoose from "mongoose";


const propertyInterestSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["INTERESTED", "WITHDRAWN"],
      default: "INTERESTED",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent same user clicking twice
propertyInterestSchema.index(
  { propertyId: 1, userId: 1 },
  { unique: true }
);

// Owner view queries
propertyInterestSchema.index({ propertyId: 1, createdAt: -1 });
propertyInterestSchema.index({ userId: 1 });

const PropertyInterest = mongoose.model(
  "PropertyInterest",
  propertyInterestSchema
);

module.exports = PropertyInterest;
