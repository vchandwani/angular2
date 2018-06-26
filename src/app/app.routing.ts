import { Routes, RouterModule } from "@angular/router";
import { ContentInfoComponent } from "./contents/contentInfo.component";
import { ContentsComponent } from "./contents/contents.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: ContentInfoComponent },    
    { path: 'contents', component: ContentsComponent },    
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);