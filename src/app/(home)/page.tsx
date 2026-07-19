import Link from 'next/link'
import siteContent from '@/config/site-content.json'

export default function Home() {
	return (
		<section className='mx-auto flex min-h-[calc(100vh-80px)] max-w-3xl flex-col justify-center px-6 py-16'>
			<p className='text-secondary text-sm'>{siteContent.meta.username}</p>
			<h1 className='mt-3 text-4xl font-semibold'>{siteContent.meta.title}</h1>
			<p className='text-secondary mt-5 max-w-xl leading-7'>{siteContent.meta.description}</p>
			<div className='mt-8 flex items-center gap-3'>
				<Link href='/blog' className='brand-btn'>
					浏览文章
				</Link>
				<Link href='/write' className='rounded-lg border px-4 py-2 text-sm hover:bg-white/50'>
					写文章
				</Link>
			</div>
		</section>
	)
}
