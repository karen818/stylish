function getText(){
    window.onload = function() {
    		var fileInput = document.getElementById('fileInput');
    		var fileDisplayArea = document.getElementById('fileDisplayArea');

    		fileInput.addEventListener('change', function(e) {
    			var file = fileInput.files[0];
    			var textType = /text.*/;

    			if (file.type.match(textType)) {
    				var reader = new FileReader();

    				reader.onload = function(e) {
                        console.log(reader.result);
    					fileDisplayArea.innerText = reader.result;
    				}

    				reader.readAsText(file);
    			} else {
    				fileDisplayArea.innerText = "File not supported!"
    			}
    		});
    }
}



var app = angular.module("contriApp", []);

app.controller("TextController", function($scope, $http){
    $scope.view = {};
    $scope.newTextUpload = {};
    $scope.newTextPaste = {};
    $scope.view.textFiles = [];

    $scope.getTextUpload = function(newPost){
        $scope.newTextUpload = {};
        // newTextUpload.textUpload = ;
        $scope.view.textFiles.push(newTextUpload);

        var reader = new FileReader();
    }

    var textString = getText();
    $http({
      method: 'GET',
      url: "http://52.207.252.14:5000/v1.0.0/return_author_probability?txt=" + textString
    }).then(function successCallback(response) {
        
        $scope.view.authors = [];
        var authors = response.data.results;
        $scope.view.firstName = response.data.results[0].first_name;
        $scope.view.lastName = response.data.results[0].last_name;
        $scope.view.prob = response.data.results[0].prob;
        console.log($scope.view.firstName );
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
          console.log('error');
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });


    $scope.view.authors = [
        {
            authorName: "Stephen King",
            authorUrl: "http://www.writersedit.com/wp-content/uploads/2015/01/stephen-king.jpg",
            authorBio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            books: [
                { bookTitle: "It",
                  bookLink: "https://www.goodreads.com/book/show/830502.It"
                }
          ]
        }
    ];

    $scope.showUploadForm = function(form){
        console.log(form);
        $scope.showUploadForm=!$scope.showUploadForm;
    }

    $scope.showPasteForm = function(form){
        console.log(form);
        $scope.showPasteForm=!$scope.showPasteForm;
    }

    $scope.uploadText = function(newUpload){

    }

    $scope.pasteText = function(newPaste){

    }
});

//
// $(function() {
//     console.log( "ready!" );
//     $.ajax({
//         url: 'https://www.goodreads.com/search.xml?key=7FR037rUMaacRnUp5JJULw&q=Stephen+King',
//         type: "GET",
//         dataType: 'xml',
//     }).done(function(data){
//         // var authors = [];
//         // var author = data.search.results.work.author.name;
//         console.log(data);
//     });
// });


$(document).ready(function(){

});
