import React from 'react'
import { RiGithubLine, RiInstagramLine, RiTwitterXLine } from 'react-icons/ri'
import { links } from '@/utils/links'
import Link from 'next/link'
export default function Footer() {
  return (
    <footer className="container px-5 md:px-0 mx-auto flex flex-col md:flex-row md:justify-between py-10 items-center">
      <div id="links-socials" className="flex gap-2 md:gap-5 text-2xl items-center">
        <Link
          className="hover:text-cherry transition-colors"
          href={'https://https://github.com/lankyjo'}
          target="_blank"
        >
          <RiGithubLine />
        </Link>
        <Link
          className="hover:text-cherry transition-colors"
          href={'https://www.instagram.com/thelankyjo'}
          target="_blank"
        >
          <RiInstagramLine />
        </Link>
        <Link
          className="hover:text-cherry transition-colors"
          href={'https://x.com/The_lankyjo'}
          target="_blank"
        >
          <RiTwitterXLine />
        </Link>
      </div>
      <div id="logo" className="font-ghoip text-center tracking-wide text-8xl">
        <Link href={'/'}>
          <h6 className="text-cherry text-center">lankyjo</h6>
        </Link>
      </div>
      <div id="links">
        <ul className="text-base uppercase gap-5 flex items-center md:justify-end">
          {links.map((link) => (
            <li key={link}>
              <Link
                className="hover:text-cherry transition-colors"
                href={`/${link === 'home' ? '' : link}`}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
