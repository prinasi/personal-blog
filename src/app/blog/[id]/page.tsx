import blogIndex from '@/../public/blogs/index.json'
import type { BlogIndexItem } from '@/app/blog/types'
import BlogArticlePage from './blog-article-page'

export const dynamicParams = false

export function generateStaticParams() {
	const params = (blogIndex as BlogIndexItem[]).filter(item => item.slug).map(item => ({ id: item.slug }))

	// `output: 'export'` requires at least one value for every dynamic route.
	// Keep an unlinked placeholder so a brand-new blog with no posts can deploy.
	return params.length > 0 ? params : [{ id: '__placeholder__' }]
}

export default function Page() {
	return <BlogArticlePage />
}
