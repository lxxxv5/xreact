import { Fiber } from './ReactInternalType'

const randomKey = Math.random().toString(36).slice(2)
const internalInstanceKey = '__reactFiber$' + randomKey
const internalPropsKey = '__reactProps$' + randomKey

function precacheFiberNode(hostInst: Fiber, node: any): void {
  node[internalInstanceKey] = hostInst
}

function getClosestInstanceFromNode(targetNode: Node) {
  return targetNode[internalInstanceKey]
}

function getFiberCurrentPropsFromNode(node: any): any {
  return node[internalPropsKey] || null
}

function updateFiberProps(node: any, props: any): void {
  node[internalPropsKey] = props
}

export {
  precacheFiberNode,
  getClosestInstanceFromNode,
  getFiberCurrentPropsFromNode,
  updateFiberProps,
}
