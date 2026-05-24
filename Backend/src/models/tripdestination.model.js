import mongoose, { Schema } from "mongoose";

const tripDestinationSchema = new Schema(
    {
        trip: {
            type: Schema.Types.ObjectId,
            ref: "Trip",
            required: [true, "Trip is required"],
            index: true,
        },

        destination: {
            type: Schema.Types.ObjectId,
            ref: "Destination",
            required: [true, "Destination is required"],
            index: true,
        },

        arrivalDate: {
            type: Date,
        },

        departureDate: {
            type: Date,
            validate: {
                validator: function (value) {
                    return !value || !this.arrivalDate || value >= this.arrivalDate;
                },
                message: "Departure date must be after or equal to arrival date",
            },
        },

        estimatedBudget: {
            type: Number,
            default: 0,
            min: [0, "Estimated budget cannot be negative"],
        },

        notes: {
            type: String,
            trim: true,
            maxlength: [500, "Notes cannot exceed 500 characters"],
        },

        order: {
            type: Number,
            min: [1, "Order must be at least 1"],
            validate: {
                validator: Number.isInteger,
                message: "Order must be a whole number",
            },
        },
    },
    {
        timestamps: true,
    }
);

// A destination should only be added once to the same trip.
tripDestinationSchema.index({ trip: 1, destination: 1 }, { unique: true });

// These indexes support filtering/sorting destinations inside one trip.
tripDestinationSchema.index({ trip: 1, estimatedBudget: 1 }); // ?minBudget / ?maxBudget
tripDestinationSchema.index({ trip: 1, createdAt: -1 }); // newest-first sort when requested

// Order must be unique only when an order value exists.
// partialFilterExpression allows multiple documents with no order.
tripDestinationSchema.index(
    { trip: 1, order: 1 },
    {
        unique: true,
        partialFilterExpression: { order: { $type: "number" } },
    }
);

const TripDestination = mongoose.model("TripDestination", tripDestinationSchema);

export { TripDestination };
export default TripDestination;
