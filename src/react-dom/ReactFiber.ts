import { ReactElementType } from '../shared/ReactElementType'
import { Fiber } from './ReactInternalType'
import { HostComponent } from './ReactWorkTags'

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

function createFiber(tag): Fiber {
  return new FiberNode(tag)
}

function createHostRootFiber(tag): Fiber {
  return createFiber(tag)
}

function createWorkInProgress(current) {
  const workInProgress = createFiber(current.tag)
  workInProgress.alternate = current
  current.alternate = workInProgress
  workInProgress.memoizedState = current.memoizedState
  workInProgress.updateQueue = current.updateQueue
  return workInProgress
}

function createFiberFromTypeAndProps(type: any, pendingProps: any): Fiber {
  let fiberTag
  if (typeof type === 'string') {
    fiberTag = HostComponent
  }
  const fiber = createFiber(fiberTag)
  fiber.type = type
  return fiber
}

function createFiberFromElement(element: ReactElementType) {
  const type = element.type
  const pendingProps = element.props
  const fiber = createFiberFromTypeAndProps(type, pendingProps)
  return fiber
}

export { createHostRootFiber, createWorkInProgress, createFiberFromElement }
