import { z } from 'zod';

export const createTripSchema = z.object({
   title: z.string().trim().min(1, 'Title is required'),
   description: z.string().optional(),
   category: z.string().optional(),
   startDate: z.coerce.date(),
   endDate: z.coerce.date(),
   totalBudget: z.coerce.number().min(0, 'Total budget cannot be negative')
}).refine(data => data.endDate >= data.startDate, {
   message: 'End date must be after or equal to start date',
   path: ['endDate']
});

export const updateTripSchema = z.object({
   title: z.string().trim().min(1, 'Title cannot be empty').optional(),
   description: z.string().optional(),
   category: z.string().optional(),
   bannerImage: z.string().url().optional(),
   startDate: z.coerce.date().optional(),
   endDate: z.coerce.date().optional(),
   totalBudget: z.coerce.number().min(0, 'Total budget cannot be negative').optional()
});
