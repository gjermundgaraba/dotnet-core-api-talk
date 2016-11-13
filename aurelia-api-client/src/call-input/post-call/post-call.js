import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { UrlService } from '../../url-service';
import { HttpClient, json } from 'aurelia-fetch-client';
import { CallBase } from '../call-base'

@inject(UrlService, EventAggregator, HttpClient)
export class PostCall extends CallBase {

    title = "";
    author = "";
    isbn = "";

    constructor(urlService, eventAggregator, httpClient) {
        super(urlService, eventAggregator, httpClient, '/api/book');
    }

    executeCall() {
        const postBody = {
            Title: this.title,
            Author: this.author,
            isbn: this.isbn
        };

        this.httpClient.fetch(this.url, {
            method: 'post',
            body: json(postBody)
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
        this.title = "";
        this.author = "";
        this.isbn = "";
    }

}