window.app = angular.module('app', []);

app.service('notesService', function () {
    var data;

    return {
        notes:function () {
            // This exposed private data
            return data;
        },
        addNote:function (noteTitle) {
            // This is a public function that modifies private data
            data = noteTitle;
        },
        deleteNote:function (id) {
            // This is a public function that modifies private data
        }
    };
});

app.controller('ListCtrl', ['$scope', '$http', 'notesService', function (s, h, n) {
    var papers = n.notes();
        for (var i = 0; i < papers.length; i++) {
            papers[i]['link'] = '#/singlePaper/'+i;
        };
    s.papers = papers;
}]);

app.controller('DetailCtrl', ['$scope', '$http', '$routeParams', function (s, h, r) {
    h.get('paperWitch/' + r.id).success(function (data) {
        // var jsonRefArray, jsonCiteArray;
        // s.title = data['title'];
        // s.link = data['url'];
        // jsonRefArray = data['jsonRefArray'];
        // jsonCiteArray = data['jsonCiteArray'];
        // s.refArray = jsonRefArray;
        // s.citeArray = jsonCiteArray;
        h.get('gettfidf').success(function (data){
            // var tfArray = data;
            // s.tfArray = tfArray;
            var dicResultLevel = data['resultUse']
            var dicResultDict = data['levelDict']
            //var result0 = dicResultLevel['0']
            var result1 = dicResultLevel['1']
            var result2 = dicResultLevel['2']
            var leve1 = dicResultDict['1']
            var leve2 = dicResultDict['2']
            s.level1 = leve1
            s.level2 = leve2
            s.resutt0 = result0
            s.resutt1 = result1
            s.resutt2 = result2

        });
    });
}]);

app.controller('DetailCtrl2', ['$scope', '$http', function (s, h) {
    h.get('gettfidftwo').success(function (data){
        // var tfArray = data;
        // s.tfArray = tfArray;
        var dicResultLevel = data['resultUse']
        var dicResultDict = data['levelDict']
        //var result0 = dicResultLevel['0']
        // var result1 = dicResultLevel['1']
        // var result2 = dicResultLevel['2']
        // var result3 = dicResultLevel['3']

        var leve1 = dicResultDict['1']
        var leve2 = dicResultDict['2']
        var leve3 = dicResultDict['3']
        s.level1 = leve1
        s.level2 = leve2
        s.level3 = leve3
        s.result1 = dicResultLevel['1']
        s.result2 = dicResultLevel['2']
        s.result3 = dicResultLevel['3']

    });
}]);

app.controller('SearchCtrl', ['$scope', '$http', '$location', 'notesService', function (s, h, l, n) {
    s.search = function () {
        h.get('findPaper?q='+this.searchText).success(function (data){
            n.addNote(data);
            l.path('/list');    
        });
        
    };
}]);


app.config(function ($routeProvider) {
    $routeProvider.when('/list', {
        controller: 'ListCtrl',
        templateUrl: 'templates/result.html'
    }).when('/singlePaper/:id', {
        controller: 'DetailCtrl',
        templateUrl: 'templates/detail.html'
    }).when('/testuse', {
        controller: 'DetailCtrl2',
        templateUrl: 'templates/detail.html'
    }).otherwise({
        redirectTo: '/'
    });
});