$(document).ready(function() {

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = (tweetData) => {

  const userTweet = 

  `<article class="article">
  <header class="tweet-header">
    <div class="user-logo">
      <img class="avatar" src="${tweetData.user.avatars}">
      <span class="display-name">${tweetData.user.name}</span>
    </div>
    <span class="handle">${tweetData.user.handle}</span>
  </header>
  <p class="tweet-content">${tweetData.content.text}</p>
  <footer class="tweet-footer">
    <span class="timestamp">Date Posted</span>
    <span class="engage-icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </span>
  </footer>
</article>`;

return userTweet;
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});