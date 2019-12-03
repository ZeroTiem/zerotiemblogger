import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {SafeHtml} from "./SafeHtml"; // <---

@NgModule({
  declarations:[SafeHtml], // <---
  imports:[CommonModule],
  exports:[SafeHtml] // <---
})

export class CustomPipe{}