import { z } from 'zod'

import { getFeedsQueryOptions } from '@/api/feeds/get-feeds'
import { FEED_ITEM_TYPE } from '@/types/feed'
import { createFileRoute } from '@tanstack/react-router'
import { FeedsList } from '@/components/feeds-list'
import { getIntlayer } from 'intlayer'
import { FeedLayout } from '@/components/feed-layout'
import { Pending } from '@/components/pending'

const feedSearchSchema = z.object({
  feedType: z
    .enum([FEED_ITEM_TYPE.rooms, FEED_ITEM_TYPE.posts])
    .optional()
    .catch(undefined),
})

export const Route = createFileRoute('/{-$locale}/_guest/')({
  validateSearch: feedSearchSchema,

  loaderDeps(opts) {
    return { feedType: opts.search.feedType }
  },

  pendingComponent: () => (
    <FeedLayout>
      <Pending />
    </FeedLayout>
  ),
  pendingMs: 0,

  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      getFeedsQueryOptions({
        page: 1,
        limit: 10,
        feedType: deps.feedType ?? FEED_ITEM_TYPE.rooms,
      }),
    )
  },

  head: ({ params }) => {
    const { locale } = params
    const content = getIntlayer('app', locale)

    return {
      meta: [
        {
          title: content.seo.home.title,
        },
      ],
    }
  },

  component: RouteComponent,
})

function RouteComponent() {
  return (
    <FeedLayout>
      <FeedsList />
    </FeedLayout>
  )
}
