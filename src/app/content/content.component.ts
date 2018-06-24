import { Component, OnInit, Input} from "@angular/core";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ContentService } from "./content.service";
import { Content } from "./content.model";



@Component({
    selector: 'content',
    templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit  {
    contents: Content[];
    @Input() content: Content;

    constructor(
        private spinnerService: Ng4LoadingSpinnerService, private contentService: ContentService
    ) {}

    ngOnInit() {
        this.spinnerService.show();
        this.contentService.getContents()
            .subscribe(
                (contents: Content[]) => {
                    this.contents = contents;
                    this.spinnerService.hide();
                },
                error => {
                    this.spinnerService.hide();
                    //console.error(error)
                }
            );
    }
    onEdit(content) {
        this.contentService.editContent(content);
    }

    onDelete(content) {
        this.spinnerService.show();
        this.contentService.deleteContent(content)
            .subscribe(
                data => {
                    this.spinnerService.hide();
                },
                error => {
                    this.spinnerService.hide();
                    //console.error(error)
                }
                //result => console.log(result)
            );
    }
}