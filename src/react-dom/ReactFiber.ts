function FiberNode(tag, pendingProps) {
  this.tag = tag
  this.type = null
  this.stateNode = null
  this.memoizedState = null
  this.alternate = null
  this.pendingProps = pendingProps
  this.memoizedProps = null
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
  return workInProgress
}

export { createHostRootFiber, createWorkInProgress }
