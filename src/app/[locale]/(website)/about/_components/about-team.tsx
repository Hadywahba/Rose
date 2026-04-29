import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Github, Linkedin, Globe } from 'lucide-react';
import { ContactInfo } from '@/lib/types/contact/contact';

type Member = {
  name: string;
  role: string;
  bio: string;
  works: string[];
  image: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  gradient: string;
};
interface AboutTeamProps {
  contact: ContactInfo;
}

export default function AboutTeam({ contact }: AboutTeamProps) {
  const t = useTranslations('about-page.team');

  const members: Member[] = [
    {
      name: 'Hady Wahba',
      role: t('members.0.role'),
      bio: t('members.0.bio'),
      works: [
        t('members.0.works.0'),
        t('members.0.works.1'),
        t('members.0.works.2'),
        t('members.0.works.3'),
        t('members.0.works.4'),
        t('members.0.works.5'),
        t('members.0.works.6'),
        t('members.0.works.7'),
        t('members.0.works.8'),
      ],
      image: '/assets/images/IMG-20240422-WA0028.jpg',
      github: contact.github,
      linkedin: contact.linkedin,
      portfolio: contact.portfolio,
      gradient: 'from-maroon-600 to-maroon-800',
    },
    {
      name: 'Elevate Team',
      role: t('members.1.role'),
      bio: t('members.1.bio'),
      works: [
        t('members.1.works.0'),
        t('members.1.works.1'),
        t('members.1.works.2'),
         t('members.1.works.3'),
          t('members.1.works.4'),
           t('members.1.works.5'),
      ],
      image: '/assets/images/WhatsApp Image 2026-04-28 at 18.34.57.jpeg',
      linkedin: 'https://www.linkedin.com/company/elevatecheg',
      gradient: 'from-softpink-600 to-maroon-600',
    },
  ];

  return (
    <section className="bg-zinc-50 py-16 dark:bg-zinc-900 sm:py-24">
      <div className="container mx-auto px-4 lg:px-20">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-maroon-600 dark:text-softpink-300 md:text-xl">
            {t('subtitle')}
          </p>
          <h2 className="text-3xl font-bold text-maroon-700 dark:text-softpink-200 sm:text-4xl">
            {t('heading')}
          </h2>
        </div>

        {/* Members - alternating layout */}
        <div className="space-y-16">
          {members.map((member, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-16 ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image side */}
              <div className="relative w-full max-w-sm shrink-0 lg:w-80">
                {/* Background card */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${member.gradient} translate-x-3 translate-y-3 opacity-20`}
                />
                <div className="relative overflow-hidden rounded-3xl">
                  <div className={`bg-gradient-to-br ${member.gradient} p-1`}>
                    <div className="overflow-hidden rounded-[22px] bg-white dark:bg-zinc-800">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="aspect-square w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Role badge */}
                <div
                  className={`absolute -bottom-4 ${index % 2 !== 0 ? 'left-4' : 'right-4'} rounded-xl bg-gradient-to-r ${member.gradient} px-4 py-2 shadow-lg`}
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-white">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Content side */}
              <div className="flex-1 pt-6 lg:pt-0">
                <h3 className="mb-3 text-2xl font-bold text-maroon-700 dark:text-softpink-200 sm:text-3xl">
                  {member.name}
                </h3>
                <p className="mb-6 leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {member.bio}
                </p>

                {/* Works on */}
                <div className="mb-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-maroon-600 dark:text-softpink-400">
                    {t('works-on')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.works.map((work, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-maroon-200 bg-maroon-50 px-3 py-1 text-xs font-medium text-maroon-700 dark:border-maroon-700 dark:bg-maroon-900/30 dark:text-maroon-300"
                      >
                        {work}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div className="flex gap-3">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all hover:border-maroon-400 hover:bg-maroon-600 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all hover:border-maroon-400 hover:bg-maroon-600 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.portfolio && (
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all hover:border-maroon-400 hover:bg-maroon-600 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
