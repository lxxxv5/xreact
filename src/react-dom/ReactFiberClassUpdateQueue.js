function initializeUpdateQueue(fiber) {
  const queue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      hiddenCallbacks: null,
    },
    callbacks: null,
  }
  fiber.updateQueue = queue
}

export { initializeUpdateQueue }
