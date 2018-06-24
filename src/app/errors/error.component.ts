import { Component, OnInit } from "@angular/core";

import { Error } from "./error.model";
import { ErrorService } from "./error.service";
import { Router } from "@angular/router";


@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
    error: Error;
    display = 'none';
    displaySuccess = 'none';
    displayError = 'none';
    status : number;

    constructor(private errorService: ErrorService,private router: Router) {}

    onErrorHandled() {
        this.display = 'none';
    }
    signIn() {
        this.display = 'none';
        this.router.navigateByUrl('/auth/signin');
    }

    ngOnInit() {
        this.errorService.errorOccurred
            .subscribe(
                (error: Error) => {
                    if(error.success){
                        this.displaySuccess = '';
                        this.displayError = 'none';
                    } else {
                        this.displayError = '';
                        this.displaySuccess = 'none';
                    }
                    if(error.status ==  undefined){
                        error.status = 401;
                    }
                    this.status = error.status;
                    this.error = error;
                    this.display = 'block';
                }
            );
    }
}