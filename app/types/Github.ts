export interface User {
  avatar_url: string | null
  bio: string | null
  blog: string | null
  company: string | null
  email: string | null
  events_url: string
  followers: number
  followers_url: string
  following: number
  following_url: string
  gists_url: string | null
  gravatar_url: string | null
  hireable: boolean | null
  html_url: string
  id: number
  location: string | null
  login: string
  name: string | null
  node_id: string
  organizations_url: string | null
  public_gists: number
  public_repos: number
  received_events_url: string
  repos_url: string
  site_admin: boolean
  starred_url: string
  subscriptions_url: string
  twitter_username: string | null
  type: string
  updated_at: string
  url: string
  user_view_type: string
}
