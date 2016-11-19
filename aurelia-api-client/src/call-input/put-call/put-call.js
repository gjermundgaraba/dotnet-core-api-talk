import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { UrlService } from '../../url-service';
import { HttpClient, json } from 'aurelia-fetch-client';
import { CallBase } from '../call-base'

@inject(UrlService, EventAggregator, HttpClient)
export class PutCall extends CallBase {

    id = "<SET-ME>";
    title = "";
    author = "";
    isbn = "978-3-16-148410-0";

    constructor(urlService, eventAggregator, httpClient) {
        super(urlService, eventAggregator, httpClient, '/api/books');
    }

    executeCall() {
        const putBody = {
            title: this.title,
            author: this.author,
            isbn: this.isbn
        };

        this.httpClient.fetch(this.url + "/" + this.id, {
            method: 'put',
            body: json(putBody)
        })
            .then(response => response.json())
            .then(data => {
                this.eventAggregator.publish('call-done', JSON.stringify(data, undefined, 2));
            })
            .catch(error => {
                this.eventAggregator.publish('call-done', error);
            });
    }

    _resetAllFields() {
        this.id = "<SET-ME>";
        this.title = "";
        this.author = "";
        this.isbn = "";
    }

}