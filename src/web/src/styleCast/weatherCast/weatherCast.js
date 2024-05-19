// Define an array of arbitrary texts
var arbitraryMotivation = [
    "You would look great in this!",
    "Own it!",
    "Wow, this would really suit you!",
    "Yes, go for this one!",
    "A personalized look is always the best look!",
    "If this makes you feel great, you better trust that it is great!",
    "You would totally rock in this!",
    "This is definitely the OOTD!",
    "Your personal touch on this would make wonders!",
    "When you look good, you feel good & you do good!",
    "You are hot babe!",
    "Get inspired & inspire!",
    "I vote for this one!",
    "You are beautiful inside and out!",
    "Honey, this is the one!",
    "It's all about the energy!",
    "Make it pop honey!",
    "You will slay today!",
    "You're a style icon in the making!",
    "Embrace your inner fashionista!",
    "This outfit screams confidence!",
    "Dress like you own the runway!",
    "You're the definition of chic!",
    "Fashion is your playground!",
    "Your style game is on point!",
    "You're a trendsetter, not a trend follower!",
    "Channeling major summer vibes!",
    "Radiate positivity through your style!",
    "Dress to impress, always!",
    "Your outfit is as bright as your smile!",
    "Fashion is your superpower!",
    "Be the sunshine in every room!",
    "Elevate your wardrobe, elevate your mood!",
    "Fashion is freedom, so own it!",
    "Confidence looks good on you!"
  ];

// Function to handle click on image
function onClick(element) {
    var imgSrc = element.src;

    // Get a random index from the arbitraryTexts array
    var randomIndex = Math.floor(Math.random() * arbitraryMotivation.length);

    // Get the arbitrary text corresponding to the random index
    var randomText = arbitraryMotivation[randomIndex];

    // Display the modal with the image and random text
    document.getElementById("img").src = imgSrc; // Update src of img in modal
    document.getElementById("imageText").innerHTML = randomText; // Update the text container to display random text
    document.getElementById("modal").style.display = "block"; // Make modal visible by changing display property to "block"
}

  // Function to hide the modal
  function hideModal() {
    document.getElementById("modal").style.display = "none";
  }
