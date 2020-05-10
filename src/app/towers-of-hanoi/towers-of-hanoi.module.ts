import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TowerComponent } from './tower/tower.component'
import { TowersOfHanoiComponent } from './towers-of-hanoi.component'
import { MoveCounterComponent } from './move-counter/move-counter.component'
import { DiscPromptComponent } from './disc-prompt/disc-prompt.component'



@NgModule({
  declarations: [TowersOfHanoiComponent, TowerComponent, MoveCounterComponent, DiscPromptComponent],
  imports: [
    CommonModule
  ],
  exports: [TowersOfHanoiComponent]
})
export class TowersOfHanoiModule { }
