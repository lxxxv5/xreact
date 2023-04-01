function FiberNode(tag) {
  this.tag = tag
  this.type = null
  this.stateNode = null
  this.memoizedState = null
}

function createFiber(tag) {
  return new FiberNode(tag)
}

function createHostRootFiber(tag) {
  return createFiber(tag)
}

exports.createHostRootFiber = createHostRootFiber
