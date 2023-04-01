const { createHostRootFiber } = require('./ReactFiber')
const { initializeUpdateQueue } = require('./ReactFiberClassUpdateQueue')

function FiberRootNode(containerInfo, tag) {
  this.containerInfo = containerInfo
  this.tag = tag
  this.current = null
}

function createFiberRoot(container, tag) {
  const root = new FiberRootNode(container, tag)
  const uninitializedFiber = createHostRootFiber(tag)
  root.current = uninitializedFiber
  uninitializedFiber.stateNode = root

  const initialState = {
    element: null,
  }
  uninitializedFiber.memoizedState = initialState

  initializeUpdateQueue(uninitializedFiber)

  return root
}

exports.createFiberRoot = createFiberRoot
