
function getUploadText(){
    window.onload = function() {
    		var fileInput = document.getElementById('fileInput');

    		fileInput.addEventListener('change', function(e) {
    			var file = fileInput.files[0];
    			var textType = /text.*/;

    			if (file.type.match(textType)) {
    				var reader = new FileReader();

    				reader.onload = function(e) {
                        console.log(reader.result);
    				}

    				reader.readAsText(file);
    			} else {
    				fileDisplayArea.innerText = "File not supported!"
    			}
    		});
    }
}


var app = angular.module("contriApp", []);

app.filter('ratingFilter', function() {
   return function (input) {

     var ratingImg = { 0 : "./images/star-0.png",
                       1 : "./images/star-1.png",
                       2 : "./images/star-23.png",
                       3 : "./images/star-23.png",
                       4 : "./images/star-4.png",
                       5 : "./images/star-5.png"
                     };

     var ratingNumber =  Math.round(input * 5);
     var output = ratingImg[ratingNumber];
     return output;
   };
 });

app.controller("TextController", function($scope, $http){
    $scope.view = {};
    $scope.newTextUpload = {};
    $scope.newTextPaste = {};
    $scope.view.textFiles = [];

    $scope.getTextUpload = function(newPost){
        $scope.newTextUpload = {};
        // newTextUpload.textUpload = ;
        $scope.view.textFiles.push(newTextUpload);
    }

    var fileString = getUploadText();
    $http({
      method: 'GET',
      url: "http://52.207.252.14:5000/v1.0.0/return_author_probability?txt=" + fileString
    }).then(function successCallback(response) {

        $scope.view.authorsArray = response.data.results;
        console.log($scope.view.authorsArray);


        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
          console.log('error');
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

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



// });
