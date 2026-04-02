import type { ValueOf } from '@/types/utils'
import type { TUser } from './user'

export const FEED_ITEM_TYPE = {
  posts: 'posts',
  rooms: 'rooms',
} as const

export const FEED_ITEM_STATUS = {
  upcoming: 'upcoming',
} as const

export const FEED_ITEM_ROOM_TYPE = {
  videoCall: 'video_call',
  room: 'room',
} as const

export type TFeed = {
  id: number
  publicId: string
  title: string
  description: string
  startsAt: string
  timezone: string
  durationInMin: number
  type: ValueOf<typeof FEED_ITEM_TYPE>
  status: ValueOf<typeof FEED_ITEM_STATUS>
  roomType: ValueOf<typeof FEED_ITEM_ROOM_TYPE>
  organizer: TUser
  attendeeCount: number
  isUserRegistered: boolean
  isUserApproved: boolean
  isUserOrganizer: boolean
  isDiscoverable: boolean
  isPaid: boolean
  price: string
  language: string
}
