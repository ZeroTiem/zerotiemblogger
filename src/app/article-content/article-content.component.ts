import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { PropertyWrite } from '@angular/compiler';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})

export class ArticleContentComponent implements OnInit {
  constructor(
    private http: HttpClient
    , private router: ActivatedRoute
    , private titleService: Title
    , private metaService: Meta
  ) { }

  public myTemplate: any = "";
  private articleNamePath: string = "";
  private folderPath: string = "";

  ngOnInit() {
    var folder = this.router.snapshot.paramMap.get('folder');
    this.folderPath = 'assets/';
    if (folder != null) {
      this.folderPath += folder + '/';
    }
    var articleName = this.router.snapshot.paramMap.get('articleName');
    this.titleService.setTitle(articleName);
    this.articleNamePath += this.folderPath + articleName + '.html';
    console.log(this.articleNamePath);
    this.http.get(this.articleNamePath, { responseType: 'text' }).subscribe(htmlText => {
      this.myTemplate = this.ConversionFormatToWeb(htmlText, articleName);
    });
  }

  ConversionFormatToWeb(htmlText: string, articleName: string) {
    var newHtmlText = htmlText.split('<img src="').join('<img src="' + this.folderPath); // Img Src Change To Web Path
    newHtmlText = newHtmlText.replace('<html>', '').replace('</html>', '');//Remove html Tag
    var searchKeyWord = '</head>';
    var index = newHtmlText.indexOf(searchKeyWord) + searchKeyWord.length; //Get Last Head Tag Index
    newHtmlText = newHtmlText.substring(index);
    this.SetMeteImg(newHtmlText,articleName);
    return newHtmlText;
  }

  SetMeteImg(htmlText: string, articleName: string) {
    var htmlTextSplitImgs = htmlText.split('<img src="');
    if (htmlTextSplitImgs != null && htmlTextSplitImgs.length > 0) {
      var firstImgPath = htmlTextSplitImgs[1].split('"')[0];
      console.log("MeteImg:" + firstImgPath);
      // <meta property="og:image" content="http://xxx.xxx.com/1.jpg" />
      this.metaService.removeTag("name='og:title'");
      this.metaService.removeTag("name='og:image'");
      this.metaService.addTags([
        { name: 'og:title', content: articleName, property: 'og:title' },
        { name: 'og:image', content: firstImgPath, property: 'og:image' },
      ]);
    };
  }
}
