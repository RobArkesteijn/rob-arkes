import type { User } from '@/types/Github'

export default defineCachedEventHandler(async () => {
  const data = await $fetch<User>('https://api.github.com/users/RobArkesteijn')

  return {
    ...data,
  }
}, {
  base: 'github-user',
  getKey: () => 'github-user',
  shouldBypassCache: () => false,
  maxAge: 1000 * 24 * 60 * 60,
  staleMaxAge: 1000 * 24 * 7 * 60 * 60,
})
