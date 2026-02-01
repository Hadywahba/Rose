import LoginForm from "./_components/login-form";

import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function Page() {
    const t = await getTranslations("login-page");
    return (
        <main className="flex items-center justify-center dark:bg-zinc-800">
            <div className="max-w-[29rem]">
                {/* Login form */}
                <LoginForm />

                {/* Register */}
                <p className="text-center text-sm font-medium text-zinc-800 dark:text-zinc-50">
                    {t("noAccount")} 
                    <Link href="/register" className="text-maroon-700 dark:text-softpink-300 text-sm font-bold">
                        {t("createNow")}
                    </Link>
                </p>
            </div>
        </main>
    );
}
