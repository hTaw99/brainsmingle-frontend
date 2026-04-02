import { FEED_ITEM_TYPE } from '@/types/feed'
import { useIntlayer } from 'react-intlayer'

import { LocalizedLink } from '@/components/localized-link'

import { TabsList, TabsTrigger } from './ui/tabs'

export function HomeFeedTabs() {
  const content = useIntlayer('app')

  const feedTypes = [
    {
      label: content.feed.rooms,
      value: FEED_ITEM_TYPE.rooms,
    },
    {
      label: content.feed.posts,
      value: FEED_ITEM_TYPE.posts,
    },
  ]

  return (
    <TabsList>
      {feedTypes.map((feedType) => (
        <LocalizedLink
          key={feedType.value}
          to="/"
          search={{ feedType: feedType.value }}
        >
          <TabsTrigger value={feedType.value}>{feedType.label}</TabsTrigger>
        </LocalizedLink>
      ))}
    </TabsList>
  )
}
