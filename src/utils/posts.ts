import { getPayload } from 'payload'
import config from '@payload-config'

export default async function getPosts(limit: number) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const posts = await payload.find({
    collection: 'posts',
    limit: limit,
    depth: 1,
  })
  // console.log(posts.docs)

  return posts
}
