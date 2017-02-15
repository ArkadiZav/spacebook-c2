var posts = [];
var currentId = 1;

var addPost = function(textinput) {
  var post = {text: textinput, id: currentId};
  currentId++;
  posts.push(post);
  console.log(posts);
};

var updatePosts = function() {
  $(".posts").empty();
  for (var i = 0; i < posts.length; i++) {
    $(".posts").append("<p class = 'post' data-id = " +(posts[i].id) + ">" + "<a href = '#' class = 'remove'>" + "Remove </a>" + posts[i].text + "</p>");
  }
};

var postHandler = function() {
  var text = $("#post-name").val();
  $(".add-post").on("click", addPost(text));
  updatePosts();
};

var removeHandler = function() {
  var currentCommentId = $(this).parent().data().id;
  for(var i = 0; i < posts.length; i++) {
    if(posts[i].id === currentCommentId) {
      posts.splice(i, 1);
      break;
    }
}
  $(this).parent().remove();
//  $(".post[data-id=" + currentCommentId + "]").remove();
};

$(".add-post").on("click", postHandler);
$(".posts").on("click", "a", removeHandler);
