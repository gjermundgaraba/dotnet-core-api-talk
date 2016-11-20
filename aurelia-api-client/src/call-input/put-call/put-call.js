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

        let savedResponse;
        this.httpClient.fetch(this.url + "/" + this.id, {
            method: 'put',
            body: json(putBody)
        })
            .then(response => {
                savedResponse = response;
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
            })
            .then(json => {
                if (json) {
                    this.eventAggregator.publish('call-done', JSON.stringify(json, undefined, 2));
                } else {
                    this.eventAggregator.publish('call-done', savedResponse.status + " " + savedResponse.statusText);
                }
            })
            .catch(error => {
                console.log("caught?");
                this.eventAggregator.publish('call-done', error);
            });
    }

    _resetAllFields() {
        this.id = "<SET-ME>";
        this.title = "";
        this.author = "";
        this.isbn = "978-3-16-148410-0";
    }

}