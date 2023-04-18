import { NavLink } from '@remix-run/react'
import { Post } from '~/server/schemas/post-schema'

export default function Tags ({ categories }: { categories: Post['categories'] }) {

    return (
        <div
            className='flex flex-row gap-2 border-2  border-purple-500'
        >
        <div
            className='flex flex-row gap-2'
        >
            { categories.map(category => (
                <NavLink to={ `/blog/${ category.value }` }
                    className='border-2'
                    key={ category.id }
                >{ category.value }</NavLink>
            )) }
        </div>
        </div>
    )
}
