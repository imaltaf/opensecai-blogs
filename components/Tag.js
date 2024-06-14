import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <>
      <Link href={`/tags/${kebabCase(text)}`}>
        <a className="ml-1 mr-2 text-sm font-medium uppercase hover:text-primary-600 neon-text">{text}</a>
      </Link>
      <style jsx>{`
        .neon-text {
          color: #39ff14; /* Neon Green */
          text-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14;
        }
        .neon-text:hover {
          color: #00ffcc; /* Neon Cyan on hover */
          text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc, 0 0 20px #00ffcc, 0 0 40px #00ffcc;
        }
      `}</style>
    </>
  )
}

export default Tag
