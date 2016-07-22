$(function() {
    console.log( "ready!" );

    $.ajax({
    type: 'GET',
    dataType: 'json',
    url: "http://52.207.252.14:5000/v1.0.0/return_author_probability?txt=blah%20blah%20blah"
}).then (function(data){
        var authors = data.results;
        authors.forEach(function(author){
            var firstName = author.first_name;
            var lastName = author.last_name;
            var probability = author.prob;
            console.log(author);
            $("<li></li>").html(firstName + " " + lastName + " " + probability*100).appendTo("#dvContent ul");
            var authorQueryString = firstName + '%20' + lastName;
            console.log(authorQueryString);
            var searchUrl = "https://www.goodreads.com/api/author_url/" + authorQueryString + "?key=7FR037rUMaacRnUp5JJULw";
            authorQueryRequest = $.ajax({
                type: "GET",
                dataType: 'xml',
                url: searchUrl
        }).then(function (data) {
              $(data).find('author').each(function(){
                //   console.log(data);
                  var authorID = $(this).attr('id');
                  var authorLink = $(this).find('link').text();
                  $("#link").attr('href', authorLink)
                //   $("<li></li>").html(authorID).appendTo("#dvContent ul");
                  $.ajax({
                      type: 'GET',
                      dataType: 'xml',
                      url: "https://www.goodreads.com/author/show/" + authorID + "?format=xml&key=7FR037rUMaacRnUp5JJULw"
                  }).then(function(data){
                      console.log("done");
                      var authorPic = $(data).find('author>image_url').html();
                      authorPic = authorPic.replace("<![CDATA[", "").replace("]]>", "");
                      console.log(authorPic);
                      $("<li></li>").html('<img src="' + authorPic + '" />').appendTo("#dvContent ul");
                    //   $("#picture").attr("src", authorPic);
                  });
              });
          });

        });
    });
});

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


$(document).ready(function(){

});
// });
