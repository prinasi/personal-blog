import blogIndex from '@/../public/blogs/index.json'
import type { BlogIndexItem } from '@/app/blog/types'
import EditBlogPage from './edit-blog-page'

export const dynamicParams = false

export function generateStaticParams() {
	return (blogIndex as BlogIndexItem[])
		.filter(item => item.slug)
		.map(item => ({ slug: item.slug }))
}

export default function Page() {
	return <EditBlogPage />
}
