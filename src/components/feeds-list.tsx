import { useGetFeeds } from '@/api/feeds/get-feeds'
import { FEED_ITEM_TYPE } from '@/types/feed'
import { useSearch } from '@tanstack/react-router'
import { useIntlayer } from 'react-intlayer'

export const FeedsList = () => {
  const search = useSearch({ from: '/{-$locale}/_guest/' })
  const content = useIntlayer('app')

  const isRooms = search.feedType === FEED_ITEM_TYPE.rooms

  const { data: feeds } = useGetFeeds({
    page: 1,
    limit: 10,
    feedType: search.feedType ?? FEED_ITEM_TYPE.rooms,
  })

  if (!feeds.data.items.length)
    return (
      <div className="text-white/50 text-sm mt-8">
        {content.feed.notFound({
          name: isRooms ? content.feed.rooms : content.feed.posts,
        })}
      </div>
    )

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
