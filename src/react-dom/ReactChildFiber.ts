import { REACT_FRAGMENT_TYPE } from '../shared/ReactSymbols'
import { createFiberFromElement } from './ReactFiber'
import { Placement, PlacementDEV } from './ReactFiberFlags'
import { Fiber } from './ReactInternalType'

type ChildReconciler = (
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  newChild: any
) => Fiber | null

function createChildReconciler(shouldTrackSideEffects: boolean) {
  function reconcileSingleElement(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    newChild: any
  ): Fiber {
    const created = createFiberFromElement(newChild)
    created.return = returnFiber
    return created
  }

  function reconcileChildrenArray(
    returnFiber: Fiber,
    newChildren: any[]
  ): Fiber {
    let resultingFirstFiber: Fiber = null
    let previousNewFiber: Fiber = null
    for (let newIdx = 0; newIdx < newChildren.length; newIdx++) {
      const newFiber = createFiberFromElement(newChildren[newIdx])
      newFiber.return = returnFiber
      if (previousNewFiber === null) {
        resultingFirstFiber = newFiber
      } else {
        previousNewFiber.sibling = newFiber
      }
      previousNewFiber = newFiber
    }
    return resultingFirstFiber
  }

  function placeSingleChild(newFiber: Fiber): Fiber {
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.flags |= Placement | PlacementDEV
    }
    return newFiber
  }

  function reconcileChildFibers(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    newChild: any
  ): Fiber | null {
    const isTopLevelFragment =
      typeof newChild === 'object' &&
      newChild !== null &&
      newChild.type === REACT_FRAGMENT_TYPE

    if (isTopLevelFragment) {
      newChild = newChild.props.children
    }

    if (typeof newChild === 'object' && newChild !== null) {
      if (Array.isArray(newChild)) {
        return reconcileChildrenArray(returnFiber, newChild)
      }
      return placeSingleChild(
        reconcileSingleElement(returnFiber, currentFirstChild, newChild)
      )
    }
    return null
  }
  return reconcileChildFibers
}

export const reconcileChildFibers: ChildReconciler = createChildReconciler(true)
export const mountChildFibers: ChildReconciler = createChildReconciler(false)
