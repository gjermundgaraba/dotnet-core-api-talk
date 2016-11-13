import { inject } from 'aurelia-framework';
import { UrlService } from '../url-service';

@inject(UrlService)
export class Server {

    constructor(urlService) {
        this.urlService = urlService;
        this.server = this.urlService.getServer();
    }

    toggleServer() {
        this.urlService.toggleServer();
        this.server = this.urlService.getServer();
    }
}