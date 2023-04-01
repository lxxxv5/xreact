export type Fiber = {
  tag: number
  type: any
  stateNode: any
  memoizedState: any
  alternate: Fiber | null
}
