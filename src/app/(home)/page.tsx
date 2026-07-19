import Link from 'next/link'
import siteContent from '@/config/site-content.json'
import { sitePath } from '@/lib/site-path'

export default function Home() {
	return (
		<section className='relative -mt-20 min-h-[calc(100vh-80px)] overflow-hidden'>
			<div
				aria-hidden='true'
				className='absolute inset-0 bg-cover bg-center bg-no-repeat'
				style={{ backgroundImage: `url(${sitePath('/images/backgrounds/summer-meadow-hero.png')})` }}
			/>
			<div aria-hidden='true' className='absolute inset-0 bg-gradient-to-r from-white/80 via-white/35 to-white/5' />
			<div className='relative mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl flex-col justify-center px-6 py-24'>
				<div className='max-w-xl rounded-3xl bg-white/30 p-8 shadow-sm backdrop-blur-[2px] max-sm:p-6'>
					<p className='text-secondary text-sm'>{siteContent.meta.username}</p>
					<h1 className='mt-3 text-4xl font-semibold tracking-tight max-sm:text-3xl'>{siteContent.meta.title}</h1>
					<p className='text-secondary mt-5 max-w-xl leading-7'>{siteContent.meta.description}</p>
					<div className='mt-8 flex items-center gap-3'>
						<Link href='/blog' className='brand-btn'>
							浏览文章
						</Link>
						<Link href='/write' className='rounded-lg border bg-white/55 px-4 py-2 text-sm shadow-sm backdrop-blur-sm transition-colors hover:bg-white/80'>
							写文章
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
