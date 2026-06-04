import { z } from 'zod';

export const createDestinationSchema = z.object({
    name: z.string().min(1, "Destination name can't be empty").max(100, "Destination name cannot exceed 100 characters"),
    city: z.string().min(1, "Destination must belong to a city").max(60, "City cannot exceed 60 characters"),
    state: z.string().min(1, "Destination must belong to a state").max(60, "State cannot exceed 60 characters"),
    country: z.string().max(60, "Country cannot exceed 60 characters").optional(),
    description: z.string().max(3000, "Description cannot exceed 3000 characters").optional(),
    images: z.array(z.string().url("Image must be a valid URL")).optional(),
    bestTimeToVisit: z.string().max(120, "Best time to visit cannot exceed 120 characters").optional(),
    estimatedBudget: z.number().min(0, "Estimated budget cannot be negative").optional(),
    category: z.string().max(30, "Tag cannot exceed 30 characters").optional(),
    tags: z.array(z.string().max(30, "Tag cannot exceed 30 characters")).optional(),
});

export const updateDestinationSchema = createDestinationSchema.partial();
