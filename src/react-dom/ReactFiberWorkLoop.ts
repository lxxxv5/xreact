import { createWorkInProgress } from './ReactFiber'
import { beginWork } from './ReactFiberBeginWork'
import { completeWork } from './ReactFiberCompleteWork'
import { Fiber } from './ReactInternalType'

let workInProgressRoot = null
let workInProgress = null

function completeUnitOfWork(unitOfWork: Fiber) {
  const completedWork = unitOfWork
  const next = completeWork(completedWork.alternate, completedWork)
  workInProgress = null
}

function performUnitOfWork(unitOfWork: Fiber) {
  const current = unitOfWork.alternate
  const next = beginWork(current, unitOfWork)
  if (next === null) {
    completeUnitOfWork(unitOfWork)
  } else {
    workInProgress = next
  }
}

function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

function renderRootSync(root) {
  workInProgressRoot = root
  const rootWorkInProgress = createWorkInProgress(root.current, null)
  workInProgress = rootWorkInProgress
  workLoopSync()
}
function commitRoot(root) {}

function performSyncWorkOnRoot(root) {
  renderRootSync(root)
  commitRoot(root)
}

export { performSyncWorkOnRoot }
