import '@/styles/globals.css'

import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import siteContent from '@/config/site-content.json'

const {
	meta: { title, description },
	theme
} = siteContent

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title,
		description
	},
	twitter: {
		title,
		description
	}
}

const htmlStyle = {
	'--color-brand': theme.colorBrand,
	'--color-primary': theme.colorPrimary,
	'--color-secondary': theme.colorSecondary,
	'--color-brand-secondary': theme.colorBrandSecondary,
	'--color-bg': theme.colorBg,
	'--color-border': theme.colorBorder,
	'--color-card': theme.colorCard,
	'--color-article': theme.colorArticle
} as CSSProperties

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en' suppressHydrationWarning style={htmlStyle}>
			<body>
				<div className='min-h-screen'>
					<header className='relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-5'>
						<Link href='/' className='text-lg font-semibold'>
							{title}
						</Link>
						<nav className='flex items-center gap-5 text-sm'>
							<Link href='/blog' className='hover:text-brand'>
								文章
							</Link>
							<Link href='/write' className='brand-btn'>
								写文章
							</Link>
						</nav>
					</header>
					{children}
				</div>
			</body>
		</html>
	)
}
