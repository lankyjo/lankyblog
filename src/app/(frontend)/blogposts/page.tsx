import { BlogCards } from '@/components/blogssection/BlogSection'
import getPosts from '@/utils/posts'

export async function generateMetadata() {
  return {
    title: 'Blogs, All of them',
    description: 'These are all of my Blogs. Enjoy!',
  }
}

type RichTextNode = {
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

export default async function BlogPosts() {
  const posts = await getPosts(18)

  return (
    <section className="container mx-auto my-5 px-5 md:px-0 space-y-10">
      <div className="font-ghoip text-3xl tracking-wide">
        <h3 className="text-cherry">All Blogs</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {posts.docs.map((post, index) => {
          const contentText = extractTextFromRichText(post.content.root)
          const imageUrl =
            typeof post.image === 'string' ? post.image : (post.image?.url ?? '/fonts/image_fx.js')

          return (
            <BlogCards
              key={index}
              title={post.title}
              category={post.category}
              date={post.createdAt}
              url={post.slug}
              content={contentText}
              image={imageUrl}
            />
          )
        })}
      </div>
      <div className="flex justify-center">
        <button className="py-2 px-5 bg-cherry text-ivory">Load More</button>
      </div>
    </section>
  )
}
