'use client'

import Link from 'next/link'
import dayjs from 'dayjs'
import { useBlogIndex } from '@/hooks/use-blog-index'
import { sitePath } from '@/lib/site-path'

export default function BlogPage() {
	const { items, loading } = useBlogIndex()

	return (
		<section className='mx-auto max-w-3xl px-6 py-12'>
			<div className='mb-8 flex items-center justify-between'>
				<h1 className='text-2xl font-semibold'>文章</h1>
				<Link href='/write' className='brand-btn'>
					写文章
				</Link>
			</div>
			{loading && <p className='text-secondary text-sm'>加载中...</p>}
			{!loading && items.length === 0 && <p className='text-secondary text-sm'>暂无文章</p>}
			<div className='divide-y'>
				{items.map(item => (
					<Link key={item.slug} href={`/blog/${item.slug}`} className='flex gap-4 py-5 transition-opacity hover:opacity-70'>
						{item.cover && <img src={sitePath(item.cover)} alt='' className='h-20 w-28 shrink-0 rounded-md object-cover' />}
						<div className='min-w-0'>
							<h2 className='truncate text-base font-medium'>{item.title || item.slug}</h2>
							<p className='text-secondary mt-1 text-sm'>{dayjs(item.date).format('YYYY-MM-DD')}</p>
							{item.summary && <p className='text-secondary mt-2 line-clamp-2 text-sm'>{item.summary}</p>}
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
