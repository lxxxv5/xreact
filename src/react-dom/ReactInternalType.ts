export type Update<State> = {
  tag: 0 | 1 | 2 | 3
  payload: any
  callback: (() => any) | null
  next: Update<State> | null
}

export type SharedQueue = {
  pending: Update<any> | null
}

export type UpdateQueue = {
  firstBaseUpdate: Update<any> | null
  lastBaseUpdate: Update<any> | null
  shared: SharedQueue
}

export type Fiber = {
  tag: number
  type: any
  stateNode: any
  memoizedState: any
  alternate: Fiber | null
  pendingProps: any
  memoizedProps: any
  updateQueue: UpdateQueue
  child: Fiber | null
}