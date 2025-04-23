import getPosts from '@/utils/posts'
import CarouselComp from './CarouselComp'
import { Post } from '@/payload-types'

export default async function CarouselServer() {
  const posts = await getPosts(4)

  const normalizedPosts = posts.docs.map((post: Post) => {
    const imageUrl =
      typeof post?.image === 'object' && post?.image
        ? post.image.url || ''
        : typeof post?.image === 'string'
          ? post.image
          : ''

    return {
      title: post.title,
      image: imageUrl,
      category: post.category,
      slug: post.slug,
    }
  })

  return <CarouselComp posts={normalizedPosts} />
}
