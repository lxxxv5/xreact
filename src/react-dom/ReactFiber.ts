import { ReactElementType } from '../shared/ReactElementType'
import { Fiber } from './ReactInternalType'
import { HostComponent, IndeterminateComponent } from './ReactWorkTags'

function FiberNode(this: Fiber, tag, pendingProps: any) {
  this.tag = tag
  this.type = null
  this.stateNode = null
  this.memoizedState = null
  this.alternate = null
  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.child = null
  this.return = null
  this.sibling = null
}

function createFiber(tag, pendingProps): Fiber {
  return new FiberNode(tag, pendingProps)
}

function createHostRootFiber(tag): Fiber {
  return createFiber(tag, null)
}

function createWorkInProgress(current: Fiber, pendingProps: any) {
  const workInProgress = createFiber(current.tag, pendingProps)
  workInProgress.stateNode = current.stateNode
  workInProgress.alternate = current
  current.alternate = workInProgress
  workInProgress.memoizedState = current.memoizedState
  workInProgress.updateQueue = current.updateQueue
  return workInProgress
}

function createFiberFromTypeAndProps(type: any, pendingProps: any): Fiber {
  let fiberTag = IndeterminateComponent
  if (typeof type === 'string') {
    fiberTag = HostComponent
  }
  const fiber = createFiber(fiberTag, pendingProps)
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
