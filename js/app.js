
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

app.controller("TextController", function($scope, $http){
    $scope.view = {};
    $scope.newTextUpload = {};
    $scope.newTextPaste = {};
    $scope.view.textFiles = [];




    $scope.view.showUploadForm = function(){
        console.log('upload');
        $scope.showUploadForm=!$scope.showUploadForm;
    }

    $scope.view.showPasteForm = function(){
        console.log('paste');
        $scope.showPasteForm=!$scope.showPasteForm;
    }

    $scope.view.uploadText = function(newUpload){
        var fileString = getUploadText();
        console.log(fileString);
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

    }

    $scope.view.pasteText = function(newPaste){

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
