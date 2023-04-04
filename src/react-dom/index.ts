import { createUpdate } from './ReactFiberClassUpdate'
import { createFiberRoot } from './ReactFiberRoot'
import { performSyncWorkOnRoot } from './ReactFiberWorkLoop'
import { Fiber } from './ReactInternalType'

const LegacyRoot = 0

function createContainer(container, tag) {
  return createFiberRoot(container, tag)
}

function updateContainer(element, container) {
  const current: Fiber = container.current
  const update = createUpdate()
  update.payload = {
    element,
  }
  update.next = update
  current.updateQueue.shared.pending = update
}

function createRootFromDOMContainer(container, children) {
  const root = createContainer(container, LegacyRoot)
  updateContainer(children, root)
  performSyncWorkOnRoot(root)
  return root
}

function render(element, container) {
  const root = createRootFromDOMContainer(container, element)
  return root
}

export { render }
export default { render }
