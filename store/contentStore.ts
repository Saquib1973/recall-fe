import { create } from 'zustand'
import axios from 'axios'
import { env } from '@/utils/config'
import { LS } from '@/utils/helper'

interface ContentState {
  content: any[]
  loading: boolean
  loadMore: boolean
  error: string | null
  page: number
  hasMore: boolean
  getChunks: () => Promise<void>
  createContent: (contentData: object) => Promise<void>
  deleteContent: (contentId: string) => Promise<void>
  resetState: () => void
}

export const useContent = create<ContentState>((set, get) => ({
  content: [],
  loading: false,
  loadMore: false,
  error: null,
  page: 1,
  hasMore: true,

  getChunks: async () => {
    if (get().loadMore || !get().hasMore) return
    set({ loadMore: true })

    try {
      const response = await axios.get(
        `${env.BACKEND_URL}/content/chunk?page=${get().page}`,
        { headers: { authorization: LS.getItem('recall_auth_token') } }
      )

      const newContent = response.data.content
      const limit = get().page !== 1 ? 10 : 20

      set({
        content: [...get().content, ...newContent],
        page: get().page + 1,
        hasMore: newContent.length === limit,
        loadMore: false,
      })
    } catch (error) {
      set({ error: 'Failed to fetch content', loadMore: false })
    }
  },

  createContent: async (contentData) => {
    set({ loading: true })
    try {
      await axios.post(`${env.BACKEND_URL}/content`, contentData, {
        headers: { authorization: LS.getItem('recall_auth_token') },
      })
      set({ loading: false })
      get().resetState()
      await get().getChunks()
    } catch (error) {
      set({ loading: false, error: 'Failed to create content' })
    }
  },

  deleteContent: async (contentId) => {
    try {
      await axios.delete(env.BACKEND_URL + '/content', {
        data: { contentId },
        headers: { authorization: LS.getItem('recall_auth_token') },
      })
      get().resetState()
      await get().getChunks()
    } catch (error) {
      set({ error: 'Failed to delete content' })
    }
  },

  resetState: () => set({ content: [], page: 1, hasMore: true }),
}))
