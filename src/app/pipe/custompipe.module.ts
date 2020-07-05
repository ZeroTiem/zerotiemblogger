import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SafePipe } from "./safePipe"; // <---

@NgModule({
  declarations:[SafePipe], // <---
  imports: [CommonModule],
  exports: [SafePipe] // <---
})

export class CustomPipe { }