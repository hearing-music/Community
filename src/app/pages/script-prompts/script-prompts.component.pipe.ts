import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser'; 
@Pipe({
  name: "highlightBrackets",
})
export class HighlightBracketsPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string) {
    value = value.replace(/\[(.*?)\]/g, `<span style="color:red;">[$1]</span>`);
    value = value.replace(/^\d+\.\s*/gm,`<span style="color:red;">$&</span>`);
    value = value.replace(/\（(.*?)\）/g, `<span style="color:red;">($1)</span>`);
    // 使用 DomSanitizer.bypassSecurityTrustHtml 方法确保 HTML 是安全的
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}