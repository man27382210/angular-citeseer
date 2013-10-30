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
        console.log(data);
        var jsonRefArray, jsonCiteArray;
        s.title = data['title'];
        s.link = data['url'];
        jsonRefArray = data['jsonRefArray'];
        jsonCiteArray = data['jsonCiteArray'];
        s.refArray = jsonRefArray;
        s.citeArray = jsonCiteArray;
        h.get('gettfidf').success(function (data){
            var tfArray = data;
            s.tfArray = tfArray;
        });
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
    }).otherwise({
        redirectTo: '/'
    });
});