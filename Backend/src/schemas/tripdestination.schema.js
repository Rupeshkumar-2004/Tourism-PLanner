import { z } from 'zod';
import mongoose from "mongoose";

export const itinerarySchema = z.array(z.object({
   dayNumber: z.number().int().min(1),
   activities: z.array(z.any()).optional()
}));

export const addDestinationSchema = z.object({
   destinationId: z.string().refine(val => mongoose.isValidObjectId(val), 'Invalid destination id'),
   arrivalDate: z.coerce.date().optional(),
   departureDate: z.coerce.date().optional(),
   estimatedBudget: z.coerce.number().min(0, "Estimated budget cannot be negative").optional(),
   notes: z.string().optional(),
   order: z.coerce.number().int().min(1, "Order must be a whole number greater than 0").optional(),
   itinerary: itinerarySchema.optional(),
   essentialGear: z.array(z.string()).optional()
}).refine(data => {
   if (data.arrivalDate && data.departureDate) {
      return data.departureDate >= data.arrivalDate;
   }
   return true;
}, {
   message: 'Departure date must be after or equal to arrival date',
   path: ['departureDate']
});

export const updateDestinationSchema = z.object({
   arrivalDate: z.coerce.date().optional(),
   departureDate: z.coerce.date().optional(),
   estimatedBudget: z.coerce.number().min(0, "Estimated budget cannot be negative").optional(),
   notes: z.string().optional(),
   order: z.coerce.number().int().min(1, "Order must be a whole number greater than 0").optional(),
   itinerary: itinerarySchema.optional(),
   essentialGear: z.array(z.string()).optional()
});

export const addPlaceSchema = z.object({
   tripId: z.string().refine(val => mongoose.isValidObjectId(val), 'Invalid trip id'),
   destinationId: z.string().refine(val => mongoose.isValidObjectId(val), 'Invalid destination id'),
   place: z.object({
      name: z.string().min(1, "Valid place object with a name is required"),
      description: z.string().optional(),
      category: z.string().optional(),
      images: z.array(z.string()).optional(),
      address: z.string().optional()
   })
});
