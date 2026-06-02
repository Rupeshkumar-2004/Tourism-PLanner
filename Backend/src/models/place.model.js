import mongoose, { Schema } from "mongoose";

const urlValidator = {
    validator: function (value) {
        if (!value) return true;
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    },
    message: "Image must be a valid URL",
};

const placeSchema = new Schema(
    {
        destination: {
            type: Schema.Types.ObjectId,
            ref: "Destination",
            required: [true, "Place must belong to a destination"],
            index: true,
        },
        name: {
            type: String,
            required: [true, "Place name can't be empty"],
            trim: true,
            maxlength: [100, "Place name cannot exceed 100 characters"],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [3000, "Description cannot exceed 3000 characters"],
        },
        category: {
            type: String,
            trim: true,
            lowercase: true,
            maxlength: [30, "Category cannot exceed 30 characters"],
        },
        tags: [
            {
                type: String,
                trim: true,
                lowercase: true,
                maxlength: [30, "Tag cannot exceed 30 characters"],
            },
        ],
        lat: {
            type: Number,
        },
        lon: {
            type: Number,
        },
        images: [
            {
                type: String,
                trim: true,
                validate: urlValidator,
            },
        ],
        address: {
            type: String,
            trim: true,
            maxlength: [250, "Address cannot exceed 250 characters"],
        }
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate places in the same destination
placeSchema.index({ destination: 1, name: 1 }, { unique: true });

const Place = mongoose.model("Place", placeSchema);

export { Place };
export default Place;
