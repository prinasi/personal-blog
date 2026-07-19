const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') || ''

export function sitePath(path: string): string {
	if (!path || /^(?:https?:)?\/\//.test(path) || path.startsWith('data:') || path.startsWith('blob:')) {
		return path
	}

	return `${basePath}${path.startsWith('/') ? path : `/${path}`}`
}
