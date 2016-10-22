// app.js
(function(){
angular.module('playApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider,$httpProvider,$sceProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller:'homeCtrl'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit   
            url: '/about',
            templateUrl: 'templates/about.html'    
        })

        .state('play', {
            // we'll get to this in a bit  
            //myparams: {'myparams':null},
            // abstract:true,
            url: '/play',
            views:{
            '':{templateUrl: 'templates/play.html',
                 controller:'playCtrl'},
            'youtubeview@play':{
            templateUrl:'templates/youtube.html',
            controller:'youtubeCtrl'}} 
        })

        .state('addSong',{
            url:'/addSong',
            templateUrl:'templates/addSong.html'
        });
        
        
});
}());

