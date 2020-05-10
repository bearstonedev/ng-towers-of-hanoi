import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HanoiService {

  constructor() { }

  private initializeSourceTower(n: number, source: number[]): void {
    if (n > 0) {
      source.push(n)
      this.initializeSourceTower(n - 1, source)
    }
  }

  public solve(numDiscs: number): {
    source: Observable<number[]>,
    aux: Observable<number[]>,
    target: Observable<number[]>,
    count: Observable<number>
  } {
    const A: number[] = []
    const B: number[] = []
    const C: number[] = []
    this.initializeSourceTower(numDiscs, A)
    let moveCount = 0

    const sourceSubject = new BehaviorSubject(A)
    const auxSubject = new BehaviorSubject(B)
    const targetSubject = new BehaviorSubject(C)
    const moveCountSubject = new BehaviorSubject(moveCount)

    const move = async (n: number, source: number[], target: number[], auxiliary: number[]): Promise<void> => {
      if (n > 0) {
        move(n - 1, source, auxiliary, target)
        target.push(source.pop()!)
        sourceSubject.next(source)
        auxSubject.next(auxiliary)
        targetSubject.next(target)
        moveCountSubject.next(++moveCount)
        move(n - 1, auxiliary, target, source)
      }
    }

    move(numDiscs, A, C, B)

    return {
      source: sourceSubject.asObservable(),
      aux: auxSubject.asObservable(),
      target: targetSubject.asObservable(),
      count: moveCountSubject.asObservable()
    }
  }
}
