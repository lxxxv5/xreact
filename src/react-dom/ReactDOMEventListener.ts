import { DOMEventName } from '../react-event/DOMEventNames'
import { dispatchEventForPluginEventSystem } from '../react-event/DOMPluginEventSystem'
import { Fiber } from './ReactInternalType'

export let return_targetInst: null | Fiber = null

function dispatchEvent(
  domEventName: DOMEventName,
  targetContainer: EventTarget,
  nativeEvent: any
) {
  dispatchEventForPluginEventSystem(domEventName, targetContainer, nativeEvent)
}

function createEventListenerWrapperWithPriority(
  targetContainer: EventTarget,
  domEventName: DOMEventName
): Function {
  const listenerWrapper = dispatchEvent
  return listenerWrapper.bind(null, domEventName, targetContainer)
}

export { createEventListenerWrapperWithPriority }
