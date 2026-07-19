import blogIndex from '@/../public/blogs/index.json'
import type { BlogIndexItem } from '@/app/blog/types'
import BlogArticlePage from './blog-article-page'

export const dynamicParams = false

export function generateStaticParams() {
	return (blogIndex as BlogIndexItem[])
		.filter(item => item.slug)
		.map(item => ({ id: item.slug }))
}

export default function Page() {
	return <BlogArticlePage />
}
