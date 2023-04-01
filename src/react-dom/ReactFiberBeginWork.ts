import { processUpdateQueue } from './ReactFiberClassUpdate'
import type { Fiber } from './ReactInternalType'
import { HostRoot } from './ReactWorkTags'

// function reconcileChildren() {}

function updateHostRoot(current: Fiber, workInProgress: Fiber) {
  const nextState = workInProgress.memoizedState
  processUpdateQueue(workInProgress)
  return workInProgress.child
}

function beginWork(current: Fiber, workInProgress: Fiber) {
  switch (workInProgress.tag) {
    case HostRoot:
      return updateHostRoot(current, workInProgress)
  }
}

export { beginWork }
