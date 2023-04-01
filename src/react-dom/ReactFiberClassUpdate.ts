import { Fiber, Update } from './ReactInternalType'

export const UpdateState = 0

export function createUpdate() {
  const update: Update<any> = {
    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
  }

  return update
}

export function processUpdateQueue(workInProgress: Fiber) {
  // const queue = workInProgress.updateQueue
  // let firstBaseUpdate = queue.firstBaseUpdate
  // let lastBaseUpdate = queue.lastBaseUpdate
  // let pendingQueue = queue.shared.pending
  // if (pendingQueue !== null) {
  //   queue.shared.pending = null
  //   const lastPendingUpdate = pendingQueue
  //   const firstPendingUpdate = lastPendingUpdate.next
  //   if (lastBaseUpdate === null) {
  //     firstBaseUpdate = firstPendingUpdate
  //   }
  // }
}
