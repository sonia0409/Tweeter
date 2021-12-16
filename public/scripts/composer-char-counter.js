
const $tweetText = $("#tweet-text");
let count = $(".counter").val()  // will keep track of the nuber of characters
const $counterOutput = $(".counter")

$tweetText.on('keydown', (event) => {
  //count the number of clicks/inputs

  const key = event.key;
  if (key === "Backspace") {
    console.log(count);
    count = count + 1;
  } else {
    count--;
  }

  $counterOutput.text(count);
  //conditions: value>0 color black; value < 0 red;
  if (count > 0) {
    $counterOutput.css('color', 'black');
  } else if (count <= 0) {
    $counterOutput.css('color', 'red');
    //$(this).on()
  }
});
$tweetText.focus()





