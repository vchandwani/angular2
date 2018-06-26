import { Component, Input } from "@angular/core";

import { Content } from "./content.model";
import { ContentService } from "./content.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html'
})
export class ContentComponent {
    @Input() content: Content;

    constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        private contentService: ContentService
    ) {}

    onEdit() {
        this.contentService.editContent(this.content);
    }

    onDelete() {
        this.spinnerService.show();
        this.contentService.deleteContent(this.content)
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