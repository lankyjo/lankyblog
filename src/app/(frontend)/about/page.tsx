import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Image from 'next/image'
import { Skeleton } from '@mantine/core'

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const about = await payload.findGlobal({
    slug: 'about',
  })

  const imageUrl = typeof about.aboutImage === 'string' ? about.aboutImage : about.aboutImage?.url

  return (
    <div className="container mx-auto px-5 md:px-0">
      <div className="aspect-square max-w-4xl w-full relative mx-auto">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="About Image"
            fill
            className="absolute inset-0 object-cover object-center"
          />
        ) : (
          <Skeleton width="100%" height="100%" className="absolute inset-0" />
        )}
      </div>

      <div className="text-center border-b w-fit mx-auto border-b-stone-300 py-8">
        <h3 className="font-bold text-4xl">Hi, I&apos;m Ikeji Joshua</h3>
        <p>FrontEnd developer</p>
      </div>

      <div className="mx-auto prose prose-a:text-cherry max-w-4xl py-10 first-letter:text-7xl typography first-letter:font-bold first-letter:text-cherry first-letter:float-left">
        <RichText data={about.content as SerializedEditorState} />
      </div>
    </div>
  )
}
