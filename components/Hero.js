import Link from 'next/link'
import { useState } from 'react'
import { IoLogoGithub, IoLogoLinkedin, IoMail, IoCall } from 'react-icons/io5'
import Notification from './Notification'

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="-m-1 p-1 " {...props}>
      <Icon className="h-6 w-6 cursor-pointer fill-gray-500 transition hover:fill-gray-200" />
    </Link>
  )
}

function CopyToClipboard({ icon: Icon, text, ...props }) {
  const [show, setShow] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(text.contact)
    setShow(!show)

    setTimeout(() => {
      setShow(false)
    }, 3000)
  }

  return (
    <div className="-m-1 p-1 " {...props}>
      <Icon
        className="h-6 w-6 cursor-pointer fill-gray-500 transition hover:fill-gray-200"
        onClick={handleClick}
      />
      <Notification show={show} setShow={setShow} text={text} />
    </div>
  )
}

export default function Hero() {
  return (
    <div className="mb-5 max-w-2xl">
      <h1 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-zinc-100 sm:text-5xl">
      Welcome to O P E N S E C A I blogs and projects
      </h1>
      <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
      
Empowering Innovation and Collaboration
Welcome to our vibrant community, where innovation knows no boundaries.
Embrace a journey of collaboration and discovery with us.
      </p>
      <div className="mt-6 flex gap-6">
        <SocialLink
          href="https://github.com/opensecai"
          aria-label="Check out our Github"
          icon={IoLogoGithub}
        />
        <SocialLink
          href="https://www.linkedin.com/in"
          aria-label="Connect with us on LinkedIn"
          icon={IoLogoLinkedin}
        />
        <CopyToClipboard
          text={{ contact: 'support@opensecai.com', type: 'Email' }}
          aria-label="Send us an email"
          icon={IoMail}
        />
        <CopyToClipboard
          text={{ contact: '+91 74-1111-3010', type: 'Phone number' }}
          aria-label="Give us a call"
          icon={IoCall}
        />
      </div>
    </div>
  )
}
