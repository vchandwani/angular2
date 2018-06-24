import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable, BehaviorSubject } from "rxjs";
import API from '../../core/api';
import { Content } from "./content.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class ContentService {
    private contents: Content[] = [];
    contentIsEdit = new EventEmitter<Content>();

    constructor(private http: Http, private errorService: ErrorService) {
    }

    addContent(content: Content) {
        const body = JSON.stringify(content);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(API.api_url + API.content + token, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const content = new Content(
                    result.obj.content,
                    result.obj.location);
                if (content) {
                    this.errorService.handleSuccess(response.json(), response.status);
                    return content;
                }
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json(), error.status);
                return Observable.throw(error.json());
            });
    }

    getContents() {
        return this.http.get(API.api_url + API.content)
            .map((response: Response) => {
                const contents = response.json().obj;
                let transformedContent: Content[] = [];
                for (let content of contents) {
                    transformedContent.push(new Content(
                        content.content,
                        content.location)
                    );
                }
                this.contents = transformedContent;
                return transformedContent;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json(), error.status);
                return Observable.throw(error.json());
            });
    }

    editContent(content: Content) {
        this.contentIsEdit.emit(content);
    }

    updateContent(content: Content) {
        const body = JSON.stringify(content);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(API.api_url + API.content + '/' + content.location + token, body, { headers: headers })
            .map((response: Response) => {
                this.errorService.handleSuccess(response.json(), response.status);
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json(), error.status);
                return Observable.throw(error.json());
            });
    }

    deleteContent(content: Content) {
        this.contents.splice(this.contents.indexOf(content), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(API.api_url + API.content + '/' + content.location + token)
            .map((response: Response) => {
                this.errorService.handleSuccess(response.json(), response.status);
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json(), error.status);
                return Observable.throw(error.json());
            });
    }
}