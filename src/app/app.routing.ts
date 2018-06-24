import { Routes, RouterModule } from "@angular/router";
import { ContentComponent } from "./content/content.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";

const APP_ROUTES: Routes = [
    { path: '', component: ContentComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);