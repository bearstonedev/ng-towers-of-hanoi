/// <reference lib="webworker" />

import { Snapshot } from '../towers-of-hanoi/snapshot.model'

addEventListener('message', ({ data }) => {
  solve(data)
})

function initializeSourceTower(n: number, source: number[]): void {
  if (n > 0) {
    source.push(n)
    initializeSourceTower(n - 1, source)
  }
}

function solve(numDiscs: number)/*: Observable<Snapshot>*/ {
  const A: number[] = []
  const B: number[] = []
  const C: number[] = []
  initializeSourceTower(numDiscs, A)
  let moveCount = 0

  postMessage(new Snapshot({
    id: moveCount,
    source: A,
    auxiliary: B,
    target: C,
  }))

  const move = (
    n: number,
    source: number[],
    target: number[],
    auxiliary: number[]
  ): void => {
    if (n > 0) {
      move(n - 1, source, auxiliary, target)
      target.push(source.pop()!)
      postMessage(new Snapshot({
        id: ++moveCount,
        source,
        auxiliary,
        target,
      }))
      move(n - 1, auxiliary, target, source)
    }
  }

  move(numDiscs, A, C, B)
  postMessage('done')
}
