import {
  createInstance,
  finalizeInitialChildren,
  // Instance,
} from './ReactDomHostConfig'
import { Fiber } from './ReactInternalType'
import { HostComponent, HostRoot } from './ReactWorkTags'

// function appendAllChildren(parent: Instance, workInProgress: Fiber) {}

function completeWork(
  current: Fiber | null,
  workInProgress: Fiber
): Fiber | null {
  const newProps = workInProgress.pendingProps
  switch (workInProgress.tag) {
    case HostRoot:
      return null
    case HostComponent:
      const type = workInProgress.type
      const instance = createInstance(type)
      //   appendAllChildren(instance, workInProgress)
      workInProgress.stateNode = instance
      finalizeInitialChildren(instance, type, newProps)
      return null
  }
  return null
}

export { completeWork }
