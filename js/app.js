
function getUploadText(){
    window.onload = function() {
    		var fileInput = document.getElementById('fileInput');
            var fileSubmit = document.getElementById('uploadBtn');
    		var fileDisplayArea = document.getElementById('fileDisplayArea');

    		fileSubmit.addEventListener('click', function(e) {
    			var file = fileInput.files[0];
    			var textType = /text.*/;

    			if (file.type.match(textType)) {
    				var reader = new FileReader();

    				reader.onload = function(e) {
                        // console.log(reader.result)
    					return reader.result;
    				}

    				reader.readAsText(file);
    			} else {
    				fileDisplayArea.innerText = "File not supported!"
    			}
    		});
    }

}
// getUploadText();



var app = angular.module("contriApp", []);

app.controller("TextController", function($scope, $http){
    var fileString = getUploadText();
    console.log(fileString);
    $scope.view = {};
    $scope.newTextUpload = {};
    $scope.newTextPaste = {};
    $scope.view.textFiles = [];

    $scope.view.showUploadForm = function(){
        $scope.showUploadForm=!$scope.showUploadForm;
    }

    $scope.view.showPasteForm = function(){
        $scope.showPasteForm=!$scope.showPasteForm;
    }

    $scope.view.uploadText = function(){
        $scope.view.results=!$scope.view.results;

        $http({
          method: 'GET',
          url: "http://52.207.252.14:5000/v1.0.0/return_author_probability?txt="
        }).then(function successCallback(response) {
            $scope.view.authorsArray = response.data.results;
            var authors = response.data.results;
            authors.forEach(function(author){
                var firstName = author.first_name;
                var lastName = author.last_name;
                var authorQueryString = firstName + '%20' + lastName;
                var searchUrl = "https://crossorigin.me/https://www.goodreads.com/api/author_url/" + authorQueryString + "?key=7FR037rUMaacRnUp5JJULw";
            $http.get( searchUrl,
                {transformResponse:function(data) {
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json( data );
                        var authorID = json.GoodreadsResponse.author._id;

                        var idUrl = "https://crossorigin.me/https://www.goodreads.com/author/show/" + authorID + "?format=xml&key=7FR037rUMaacRnUp5JJULw";
                        $http.get(idUrl,
                        {transformResponse:function(data){
                            var x2js = new X2JS();
                            var json = x2js.xml_str2json( data );
                            var authorDetails = {
                                };
                            authorDetails.authorBio = json.GoodreadsResponse.author.about;

                            authorDetails.authorImg = json.GoodreadsResponse.author.image_url;

                            authorDetails.authorLink = json.GoodreadsResponse.author.link;

                            author.authorDetails = authorDetails;

                        }

                        })
                        }

            }).then(function successCallback(data){

            });

          });
      });//here
    }

    $scope.view.pasteText = function(){
        $scope.view.results=!$scope.view.results;
        var fileString = $scope.newPasteUpload;
        console.log(fileString);

        var req = {
             method: 'GET',
             url: 'http://52.207.252.14:5000/v1.0.0/return_author_probability?txt=' + fileString,
             dataType: 'json',
             contentType: "application/json",

             data: { txt: fileString }
            }

        $http(req)
         .then(function successCallback(response) {
            $scope.view.authorsArray = response.data.results;
            console.log($scope.view.authorsArray);
            var authors = response.data.results;
            authors.forEach(function(author){
                var firstName = author.first_name;
                var lastName = author.last_name;
                var authorQueryString = firstName + '%20' + lastName;
                var searchUrl = "https://crossorigin.me/https://www.goodreads.com/api/author_url/" + authorQueryString + "?key=7FR037rUMaacRnUp5JJULw";
            $http.get( searchUrl,
                {transformResponse:function(data) {
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json( data );
                        var authorID = json.GoodreadsResponse.author._id;
                        console.log(authorID);
                        var idUrl = "https://crossorigin.me/https://www.goodreads.com/author/show/" + authorID + "?format=xml&key=7FR037rUMaacRnUp5JJULw";
                        $http.get(idUrl,
                        {transformResponse:function(data){
                            var x2js = new X2JS();
                            var json = x2js.xml_str2json( data );
                            var authorDetails = {
                                };
                            authorDetails.authorBio = json.GoodreadsResponse.author.about;

                            authorDetails.authorImg = json.GoodreadsResponse.author.image_url;

                            authorDetails.authorLink = json.GoodreadsResponse.author.link;

                            author.authorDetails = authorDetails;


                        }

                        })
                        }

            }).then(function successCallback(data){

            });

          });
      });//here
  }
});
