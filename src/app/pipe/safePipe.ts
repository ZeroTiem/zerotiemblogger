import { Pipe, PipeTransform } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({name: 'safePipe'})
export class SafePipe  implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}

  transform(html) {
    // return this.sanitizer.bypassSecurityTrustStyle(html);
    return this.sanitizer.bypassSecurityTrustHtml(html);
    // return this.sanitizer.bypassSecurityTrustScript(html);
    // return this.sanitizer.bypassSecurityTrustUrl(html);
    // return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}