import { create } from 'zustand'
import { clearAllAuthCache, getAuthToken as getToken, hasAuth as checkAuth, setAuthToken as persistToken } from '@/lib/auth'
interface AuthStore {
	// State
	isAuth: boolean

	// Actions
	setAuthToken: (token: string) => void
	clearAuth: () => void
	refreshAuthState: () => void
	getAuthToken: () => Promise<string>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
	isAuth: false,

	setAuthToken: (token: string) => {
		persistToken(token)
		set({ isAuth: true })
	},

	clearAuth: () => {
		clearAllAuthCache()
		set({ isAuth: false })
	},

	refreshAuthState: () => {
		set({ isAuth: checkAuth() })
	},

	getAuthToken: async () => {
		const token = await getToken()
		get().refreshAuthState()
		return token
	}
}))

if (typeof window !== 'undefined' && checkAuth()) {
	useAuthStore.setState({ isAuth: true })
}
