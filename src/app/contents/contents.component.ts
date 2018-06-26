import { Component } from "@angular/core";

@Component({
    selector: 'app-contents',
    template: `
        <div class="container-fluid row">
            <app-content-input></app-content-input>
        </div>
        <hr>
        <div class="container-fluid row">
            <app-content-list></app-content-list>
        </div>
    `
})
export class ContentsComponent {

}