import { Component, Input } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-move-counter',
  templateUrl: './move-counter.component.html',
  styleUrls: ['./move-counter.component.scss']
})
export class MoveCounterComponent {
  @Input()
  count$: Observable<number>

  constructor() { }
}
