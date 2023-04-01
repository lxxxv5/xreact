import type { ReactElementType } from '../shared/ReactElementType'

function ReactElement(type: any, props: any): ReactElementType {
  const element = { type, props }

  return element
}

export { ReactElement }
