import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { HanoiService } from '../core/hanoi.service'

@Component({
  selector: 'app-towers-of-hanoi',
  templateUrl: './towers-of-hanoi.component.html',
  styleUrls: ['./towers-of-hanoi.component.scss']
})
export class TowersOfHanoiComponent implements OnInit {
  sourceStack$: Observable<number[]>
  auxStack$: Observable<number[]>
  targetStack$: Observable<number[]>
  moveCount$: Observable<number>

  start(n: number): void {
    // init n
    const optimal = this.calculateOptimalMoveCount(n)
    const formattedOptimal = optimal.toLocaleString()
    if (optimal > 50000 && !confirm(this.getConfirmPrompt(formattedOptimal))) {
      return
    }
    console.log(`Completing the Tower of Hanoi for ${n} disks, in the optimal ${formattedOptimal} moves.`)
    const operation = this.hanoi.solve(n)
    this.sourceStack$ = operation.source
    this.auxStack$ = operation.aux
    this.targetStack$ = operation.target
    this.moveCount$ = operation.count
  }

  private calculateOptimalMoveCount(n: number) {
    return Math.pow(2, n) - 1
  }

  private getConfirmPrompt(formattedOptimal: string) {
    return `The optimal solution requires ${formattedOptimal} moves.

This may take a while to complete. Do you wish to continue?`
  }

  constructor(private hanoi: HanoiService) { }

  ngOnInit(): void {

  }

}
