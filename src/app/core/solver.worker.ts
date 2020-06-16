/// <reference lib="webworker" />

import { Snapshot } from '../towers-of-hanoi/snapshot.model'

addEventListener('message', ({ data }) => {
  solve(data)
})

function initializeTowers(n: number): [number[], number[], number[]] {

  const source: number[] = []
  const auxiliary: number[] = []
  const target: number[] = []

  const initializeSourceTower = () => {
    if (n > 0) {
      source.unshift(n--)
      initializeSourceTower()
    }
  }

  initializeSourceTower()
  return [source, auxiliary, target]
}

function solve(numDiscs: number) {
  const [source, auxiliary, target] = initializeTowers(numDiscs)
  let moveCount = 0

  postMessage(new Snapshot({
    id: moveCount,
    source,
    auxiliary,
    target,
  }))

  const move = (
    n: number,
    A: number[],
    C: number[],
    B: number[]
  ): void => {
    if (n > 0) {
      move(n - 1, A, B, C)
      C.unshift(A.shift()!)
      postMessage(new Snapshot({
        id: ++moveCount,
        source,
        auxiliary,
        target
      }))
      move(n - 1, B, C, A)
    }
  }

  move(numDiscs, source, target, auxiliary)
  postMessage('done')
}
