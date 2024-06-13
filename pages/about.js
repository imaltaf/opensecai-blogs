import Image from 'next/image'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'
import { Analytics } from '@vercel/analytics/react'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/social-icons'
import portraitImage from '../public/static/images/avatar.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className="flex">
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-primary-500 dark:text-zinc-200 dark:hover:text-primary-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-primary-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export default function About() {
  const { author, email, linkedin, github } = siteMetadata
  return (
    <>
      <Head>
        <title>{`About Cyber Crew Team- ${author}`}</title>
        <meta
          name="description"
          content="Meet Our Team Members"
        />
      </Head>
      <Container className="mt-10">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt="portrait of Curtis Warcup"
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Meet Our  Team Members
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            A L T A F
            </h1>
              <p>
              Altaf is a multifaceted professional with expertise in cybersecurity, DevSecOps, and web development. As a cybersecurity engineer, he excels in protecting systems, networks, and data from digital attacks, ensuring robust security measures are in place to prevent breaches. His deep understanding of the cybersecurity landscape allows him to anticipate and mitigate threats effectively.

In the realm of DevSecOps, Altaf integrates security practices into the DevOps process, emphasizing a security-first approach in the software development lifecycle. This ensures that security is not an afterthought but a fundamental aspect of the development process, fostering a culture of continuous security enhancement.

Moreover, Altaf's skills in web development enable him to build and maintain secure, scalable, and efficient web applications. His comprehensive knowledge in this area ensures that the applications he develops are not only functional but also adhere to the highest security standards.
              </p>

            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href={github} icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href={linkedin} icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href={`mailto:${email}`}
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                altaf@opensecai.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
      <Container className="mt-10">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt="portrait of Curtis Warcup"
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">

            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            W A S E E M
            </h1>
              <p>
              Waseem is a talented full-stack developer and an integral part of our Cyber Crew. As a full-stack developer, Waseem is proficient in both front-end and back-end technologies, allowing him to handle all aspects of web application development. His versatility ensures that he can create seamless and dynamic user experiences while maintaining robust server-side functionality.

Being a key member of the Cyber Crew, Waseem brings his expertise in cybersecurity into his development practices. He designs and implements secure coding practices, ensuring that every layer of the application is fortified against potential threats. His holistic approach to development and security makes him a valuable asset to our team, capable of delivering high-quality, secure, and efficient solutions.
              </p>

            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href={github} icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href={linkedin} icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href={`mailto:${email}`}
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                waseem@opensecai.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
      <Analytics />
    </>
  )
}
