import { z } from 'zod'
import React from 'react'

import { getFeedsQueryOptions } from '@/api/get-feeds'
import { FEED_ITEM_TYPE } from '@/types/feed'
import { createFileRoute } from '@tanstack/react-router'
import { HomeFeedTabs } from '#/components/home-feed-tabs'
import { FeedsList } from '@/components/feeds-list'
import { Tabs } from '@/components/ui/tabs'
import { UserDetails } from '@/components/user-details'

const feedSearchSchema = z.object({
  feedType: z
    .enum([FEED_ITEM_TYPE.rooms, FEED_ITEM_TYPE.posts])
    .optional()
    .catch(undefined),
})

function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const search = Route.useSearch()
  const feedTypeParam = search.feedType || FEED_ITEM_TYPE.rooms

  return (
    <Tabs
      value={feedTypeParam}
      className="text-white h-screen flex items-center"
    >
      <HomeFeedTabs />
      {children}
      <UserDetails />
    </Tabs>
  )
}

export const Route = createFileRoute('/_guest/')({
  validateSearch: feedSearchSchema,

  loaderDeps(opts) {
    return { feedType: opts.search.feedType }
  },

  pendingComponent: () => (
    <FeedLayout>
      <div>Loading...</div>
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

  head: ({ match }) => {
    const searchParam = match.search.feedType || FEED_ITEM_TYPE.rooms

    return {
      meta: [
        {
          title: `Home-${searchParam} | BrainsMingle`,
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
