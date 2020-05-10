import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-tower',
  templateUrl: './tower.component.html',
  styleUrls: ['./tower.component.scss']
})
export class TowerComponent implements OnInit {

  @Input()
  name: string

  @Input()
  stack$: Observable<number[]>

  constructor() { }

  ngOnInit(): void {
  }

}
