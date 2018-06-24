import { Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";
declare var $: any;

@Component({
    selector: 'app-header',
    template: `
            <nav class="navbar navbar-default navbar-fixed-top">
                <div class="container">
                    <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>                        
                    </button>
                    <a class="navbar-brand" href="">Logo</a>
                    </div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#about">ABOUT</a></li>
                        <li><a href="#services">SERVICES</a></li>
                        <li><a href="#portfolio">PORTFOLIO</a></li>
                        <li><a href="#pricing">PRICING</a></li>
                        <li><a href="#contact">CONTACT</a></li>
                        <!-- <li *ngIf="!isLoggedIn()" routerLinkActive="active"><a [routerLink]="['auth/signup']"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li> -->
                        <!-- <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a  [routerLink]="['auth/signin']"><span class="glyphicon glyphicon-log-in"></span> Login</a></li> -->
                        <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['auth/logout']"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
                    </ul>
                    </div>
                </div>
            </nav>
    `
})
export class HeaderComponent {
    constructor(private authService: AuthService) {}
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
    removeCollapse(){
        $("#myNavbar").removeClass('in');
    }
}