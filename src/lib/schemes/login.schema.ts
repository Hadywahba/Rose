
import { z } from "zod";

export const useLoginSchema = () => {
   

    return z.object({
        email: z.email({ message: ("email-invalid") }).min(1, { message: ("email-required") }),

        password: z.string().min(1, { message: ("password-required") }),
    });
};

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;
