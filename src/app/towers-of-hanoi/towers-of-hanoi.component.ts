import { Component } from '@angular/core'
import { map } from 'rxjs/operators'
import { HanoiService } from '../core/hanoi.service'

@Component({
  selector: 'app-towers-of-hanoi',
  templateUrl: './towers-of-hanoi.component.html',
  styleUrls: ['./towers-of-hanoi.component.scss']
})
export class TowersOfHanoiComponent {
  problem$ = this.hanoi.problem$.pipe(
    map(problemMap => [...problemMap.values()])
  )

  private calculateOptimalMoveCount(n: number) {
    return Math.pow(2, n) - 1
  }

  private getConfirmPrompt(formattedOptimal: string) {
    return `The optimal solution requires ${formattedOptimal} moves.

This may take a while to complete. Do you wish to continue?`
  }

  start(n: number) {
    // init n
    const optimal = this.calculateOptimalMoveCount(n)
    const formattedOptimal = optimal.toLocaleString()
    if (optimal > 50000 && !confirm(this.getConfirmPrompt(formattedOptimal))) {
      return
    }

    if (typeof Worker === 'undefined') {
      const errMsg = 'Web workers are not available - unable to proceed.'
      console.error(errMsg)
      alert(errMsg)
      return
    }

    console.log(`Completing the Tower of Hanoi for ${n} disks, in the optimal ${formattedOptimal} moves.`)
    this.hanoi.solve(n)
  }

  constructor(private hanoi: HanoiService) { }
}
