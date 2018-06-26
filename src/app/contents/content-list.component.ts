import { Component, OnInit, Input } from "@angular/core";

import { Content } from "./content.model";
import { ContentService } from "./content.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-content-list',
    template: `
        <div class="col-md-8 col-md-offset-2">

            <p-table [columns]="cols" [value]="contents" sortMode="multiple">
                <ng-template pTemplate="header" let-columns>
                    <tr>
                        <th *ngFor="let col of columns" [pSortableColumn]="col.field">
                            {{col.header}}
                            <p-sortIcon [field]="col.field"></p-sortIcon>
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowData let-columns="columns">
                    <tr>
                        <td *ngFor="let col of columns">
                            <div *ngIf='col.field != ""'>
                                {{rowData[col.field]}}
                            </div>
                            <ng-container *ngIf='col.field == ""'>
                                <div class="config">
                                    <a (click)="onEdit(rowData)">Edit</a>
                                    <a (click)="onDelete(rowData)">Delete</a>                                    
                                </div>
                            </ng-container>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
            
        </div>
    `
})
export class ContentListComponent implements OnInit {
    contents: Content[];
    @Input() content: Content;
    cols: any[];

    constructor(private spinnerService: Ng4LoadingSpinnerService, private contentService: ContentService) { }

    ngOnInit() {
        this.cols = [
            { field: 'content', header: 'Content' },
            { field: 'location', header: 'Location' },
            { field: '', header: 'Action' }
        ];
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