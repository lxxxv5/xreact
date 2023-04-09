import { DOMEventName } from './DOMEventNames'

const allNativeEvents: Set<DOMEventName> = new Set()

function registerTwoPhaseEvent(
  registrationName: string,
  dependencies: Array<DOMEventName>
): void {
  registerDirectEvent(registrationName, dependencies)
  registerDirectEvent(registrationName + 'Capture', dependencies)
}

function registerDirectEvent(
  registrationName: string,
  dependencies: Array<DOMEventName>
) {
  dependencies.forEach(item => {
    allNativeEvents.add(item)
  })
}

export { allNativeEvents, registerTwoPhaseEvent }
