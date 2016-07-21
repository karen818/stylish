var app = angular.module("contriApp", []);

app.controller("TextController", function($scope){
    $scope.view = {};
    $scope.newTextUpload = {};
    $scope.newTextPaste = {};

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
  $("#dvContent").append("<ul></ul>");
  $.ajax({
    type: "GET",
    url: "https://www.goodreads.com/search.xml?key=7FR037rUMaacRnUp5JJULw&q=Stephen+King",
    dataType: "xml",
    success: function(xml){
    $(xml).find('work').each(function(){
      var authorID = $(this).find('author id').text();

      var author = $(this).find('name').text();
      $("<li></li>").html(author).appendTo("#dvContent ul");
    });
  },
  error: function() {
    alert("An error occurred while processing XML file.");
  }
  });
});
