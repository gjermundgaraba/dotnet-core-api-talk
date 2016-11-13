import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class CallInput {
    show = "get";

    showGet = false;
    showPost = false;
    showPut = false;
    showDelete = false;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.messageReceivedSubscription = this.eventAggregator.subscribe('change-call-type', callType => {
            this.showGet = false;
            this.showPost = false;
            this.showPut = false;
            this.showDelete = false;

            switch (callType) {
                case 'get':
                    this.showGet = true;
                    break;
                case 'post':
                    this.showPost = true;
                    break;
                case 'put':
                    this.showPut = true;
                    break;
                case 'delete':
                    this.showDelete = true;
                    break;
            }
        });
    }

    detached() {
        this.messageReceivedSubscription.dispose();
    }
}