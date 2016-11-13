import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class CallOutput {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;

        this.messageReceivedSubscription = this.eventAggregator.subscribe('call-done', output => {
            this.serverResponse = output;
        });
    }
    
}