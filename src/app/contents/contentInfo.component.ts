import { Component, OnInit, Input} from "@angular/core";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ContentService } from "./content.service";
import { Content } from "./content.model";



@Component({
    selector: 'content-info',
    templateUrl: './contentInfo.component.html'
})
export class ContentInfoComponent implements OnInit  {
    contentsArray = [];
    contents: Content[];
    @Input() content: Content;

    constructor(
        private spinnerService: Ng4LoadingSpinnerService, private contentService: ContentService
    ) {}

    ngOnInit() {
        let i =0;
        this.contentsArray = [];
        this.spinnerService.show();
        this.contentService.getContents()
            .subscribe(
                (contents: Content[]) => {
                    this.contents = contents;
                    for(let contentsInfo of contents){
                        i++;
                        this.contentsArray[contentsInfo.location] = contentsInfo.content;
                    }
                    this.spinnerService.hide();
                },
                error => {
                    this.spinnerService.hide();
                    //console.error(error)
                }
            );
    }
}