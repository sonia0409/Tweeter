
const $tweetText = $("#tweet-text");
let count = $(".counter").val()  // will keep track of the nuber of characters
const $counterOutput= $(".counter")

$tweetText.on('input', () => {
  //count the number of clicks/inputs--subtract the number from the 140
  count--;
  //console.log("count", count);
//update the output of the counter class;
  $counterOutput.text(count);
  //conditions: value>0 color black; value < 0 red;
  if(count > 0){
    $counterOutput.css('color', 'black');
  } else {
    $counterOutput.css('color','red');
  }
});
$tweetText.focus()




