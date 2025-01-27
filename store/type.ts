interface UserState {
  calls: number
  getCalls: () => void
  increaseCalls: () => void
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  loginUser: (data: {
    email: string
    password: string
  }) => Promise<{ success: boolean; message?: string }>
  logoutUser: () => void
  signupUser: (data: {
    username: string
    password: string
  }) => Promise<{ success: boolean; message?: string }>
  checkAuth: () => void
}

interface ContentState {
  resetState: () => void
  calls: number
  loadMore: boolean
  getCalls: () => void
  increaseCalls: () => void
  content: any[]
  loading: boolean
  error: string | null
  getContent: () => Promise<void>
  deleteContent: (id: string) => Promise<void>
  createContent: (contentData: Object) => Promise<void>
  hasMore: boolean
  page: number
  getChunks: (reset?: boolean) => Promise<void>
  refetchContent?: () => Promise<void>
}

export type {UserState, ContentState}