import { DOMEventName } from '../react-event/DOMEventNames'
import { dispatchEventForPluginEventSystem } from '../react-event/DOMPluginEventSystem'
import { getClosestInstanceFromNode } from './ReactDOMComponentTree'
import { Fiber } from './ReactInternalType'

let return_targetInst: null | Fiber = null

function getEventTarget(nativeEvent: any) {
  return nativeEvent.target || nativeEvent.srcElement || window
}

function findInstanceBlockingEvent(nativeEvent: any) {
  return_targetInst = null

  const nativeEventTarget = getEventTarget(nativeEvent)

  let targetInst = getClosestInstanceFromNode(nativeEventTarget)

  return_targetInst = targetInst
}

function dispatchEvent(
  domEventName: DOMEventName,
  targetContainer: EventTarget,
  nativeEvent: any
) {
  findInstanceBlockingEvent(nativeEvent)
  dispatchEventForPluginEventSystem(
    domEventName,
    targetContainer,
    nativeEvent,
    return_targetInst
  )
}

function createEventListenerWrapperWithPriority(
  targetContainer: EventTarget,
  domEventName: DOMEventName
): Function {
  const listenerWrapper = dispatchEvent
  return listenerWrapper.bind(null, domEventName, targetContainer)
}

export { createEventListenerWrapperWithPriority, getEventTarget }
