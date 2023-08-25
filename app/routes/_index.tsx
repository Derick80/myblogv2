import type { V2_MetaFunction } from '@remix-run/react'
import { useLoaderData } from '@remix-run/react'
import { useCategories } from '~/utilities'

import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getAllPostsV1 } from '~/server/post.server'
import BlogPreviewV2 from '~/components/v3-components/blog-ui/blog-post/blog-preview_v2'
import SeparatorV2 from '~/components/v3-components/separator_v2'
import CategoryContainer from '~/components/v3-components/blog-ui/category_v2'
import ContactWidget from '~/components/v3-components/contact-widget'
import ScrollingBanner from '~/components/scroll-banner_v2'
export const meta: V2_MetaFunction = () => {
  return [
    { title: `Derick's Blog` },
    { name: 'description', content: 'A new Remix app' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
}

export async function loader({ request }: LoaderArgs) {
  const posts = await getAllPostsV1(5)
  if (!posts) throw new Error('No posts found')

  return json({ posts })
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()
  const categories = useCategories()

  return (
    <div className='md:gap-38 flex w-full items-center flex-col gap-28'>
      <div className='flex w-full flex-col items-center gap-10 md:gap-20'>
        {/* probably remove dive around the headings if I don't change the font */}
        <div className='flex flex-col w-full items-center gap-20 '>
          <h1>Welcome to DerickCHoskinson.com </h1>
          <ScrollingBanner />
          <h3>
            <b>Showcasing</b> my projects as a novice web developer, my blog
            about web development and genetics, and my curriculum vitae as a
            Geneticist
          </h3>
        </div>
        <div className='flex w-full flex-col gap-2'>
          <SeparatorV2 orientation='horizontal' />
          <div className='mb-4 flex w-full flex-row items-center gap-2'>
            <h6 className='text-left'>Browse the Blog by </h6>
            <h1>Category</h1>
          </div>
          {categories && <CategoryContainer categories={categories} />}
        </div>
      </div>

      <div className='flex w-full flex-col gap-2'>
        <SeparatorV2 orientation='horizontal' />
        <div className='mb-4 flex w-full flex-row items-center gap-2'>
          <h6 className='text-left'>Get started with the</h6>
          <h1>Latest Posts</h1>
        </div>
        <div className='flex w-full flex-col items-center gap-5'>
          {posts.map((post) => (
            <BlogPreviewV2 key={post.id} post={post} />
          ))}
        </div>
        <div className='flex w-full flex-col gap-2'>
          <SeparatorV2 orientation='horizontal' />
          <div className='mb-4 flex w-full flex-row items-center gap-2'>
            <h6 className='text-left'>Want to </h6>
            <h1>Connect with me?</h1>
          </div>
        </div>
        <ContactWidget />
      </div>
    </div>
  )
}
