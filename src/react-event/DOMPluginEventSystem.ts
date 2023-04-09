import { createEventListenerWrapperWithPriority } from '../react-dom/ReactDOMEventListener'
import { DOMEventName } from './DOMEventNames'
import { allNativeEvents } from './EventRegistry'
import * as SimpleEventPlugin from './SimpleEventPlugin'

SimpleEventPlugin.registerEvents()

function dispatchEventForPluginEventSystem(
  domEventName: DOMEventName,
  container: EventTarget,
  nativeEvent: any
) {
  console.log(domEventName, container, nativeEvent)
}

function listenToNativeEvent(
  domEventName: DOMEventName,
  target: EventTarget
): void {
  let listener = createEventListenerWrapperWithPriority(target, domEventName)
  target.addEventListener(
    domEventName,
    listener as EventListenerOrEventListenerObject,
    false
  )
}

function listenToAllSupportedEvents(rootContainerElement: HTMLElement) {
  allNativeEvents.forEach(domEventName => {
    listenToNativeEvent(domEventName, rootContainerElement)
  })
}

export { listenToAllSupportedEvents, dispatchEventForPluginEventSystem }
