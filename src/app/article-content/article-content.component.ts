import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})

export class ArticleContentComponent implements OnInit {
  constructor(
    private http: HttpClient
    , private activatedRoute: ActivatedRoute
    , private routers: Router
    , private titleService: Title
    , private metaService: Meta
    , private shareService: ShareService
  ) { }

  public myTemplate: any = "";
  private articleNamePath: string = "";
  private folderPath: string = "";

  ngOnInit() {
    var folder = this.activatedRoute.snapshot.paramMap.get('folder');
    this.folderPath = 'assets/';
    if (folder != null) {
      this.folderPath += folder + '/';
    }
    var articleName = this.activatedRoute.snapshot.paramMap.get('articleName');
    this.titleService.setTitle(articleName);
    this.articleNamePath += this.folderPath + articleName + '.html';
    console.log(this.articleNamePath);
    this.http.get(this.articleNamePath, { responseType: 'text' }).subscribe(htmlText => {
      this.myTemplate = this.ConversionFormatToWeb(htmlText);
      this.shareService.setFacebookTags(
        'https://blog.zerotiem.com'+this.routers.url,
        articleName,
        // this.GetFirstText(this.myTemplate),
        articleName,
        this.GetMeteImg(this.myTemplate)
      );

    });
  }

  ConversionFormatToWeb(htmlText: string) {
    var newHtmlText = htmlText.split('<img src="').join('<img src="' + this.folderPath); // Img Src Change To Web Path
    newHtmlText = newHtmlText.replace('<html>', '').replace('</html>', '');//Remove html Tag
    var searchKeyWord = '</head>';
    var index = newHtmlText.indexOf(searchKeyWord) + searchKeyWord.length; //Get Last Head Tag Index
    newHtmlText = newHtmlText.substring(index);
    return newHtmlText;
  }

  GetMeteImg(htmlText: string) {
    var htmlTextSplit = htmlText.split('<img src="');
    if (htmlTextSplit != null && htmlTextSplit.length > 0) {
      var searchText = htmlTextSplit[1].split('"')[0];
      console.log("MeteImg:" + searchText);
      return '/' + searchText;
    };
    return null;
  }

  // GetFirstText(htmlText: string) {
  //   // var htmlTextSplit = htmlText.split('<font style="font-size: 14pt;">');
  //   var htmlTextSplit = htmlText.split('<font style="font-size: 14pt;">');
  //   if (htmlTextSplit != null && htmlTextSplit.length > 0) {
  //     // var searchText = htmlTextSplit[1].split('<')[0];
  //     var searchText = htmlTextSplit[2];
  //     console.log("FirstText:" + searchText);
  //     return searchText;
  //   };
  //   return null;
  // }
}
