import mongoose, { Schema } from "mongoose";

const tripSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Trip title is required"],
            maxlength: [100, "Title cannot exceed 100 characters"],
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        category: {
            type: String,
            enum: ['adventure', 'heritage', 'nature', 'city', 'relaxation', 'other'],
            default: 'other'
        },

        bannerImage: {
            type: String,
            trim: true
        },

        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },

        endDate: {
            type: Date,
            required: [true, "End date is required"],
            //in validator we dont use arrow functions as this wont get bind..
            validate: {
                validator: function (value) {
                    return !this.startDate || value >= this.startDate;
                },
                message: "End date must be after or equal to start date",
            },
        },

        destinations : [
            {
                type: Schema.Types.ObjectId,
                ref: "Destination"
            }

        ],

        totalBudget: {
            type: Number,
            required: [true, "Total budget is required"],
            min: [0, "Total budget cannot be negative"],
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Trip creator is required"],
            //study about this later...
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// Compound indexes match the actual trip-list query pattern:
// first filter by createdBy, then sort/filter by another field.
tripSchema.index({ createdBy: 1, createdAt: -1 }); // User's trips sorted newest first.
tripSchema.index({ createdBy: 1, totalBudget: 1 }); // User's trips filtered by budget.
tripSchema.index({ createdBy: 1, startDate: 1 }); // User's trips filtered by date range.

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
