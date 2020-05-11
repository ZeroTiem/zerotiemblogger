import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})

export class ArticleContentComponent implements OnInit {
  constructor(private http: HttpClient,private router: ActivatedRoute) { }
 
  private myTemplate: any = "";
  private articleNamePath :string = "";

  ngOnInit() {
    
    this.articleNamePath = 'assets/' + this.router.snapshot.paramMap.get('articleName') + '.html';
    console.log(this.articleNamePath);
    this.http.get( this.articleNamePath, { responseType: 'text' }).subscribe(htmlText => {
      this.myTemplate = this.ConversionFormatToWeb(htmlText);
    });

    // var GetarticleName = this.router.paramMap.pipe(
    //   switchMap(params => {
    //     return params.get('articleName');
    //   })
    // );

    // GetarticleName.subscribe(articleName=>{
    //   this.aa = articleName;
    // });
    // console.log(this.aa);
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
