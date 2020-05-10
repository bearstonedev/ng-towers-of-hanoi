import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-move-counter',
  templateUrl: './move-counter.component.html',
  styleUrls: ['./move-counter.component.scss']
})
export class MoveCounterComponent implements OnInit {

  @Input()
  count$: Observable<number>

  constructor() { }

  ngOnInit(): void {
  }

}
