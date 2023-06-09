import { mountChildFibers, reconcileChildFibers } from './ReactChildFiber'
import { processUpdateQueue } from './ReactFiberClassUpdate'
import type { Fiber } from './ReactInternalType'
import {
  ClassComponent,
  FunctionComponent,
  HostComponent,
  HostRoot,
  IndeterminateComponent,
} from './ReactWorkTags'

function reconcileChildren(
  current: Fiber,
  workInProgress: Fiber,
  nextChildren: any
) {
  if (current === null) {
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren)
  } else {
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren
    )
  }
}

function mountIndeterminateComponent(
  workInProgress: Fiber,
  Component: Function
) {
  const props = workInProgress.pendingProps
  const value = Component(props)
  if (
    typeof value === 'object' &&
    value !== null &&
    typeof value.render === 'function'
  ) {
    //
  } else {
    workInProgress.tag = FunctionComponent
    reconcileChildren(null, workInProgress, value)
    return workInProgress.child
  }
}

function updateClassComponent(
  current: Fiber,
  workInProgress: Fiber,
  Component: any
) {
  const instance = new Component(workInProgress.pendingProps)
  const nextChildren = instance.render()
  reconcileChildren(current, workInProgress, nextChildren)
  return workInProgress.child
}

function updateHostRoot(current: Fiber, workInProgress: Fiber) {
  processUpdateQueue(workInProgress)
  const nextState = workInProgress.memoizedState
  const nextChildren = nextState.element

  reconcileChildren(current, workInProgress, nextChildren)
  return workInProgress.child
}

function updateHostComponent(current: Fiber, workInProgress: Fiber) {
  let nextChildren = workInProgress.pendingProps.children
  if (typeof nextChildren === 'string' || typeof nextChildren === 'number') {
    nextChildren = null
  }
  reconcileChildren(current, workInProgress, nextChildren)
  return workInProgress.child
}

function beginWork(current: Fiber, workInProgress: Fiber) {
  switch (workInProgress.tag) {
    case IndeterminateComponent:
      return mountIndeterminateComponent(workInProgress, workInProgress.type)
    case ClassComponent:
      const Component = workInProgress.type
      return updateClassComponent(current, workInProgress, Component)
    case HostRoot:
      return updateHostRoot(current, workInProgress)
    case HostComponent:
      return updateHostComponent(current, workInProgress)
  }
  return null
}

export { beginWork }
