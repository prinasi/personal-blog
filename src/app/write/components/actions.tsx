import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useWriteStore } from '../stores/write-store'
import { usePreviewStore } from '../stores/preview-store'
import { usePublish } from '../hooks/use-publish'

export function WriteActions() {
	const { loading, mode, form, loadBlogForEdit, originalSlug, updateForm } = useWriteStore()
	const { openPreview } = usePreviewStore()
	const { isAuth, setAuthToken, onPublish, onDelete } = usePublish()
	const [saving, setSaving] = useState(false)
	const [tokenDialogOpen, setTokenDialogOpen] = useState(false)
	const [token, setToken] = useState('')
	const mdInputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()

	const handleImportOrPublish = () => {
		if (!isAuth) {
			setTokenDialogOpen(true)
		} else {
			onPublish()
		}
	}

	const handleSaveToken = () => {
		try {
			setAuthToken(token)
			setToken('')
			setTokenDialogOpen(false)
			toast.success('令牌已保存到当前浏览器会话')
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '令牌无效')
		}
	}

	const handleCancel = () => {
		if (!window.confirm('放弃本次修改吗？')) {
			return
		}
		if (mode === 'edit' && originalSlug) {
			router.push(`/blog/${originalSlug}`)
		} else {
			router.push('/')
		}
	}

	const buttonText = isAuth ? (mode === 'edit' ? '更新' : '发布') : '输入 Token'

	const handleDelete = () => {
		if (!isAuth) {
			toast.info('请先导入密钥')
			return
		}
		const confirmMsg = form?.title ? `确定删除《${form.title}》吗？该操作不可恢复。` : '确定删除当前文章吗？该操作不可恢复。'
		if (window.confirm(confirmMsg)) {
			onDelete()
		}
	}

	const handleImportMd = () => {
		mdInputRef.current?.click()
	}

	const handleMdFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		try {
			const text = await file.text()
			updateForm({ md: text })
			toast.success('已导入 Markdown 文件')
		} catch (error) {
			toast.error('导入失败，请重试')
		} finally {
			if (e.currentTarget) e.currentTarget.value = ''
		}
	}

	return (
		<>
			<input ref={mdInputRef} type='file' accept='.md' className='hidden' onChange={handleMdFileChange} />
			{tokenDialogOpen && (
				<div className='fixed inset-0 z-50 grid place-items-center bg-black/35 p-4' onMouseDown={() => setTokenDialogOpen(false)}>
					<div className='w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl' onMouseDown={e => e.stopPropagation()}>
						<h2 className='text-lg font-semibold'>连接 GitHub</h2>
						<p className='text-secondary mt-2 text-sm leading-6'>
							输入仅用于当前浏览器会话的 Fine-grained Personal Access Token。它需要当前仓库的 Contents: Read and write 权限。
						</p>
						<input
							autoFocus
							type='password'
							placeholder='github_pat_...'
							className='mt-4 w-full rounded-lg border px-3 py-2 text-sm'
							value={token}
							onChange={e => setToken(e.target.value)}
							onKeyDown={e => {
								if (e.key === 'Enter') handleSaveToken()
							}}
						/>
						<div className='mt-4 flex justify-end gap-2'>
							<button className='rounded-lg border px-4 py-2 text-sm' onClick={() => setTokenDialogOpen(false)}>
								取消
							</button>
							<button className='brand-btn' onClick={handleSaveToken}>
								保存 Token
							</button>
						</div>
					</div>
				</div>
			)}

			<ul className='absolute top-4 right-6 flex items-center gap-2'>
				{mode === 'edit' && (
					<>
						<motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className='flex items-center gap-2'>
							<div className='rounded-lg border bg-blue-50 px-4 py-2 text-sm text-blue-700'>编辑模式</div>
						</motion.div>

						<motion.button
							initial={{ opacity: 0, scale: 0.6 }}
							animate={{ opacity: 1, scale: 1 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-100'
							disabled={loading}
							onClick={handleDelete}>
							删除
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleCancel}
							disabled={saving}
							className='bg-card rounded-xl border px-4 py-2 text-sm'>
							取消
						</motion.button>
					</>
				)}

				<motion.button
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='bg-card rounded-xl border px-4 py-2 text-sm'
					disabled={loading}
					onClick={handleImportMd}>
					导入 MD
				</motion.button>
				<motion.button
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='bg-card rounded-xl border px-6 py-2 text-sm'
					disabled={loading}
					onClick={openPreview}>
					预览
				</motion.button>
				<motion.button
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='brand-btn px-6'
					disabled={loading}
					onClick={handleImportOrPublish}>
					{buttonText}
				</motion.button>
			</ul>
		</>
	)
}
