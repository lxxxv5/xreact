import { DOMEventName } from './DOMEventNames'
import { registerTwoPhaseEvent } from './EventRegistry'

const simpleEventPluginEvents: DOMEventName[] = [
  'click',
  'keypress',
  'keyup',
  'keydown',
]

function registerSimpleEvent(domEventName: DOMEventName, reactName: string) {
  // topLevelEventsToReactNames.set(domEventName, reactName);
  registerTwoPhaseEvent(reactName, [domEventName])
}

function registerSimpleEvents() {
  simpleEventPluginEvents.forEach(eventName => {
    const domEventName = eventName.toLowerCase() as DOMEventName
    const capitalizedEvent = eventName[0].toUpperCase() + eventName.slice(1)
    registerSimpleEvent(domEventName, 'on' + capitalizedEvent)
  })
}

export { registerSimpleEvents as registerEvents }
