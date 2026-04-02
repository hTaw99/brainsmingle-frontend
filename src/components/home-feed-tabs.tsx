import { FEED_ITEM_TYPE } from '#/types/feed'
import { Link } from '@tanstack/react-router'
import { TabsList, TabsTrigger } from './ui/tabs'

const feedTypes = [
  {
    label: 'Rooms',
    value: FEED_ITEM_TYPE.rooms,
  },
  {
    label: 'Posts',
    value: FEED_ITEM_TYPE.posts,
  },
]

export function HomeFeedTabs() {
  return (
    <TabsList>
      {feedTypes.map((feedType) => (
        <Link
          key={feedType.value}
          to={'/'}
          search={{ feedType: feedType.value }}
        >
          <TabsTrigger value={feedType.value}>{feedType.label}</TabsTrigger>
        </Link>
      ))}
    </TabsList>
  )
}
