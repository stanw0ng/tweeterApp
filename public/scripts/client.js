$(document).ready(function() {

  const escape = function(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
    <p class="tweet-content">${escape(tweet.content.text)}</p>
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
  const renderTweets = function(tweetsDb) {

    const freshTweets = tweetsDb.reverse(); // newest tweets first

    for (const tweet of freshTweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };

  // listens for new tweet submit and POSTs to server
  $('#new-tweet-form').submit( function(event) {
    event.preventDefault(); // prevents refresh
    const formData = $(this).serialize(); // serialize

    const tweetText = $('#tweet-text').val();
    
    if (tweetText.length > 140) {
      alert("You have exceeded the characer limit!")
      return;
    }  

    if (!tweetText.length) {
      alert("There was nothing to tweet!")
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
      },
      error: function(error) {
        console.log("Error:", error);
      }
    })
  };

  loadTweets();
});