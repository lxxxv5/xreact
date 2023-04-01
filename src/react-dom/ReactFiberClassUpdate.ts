import { Fiber, Update, UpdateQueue } from './ReactInternalType'

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

function getStateFromUpdate(
  workInProgress: Fiber,
  queue: UpdateQueue,
  update: Update<any>,
  prevState: any
) {
  switch (update.tag) {
    case UpdateState:
      const payload = update.payload
      const partialState = payload
      return Object.assign({}, prevState, partialState)
  }
}

export function processUpdateQueue(workInProgress: Fiber) {
  const queue = workInProgress.updateQueue
  let newState = queue.baseState
  let firstBaseUpdate = queue.firstBaseUpdate
  let lastBaseUpdate = queue.lastBaseUpdate
  let pendingQueue = queue.shared.pending
  // if (pendingQueue !== null) {
  queue.shared.pending = null
  const lastPendingUpdate = pendingQueue
  const firstPendingUpdate = lastPendingUpdate.next
  if (lastBaseUpdate === null) {
    firstBaseUpdate = firstPendingUpdate
  }
  // }
  let update = firstBaseUpdate
  newState = getStateFromUpdate(workInProgress, queue, update, newState)
  workInProgress.memoizedState = newState
}
