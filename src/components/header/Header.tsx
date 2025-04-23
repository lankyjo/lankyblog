'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { VscMenu } from 'react-icons/vsc'
import Navigation from './Navigation'

export default function Header() {
  const [isOpen, setisOpen] = useState(false)
  function openMenu() {
    document.body.style.overflow = 'hidden'
    setisOpen(true)
  }
  function closeMenu() {
    document.body.style.overflow = ''
    setisOpen(false)
  }
  return (
    <header>
      <div className="container mx-auto flex items-center justify-between py-8 px-1 ">
        <div id="search" className="px-4 cursor-pointer text-4xl">
          <RiSearch2Line />
        </div>

        <div id="logo" className="font-ghoip tracking-wide text-8xl">
          <Link href={'/'}>
            <h1 className="text-cherry">lankyjo</h1>
          </Link>
        </div>

        <button onClick={openMenu} id="hamburger" className="cursor-pointer px-4">
          <VscMenu className="text-4xl" />
        </button>
      </div>

      <Navigation isOpen={isOpen} closeMenu={closeMenu} />
    </header>
  )
}
