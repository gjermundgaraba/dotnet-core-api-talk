# dotnet-core-api-talk
All code for my .NET Core API talk

The premise of the talk was to find out if .NET core (ASP.NET Core) can be a good solution for your REST API's.

I also wrote a blog post about the same topic (based on the talk, in fact):
[http://www.gjermundbjaanes.com/dot-net-core-for-your-web-apis/](http://www.gjermundbjaanes.com/dot-net-core-for-your-web-apis/)

![Client Screenshot](https://github.com/bjaanes/dotnet-core-api-talk/raw/master/aurelia_client_screenshot.png "Client Screenshot")

# Prerequisites 

* NodeJS
* .NET Core SDK
* MongoDB

# Set up aurelia-api-client

Install Aurelia CLI:

```npm install aurelia-cli -g```

Install dependencies:

```npm install```

Run the application:

```au run```


# Set up aspnet-core-api

Install dependencies:

```dotnet restore```

Build:

```dotnet build```

Run the aspnet-core-api server (will also build):

```dotnet run```

# Set up node-api

Install dependencies:

```npm install```

Run the node-api server:

```npm start```

# Set up java-api

You have to have Java and Maven installed before running this.

Build:

```mvn clean install```

Run:

```java -jar target/java-api.jar```
