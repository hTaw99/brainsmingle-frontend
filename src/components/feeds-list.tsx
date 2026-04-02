import { useGetFeeds } from '@/api/get-feeds'
import { FEED_ITEM_TYPE } from '@/types/feed'
import { useSearch } from '@tanstack/react-router'

export const FeedsList = () => {
  const search = useSearch({ from: '/_guest/' })

  const { data: feeds } = useGetFeeds({
    page: 1,
    limit: 10,
    feedType: search.feedType ?? FEED_ITEM_TYPE.rooms,
  })

  return (
    <ul className="flex flex-col gap-4">
      {feeds.data.items.map((feed) => (
        <li className="border border-white/10 p-4 rounded-md" key={feed.id}>
          {feed.title}
        </li>
      ))}
    </ul>
  )
}
