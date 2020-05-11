import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})

export class ArticleContentComponent implements OnInit {
  constructor(private http: HttpClient,private router: ActivatedRoute) { }
 
  private myTemplate: any = "";

  ngOnInit() {
    
    var pageName = this.router.snapshot.queryParamMap.get('page');
    console.log(pageName+'.html');
    this.http.get( 'assets/' + pageName+'.html', { responseType: 'text' }).subscribe(htmlText => {
      this.myTemplate = this.ConversionFormatToWeb(htmlText);
    });


    // this.http.get("assets/.01%20新增腳本.html", { responseType: 'text' }).subscribe(htmlText => {
    //   this.myTemplate = this.ConversionFormatToWeb(htmlText);
    // });
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
