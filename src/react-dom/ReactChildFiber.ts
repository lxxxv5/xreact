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
    if (typeof newChild === 'object' && newChild !== null) {
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
