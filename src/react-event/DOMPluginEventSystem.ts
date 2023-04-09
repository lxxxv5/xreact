import { getFiberCurrentPropsFromNode } from '../react-dom/ReactDOMComponentTree'
import {
  createEventListenerWrapperWithPriority,
  getEventTarget,
} from '../react-dom/ReactDOMEventListener'
import { Fiber } from '../react-dom/ReactInternalType'
import { DOMEventName } from './DOMEventNames'
import { topLevelEventsToReactNames } from './DOMEventProperties'
import { allNativeEvents } from './EventRegistry'
import * as SimpleEventPlugin from './SimpleEventPlugin'

SimpleEventPlugin.registerEvents()

function executeDispatch(
  event: any,
  listener: Function,
  currentTarget: EventTarget
): void {
  event.currentTarget = currentTarget
  listener.apply(undefined, [event])
  event.currentTarget = null
}

function SyntheticEventCtor() {}

function dispatchEventsForPlugins(
  domEventName: DOMEventName,
  nativeEvent: any,
  targetInst: null | Fiber,
  targetContainer: EventTarget
) {
  const nativeEventTarget = getEventTarget(nativeEvent)
  const dispatchQueue = []
  const reactName = topLevelEventsToReactNames.get(domEventName)

  const listeners = []

  const stateNode = targetInst.stateNode
  const props = getFiberCurrentPropsFromNode(stateNode)
  listeners.push({
    targetInst,
    listener: props[reactName],
    currentTarget: stateNode,
  })

  const event = new SyntheticEventCtor()
  dispatchQueue.push({ event, listeners })

  dispatchQueue.forEach(({ event, listeners }) => {
    listeners.forEach(({ listener, currentTarget }) => {
      executeDispatch(event, listener, currentTarget)
    })
  })
}

function dispatchEventForPluginEventSystem(
  domEventName: DOMEventName,
  container: EventTarget,
  nativeEvent: any,
  targetInst: null | Fiber
) {
  dispatchEventsForPlugins(domEventName, nativeEvent, targetInst, container)
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
