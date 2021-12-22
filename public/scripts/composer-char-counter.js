
const $tweetText = $("#tweet-text");
let count = $(".counter").val()  // will keep track of the nuber of characters
const $counterOutput = $(".counter");


$tweetText.on('input', (event) => {
  let tweetLength = $tweetText.val().length;
  //count increment as per 140 minus length of the tweet
  if(count < 140 - tweetLength || count > 140 - tweetLength ){
    count = 140 - tweetLength;
  } else{
    count = count - 1;
  } 
  $counterOutput.text(count);
  //conditions: value>0 color black; value < 0 red;
  if (count > 0) {
    $counterOutput.css('color', 'black');
  } else if (count <= 0) {
    $counterOutput.css('color', 'red');

  }

});

$tweetText.focus()





