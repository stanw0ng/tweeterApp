$(document).ready(function() {

  //top button
  $("#top-button").hide();
  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $("#top-button").fadeIn();
    } else {
      $("#top-button").fadeOut();
    }
  });

  $("#top-button").click(function() {
    $("html, body").animate({scrollTop: 0}, "slow");
  });

  // slide toggle feature for "write a new tweet button"
  $('.new-tweet-toggle').click(function() {
    $('.new-tweet').slideToggle(400);
  });

  // sanitize input text from XSS vulnerabilities
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
  $('#new-tweet-form').submit(function(event) {
    event.preventDefault(); // prevents refresh
    const formData = $(this).serialize(); // serialize

    const tweetText = $('#tweet-text').val();
    
    if (tweetText.length) {
      $('#tweet-err').slideUp(400).text();
    }
    
    if (tweetText.length > 140) {
      $('#tweet-err').text("You've exceed the character limit!").slideDown(400);
      return;
    }
    
    if (!tweetText.length) {
      $('#tweet-err').text("Your Tweet box is empty!").slideDown(400);
      return;
    }

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      datatype: 'JSON',
      success: function() {
        loadTweets();
        $('#tweet-text').val(""); //clears form
        $('.counter').text(140); //resets counter
      },
      error: function(error) {
        console.log("Error:", error);
      }
    });
  });

  // loads tweets
  const loadTweets = function() {
    $.getJSON({
      url: "/tweets",
      success: function(data) {
        $('#tweets-container').empty();
        renderTweets(data);
      },
      error: function(error) {
        console.log("Error:", error);
      }
    });
  };

  loadTweets();
});