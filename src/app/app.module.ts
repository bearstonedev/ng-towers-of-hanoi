import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { TowersOfHanoiModule } from './towers-of-hanoi/towers-of-hanoi.module'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    TowersOfHanoiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
