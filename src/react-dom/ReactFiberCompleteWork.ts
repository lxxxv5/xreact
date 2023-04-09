import {
  createInstance,
  finalizeInitialChildren,
  // Instance,
} from './ReactDomHostConfig'
import { Fiber } from './ReactInternalType'
import {
  FunctionComponent,
  HostComponent,
  HostRoot,
  IndeterminateComponent,
} from './ReactWorkTags'

function appendInitialChild(parentInstance: HTMLElement, child: HTMLElement) {
  parentInstance.appendChild(child)
}

function appendAllChildren(parent: HTMLElement, workInProgress: Fiber) {
  let node = workInProgress.child
  while (node !== null) {
    if (node.tag === HostComponent) {
      appendInitialChild(parent, node.stateNode)
    } else {
      node = node.child
      continue
    }

    if (node === workInProgress) {
      return
    }

    while (node.sibling === null) {
      if (node.return === null || node === workInProgress) {
        return
      }
      node = node.return
    }

    node = node.sibling
  }
}

function completeWork(
  current: Fiber | null,
  workInProgress: Fiber
): Fiber | null {
  const newProps = workInProgress.pendingProps
  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case FunctionComponent:
      return null
    case HostRoot:
      return null
    case HostComponent:
      const type = workInProgress.type
      const instance = createInstance(type, newProps, workInProgress)
      appendAllChildren(instance, workInProgress)
      workInProgress.stateNode = instance
      finalizeInitialChildren(instance, type, newProps)
      return null
  }
  return null
}

export { completeWork }
