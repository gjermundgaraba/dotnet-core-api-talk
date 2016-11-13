import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class CallSelector {

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    changeToGet() {
        this.eventAggregator.publish('change-call-type', 'get');
    }

    changeToPost() {
        this.eventAggregator.publish('change-call-type', 'post');
    }

    changeToPut() {
        this.eventAggregator.publish('change-call-type', 'put');
    }

    changeToDelete() {
        this.eventAggregator.publish('change-call-type', 'delete');
    }


}