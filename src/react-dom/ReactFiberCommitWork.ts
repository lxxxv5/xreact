import { Placement } from './ReactFiberFlags'
import { Fiber, FiberRoot } from './ReactInternalType'
import {
  ClassComponent,
  FunctionComponent,
  HostComponent,
  HostRoot,
} from './ReactWorkTags'

function isHostParent(fiber: Fiber): boolean {
  return [HostRoot, HostComponent].includes(fiber.tag)
}

function getHostParentFiber(finishedWork: Fiber): Fiber {
  let parent = finishedWork.return

  while (parent !== null) {
    if (isHostParent(parent)) {
      return parent
    }
    parent = parent.return
  }
}

function appendChildToContainer(parent: HTMLElement, stateNode: HTMLElement) {
  parent.appendChild(stateNode)
}

function insertOrAppendPlacementNodeIntoContainer(
  node: Fiber,
  before: HTMLElement,
  parent: HTMLElement
) {
  const tag = node.tag
  const isHost = tag === HostComponent
  if (isHost) {
    appendChildToContainer(parent, node.stateNode)
  } else {
    let child = node.child

    while (child !== null) {
      insertOrAppendPlacementNodeIntoContainer(child, before, parent)
      child = child.sibling
    }
  }
}

function commitPlacement(finishedWork: Fiber): void {
  const parentFiber = getHostParentFiber(finishedWork)
  switch (parentFiber.tag) {
    case HostRoot:
      const parent = (parentFiber.stateNode as FiberRoot).containerInfo
      insertOrAppendPlacementNodeIntoContainer(finishedWork, null, parent)
      break
  }
}

function commitReconciliationEffects(finishedWork: Fiber) {
  const flags = finishedWork.flags
  if (flags & Placement) {
    commitPlacement(finishedWork)
  }
}

function commitMutationEffectsOnFiber(finishedWork: Fiber, root: FiberRoot) {
  switch (finishedWork.tag) {
    case FunctionComponent:
      recursivelyTraverseMutationEffects(root, finishedWork)
      commitReconciliationEffects(finishedWork)
      return
    case ClassComponent:
      recursivelyTraverseMutationEffects(root, finishedWork)
      commitReconciliationEffects(finishedWork)
      return
    case HostRoot:
      recursivelyTraverseMutationEffects(root, finishedWork)
      return
    case HostComponent:
      recursivelyTraverseMutationEffects(root, finishedWork)
      commitReconciliationEffects(finishedWork)
      return
  }
}

function recursivelyTraverseMutationEffects(
  root: FiberRoot,
  parentFiber: Fiber
) {
  let child = parentFiber.child
  while (child !== null) {
    commitMutationEffectsOnFiber(child, root)
    child = child.sibling
  }
}

function commitMutationEffects(root: FiberRoot, finishedWork: Fiber) {
  commitMutationEffectsOnFiber(finishedWork, root)
}

export { commitMutationEffects }
