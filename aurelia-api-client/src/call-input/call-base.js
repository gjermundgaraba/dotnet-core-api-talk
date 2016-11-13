
export class CallBase {

    constructor(urlService, eventAggregator, httpClient, callUri) {
        this.urlService = urlService;
        this.eventAggregator = eventAggregator;
        this.httpClient = httpClient;
        this.callUri = callUri;

        this._setUrl(urlService.getServer().baseUrl);

        this.messageReceivedSubscription = this.eventAggregator.subscribe('server-changed', server => {
            this._setUrl(server.baseUrl);
        });

        this.messageReceivedSubscription = this.eventAggregator.subscribe('change-call-type', server => {
            this._resetAllFields();
        });
    }

    _setUrl(baseUrl) {
        this.url = baseUrl + this.callUri;
    }

    _resetAllFields() {
        
    }

}