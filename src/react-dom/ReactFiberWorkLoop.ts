import { createWorkInProgress } from './ReactFiber'
import { beginWork } from './ReactFiberBeginWork'
import { Fiber } from './ReactInternalType'

let workInProgressRoot = null
let workInProgress = null

function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate
  beginWork(current, unitOfWork)
}

function workLoopSync() {
  // while (workInProgress !== null) {
  performUnitOfWork(workInProgress)
  // }
}

function renderRootSync(root) {
  workInProgressRoot = root
  const rootWorkInProgress = createWorkInProgress(root.current)
  workInProgress = rootWorkInProgress
  workLoopSync()
}
function commitRoot(root) {}

function performSyncWorkOnRoot(root) {
  renderRootSync(root)
  commitRoot(root)
}

export { performSyncWorkOnRoot }