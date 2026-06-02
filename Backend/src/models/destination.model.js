import mongoose from "mongoose";

const urlValidator = {
    validator: function (value){
        if(!value) return true;

        try{
            new URL(value);
            return true;
        }
        catch{
            return false;
        }
    },
    message: "Image must be a valid URL",
};

const destinationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Destination name can't be empty"],
            trim: true,
            maxlength: [100, "Destination name cannot exceed 100 characters"],
        },

        city: {
            type: String,
            required: [true, "Destination must belong to a city"],
            trim: true,
            lowercase: true,
            maxlength: [60, "City cannot exceed 60 characters"],
        },

        state: {
            type: String,
            required: [true, "Destination must belong to a state"],
            trim: true,
            lowercase: true,
            maxlength: [60, "State cannot exceed 60 characters"],
        },

        country: {
            type: String,
            required: [true, "Destination must belong to a country"],
            trim: true,
            lowercase: true,
            default: "India",
            maxlength: [60, "Country cannot exceed 60 characters"],
        },

        description: {
            type: String,
            trim: true,
            maxlength: [3000, "Description cannot exceed 3000 characters"],
        },

        images: [
            {
                type: String,
                trim: true,
                validate: urlValidator,
            },
        ],

        bestTimeToVisit: {
            type: String,
            trim: true,
            maxlength: [120, "Best time to visit cannot exceed 120 characters"],
        },

        estimatedBudget: {
            type: Number,
            default: 0,
            min: [0, "Estimated budget cannot be negative"],
        },

        category: {
            type: String,
            trim: true,
            lowercase: true,
            maxlength: [30, "Tag cannot exceed 30 characters"],
        },

        tags: [
            {
                type: String,
                trim: true,
                lowercase: true,
                maxlength: [30, "Tag cannot exceed 30 characters"],
            },
        ],
    },
    {
        timestamps: true,
    }
);

destinationSchema.pre("validate", function () {
    if (this.images?.length) {
        this.images = [...new Set(this.images.filter(Boolean))];
    }

    if (this.tags?.length) {
        this.tags = [...new Set(this.tags.filter(Boolean))];
    }
});

// Indexes speed up common filters and sorts used by the destinations list API.
// Avoid indexing every field; each index also has write/update cost.
destinationSchema.index({ city: 1 }); // Supports ?city=...
destinationSchema.index({ state: 1 }); // Useful for state-based filtering.
destinationSchema.index({ country: 1 }); // Supports ?country=...
destinationSchema.index({ category: 1 }); // Supports ?category=...
destinationSchema.index({ estimatedBudget: 1 }); // Helps budget range queries and sorting.
destinationSchema.index({ createdAt: -1 }); // Helps default newest-first sorting.
destinationSchema.index({ country: 1, category: 1 }); // Compound index for country + category filters.
destinationSchema.index({ tags: 1 }); // Helps matching destinations by tag.

// Text index supports MongoDB text-search style queries if needed later.
destinationSchema.index({
    name: "text",
    city: "text",
    state: "text",
    country: "text",
    tags: "text",
});

// Prevent duplicate destination entries for the same name/city/state/country.
// Collation strength 2 makes the unique check case-insensitive.
destinationSchema.index(
    {
        name: 1,
        city: 1,
        state: 1,
        country: 1,
    },
    {
        unique: true,
        collation: { locale: "en", strength: 2 },
    }
);

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;
