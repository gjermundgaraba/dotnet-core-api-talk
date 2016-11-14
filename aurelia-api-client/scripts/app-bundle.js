define('app',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.use.plugin('aurelia-materialize-bridge', function (b) {
      return b.useAll();
    });

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('url-service',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UrlService = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _servers, _dec, _class;

    var dotnetKey = "dotnet",
        nodeKey = "node";

    var servers = (_servers = {}, _servers[dotnetKey] = {
        name: "ASP.NET Core",
        baseUrl: "http://localhost:5000"
    }, _servers[nodeKey] = {
        name: "NodeJS",
        baseUrl: "http://localhost:5001"
    }, _servers);

    var UrlService = exports.UrlService = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function UrlService(eventAggregator) {
            _classCallCheck(this, UrlService);

            this.eventAggregator = eventAggregator;
            this.currentServerKey = dotnetKey;
            this.eventAggregator.publish('server-changed', servers[this.currentServerKey]);
        }

        UrlService.prototype.toggleServer = function toggleServer() {
            this.currentServerKey = this.currentServerKey === dotnetKey ? nodeKey : dotnetKey;
            this.eventAggregator.publish('server-changed', servers[this.currentServerKey]);
        };

        UrlService.prototype.getServer = function getServer() {
            return servers[this.currentServerKey];
        };

        return UrlService;
    }()) || _class);
});
define('call-input/call-base',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var CallBase = exports.CallBase = function () {
        function CallBase(urlService, eventAggregator, httpClient, callUri) {
            var _this = this;

            _classCallCheck(this, CallBase);

            this.urlService = urlService;
            this.eventAggregator = eventAggregator;
            this.httpClient = httpClient;
            this.callUri = callUri;

            this._setUrl(urlService.getServer().baseUrl);

            this.messageReceivedSubscription = this.eventAggregator.subscribe('server-changed', function (server) {
                _this._setUrl(server.baseUrl);
            });

            this.messageReceivedSubscription = this.eventAggregator.subscribe('change-call-type', function (server) {
                _this._resetAllFields();
            });
        }

        CallBase.prototype._setUrl = function _setUrl(baseUrl) {
            this.url = baseUrl + this.callUri;
        };

        CallBase.prototype._resetAllFields = function _resetAllFields() {};

        return CallBase;
    }();
});
define('call-input/call-input',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CallInput = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var CallInput = exports.CallInput = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function CallInput(eventAggregator) {
            var _this = this;

            _classCallCheck(this, CallInput);

            this.show = "get";
            this.showGet = false;
            this.showPost = false;
            this.showPut = false;
            this.showDelete = false;

            this.eventAggregator = eventAggregator;
            this.messageReceivedSubscription = this.eventAggregator.subscribe('change-call-type', function (callType) {
                _this.showGet = false;
                _this.showPost = false;
                _this.showPut = false;
                _this.showDelete = false;

                switch (callType) {
                    case 'get':
                        _this.showGet = true;
                        break;
                    case 'post':
                        _this.showPost = true;
                        break;
                    case 'put':
                        _this.showPut = true;
                        break;
                    case 'delete':
                        _this.showDelete = true;
                        break;
                }
            });
        }

        CallInput.prototype.detached = function detached() {
            this.messageReceivedSubscription.dispose();
        };

        return CallInput;
    }()) || _class);
});
define('call-output/call-output',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CallOutput = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var CallOutput = exports.CallOutput = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function CallOutput(eventAggregator) {
        var _this = this;

        _classCallCheck(this, CallOutput);

        this.eventAggregator = eventAggregator;

        var testObj = {
            test: 1234,
            kulest: "katrine"
        };
        this.serverResponse = JSON.stringify(testObj, null, 2);

        this.messageReceivedSubscription = this.eventAggregator.subscribe('call-done', function (output) {
            _this.serverResponse = output;
        });
    }) || _class);
});
define('call-selector/call-selector',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CallSelector = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var CallSelector = exports.CallSelector = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function CallSelector(eventAggregator) {
            _classCallCheck(this, CallSelector);

            this.eventAggregator = eventAggregator;
        }

        CallSelector.prototype.changeToGet = function changeToGet() {
            this.eventAggregator.publish('change-call-type', 'get');
        };

        CallSelector.prototype.changeToPost = function changeToPost() {
            this.eventAggregator.publish('change-call-type', 'post');
        };

        CallSelector.prototype.changeToPut = function changeToPut() {
            this.eventAggregator.publish('change-call-type', 'put');
        };

        CallSelector.prototype.changeToDelete = function changeToDelete() {
            this.eventAggregator.publish('change-call-type', 'delete');
        };

        return CallSelector;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('server/server',['exports', 'aurelia-framework', '../url-service'], function (exports, _aureliaFramework, _urlService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Server = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Server = exports.Server = (_dec = (0, _aureliaFramework.inject)(_urlService.UrlService), _dec(_class = function () {
        function Server(urlService) {
            _classCallCheck(this, Server);

            this.urlService = urlService;
            this.server = this.urlService.getServer();
        }

        Server.prototype.toggleServer = function toggleServer() {
            this.urlService.toggleServer();
            this.server = this.urlService.getServer();
        };

        return Server;
    }()) || _class);
});
define('call-input/delete-call/delete-call',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../url-service', 'aurelia-fetch-client', '../call-base'], function (exports, _aureliaFramework, _aureliaEventAggregator, _urlService, _aureliaFetchClient, _callBase) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DeleteCall = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var DeleteCall = exports.DeleteCall = (_dec = (0, _aureliaFramework.inject)(_urlService.UrlService, _aureliaEventAggregator.EventAggregator, _aureliaFetchClient.HttpClient), _dec(_class = function (_CallBase) {
        _inherits(DeleteCall, _CallBase);

        function DeleteCall(urlService, eventAggregator, httpClient) {
            _classCallCheck(this, DeleteCall);

            var _this = _possibleConstructorReturn(this, _CallBase.call(this, urlService, eventAggregator, httpClient, '/api/book'));

            _this.id = "<SET-ME>";
            return _this;
        }

        DeleteCall.prototype.executeCall = function executeCall() {
            var _this2 = this;

            this.httpClient.fetch(this.url + "/" + this.id, {
                method: 'delete'
            }).then(function (data) {
                _this2.eventAggregator.publish('call-done', "200 OK");
            }).catch(function (error) {
                _this2.eventAggregator.publish('call-done', error);
            });
        };

        DeleteCall.prototype._resetAllFields = function _resetAllFields() {
            this.id = "";
        };

        return DeleteCall;
    }(_callBase.CallBase)) || _class);
});
define('call-input/get-call/get-call',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../url-service', 'aurelia-fetch-client', '../call-base'], function (exports, _aureliaFramework, _aureliaEventAggregator, _urlService, _aureliaFetchClient, _callBase) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.GetCall = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var GetCall = exports.GetCall = (_dec = (0, _aureliaFramework.inject)(_urlService.UrlService, _aureliaEventAggregator.EventAggregator, _aureliaFetchClient.HttpClient), _dec(_class = function (_CallBase) {
        _inherits(GetCall, _CallBase);

        function GetCall(urlService, eventAggregator, httpClient) {
            _classCallCheck(this, GetCall);

            return _possibleConstructorReturn(this, _CallBase.call(this, urlService, eventAggregator, httpClient, '/api/book'));
        }

        GetCall.prototype.executeCall = function executeCall() {
            var _this2 = this;

            this.httpClient.fetch(this.url).then(function (response) {
                return response.json();
            }).then(function (data) {
                _this2.eventAggregator.publish('call-done', JSON.stringify(data, undefined, 2));
            }).catch(function (error) {
                _this2.eventAggregator.publish('call-done', error);
            });
        };

        return GetCall;
    }(_callBase.CallBase)) || _class);
});
define('call-input/post-call/post-call',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../url-service', 'aurelia-fetch-client', '../call-base'], function (exports, _aureliaFramework, _aureliaEventAggregator, _urlService, _aureliaFetchClient, _callBase) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PostCall = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var PostCall = exports.PostCall = (_dec = (0, _aureliaFramework.inject)(_urlService.UrlService, _aureliaEventAggregator.EventAggregator, _aureliaFetchClient.HttpClient), _dec(_class = function (_CallBase) {
        _inherits(PostCall, _CallBase);

        function PostCall(urlService, eventAggregator, httpClient) {
            _classCallCheck(this, PostCall);

            var _this = _possibleConstructorReturn(this, _CallBase.call(this, urlService, eventAggregator, httpClient, '/api/book'));

            _this.title = "";
            _this.author = "";
            _this.isbn = "";
            return _this;
        }

        PostCall.prototype.executeCall = function executeCall() {
            var _this2 = this;

            var postBody = {
                Title: this.title,
                Author: this.author,
                isbn: this.isbn
            };

            this.httpClient.fetch(this.url, {
                method: 'post',
                body: (0, _aureliaFetchClient.json)(postBody)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                _this2.eventAggregator.publish('call-done', JSON.stringify(data, undefined, 2));
            }).catch(function (error) {
                _this2.eventAggregator.publish('call-done', error);
            });
        };

        PostCall.prototype._resetAllFields = function _resetAllFields() {
            this.title = "";
            this.author = "";
            this.isbn = "";
        };

        return PostCall;
    }(_callBase.CallBase)) || _class);
});
define('call-input/put-call/put-call',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../url-service', 'aurelia-fetch-client', '../call-base'], function (exports, _aureliaFramework, _aureliaEventAggregator, _urlService, _aureliaFetchClient, _callBase) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PutCall = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var PutCall = exports.PutCall = (_dec = (0, _aureliaFramework.inject)(_urlService.UrlService, _aureliaEventAggregator.EventAggregator, _aureliaFetchClient.HttpClient), _dec(_class = function (_CallBase) {
        _inherits(PutCall, _CallBase);

        function PutCall(urlService, eventAggregator, httpClient) {
            _classCallCheck(this, PutCall);

            var _this = _possibleConstructorReturn(this, _CallBase.call(this, urlService, eventAggregator, httpClient, '/api/book'));

            _this.id = "<SET-ME>";
            _this.title = "";
            _this.author = "";
            _this.isbn = "";
            return _this;
        }

        PutCall.prototype.executeCall = function executeCall() {
            var _this2 = this;

            var putBody = {
                Title: this.title,
                Author: this.author,
                isbn: this.isbn
            };

            this.httpClient.fetch(this.url + "/" + this.id, {
                method: 'put',
                body: (0, _aureliaFetchClient.json)(putBody)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                _this2.eventAggregator.publish('call-done', JSON.stringify(data, undefined, 2));
            }).catch(function (error) {
                _this2.eventAggregator.publish('call-done', error);
            });
        };

        PutCall.prototype._resetAllFields = function _resetAllFields() {
            this.id = "<SET-ME>";
            this.title = "";
            this.author = "";
            this.isbn = "";
        };

        return PutCall;
    }(_callBase.CallBase)) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"materialize-css/css/materialize.css\"></require>\n  <require from=\"./server/server\"></require>\n  <require from=\"./call-selector/call-selector\"></require>\n  <require from=\"./call-output/call-output\"></require>\n  <require from=\"./call-input/call-input\"></require>\n\n  <div class=\"container\">\n    <div class=\"row green lighten-2  orange-text text-accent-4\">\n      <div class=\"col s12\">\n        <server></server>\n      </div>\n    </div>\n    <div class=\"row\">\n\n      <div class=\"col s3 teal lighten-3\">\n        <call-selector></call-selector>\n      </div>\n\n      <div class=\"col s9 teal lighten-3\">\n        <md-card md-title=\"Call Input\">\n          <call-input></call-input>\n        </md-card>\n        <md-card md-title=\"Call Output\">\n          <call-output></call-output>\n        </md-card>\n      </div>\n\n    </div>\n  </div>\n\n\n</template>"; });
