import z from "zod";
import { loginSchema } from "../schemes/auth.schema";

export interface LoginResponse {
   
        token: string;
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            gender: string;
            phone: string;
            photo: string;
            role: string;
            wishlist: string[];
            addresses: string;
            createdAt: string;
        };
    };

    export type LoginFields = z.infer <typeof loginSchema>
