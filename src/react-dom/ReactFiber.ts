import { ReactElementType } from '../shared/ReactElementType'
import { REACT_FRAGMENT_TYPE } from '../shared/ReactSymbols'
import { Fiber } from './ReactInternalType'
import {
  ClassComponent,
  Fragment,
  HostComponent,
  IndeterminateComponent,
} from './ReactWorkTags'

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

function shouldConstruct(Component) {
  const prototype = Component.prototype
  return !!(prototype && prototype.isReactComponent)
}

function createFiber(tag, pendingProps): Fiber {
  return new FiberNode(tag, pendingProps)
}

function createHostRootFiber(tag): Fiber {
  return createFiber(tag, null)
}

export function createFiberFromFragment(elements: any[]): Fiber {
  const fiber = createFiber(Fragment, elements)
  return fiber
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
  if (typeof type === 'function' && shouldConstruct(type)) {
    fiberTag = ClassComponent
  } else if (typeof type === 'string') {
    fiberTag = HostComponent
  } else {
    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(pendingProps.children)
    }
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
