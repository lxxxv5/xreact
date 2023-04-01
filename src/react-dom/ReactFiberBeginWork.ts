import type { Fiber } from './ReactInternalType'
import { HostRoot } from './ReactWorkTags'

function updateHostRoot(current: Fiber, workInProgress: Fiber) {
  //   console.log(current, workInProgress)
}

function beginWork(current: Fiber, workInProgress: Fiber) {
  switch (workInProgress.tag) {
    case HostRoot:
      return updateHostRoot(current, workInProgress)
  }
}

export { beginWork }
