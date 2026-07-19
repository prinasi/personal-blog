'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { motion } from 'motion/react'
import { BlogPreview } from '@/components/blog-preview'
import { loadBlog, type BlogConfig } from '@/lib/load-blog'
import { useReadArticles } from '@/hooks/use-read-articles'
import { sitePath } from '@/lib/site-path'

export default function BlogArticlePage() {
	const params = useParams() as { id?: string | string[] }
	const slug = Array.isArray(params?.id) ? params.id[0] : params?.id || ''
	const router = useRouter()
	const { markAsRead } = useReadArticles()
	const [blog, setBlog] = useState<{ config: BlogConfig; markdown: string; cover?: string } | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let cancelled = false
		async function run() {
			if (!slug) return
			try {
				setLoading(true)
				const blogData = await loadBlog(slug)
				if (!cancelled) {
					setBlog(blogData)
					setError(null)
					markAsRead(slug)
				}
			} catch (error: unknown) {
				if (!cancelled) setError(error instanceof Error ? error.message : '加载失败')
			} finally {
				if (!cancelled) setLoading(false)
			}
		}
		run()
		return () => {
			cancelled = true
		}
	}, [slug, markAsRead])

	const title = useMemo(() => blog?.config.title || slug, [blog?.config.title, slug])
	const date = useMemo(() => dayjs(blog?.config.date).format('YYYY年 M月 D日'), [blog?.config.date])

	if (!slug) return <div className='text-secondary flex h-full items-center justify-center text-sm'>无效的链接</div>
	if (loading) return <div className='text-secondary flex h-full items-center justify-center text-sm'>加载中...</div>
	if (error) return <div className='flex h-full items-center justify-center text-sm text-red-500'>{error}</div>
	if (!blog) return <div className='text-secondary flex h-full items-center justify-center text-sm'>文章不存在</div>

	return (
		<>
			<BlogPreview
				markdown={blog.markdown}
				title={title}
				tags={blog.config.tags || []}
				date={date}
				summary={blog.config.summary}
				cover={blog.cover ? sitePath(blog.cover) : undefined}
				slug={slug}
			/>
			<motion.button
				initial={{ opacity: 0, scale: 0.6 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => router.push(`/write/${slug}`)}
				className='absolute top-20 right-6 rounded-lg border bg-white/60 px-4 py-2 text-sm backdrop-blur-sm max-sm:hidden'>
				编辑
			</motion.button>
		</>
	)
}
