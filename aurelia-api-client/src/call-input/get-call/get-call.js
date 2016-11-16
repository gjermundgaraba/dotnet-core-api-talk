import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { UrlService } from '../../url-service';
import { HttpClient } from 'aurelia-fetch-client';
import { CallBase } from '../call-base'

@inject(UrlService, EventAggregator, HttpClient)
export class GetCall extends CallBase {

    constructor(urlService, eventAggregator, httpClient) {
        super(urlService, eventAggregator, httpClient, '/api/books');
    }

    executeCall() {
        this.httpClient.fetch(this.url)
            .then(response => response.json())
            .then(data => {
                this.eventAggregator.publish('call-done', JSON.stringify(data, undefined, 2));
            })
            .catch(error => {
                this.eventAggregator.publish('call-done', error);
            });
    }

}