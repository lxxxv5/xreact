import { mountChildFibers, reconcileChildFibers } from './ReactChildFiber'
import { processUpdateQueue } from './ReactFiberClassUpdate'
import type { Fiber } from './ReactInternalType'
import { HostRoot } from './ReactWorkTags'

function reconcileChildren(
  current: Fiber,
  workInProgress: Fiber,
  nextChildren: any
) {
  if (current === null) {
    // workInProgress.child = mountChildFibers()
  } else {
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren
    )
  }
}

function updateHostRoot(current: Fiber, workInProgress: Fiber) {
  processUpdateQueue(workInProgress)
  const nextState = workInProgress.memoizedState
  const nextChildren = nextState.element

  reconcileChildren(current, workInProgress, nextChildren)
  return workInProgress.child
}

function beginWork(current: Fiber, workInProgress: Fiber) {
  switch (workInProgress.tag) {
    case HostRoot:
      return updateHostRoot(current, workInProgress)
  }
}

export { beginWork }
