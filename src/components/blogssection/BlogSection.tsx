import Image from 'next/image'
import React from 'react'
import getPosts from '@/utils/posts'
import Link from 'next/link'

type RichTextNode = {
  type: string
  version?: number
  text?: string
  children?: RichTextNode[]
  direction?: 'ltr' | 'rtl' | null
  format?: '' | 'left' | 'right' | 'center' | 'justify' | string
  indent?: number
}
function extractTextFromRichText(node: RichTextNode) {
  let text = ''

  if (node.text) {
    text += node.text + ' '
  }

  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      text += extractTextFromRichText(child)
    }
  }

  return text
}

export default async function BlogSection() {
  const posts = await getPosts(6)

  return (
    <section className="pt-25 pb-16">
      <div id="blog-title" className="text-center font-ghoip tracking-wide text-4xl">
        <h5 className="text-5xl mb-5">My Thoughts</h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 container px-5 md:px-0 mx-auto ">
        {/* {data.map((item, index) => {
          return (
            <BlogCards key={index} image={item.image} title={item.title} category={item.category} />
          )
        })} */}
        {posts.docs.map((post) => {
          const imageUrl =
            typeof post?.image === 'object' && post?.image
              ? post.image.url || '' // Use empty string as fallback if url is undefined
              : typeof post?.image === 'string'
                ? post.image
                : ''
          const contentText = extractTextFromRichText(post.content.root)
          return (
            <BlogCards
              key={post?.id}
              image={imageUrl}
              title={post?.title}
              category={post?.category}
              date={post.createdAt}
              url={post.slug}
              content={contentText}
            />
          )
        })}
      </div>
    </section>
  )
}

interface BlogCardProps {
  image: string
  title: string
  category: string
  date: string
  url: string
  content: string
}

function calculateReadingTime(text: string) {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function BlogCards({ image, title, category, date, url, content }: BlogCardProps) {
  const readingTime = calculateReadingTime(content)
  return (
    <article className="text-center w-full space-y-2">
      <Link
        href={`/blogposts/${url}`}
        id="image"
        className="relative aspect-square sm:aspect-video overflow-hidden inline-block rounded-sm w-full"
      >
        <Image
          fill
          src={image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute w-full h-full object-cover object-center"
          alt={title}
        />
      </Link>
      <span id="category" className="block underline uppercase">
        {category}
      </span>
      <Link
        href={`/blogposts/${url}`}
        id="card-title"
        className="text-xl hover:text-stone-400 duration-300 transition-colors font-bold"
      >
        {title}
      </Link>
      <div className="flex justify-center items-center gap-x-3 text-stone-400">
        <span id="duration-read">{`${readingTime} min read`}</span>
        <span id="dash" className="h-[2px] w-10 bg-stone-400"></span>
        <span id="date">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
    </article>
  )
}
