import { Fiber } from './ReactInternalType'

function initializeUpdateQueue(fiber: Fiber) {
  const queue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
    },
    callbacks: null,
  }
  fiber.updateQueue = queue
}

export { initializeUpdateQueue }
