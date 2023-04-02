import { createHostRootFiber } from './ReactFiber'
import { initializeUpdateQueue } from './ReactFiberClassUpdateQueue'
import { FiberRoot } from './ReactInternalType'
import { HostRoot } from './ReactWorkTags'

function FiberRootNode(
  this: FiberRoot,
  containerInfo: HTMLElement,
  tag: string
) {
  this.containerInfo = containerInfo
  this.tag = tag
  this.current = null
}

function createFiberRoot(container: HTMLElement, tag: string): FiberRoot {
  const root = new FiberRootNode(container, tag)
  const uninitializedFiber = createHostRootFiber(HostRoot)
  root.current = uninitializedFiber
  uninitializedFiber.stateNode = root

  const initialState = {
    element: null,
  }
  uninitializedFiber.memoizedState = initialState

  initializeUpdateQueue(uninitializedFiber)

  return root
}

export { createFiberRoot }
