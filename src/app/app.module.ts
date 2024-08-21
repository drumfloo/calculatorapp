import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    
  ],
  imports: [
    BrowserModule,
    ToolbarComponent
],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
