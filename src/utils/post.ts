import { getPayload } from 'payload'
import config from '@payload-config'

export default async function getPost(paramslug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const post = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: paramslug,
      },
    },
    limit: 1,
  })
  // console.log(post.docs[0])

  return post.docs[0]
}
