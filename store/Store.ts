import { create } from 'zustand'
import axios from 'axios'
import { env } from '@/utils/config'
import type { ContentState, UserState } from './type'
import { LS } from '@/utils/helper'

const useAuth = create<UserState>((set, get) => ({
  // Variables
  calls: 0,
  token: null,
  isAuthenticated: false,
  loading: true,

  // Functions
  getCalls: () => {
    console.log('Content API Calls', get().calls)
  },
  increaseCalls: () => {
    set((state) => ({ calls: state.calls + 1 }))
  },
  loginUser: async (data) => {
    get().increaseCalls()
    try {
      const response = await axios.post(env.BACKEND_URL + '/user/signin', {
        username: data.email,
        password: data.password,
      })

      if (response.data.token) {
        LS.setItem('recall_auth_token', response.data.token)
        set({
          token: response.data.token,
          isAuthenticated: true,
          loading: false,
        })

        return { success: true }
      } else {
        console.error('Login failed: No token received')
        return { success: false, message: 'No token received' }
      }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, message: 'An error occurred. Please try again.' }
    }
  },

  signupUser: async (data: {
    username: string
    password: string
  }): Promise<{ success: boolean; message?: string }> => {
    get().increaseCalls()
    try {
      const response = await axios.post(env.BACKEND_URL + '/user/signup', {
        username: data.username,
        password: data.password,
      })

      if (response.status === 200) {
        console.log('Signup successful:', response.data.message)
        return { success: true, message: response.data.message }
      } else {
        return { success: false, message: 'Signup failed' }
      }
    } catch (error: any) {
      console.error('Signup failed:', error)
      return {
        success: false,
        message:
          error.response?.data?.message ||
          'An error occurred. Please try again.',
      }
    }
  },

  logoutUser: () => {
    get().increaseCalls()
    LS.removeItem('recall_auth_token')
    set({ token: null, isAuthenticated: false, loading: false })
  },

  checkAuth: () => {
    get().increaseCalls()
    const token = LS.getItem('recall_auth_token')
    if (token) {
      set({ token, isAuthenticated: true, loading: false })
    } else {
      set({ token: null, isAuthenticated: false, loading: false })
    }
  },
}))

const userContext = create((set, get) => {

})

const useContent = create<ContentState>((set, get) => ({
  //variables
  calls: 0,
  content: [],
  loading: false,
  loadMore: false,
  error: null,
  page: 1,
  hasMore: true,
  sharedLink: null,

  //functions
  resetState: () => {
    set({
      content: [],
      page: 1,
      hasMore: true,
      loadMore: false,
      error: null,
    })
  },
  getCalls: () => {
    console.log('Content API Calls', get().calls)
  },
  increaseCalls: () => {
    set((state) => ({ calls: state.calls + 1 }))
  },
  getContent: async () => {
    get().increaseCalls()
    set({ loading: true, error: null })
    try {
      const token = LS.getItem('recall_auth_token')
      const response = await axios.get(env.BACKEND_URL + '/content', {
        headers: {
          authorization: `${token}`,
        },
      })
      set({ content: response.data.content, loading: false })
    } catch (error) {
      console.error('Error fetching content:', error)
      set({ error: 'Failed to fetch content', loading: false })
    }
  },
  getChunks: async (reset) => {
    get().increaseCalls()
    const { loadMore } = get()
    if (loadMore) return // Only check loadMore here

    set({ loadMore: true })
    try {
      const currentPage = reset ? 1 : get().page
      const token = LS.getItem('recall_auth_token')
      const response = await axios.get(
        `${env.BACKEND_URL}/content/chunk?page=${currentPage}`,
        { headers: { authorization: `${token}` } }
      )

      set({
        content: reset
          ? response.data.content
          : [...get().content, ...response.data.content],
        page: currentPage + 1,
        hasMore: response.data.content.length === (currentPage === 1 ? 20 : 10),
        loadMore: false,
      })
    } catch (error) {
      console.error('Error fetching more content:', error)
      set({ error: 'Failed to fetch more content', loadMore: false })
    }
  },
  deleteContent: async (contentId) => {
    get().increaseCalls()
    try {
      await axios.delete(env.BACKEND_URL + '/content', {
        data: { contentId },
        headers: { authorization: LS.getItem('recall_auth_token') },
      })

      // Reset state and reload fresh content
      set({ content: [], page: 1, hasMore: true })
      get().getChunks(true)
    } catch (error) {
      console.log(error)
      get().getChunks(true)
    }
  },

  createContent: async (contentData) => {
    get().increaseCalls()
    set({ loading: true })
    try {
      const token = LS.getItem('recall_auth_token')
      await axios.post(`${env.BACKEND_URL}/content`, contentData, {
        headers: { authorization: `${token}` },
      })

      set({
        content: [],
        page: 1,
        hasMore: true,
        loading: false,
      })
      await get().getChunks(true)
    } catch (error) {
      console.error('Error creating content:', error)
      set({ loading: false, error: 'Failed to create Recall' })
    }
  },
  shareRecall: async (toggle) => {
    set({ loading: true })
    console.log('Sharing Recall', toggle)

    try {
      const token = LS.getItem('recall_auth_token')
      const shared = await axios.post(
        `${env.BACKEND_URL}/content/share`,
        { share: toggle },
        {
          headers: { authorization: `${token}` },
        }
      )

      console.log(shared)

      if (shared.data && shared.data.link?.hash) {
        set({ sharedLink: shared.data.link.hash })
      } else {
        set({ sharedLink: null }) // Only set to null if there's no link
      }
    } catch (error) {
      console.error('Error sharing recall:', error)
    }

    setTimeout(() => {
      set({ loading: false })
    }, 4000)
  },
  getShareStatus: async () => {
  get().increaseCalls();
  set({ loading: true });

  try {
    const token = LS.getItem('recall_auth_token');
    const response = await axios.get(`${env.BACKEND_URL}/content/share`, {
      headers: { authorization: `${token}` },
    });

    set({ loading: false });

    if (response.data && response.data.link?.hash) {
      set({ sharedLink: response.data.link.hash }); // ✅ Store the fetched link in state
    } else {
      set({ sharedLink: null }); // ✅ If there's no link, clear it
    }

    return response.data;
  } catch (error) {
    set({ loading: false });
    console.error('Error fetching share status:', error);
    return { success: false, message: 'Failed to fetch share status' };
  }
},
}))

export { useAuth, useContent }
