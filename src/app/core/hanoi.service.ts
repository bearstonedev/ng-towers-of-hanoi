import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Snapshot } from '../towers-of-hanoi/snapshot.model'

export interface Problem {
  id: number,
  n: number,
  worker: Worker,
  sourceStack$: Observable<number[]>,
  auxStack$: Observable<number[]>,
  targetStack$: Observable<number[]>,
  moveCount$: Observable<number>,
  cancel: () => void,
  isDone: boolean
}

@Injectable({
  providedIn: 'root',
})
export class HanoiService {
  private problems = new Map<number, Problem>()
  private problemSubject = new ReplaySubject<Map<number, Problem>>()
  private problemIds = 0

  public problem$ = this.problemSubject.asObservable()

  constructor() { }

  public solve(n: number): void {
    const snapshotSubject = new ReplaySubject<Snapshot>()
    const operation = snapshotSubject.asObservable()

    const worker = new Worker('./solver.worker', { type: 'module' })
    const problem = {
      id: this.problemIds++,
      n,
      worker,
      sourceStack$: operation.pipe(map(x => x.source)),
      auxStack$: operation.pipe(map(x => x.auxiliary)),
      targetStack$: operation.pipe(map(x => x.target)),
      moveCount$: operation.pipe(map(x => x.id)),
      cancel: () => {
        worker.terminate()
        this.problems.delete(problem.id)
        this.problemSubject.next(this.problems)
      },
      isDone: false
    }

    this.problems.set(problem.id, problem)
    worker.onmessage = ({ data }) => {
      if (data === 'done') {
        problem.isDone = true
      } else {
        snapshotSubject.next(data)
      }
    }
    this.problemSubject.next(this.problems)
    worker.postMessage(n)
  }
}
