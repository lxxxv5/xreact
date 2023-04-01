function FiberNode(tag) {
  this.tag = tag
  this.type = null
  this.stateNode = null
  this.memoizedState = null
  this.alternate = null
}

function createFiber(tag) {
  return new FiberNode(tag)
}

function createHostRootFiber(tag) {
  return createFiber(tag)
}

function createWorkInProgress(current) {
  const workInProgress = createFiber(current.tag)
  workInProgress.alternate = current
  current.alternate = workInProgress
}

exports.createHostRootFiber = createHostRootFiber
exports.createWorkInProgress = createWorkInProgress
