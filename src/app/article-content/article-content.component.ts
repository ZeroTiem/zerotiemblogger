import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})

export class ArticleContentComponent implements OnInit {
  constructor(private http: HttpClient) { }
  
  private myTemplate: any = "";

  ngOnInit() {
    this.http.get("assets/新增腳本.html", { responseType: 'text' }).subscribe(htmlText => {
      this.myTemplate = this.ConversionFormatToWeb(htmlText);
    });
  }

  ConversionFormatToWeb(htmlText: string) {
    var newHtmlText = htmlText.split('<img src="').join('<img src="assets/'); // Img Src Change To Web Path
    newHtmlText = newHtmlText.replace('<html>', '').replace('</html>', '');//Remove html Tag
    var searchKeyWord = '</head>';
    var index = newHtmlText.indexOf(searchKeyWord) + searchKeyWord.length; //Get Last Head Tag Index
    newHtmlText = newHtmlText.substring(index);
    return newHtmlText;
  }
}
