import { createWorkInProgress } from './ReactFiber'
import { beginWork } from './ReactFiberBeginWork'
import { commitMutationEffects } from './ReactFiberCommitWork'
import { completeWork } from './ReactFiberCompleteWork'
import { Fiber, FiberRoot } from './ReactInternalType'

let workInProgressRoot: FiberRoot | null = null
let workInProgress: Fiber | null = null

function completeUnitOfWork(unitOfWork: Fiber) {
  let completedWork = unitOfWork
  do {
    const next = completeWork(completedWork.alternate, completedWork)
    const siblingFiber = completedWork.sibling
    const returnFiber = completedWork.return
    if (next !== null) {
      workInProgress = next
      return
    }
    if (siblingFiber !== null) {
      workInProgress = siblingFiber
      return
    }
    completedWork = returnFiber
    workInProgress = completedWork
  } while (completedWork !== null)
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

function renderRootSync(root: FiberRoot) {
  workInProgressRoot = root
  const rootWorkInProgress = createWorkInProgress(root.current, null)
  workInProgress = rootWorkInProgress
  workLoopSync()

  workInProgressRoot = null
}

function commitRoot(root: FiberRoot) {
  const finishedWork = root.finishedWork
  root.finishedWork = null

  commitMutationEffects(root, finishedWork)
}

function performSyncWorkOnRoot(root: FiberRoot) {
  renderRootSync(root)
  root.finishedWork = root.current.alternate
  commitRoot(root)
}

export { performSyncWorkOnRoot }
