import { useSearch } from '@tanstack/react-router'
import { FEED_ITEM_TYPE } from '@/types/feed'
import { HomeFeedTabs } from '@/components/home-feed-tabs'
import { Tabs } from '@/components/ui/tabs'
import { UserDetails } from '@/components/user-details'

export function FeedLayout({ children }: { children: React.ReactNode }) {
  const search = useSearch({ from: '/{-$locale}/_guest/' })
  const feedTypeParam = search.feedType || FEED_ITEM_TYPE.rooms

  return (
    <Tabs
      value={feedTypeParam}
      className="text-white h-screen flex items-center"
    >
      <HomeFeedTabs />
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div>{children}</div>

        <UserDetails />
      </div>
    </Tabs>
  )
}
