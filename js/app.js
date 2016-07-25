
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
                    return reader.result;
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
        $scope.view.results=!$scope.view.results;
        var fileString = getUploadText();
        console.log(fileString);
        $http({
          method: 'GET',
          url: "http://52.207.252.14:5000/v1.0.0/return_author_probability?txt=" + fileString
        }).then(function successCallback(response) {
            console.log("http://52.207.252.14:5000/v1.0.0/return_author_probability?txt=" + fileString);
            $scope.view.authorsArray = response.data.results;

          }, function errorCallback(response) {
              console.log('error');
          });
    }

    $scope.view.pasteText = function(newPaste){
        $scope.view.results=!$scope.view.results;
        var fileString = $scope.newPasteUpload;

        $http({
          method: 'GET',
          url: "http://52.207.252.14:5000/v1.0.0/return_author_probability?txt=" + fileString
        }).then(function successCallback(response) {
            $scope.view.authorsArray = response.data.results;
            var authors = response.data.results;
            authors.forEach(function(author){
                var firstName = author.first_name;
                var lastName = author.last_name;
                var authorQueryString = firstName + '%20' + lastName;
                var searchUrl = "https://www.goodreads.com/api/author_url/" + authorQueryString + "?key=7FR037rUMaacRnUp5JJULw";
            $http.get( searchUrl,
                {transformResponse:function(data) {
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json( data );
                        var authorID = json.GoodreadsResponse.author._id;
                        console.log(authorID);
                        var idUrl = "https://www.goodreads.com/author/show/" + authorID + "?format=xml&key=7FR037rUMaacRnUp5JJULw";
                        $http.get(idUrl,
                        {transformResponse:function(data){
                            var x2js = new X2JS();
                            var json = x2js.xml_str2json( data );
                            var authorBio = json.GoodreadsResponse.author.about;
                            console.log(authorBio);
                            var authorImg = json.GoodreadsResponse.author.image_url;
                            console.log(authorImg);
                            var authorLink = json.GoodreadsResponse.author.link;
                            console.log(authorLink);
                            var books = json.GoodreadsResponse.books;
                            console.log(books);

                        }

                        })
                        }

            }).then(function successCallback(data){

            });

          });
      });
  }
});
