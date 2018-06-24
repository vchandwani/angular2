import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-logout',
    template: `
        <div class="container-fluid">
            <div class="col-md-8 col-md-offset-2">
                <button class="btn btn-danger" (click)="onLogout()">Logout</button>
            </div>
        </div>
    `
})
export class LogoutComponent {
    constructor(private spinnerService: Ng4LoadingSpinnerService,private authService: AuthService, private router: Router) {}

    onLogout() {
        this.spinnerService.show();
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
        this.spinnerService.hide();
    }
}