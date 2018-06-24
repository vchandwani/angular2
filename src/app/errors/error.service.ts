import { EventEmitter } from "@angular/core";

import { Error } from "./error.model";

export class ErrorService {
    errorOccurred = new EventEmitter<Error>();

    handleError(error: any, status?:any) {
        const errorData = new Error(error.title, error.error.message,false,status);
        this.errorOccurred.emit(errorData);
    }
    handleSuccess(error: any,status?:any) {
        const successData = new Error(error.title,'',true,status);
        this.errorOccurred.emit(successData);
    }
}