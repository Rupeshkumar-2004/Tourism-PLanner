import { z } from "zod";

export const spontaneousQuerySchema = z.object({
    lat: z.coerce.number({ invalid_type_error: "Latitude must be a valid number" }),
    lon: z.coerce.number({ invalid_type_error: "Longitude must be a valid number" })
});
