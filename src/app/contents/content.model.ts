export class Content {
    content: string;
    location: string;
    contentId?: string;

    constructor(content: string, location: string,contentId?: string,) {
        this.content = content;
        this.location = location;
        this.contentId = contentId;
    }
}