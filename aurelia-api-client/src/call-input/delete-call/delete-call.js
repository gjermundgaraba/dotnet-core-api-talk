import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { UrlService } from '../../url-service';
import { HttpClient, json } from 'aurelia-fetch-client';
import { CallBase } from '../call-base'

@inject(UrlService, EventAggregator, HttpClient)
export class DeleteCall extends CallBase {

    id = "<SET-ME>";

    constructor(urlService, eventAggregator, httpClient) {
        super(urlService, eventAggregator, httpClient, '/api/book');
    }

    executeCall() {
        this.httpClient.fetch(this.url + "/" + this.id, {
            method: 'delete'
        })
            .then(data => {
                this.eventAggregator.publish('call-done', "200 OK");
            })
            .catch(error => {
                this.eventAggregator.publish('call-done', error);
            });
    }

    _resetAllFields() {
        this.id = "";
    }

}