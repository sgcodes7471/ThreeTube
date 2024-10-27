import {
  VideoAdded as VideoAddedEvent,
  VideoLiked as VideoLikedEvent,
  VideoViewed as VideoViewedEvent
} from "../generated/Contract/Contract"
import { VideoAdded, VideoLiked, VideoViewed } from "../generated/schema"

export function handleVideoAdded(event: VideoAddedEvent): void {
  let entity = new VideoAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.videoId = event.params.videoId
  entity.cid = event.params.cid
  entity.metadata = event.params.metadata

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVideoLiked(event: VideoLikedEvent): void {
  let entity = new VideoLiked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.videoId = event.params.videoId
  entity.likes = event.params.likes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVideoViewed(event: VideoViewedEvent): void {
  let entity = new VideoViewed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.videoId = event.params.videoId
  entity.views = event.params.views

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
