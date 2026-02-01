import { z } from "zod";

export const loginSchema = z.object({
    email:z.email ("please enter your email"),
    password: z.string("please enter your password")
})