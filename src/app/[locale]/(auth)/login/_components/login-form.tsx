'use client'
import { Input } from "@/components/ui/input"
import { LoginFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import SubmissionFeedback from "./shared/submission-feedback";
import useLogin from "./_hooks/use-login";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/schemes/auth.schema";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";



export default function LoginForm() {
    // Translation
    const t = useTranslations("login-page");

    //mutation 
    const { isPending, error, login } = useLogin();

    // Form & Validation
    const form = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    // Function
    const onSubmit: SubmitHandler<LoginFields> = (values) => {
        login(values);

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-112 w-full my-9">
                {/* Email */}
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => <FormItem>
                        <FormLabel>{t("email")}</FormLabel>
                        <FormControl>
                            <Input placeholder="user@example.com"  {...field} />
                        </FormControl>
                    </FormItem>}
                />
                {/* Password */}
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => <FormItem>
                        <FormLabel>{t("password")}</FormLabel>
                        <FormControl>
                            <Input placeholder="***********"  {...field} type="password" />
                        </FormControl>
                    </FormItem>}
                />

                {/* Forgot Password */}
                <Link href="/forgot-password" className="text-maroon-700 dark:text-softpink-300 mb-9 text-end text-sm font-semibold">
                    {t("forgotpss")}
                </Link>

                {/* Feedback */}
                <SubmissionFeedback>{error?.message}</SubmissionFeedback>

                {/* Submit */}
                <Button disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)} type="submit" className="w-full">
                    {t("submit")}
                </Button>
            </form>
        </Form>
    );
}