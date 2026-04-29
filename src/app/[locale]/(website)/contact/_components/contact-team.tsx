import Image from 'next/image';
import { Github, Linkedin, UserRound } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ContactInfo } from '@/lib/types/contact/contact';

type Member = {
  name: string;
  role: string;
  bio: string;
  image: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
};

interface ContactTeamProps {
  contact: ContactInfo;
}

export default async function ContactTeam({ contact }: ContactTeamProps) {
  // Translation
  const t = await getTranslations('contact.team');

  const members: Member[] = [
    {
      name: 'Hady Wahba',
      role: t('members.0.role'),
      bio: t('members.0.bio'),
      image: '/assets/images/IMG-20240422-WA0028.jpg',
      github: contact.github,
      linkedin: contact.linkedin,
      portfolio: contact.portfolio,
    },
    {
      name: 'Elevate Team',
      role: t('members.1.role'),
      bio: t('members.1.bio'),
      image: '/assets/images/WhatsApp Image 2026-04-28 at 18.34.57.jpeg',
      linkedin: 'https://www.linkedin.com/company/elevatecheg',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 sm:py-24 lg:px-20">
      {/* Heading */}
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-maroon-600 dark:text-softpink-300">
          {t('subtitle')}
        </p>
        <h2 className="text-3xl font-bold text-maroon-700 dark:text-softpink-200 sm:text-4xl">
          {t('heading')}
        </h2>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {members.map((member, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center rounded-3xl border border-zinc-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
          >
            {/* Gradient top bar */}
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-maroon-600 to-softpink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Avatar */}
            <div className="relative mb-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-maroon-100 transition-all duration-300 group-hover:ring-maroon-400 dark:ring-maroon-800 dark:group-hover:ring-maroon-500">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Online dot */}
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-400 dark:border-zinc-800" />
            </div>

            {/* Info */}
            <h3 className="mb-1 text-base font-bold text-maroon-700 dark:text-softpink-200">
              {member.name}
            </h3>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-maroon-500 dark:text-softpink-400">
              {member.role}
            </p>
            <p className="mb-5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {member.bio}
            </p>

            {/* Social links */}
            <div className="mt-auto flex gap-3">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-maroon-600 hover:text-white dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-maroon-600"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-maroon-600 hover:text-white dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-maroon-600"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}

              {member.portfolio && (
                <a
                  href={member.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-maroon-600 hover:text-white dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-maroon-600"
                >
                  <UserRound className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
