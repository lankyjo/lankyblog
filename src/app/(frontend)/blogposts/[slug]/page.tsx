import getPost from '@/utils/post'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Image from 'next/image'
import { Skeleton } from '@mantine/core'
import { Metadata } from 'next'
import getPosts from '@/utils/posts'
import { BlogCards } from '@/components/blogssection/BlogSection'

interface RichTextNode {
  type: string
  version?: number
  text?: string
  children?: RichTextNode[]
  direction?: 'ltr' | 'rtl' | null
  format?: '' | 'left' | 'right' | 'center' | 'justify' | string
  indent?: number
}

function extractTextFromRichText(node: RichTextNode): string {
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

interface SlugProp {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: SlugProp): Promise<Metadata> {
  const post = await getPost(params.slug)

  const imageUrl = typeof post.image === 'string' ? post.image : post.image?.url || ''

  return {
    title: `${post.category} on ${post.title}`,
    description: post.title,
    openGraph: {
      title: `${post.category} on ${post.title}`,
      description: post.title,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.category} on ${post.title}`,
      description: post.title,
      images: [imageUrl],
    },
  }
}

export default async function Blogpost({ params }: SlugProp) {
  const post = await getPost(params.slug)
  const imageUrl = typeof post.image === 'string' ? post.image : post.image?.url
  const posts = await getPosts(3)

  return (
    <article className="container mx-auto px-5 md:px-0 space-y-5">
      <p className="text-center underline">{post.category}</p>
      <h2 className="text-center text-4xl font-bold">{post.title}</h2>
      <div className="flex justify-center items-center gap-x-3 text-stone-400">
        <span id="duration-read">3 min read</span>
        <span id="dash" className="h-[2px] w-10 bg-stone-400"></span>
        <span id="date">
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>

      <div className="aspect-square max-w-8xl w-full relative mx-auto">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="absolute inset-0 object-cover object-center"
          />
        ) : (
          <Skeleton width="100%" height="100%" className="absolute inset-0" />
        )}
      </div>

      <div className="mx-auto prose max-w-4xl py-10">
        <div className="relative">
          <div className="first-letter:text-8xl first-letter:leading-[0.6] first-letter:font-bold first-letter:text-cherry first-letter:float-left first-letter:mr-4 first-letter:mt-1">
            <RichText data={post.content as SerializedEditorState} />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-cherry text-4xl font-ghoip mb-5">Recent Posts</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.docs
            .filter((recentPost) => recentPost.slug !== params.slug) // Exclude current post
            .map((recentPost) => {
              const imageUrl =
                typeof recentPost.image === 'object' && recentPost.image
                  ? recentPost.image.url || ''
                  : typeof recentPost.image === 'string'
                    ? recentPost.image
                    : ''

              const contentText = extractTextFromRichText(recentPost.content.root)

              return (
                <BlogCards
                  key={recentPost.id}
                  image={imageUrl}
                  title={recentPost.title}
                  category={recentPost.category}
                  date={recentPost.createdAt}
                  url={recentPost.slug}
                  content={contentText}
                />
              )
            })}
        </div>
      </div>
    </article>
  )
}
