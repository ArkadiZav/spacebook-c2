var posts = [];
var currentPostId = 1;

var addPost = function(textinput){
  var post = {text: textinput, id: currentPostId, comments : []};
  posts.push(post);
};

var updatePosts = function() {
  $(".posts").empty();
  for (var i = 0; i < posts.length; i++) {
    currentPostId = i + 2;
    $(".posts").append("<p class = 'post' data-id = " +(i+1)+ ">" + "<a href = '#' class = 'remove'>" +
      "Remove post</a>" + '&nbsp &nbsp &nbsp &nbsp' + posts[i].text + "</p>");
      for (var j = 0; j < posts[i].comments.length; j++) {
        var currentUser = posts[i].comments[j].user;
        var currentComment = posts[i].comments[j].thecomment;
        $(".posts").append("<p class = 'usercomment'>" + currentUser + "<span>: " + currentComment + "</span><br></p>");
      }
    $(".posts").append("<h5> Username: " + '<input type="text" id='+ ((i+1)*100) +' placeholder = "Who are you?"> Comment: ' +
    '<input type="text" id='+((i+1)*10000) +' placeholder = "Write a comment..."/> </h5>');
    $(".posts").append("<button class='btn btn-primary add-comment' onclick = 'commentHandler("+(i+1)+")' data-id = "+
    (posts[i].id) +"' type='button'> Comment </button> <button class = 'btn btn-info' style = 'float:right' onclick = 'viewPostHandler()' data-id = "+(posts[i].id)+ "> View individual post </button> <p id = 'endofpost' </p>");
  }
};

var postHandler = function() {
  var text = $("#post-name").val();
  $(".add-post").on("click", addPost(text));
  updatePosts();
  $(".space-form")[0].reset(); // clear input text after posting
};

var viewPostHandler = function() {
  // to be completed
};

var removeHandler = function() {
  var currentId = $(this).parent().data().id;
  for(var i = 0; i < posts.length; i++) {
    if(posts[i].id === currentId) {
      posts.splice(i, 1);
      currentPostId--;
      for(j = i; j < posts.length; j++) {
        posts[j].id --;
      }
      break;
    }
  }
  $(this).parent().remove();
  updatePosts();
};

commentHandler = function(commentNum) {
  console.log(commentNum);
  var username = $('#'+ (commentNum*100)).val();
  var comment = $('#'+ (commentNum*10000)).val();
  var numOfCommentsInThisPost = posts[commentNum - 1].comments.length;
  posts[commentNum - 1].comments[numOfCommentsInThisPost] = {user: username, thecomment: comment};
  $(".post[data-id=" + commentNum + "]").append("<p class = 'usercomment'> <br>" + username + "<span>: " +comment+ "</span> </p>");
};

$(".add-post").on("click", postHandler);
$(".posts").on("click", "a", removeHandler);

// still to do:
// 1) new comments after posting, to be below previous comments, not at the top
// 2) text reset for all inputs after commenting
