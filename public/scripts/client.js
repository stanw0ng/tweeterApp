$(document).ready(function() {

  // creates tweet element by taking in data and formats it to a template
  const createTweetElement = (tweet) => {
    
    const userTweet =
    
    `<article class="article">
    <header class="tweet-header">
    <div class="user-logo">
    <img class="avatar" src="${tweet.user.avatars}">
    <span class="display-name">${tweet.user.name}</span>
    </div>
    <span class="handle">${tweet.user.handle}</span>
    </header>
    <p class="tweet-content">${tweet.content.text}</p>
    <footer class="tweet-footer">
    <span class="timestamp">${timeago.format(tweet.created_at)}</span>
    <span class="engage-icons">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
    </span>
    </footer>
    </article>`;
    
    return userTweet;
  };
  
  // renders each tweet
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };

  // listens for new tweet submit and POSTs to server
  $('#new-tweet-form').submit( function(event) {
    event.preventDefault(); // prevents refresh
    const formData = $(this).serialize(); // serialize

    const tweetText = $('#tweet-text').val();
    
    // if the length of the user tweet is greater 140 characters returns error message
    if (tweetText.length > 140) {
      alert("You've exceed the characer limit!")
      return;
    }  
    //if tweetText returns falsey return error message
    if (!tweetText.length) {
      alert("Your Tweet box is empty!")
      return;
    }

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      datatype: 'JSON',
      success: function(data) {
        console.log("Tweet data received!");
        loadTweets();
        $('#tweet-text').val(""); //clears form
        $('.counter').text(140); //resets counter
      },
      error: function(error) {
        console.log("Error:", error);
      }
    })
  });

  // loads tweets
  const loadTweets = function  () {
    $.getJSON ({
      url: "/tweets",
      success: function (data) {
        $('#tweets-container').empty();
        renderTweets(data);
      }
    })
  };

  loadTweets();
});