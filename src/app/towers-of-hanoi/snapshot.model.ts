export class Snapshot {
  id: number
  source: number[]
  target: number[]
  auxiliary: number[]

  constructor(part: Partial<Snapshot>) {
    Object.assign(this, part)
  }
}
