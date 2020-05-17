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

  @Input()
  size: number

  lineHeight = 0.6

  stackHeight = this.lineHeight * (this.size + 1)

  lineHeightStyle = `${this.lineHeight}rem`

  stackHeightStyle = `${this.stackHeight}rem`

  constructor() { }

  ngOnInit(): void {
  }

}
