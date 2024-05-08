import pkg from '@markdoc/markdoc'
const { parse, transform } = pkg
import * as fsp from 'node:fs/promises'
import fs from 'fs'
import nodepath from 'path'
import path from 'path'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import remarkSlug from 'remark-slug'
import remarkAutolinkHeader from 'remark-autolink-headings/index'
import rehypePrettyCode from 'rehype-pretty-code'
import { bundleMDX } from 'mdx-bundler'

export type PostFrontMatter = {
    code: string
    slug: string
    title: string
    author: string
    description: string
    datePublished: string
    published: boolean
    categories: string[]
}

// may retire this function soon.
export const getFile = async (slug: string) => {
    const relativePath = 'app/content/blog/'
    const contentPath = nodepath.resolve(
        process.cwd(),
        relativePath,
        slug + '.mdx'
    )

    const content = fs.readFileSync(contentPath, { encoding: 'utf-8' })
    // return the frontmatter and the content
    const frontmatter = content.split('---')[1]
    const content1 = content.split('---')[2]

    return { frontmatter, content }
}
const globals = {
    '@mdx-js/react': {
        varName: 'MdxJsReact',
        namedExports: ['useMDXComponents'],
        defaultExport: false
    }
}



// Best way so farf to get an Mdx fiel
export async function getMDXFileContent(slug: string) {
    const basePath = `${process.cwd()}/app/content/blog/`
    const source = await fsp.readFile(
        path.join(`${basePath}/${slug}.mdx`),
        'utf-8'
    )
    // bundle the mdx file

    const data = await bundleMDX<PostFrontMatter>({
        source,

        cwd: `${process.cwd()}/app/content/blog`,
        mdxOptions: (options) => ({
            remarkPlugins: [
                ...(options.remarkPlugins ?? []),
                remarkSlug,
                [remarkAutolinkHeader, { behavior: 'wrap' }],
                remarkGfm
            ],
            rehypePlugins: [
                ...(options.rehypePlugins ?? []),
                [rehypePrettyCode, options = {
                    grid: false,

                }],
                rehypeHighlight
            ]
        }),

        grayMatterOptions: (options) => {
      options.excerpt = true

            return {
                ...options,
                        providerImportSource: '@mdx-js/react',

    }
     }
    })

    return data
}



// kcd types for later
// const re = /\b([-\w]+(?![^{]*}))(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g
// export const MdxSchema = z.object({
//   code: z.string().optional(),
//   frontmatter: z.object({
//     slug: z.string(),
//     title: z.string(),
//     description: z.string().optional().nullable().default(null),
//     tags: z.string().optional().nullable(),
//     img: z.string().optional().nullable().default(null),
//     timestamp: z.string().optional().nullable().default(null),
//     published: z.boolean().optional().default(false),
//     translations: z
//       .array(
//         z.object({
//           lang: z.string(),
//           href: z.string(),
//           label: z.string(),
//         }),
//       )
//       .optional(),
//   }),
// })
