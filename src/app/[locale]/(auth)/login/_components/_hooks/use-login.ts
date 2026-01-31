"use client";

import { LoginFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {

    //mutation
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (credentials: LoginFields) => {
            const response = await signIn('credentials', {
                email: credentials.email,
                password: credentials.password,
                redirect: false,
            });
            // Handle authentication error
            if (response?.error) {
                throw new Error(response.error);
            }
            return response;
        },

        // Callbacks
        onSuccess: () => {
            //Get cllback url
            const callbackUrl = new URLSearchParams(location.search).get('callbackUrl') || '/'

            // redirect to callback url
            location.href = callbackUrl
        }
    });
    return { isPending, error, login: mutate }
}