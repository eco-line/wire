var app = angular.module("myApp", ["ngRoute","ngStorage"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/verify", {
        templateUrl : "verify.html",
        controller: 'verifyController'
    })
    .when("/userInfo", {
        templateUrl : "userInfo.html",
        controller: 'userController'
    })
    .when("/password", {
        templateUrl : "password.html",
        controller: 'passwordController'
    })
    .when("/team", {
        templateUrl : "team.html",
        controller: 'teamController'
    })
    .when("/teams/:name*", {
    
            templateUrl: 'teams/index.html',
            controller: 'teamMainController'
    
        })   
    .when("/login", {
    
            templateUrl: 'login/index.html',
            controller: 'loginController'
    
        })
    .when("/", {
        templateUrl : "main.html",
        controller: 'mainController'
    })
    .when("/verifyInvite/:email*/:code*", {
        templateUrl : "verifyInvite.html",
        controller: 'verifyInviteController'
    })     
});

