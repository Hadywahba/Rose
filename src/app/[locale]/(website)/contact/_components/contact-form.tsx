"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendContactForm } from "@/lib/services/contact/email.service";

type FormFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const t = useTranslations("contact.form");

  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  async function onSubmit(data: FormFields) {
    try {
      await sendContactForm(data);

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Contact form error:", error);
    }
  }

  return (
    <section className="relative overflow-hidden bg-maroon-50 py-16 dark:bg-zinc-900 sm:py-24">
      <div className="container relative mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-maroon-700 dark:text-softpink-200 sm:text-4xl">
            {t("heading")}
          </h2>
        </div>

        {isSuccess ? (
          <div className="rounded-2xl border bg-white p-10 text-center shadow-sm dark:bg-zinc-800">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-maroon-100">
              <Send className="h-7 w-7 text-maroon-600" />
            </div>

            <h3 className="mb-2 text-xl font-bold">{t("success.title")}</h3>

            <p className="text-zinc-500">{t("success.description")}</p>

            <button
              onClick={() => setIsSuccess(false)}
              className="mt-6 rounded-lg bg-maroon-600 px-6 py-2 text-white hover:bg-maroon-700"
            >
              {t("send-new")}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-800 sm:p-10"
          >
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label>{t("name")}</label>
              <Input
                className="w-full"
                {...register("name", { required: true })}
                placeholder={t("name-placeholder")}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{t("name-req")}</p>
              )}
            </div>

            {/* Email */}
            <div className="mt-4 flex flex-col gap-1.5">
              <label>{t("email")}</label>
              <Input
                className="w-full"
                type="email"
                {...register("email", { required: true })}
                placeholder={t("email-placeholder")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{t("email-req")}</p>
              )}
            </div>

            {/* Subject */}
            <div className="mt-4 flex flex-col gap-1.5">
              <label>{t("subject")}</label>
              <Input
                className="w-full"
                {...register("subject", { required: true })}
                placeholder={t("subject-placeholder")}
              />
              {errors.subject && (
                <p className="text-xs text-red-500">{t("subject-req")}</p>
              )}
            </div>

            {/* Message */}
            <div className="mt-4 flex flex-col gap-1.5">
              <label>{t("message")}</label>
              <textarea
                rows={5}
                {...register("message", { required: true })}
                className="w-full resize-none rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-400"
                placeholder={t("message-placeholder")}
              />
              {errors.message && (
                <p className="text-xs text-red-500">{t("message-req")}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 h-12 w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('loading')}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {t("submit")}
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
