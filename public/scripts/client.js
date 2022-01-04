//FThis file provide functionality to POST and GET requests- using ajax jQuery

//escape function to prevent cross site scripting

const escapeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//function to create and add new tweet(as article tag in HTML) of the given data;
const createTweetElement = function(tweets) {
  let $tweet = $(`<article class="tweet">
 <div class="avtar-name">
   <div id="image-style">
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
};

$(document).ready(() => {
//function to loop over the data
const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.tweet-container').prepend($tweet);
  }
};

//an AJAX request to send the form to the server.
$('#tweet-form').on('submit', function(event) {
  event.preventDefault();
  const charRemaining = $(".counter").val();
  if (charRemaining >= 0 && charRemaining < 140) {
    const input = $(this).serialize();
    $.ajax({
      url: "/tweets",
      type: "POST",
      data: input
    }).then((results) => {
      //validate maximum length -alert;
      console.log(results);
      loadTweets();
      $('#tweet-text').val('');
    }).catch((err) => {
      console.log(`Error: ${err.message}`);
    });

  } else if (charRemaining === '140') {
    //data should not be null or ""- error message
    $('#error-message').replaceWith("tweet content is not present");
    $('.error-section').slideDown().css('display','block');
    $('#tweet-text').on('keypress', function () {
      $('.error-section').slideUp();
    })
  } else {
    $('#error-message').replaceWith("tweet content is too long");
    $('.error-section').slideDown().css('display','block');
    $('#tweet-text').on('keydown', function () {
      $('.error-section').slideUp();
    })
  }
});


//trigger event handler on the submit button
const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    type: "GET",
  }).then((results) => {
    renderTweets(results);
  }).catch((err) => {
    console.log(`Error: ${err.message}`);
  });
};


  loadTweets();
});

