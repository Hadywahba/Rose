"use client";

import { useSyncLocalWishlistToServer } from "@/lib/hooks/local-storage/use-sync-local-whishlist-to-server";
import { LoginFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {

    // Hooks
    const {sendWhishlistProductsFromStorageToServer} = useSyncLocalWishlistToServer()

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
        onSuccess:  async () => {
        //   Send whishlist storage into server
            await  sendWhishlistProductsFromStorageToServer()

             //Get cllback url
            const callbackUrl = new URLSearchParams(location.search).get('callbackUrl') || '/'

            // redirect to callback url
            location.href = callbackUrl
        }
    });
    return { isPending, error, login: mutate }
}