import { GITHUB_CONFIG } from '@/consts'
import { useAuthStore } from '@/hooks/use-auth'

const GITHUB_TOKEN_CACHE_KEY = 'personal_blog_github_token'

function getTokenFromCache(): string | null {
	if (typeof sessionStorage === 'undefined') return null
	try {
		return sessionStorage.getItem(GITHUB_TOKEN_CACHE_KEY)
	} catch {
		return null
	}
}

function saveTokenToCache(token: string): void {
	if (typeof sessionStorage === 'undefined') return
	try {
		sessionStorage.setItem(GITHUB_TOKEN_CACHE_KEY, token)
	} catch (error) {
		console.error('Failed to save token to cache:', error)
	}
}

function clearTokenCache(): void {
	if (typeof sessionStorage === 'undefined') return
	try {
		sessionStorage.removeItem(GITHUB_TOKEN_CACHE_KEY)
	} catch (error) {
		console.error('Failed to clear token cache:', error)
	}
}

export function clearAllAuthCache(): void {
	clearTokenCache()
}

export function hasAuth(): boolean {
	return !!getTokenFromCache()
}

export function setAuthToken(token: string): void {
	const normalized = token.trim()
	if (!normalized) throw new Error('请输入 GitHub Personal Access Token')
	saveTokenToCache(normalized)
}

/** Returns the token entered by the site owner for the current browser session. */
export async function getAuthToken(): Promise<string> {
	if (!GITHUB_CONFIG.OWNER || !GITHUB_CONFIG.REPO) {
		throw new Error('GitHub Pages 部署配置不完整，请检查 GitHub Actions 工作流中的仓库信息')
	}

	const cachedToken = getTokenFromCache()
	if (cachedToken) {
		return cachedToken
	}

	useAuthStore.getState().clearAuth()
	throw new Error('请先输入 GitHub Personal Access Token')
}
