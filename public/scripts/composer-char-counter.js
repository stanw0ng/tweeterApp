// dynamically changes the character counter in the new tweet form
$(document).ready(function() {
  const $counter = $('.counter'); // Cache the counter element outside the listener, search is made only once
  const originalCharCount = parseInt($counter.text()); // Store the original character count as a number

  $('#tweet-text').on('input', function(event) {
    const tweetLength = $(this).val().length;
    const charCount = originalCharCount - tweetLength;
    $counter.text(charCount);

    if (charCount < 0) {
      $counter.css('color', '#FF0000');
    } else {
      $counter.css('color', '#545149');
    }
  });
});