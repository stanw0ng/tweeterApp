// DATABASE
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
    <span class="timestamp">${tweet.created_at}</span>
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
  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault(); // prevents refresh
    const formData = $(this).serialize(); // serialize
    $.post('/tweets', formData) // send the data to the server
      .then(function() {
        console.log('Tweet data received!');
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
  });

  renderTweets(data);
});