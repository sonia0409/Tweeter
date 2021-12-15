/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

//function to create new artice of the given data;
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
   <textarea name="message" id="tweet-text">${tweets.content.text}</textarea>
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
const renderTweets = function (tweets) {
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

  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();

    const input = $(this).serialize();
    console.log(input)
    const charCount = $(".counter").val();
    
    $.ajax({
      url: "http://localhost:8080/tweets",
      type: "POST",
      data:input
    }).then((results) => {
      //validate maximum length -alert;
      if(charCount < 0){
        alert("tweet content is too long");
        event.preventDefault();
      }
    }).catch((err) => {
        //data should not be null or ""- alert
        alert("tweet content is not present");
        event.preventDefault();
    })

  })


//trigger event handler on the submit button



$(document).ready( () => {
    $.ajax({
      url: "http://localhost:8080/tweets",
      type: "GET",
    }).done((results) => {
      //console.log(results);
      renderTweets(results.reverse())
    })
    /* .fail((err) => {
      console.log(`Error: ${err}`)
    })
    .always(() => {
      console.log("request completed")
    }) */
  })

  /* $(document).ready( () => {
    const $loadTweets = function(){
      $.ajax({
        url: "http://localhost:8080/tweets",
        method: "GET",
      }).this((results) => {
        const tweets = renderTweets(results);
        console.log('Sucess',tweets);
      })
      }
      console.log($loadTweets())
  }) */
  