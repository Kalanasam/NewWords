var myApp = angular.module('myApp',[])

myApp.service('HistoryService',function ($http){
    var baseUrl = "http://localhost:8080/"

    this.saveWord = function(newWord){
        var url = baseUrl + "saveCurrent"
        return $http.post(url, {word: newWord})

    }

    this.getSaved = function(newWord){
            var url = baseUrl + "getSaved"
            return $http.get(url)

        }

})

myApp.controller('MyController',function($scope, HistoryService){
    $scope.newWord = 'cat'
    $scope.words = []

    $scope.saveThisWord = function(){
        HistoryService.saveWord($scope.newWord)
        .then(saveSuccess, error)
        }

        $scope.getSavedWords = function (){
            HistoryService.getSaved()
            .then(loadSuccess, error)

        }

        function loadSuccess (json){
            $scope.words = json.data
        }

        function saveSuccess (json){
            console.log(json)
        }

        function error (err){
            console.log(err)
        }



})