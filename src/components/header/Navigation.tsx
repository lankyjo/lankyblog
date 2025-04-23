import React from 'react'
import { TfiClose } from 'react-icons/tfi'
import { links } from '@/utils/links'
import Link from 'next/link'
import Image from 'next/image'
import { RiGithubLine, RiInstagramLine, RiTwitterXLine } from 'react-icons/ri'

interface NavigationProps {
  isOpen: boolean
  closeMenu: () => void
}

export default function Navigation({ isOpen, closeMenu }: NavigationProps) {
  return (
    <>
      <nav
        aria-label="Main Navigation"
        aria-hidden={!isOpen}
        className={`fixed z-50 inset-0 flex justify-end h-dvh w-full transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* NAV-BAR */}
        <div
          id="nav-bar"
          className="h-dvh z-50 relative space-y-8 max-w-110 w-10/12 shadow-xl px-4 pt-8 bg-ivory overflow-y-scroll"
        >
          {/* NAV HEAD */}
          <div id="nav-head" className="flex justify-between items-center">
            <div id="nav-logo" className="font-ghoip text-cherry tracking-wide text-5xl">
              lankyjo
            </div>
            <button id="close-btn" onClick={closeMenu}>
              <TfiClose className="text-3xl cursor-pointer" />
            </button>
          </div>
          {/* NAV HEAD END */}
          {/*LINKS  */}
          <div>
            <ul className="flex flex-col divide-y divide-gray-300">
              {links.map((link) => (
                <Link
                  className="py-[3px] text-[17px] uppercase"
                  key={link}
                  onClick={closeMenu}
                  href={`/${link == 'home' ? '' : link}`}
                >
                  {link}
                </Link>
              ))}
            </ul>
          </div>
          {/*LINKS END */}
          <div className="text-center space-y-5 mt-5">
            <div id="nav-image" className="relative aspect-square">
              <Image
                src={'/images/abiut.jpg'}
                alt="Lanky jo"
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="absolute object-cover object-center w-full h-full"
              />
            </div>
            <div className="text-center">
              <p className="text-2xl uppercase">Ikeji Joshua</p>
              <p className="font-light">FrontEnd Developer</p>
            </div>
            <div>
              <p>
                Hey! I’m Joshua, a junior frontend developer passionate about building things for
                the web. I started this blog to document my growth, share what I’m learning, and
                explore the ever-evolving world of frontend development.
              </p>
            </div>
          </div>
          <div
            id="links-socials"
            className="flex sticky bottom-0 bg-ivory justify-center left-0 w-full gap-8 text-4xl py-5 shadow-2xl items-center"
          >
            <Link
              className="hover:text-cherry transition-colors"
              href={'https://https://github.com/lankyjo'}
            >
              <RiGithubLine />
            </Link>
            <Link
              className="hover:text-cherry transition-colors"
              href={'https://www.instagram.com/thelankyjo'}
            >
              <RiInstagramLine />
            </Link>
            <Link
              className="hover:text-cherry transition-colors"
              href={'https://https://x.com/The_lankyjo'}
            >
              <RiTwitterXLine />
            </Link>
          </div>
        </div>
        {/* NAV-BAR END */}
        <div
          onClick={closeMenu}
          className={`fixed hover:opacity-60 z-40 inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-75 scale-100' : 'opacity-0 delay-0 scale-0 duration-1000'}  backdrop-blur-xs`}
        ></div>
      </nav>
    </>
  )
}
