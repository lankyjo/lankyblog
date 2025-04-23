'use client'
import React, { useRef } from 'react'
import { Carousel, CarouselSlide } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'
import Link from 'next/link'

interface CarouselClientProps {
  posts: {
    image: string
    title: string
    category: string
    slug: string
  }[]
}
export default function CarouselComp({ posts }: CarouselClientProps) {
  const isMobile = useMediaQuery('(max-width: 1000px)')
  const autoplay = useRef(Autoplay({ delay: 3000 }))
  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      align="start"
      loop
      controlSize={50}
      height={isMobile ? 400 : 500}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      classNames={{
        control: 'carousel-control',
        controls: 'carousel-controls',
        root: 'carousel-root',
      }}
    >
      {posts.map((post, index) => {
        return (
          <CarouselSlide key={index}>
            <CarouselCard
              image={post.image}
              title={post.title}
              category={post.category}
              link={post.slug}
            />
          </CarouselSlide>
        )
      })}
    </Carousel>
  )
}
interface CardProps {
  image: string
  title: string
  category: string
  link: string
}
function CarouselCard({ image, title, category, link }: CardProps) {
  return (
    <Link
      href={`/blogposts/${link}`}
      className="w-full h-full relative flex justify-center items-center"
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          fill
          className="w-full block h-full object-cover object-center absolute"
          alt={title}
        />
        <div className="absolute bg-black/30 inset-0"></div>
      </div>

      <div className=" relative z-20 text-white text-center">
        <p className="uppercase text-xs text-center underline">{category}</p>
        <h5 className=" max-w-80 text-2xl">{title}</h5>
      </div>
    </Link>
  )
}