define('text!call-output/call-output.html', ['module'], function(module) { module.exports = "<template>\n    <pre>${serverResponse}</pre>\n</template>"; });
define('text!call-input/call-input.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./get-call/get-call\"></require>\n    <require from=\"./post-call/post-call\"></require>\n    <require from=\"./put-call/put-call\"></require>\n    <require from=\"./delete-call/delete-call\"></require>\n    \n    <get-call if.bind=\"showGet\"></get-call>\n    <post-call if.bind=\"showPost\"></post-call>\n    <put-call if.bind=\"showPut\"></put-call>\n    <delete-call if.bind=\"showDelete\"></delete-call>\n</template>"; });
define('text!call-selector/call-selector.html', ['module'], function(module) { module.exports = "<template>\n    <p>\n        <button md-button click.delegate=\"changeToGet()\">GET /books</button>\n    </p>\n    <p>\n        <button md-button click.delegate=\"changeToPost()\">POST /books</button>\n    </p>\n    <p>\n        <button md-button click.delegate=\"changeToPut()\">PUT /books/id</button>\n    </p>\n    <p>\n        <button md-button click.delegate=\"changeToDelete()\">DELETE /books/id</button>\n    </p>\n</template>"; });
define('text!server/server.html', ['module'], function(module) { module.exports = "<template>\n    <div style=\"position: relative\">\n        <button md-button class=\"teal lighten-1 right\" \n                style=\"position: absolute; top: 50%; transform: translateY(-50%); right: 0;\"\n                click.delegate=\"toggleServer()\">Toggle Server</button> \n        <h2>\n            <span>Server: ${server.name} (${server.baseUrl})</span>\n        </h2>\n    </div>\n</template>"; });
define('text!call-input/delete-call/delete-call.html', ['module'], function(module) { module.exports = "<template>\n    <h3>DELETE ${url}/${id}</h3>\n    <md-input md-label=\"Id\" md-value.bind=\"id\"></md-input>\n    <button md-button click.delegate=\"executeCall()\">Execute Call</button>\n</template>"; });
define('text!call-input/get-call/get-call.html', ['module'], function(module) { module.exports = "<template>\n    <h3>GET ${url}</h3>\n    <button md-button click.delegate=\"executeCall()\">Execute Call</button>\n</template>"; });
define('text!call-input/post-call/post-call.html', ['module'], function(module) { module.exports = "<template>\n    <h3>POST ${url}</h3>\n    <md-input md-label=\"Title\" md-value.bind=\"title\"></md-input>\n    <md-input md-label=\"Author\" md-value.bind=\"author\"></md-input>\n    <md-input md-label=\"ISBN\" md-value.bind=\"isbn\"></md-input>\n    <button md-button click.delegate=\"executeCall()\">Execute Call</button>\n</template>"; });
define('text!call-input/put-call/put-call.html', ['module'], function(module) { module.exports = "<template>\n    <h3>PUT ${url}/${id}</h3>\n    <md-input md-label=\"Id\" md-value.bind=\"id\"></md-input>\n    <md-input md-label=\"Title\" md-value.bind=\"title\"></md-input>\n    <md-input md-label=\"Author\" md-value.bind=\"author\"></md-input>\n    <md-input md-label=\"ISBN\" md-value.bind=\"isbn\"></md-input>\n    <button md-button click.delegate=\"executeCall()\">Execute Call</button>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map