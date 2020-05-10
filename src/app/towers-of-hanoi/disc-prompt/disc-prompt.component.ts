import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-disc-prompt',
  templateUrl: './disc-prompt.component.html',
  styleUrls: ['./disc-prompt.component.scss']
})
export class DiscPromptComponent {
  @Output()
  discsRequested = new EventEmitter<number>()

  onDiscsRequested(n: string) {
    this.discsRequested.emit(Number(n))
  }

  constructor() { }

}
