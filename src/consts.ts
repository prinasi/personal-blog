export const INIT_DELAY = 0.3
export const ANIMATION_DELAY = 0.1
export const CARD_SPACING = 36
export const CARD_SPACING_SM = 24

export const GITHUB_CONFIG = {
	OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER || '',
	REPO: process.env.NEXT_PUBLIC_GITHUB_REPO || '',
	BRANCH: process.env.NEXT_PUBLIC_GITHUB_BRANCH || 'main'
} as const
