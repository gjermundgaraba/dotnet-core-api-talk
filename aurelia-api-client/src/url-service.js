import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

const dotnetKey = "dotnet",
    nodeKey = "node";

const servers = {
    [dotnetKey]: {
        name: "ASP.NET Core",
        baseUrl: "http://localhost:5000"
    },
    [nodeKey]: {
        name: "NodeJS",
        baseUrl: "http://localhost:5001"
    }
};




@inject(EventAggregator)
export class UrlService {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.currentServerKey = dotnetKey;
        this.eventAggregator.publish('server-changed', servers[this.currentServerKey]);
    }

    toggleServer() {
        this.currentServerKey = this.currentServerKey === dotnetKey ? nodeKey : dotnetKey;
        this.eventAggregator.publish('server-changed', servers[this.currentServerKey]);
    }

    getServer() {
        return servers[this.currentServerKey];
    }
}