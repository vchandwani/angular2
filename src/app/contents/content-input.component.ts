import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { ContentService } from "./content.service";
import { Content } from "./content.model";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-content-input',
    templateUrl: './content-input.component.html'
})
export class ContentInputComponent implements OnInit {
    content: Content;

    constructor(private spinnerService: Ng4LoadingSpinnerService,private contentService: ContentService) {}

    onSubmit(form: NgForm) {
        this.spinnerService.show();
        if (this.content) {
            // Edit
            this.content.content = form.value.content;
            this.content.location = form.value.location;
            this.contentService.updateContent(this.content)
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
            this.content = null;
        } else {
            // Create
            const content = new Content(form.value.content, form.value.location);
            this.contentService.addContent(content)
                .subscribe(
                    data => {
                        this.spinnerService.hide();
                    },
                    error => {
                        this.spinnerService.hide();
                        //console.error(error)
                    }
                );
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.content = null;
        form.resetForm();
    }

    ngOnInit() {
        this.contentService.contentIsEdit.subscribe(
            (content: Content) => this.content = content
        );
    }
}