/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

//function to create new artice of the given data;
const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const createTweetElement = function(tweets) {
  let $tweet = $(`<article class="tweet">
 <div class="avtar-name">
   <div classs="image-style">
   <img class="user-avatar" src=${tweets.user.avatars}> 
   <b class="user-name">${tweets.user.name}</b> 
 </div> 
   <span class="handle">${tweets.user.handle}</span>
</div>
 <div>
   <div name="message" id="tweet-text">${escapeText(tweets.content.text)}</div>
 </div>
 <footer class="post-days">
   <span>${timeago.format(tweets.created_at)}</span> 
   <div class=icons>
   <i id="flag" class="fa-solid fa-flag"></i>       
   <i id="retweet" class="fa-solid fa-retweet"></i>
   <i id="heart" class="fa-solid fa-heart"></i>
 </div>
 </footer>
</article>`);
  return $tweet;
}


//function to loop over the data
const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.tweet-container').append($tweet);
  }
}
//renderTweets(data);

//create an AJAX request to send the form to the server.


//fetch the form submit button

$('#tweet-form').on('submit', function (event) {
  event.preventDefault();
  const charRemaining = $(".counter").val();
  if (charRemaining >= 0 && charRemaining < 140) {
    const input = $(this).serialize();
    $.ajax({
      url: "http://localhost:8080/tweets",
      type: "POST",
      data: input
    }).then((results) => {
      //validate maximum length -alert;
      console.log(results);
    }).catch((err) => {
      console.log(`Error: ${err.message}`)
    });

  } else if (charRemaining === '140') {
    //data should not be null or ""- alert
    alert("tweet content is not present");
  } else {
    alert("tweet content is too long");
  }

})


//trigger event handler on the submit button
const loadTweets = function(){
  $.ajax({
    url: "http://localhost:8080/tweets",
    type: "GET",
  }).then((results) => {
    renderTweets(results.reverse())
    //console.log(results);
  }).catch((err) => {
    console.log(`Error: ${err.message}`)
  });
}

$(document).ready(() => {
  
  loadTweets();

  $(function() {
    const $button = $('#post-tweet');
    $button.on('click', function () {
      setTimeout(() => location.reload(), 100);
    });

  })
})




