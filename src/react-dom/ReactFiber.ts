import { Fiber } from './ReactInternalType'

function FiberNode(this: Fiber, tag) {
  this.tag = tag
  this.type = null
  this.stateNode = null
  this.memoizedState = null
  this.alternate = null
  this.pendingProps = undefined
  this.memoizedProps = null
  this.child = null
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
  workInProgress.memoizedState = current.memoizedState
  return workInProgress
}

export { createHostRootFiber, createWorkInProgress }
