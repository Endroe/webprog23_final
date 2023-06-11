$(document).ready(function() {
    const emojis = [
        { emoji: '😉', unicode: 'U+1F609', name: 'Winking Face', wins: 5, losses: 0, ties: 0 },
        { emoji: '😊', unicode: 'U+1F60A', name: 'Smiling Face With Smiling Eyes', wins: 8, losses: 0, ties: 0 },
        { emoji: '😍', unicode: 'U+1F60D', name: 'Smiling Face With Heart-Eyes', wins: 12, losses: 0, ties: 0 },
        { emoji: '🥲', unicode: 'U+1F972', name: 'Smiling Face With Tear', wins: 15, losses: 0, ties: 0 },
        { emoji: '🤗', unicode: 'U+1F917', name: 'Smiling Face With Open Hands', wins: 7, losses: 0, ties: 0 },
        { emoji: '🫢', unicode: 'U+1FAC2', name: 'Face With Open Eyes And Hand Over Mouth', wins: 20, losses: 0, ties: 0 },
        { emoji: '🤔', unicode: 'U+1F914', name: 'Thinking Face', wins: 18, losses: 0, ties: 0 },
        { emoji: '🫡', unicode: 'U+1FAC1', name: 'Saluting Face', wins: 16, losses: 0, ties: 0 },
        { emoji: '🫥', unicode: 'U+1FAC5', name: 'Dotted Line Face', wins: 25, losses: 0, ties: 0 },
        { emoji: '😔', unicode: 'U+1F614', name: 'Pensive Face', wins: 9, losses: 0, ties: 0 },
        { emoji: '🥳', unicode: 'U+1F973', name: 'Partying Face', wins: 30, losses: 0, ties: 0 },
        { emoji: '😎', unicode: 'U+1F60E', name: 'Smiling Face With Sunglasses', wins: 22, losses: 0, ties: 0 },
        { emoji: '🤓', unicode: 'U+1F913', name: 'Nerd Face', wins: 20, losses: 0, ties: 0 },
        { emoji: '😭', unicode: 'U+1F62D', name: 'Loudly Crying Face', wins: 35, losses: 0, ties: 0 },
        { emoji: '😈', unicode: 'U+1F608', name: 'Smiling Face With Horns', wins: 40, losses: 0, ties: 0 },
        { emoji: '💀', unicode: 'U+1F480', name: 'Skull', wins: 50, losses: 0, ties: 0 },
        { emoji: '🤡', unicode: 'U+1F921', name: 'Clown Face', wins: 45, losses: 0, ties: 0 },
        { emoji: '👽', unicode: 'U+1F47D', name: 'Alien', wins: 55, losses: 0, ties: 0 },
        { emoji: '🤖', unicode: 'U+1F916', name: 'Robot', wins: 60, losses: 0, ties: 0 },
        { emoji: '💔', unicode: 'U+1F494', name: 'Broken Heart', wins: 5, losses: 10, ties: 0 },
        { emoji: '❤️', unicode: 'U+2764', name: 'Red Heart', wins: 8, losses: 15, ties: 0 },
        { emoji: '🤍', unicode: 'U+1F90D', name: 'White Heart', wins: 10, losses: 18, ties: 0 },
        { emoji: '💯', unicode: 'U+1F4AF', name: 'Hundred Points', wins: 10, losses: 0, ties: 0 },
        { emoji: '💥', unicode: 'U+1F4A5', name: 'Collision', wins: 20, losses: 10, ties: 0 },
        { emoji: '💤', unicode: 'U+1F4A4', name: 'Zzz', wins: 25, losses: 15, ties: 0 },
        { emoji: '👋', unicode: 'U+1F44B', name: 'Waving Hand', wins: 30, losses: 20, ties: 0 },
        { emoji: '👌', unicode: 'U+1F44C', name: 'OK Hand', wins: 35, losses: 25, ties: 0 },
        { emoji: '🤟', unicode: 'U+1F91F', name: 'Love-You Gesture', wins: 40, losses: 30, ties: 0 },
        { emoji: '👍', unicode: 'U+1F44D', name: 'Thumbs Up', wins: 45, losses: 35, ties: 0 },
        { emoji: '👏', unicode: 'U+1F44F', name: 'Clapping Hands', wins: 50, losses: 40, ties: 0 },
        { emoji: '🫶', unicode: 'U+1FAD6', name: 'Heart Hands', wins: 55, losses: 45, ties: 0 },
        { emoji: '🙏', unicode: 'U+1F64F', name: 'Folded Hands', wins: 60, losses: 50, ties: 0 },
        { emoji: '🧠', unicode: 'U+1F9E0', name: 'Brain', wins: 65, losses: 55, ties: 0 },
        { emoji: '👀', unicode: 'U+1F440', name: 'Eyes', wins: 70, losses: 60, ties: 0 },
        { emoji: '🫦', unicode: 'U+1FAC6', name: 'Biting Lip', wins: 75, losses: 65, ties: 0 },
        { emoji: '👶', unicode: 'U+1F476', name: 'Baby', wins: 80, losses: 70, ties: 0 },
        { emoji: '🙇', unicode: 'U+1F647', name: 'Person Bowing', wins: 85, losses: 75, ties: 0 },
        { emoji: '🤦', unicode: 'U+1F926', name: 'Person Facepalming', wins: 90, losses: 80, ties: 0 },
        { emoji: '👨‍💻', unicode: 'U+1F468 U+200D U+1F4BB', name: 'Man Technologist', wins: 95, losses: 85, ties: 0 },
        { emoji: '👨‍🎤', unicode: 'U+1F468 U+200D U+1F3A4', name: 'Man Singer', wins: 100, losses: 90, ties: 0 },
        { emoji: '🥷', unicode: 'U+1F977', name: 'Ninja', wins: 100, losses: 95, ties: 0 },
        { emoji: '💃', unicode: 'U+1F483', name: 'Woman Dancing', wins: 100, losses: 98, ties: 0 },
        { emoji: '🐕', unicode: 'U+1F415', name: 'Dog', wins: 100, losses: 99, ties: 0 },
        { emoji: '🐈', unicode: 'U+1F408', name: 'Cat', wins: 100, losses: 99, ties: 1 },
        { emoji: '🐐', unicode: 'U+1F410', name: 'Goat', wins: 100, losses: 99, ties: 5 },
        { emoji: '🐦', unicode: 'U+1F426', name: 'Bird', wins: 100, losses: 99, ties: 10 },
        { emoji: '🐟', unicode: 'U+1F41F', name: 'Fish', wins: 100, losses: 99, ties: 20 },
        { emoji: '🌸', unicode: 'U+1F338', name: 'Cherry Blossom', wins: 100, losses: 99, ties: 30 },
        { emoji: '🌹', unicode: 'U+1F339', name: 'Rose', wins: 100, losses: 99, ties: 40 },
        { emoji: '🌳', unicode: 'U+1F333', name: 'Deciduous Tree', wins: 100, losses: 99, ties: 50 },
        { emoji: '🍂', unicode: 'U+1F342', name: 'Fallen Leaf', wins: 100, losses: 99, ties: 60 },
        { emoji: '🍕', unicode: 'U+1F355', name: 'Pizza', wins: 100, losses: 99, ties: 70 },
        { emoji: '🎂', unicode: 'U+1F382', name: 'Birthday Cake', wins: 100, losses: 99, ties: 80 },
        { emoji: '☕', unicode: 'U+2615', name: 'Hot Beverage', wins: 100, losses: 99, ties: 90 },
        { emoji: '🍵', unicode: 'U+1F375', name: 'Teacup Without Handle', wins: 100, losses: 99, ties: 100 },
        { emoji: '🧊', unicode: 'U+1F9CA', name: 'Ice', wins: 100, losses: 99, ties: 200 },
        { emoji: '🪨', unicode: 'U+1FAA8', name: 'Rock', wins: 100, losses: 99, ties: 300 },
        { emoji: '🏠', unicode: 'U+1F3E0', name: 'House', wins: 100, losses: 99, ties: 400 },
        { emoji: '🏫', unicode: 'U+1F3EB', name: 'School', wins: 100, losses: 99, ties: 500 },
        { emoji: '🌇', unicode: 'U+1F307', name: 'Sunset', wins: 100, losses: 99, ties: 600 },
        { emoji: '🚲', unicode: 'U+1F6B2', name: 'Bicycle', wins: 100, losses: 99, ties: 700 },
        { emoji: '✈️', unicode: 'U+2708', name: 'Airplane', wins: 100, losses: 99, ties: 800 },
        { emoji: '⏰', unicode: 'U+23F0', name: 'Alarm Clock', wins: 100, losses: 99, ties: 900 },
        { emoji: '☀️', unicode: 'U+2600', name: 'Sun', wins: 100, losses: 99, ties: 100 },
        { emoji: '⭐', unicode: 'U+2B50', name: 'Star', wins: 100, losses: 99, ties: 150 },
        { emoji: '☁️', unicode: 'U+2601', name: 'Cloud', wins: 100, losses: 99, ties: 20 },
        { emoji: '🌈', unicode: 'U+1F308', name: 'Rainbow', wins: 100, losses: 99, ties: 25 },
        { emoji: '❄️', unicode: 'U+2744', name: 'Snowflake', wins: 100, losses: 99, ties: 30 },
        { emoji: '🔥', unicode: 'U+1F525', name: 'Fire', wins: 100, losses: 99, ties: 35 },
        { emoji: '🌊', unicode: 'U+1F30A', name: 'Water Wave', wins: 100, losses: 99, ties: 40 },
        { emoji: '🎃', unicode: 'U+1F383', name: 'Jack-O-Lantern', wins: 100, losses: 99, ties: 45 },
        { emoji: '✨', unicode: 'U+2728', name: 'Sparkles', wins: 100, losses: 99, ties: 50 },
        { emoji: '🎉', unicode: 'U+1F389', name: 'Party Popper', wins: 100, losses: 99, ties: 55 },
        { emoji: '🎁', unicode: 'U+1F381', name: 'Wrapped Gift', wins: 100, losses: 99, ties: 60 },
        { emoji: '🎫', unicode: 'U+1F3AB', name: 'Ticket', wins: 100, losses: 99, ties: 65 },
        { emoji: '🔒', unicode: 'U+1F512', name: 'Locked', wins: 100, losses: 99, ties: 70 },
        { emoji: '🔑', unicode: 'U+1F511', name: 'Key', wins: 100, losses: 99, ties: 75 },
    ];  
  
    const username = Cookies.get('username');
    getUserData(username, function(userData) {
        const userStats = userData;

        console.log(userStats);
        var emojiContainer = $('#emoji-container');

        // Loop through the emojis and generate cards
        for (var i = 0; i < emojis.length; i++) {
            var emoji = emojis[i];
            // Create card element
            var card = $('<div class="card mb-4 box-shadow col-md-3"></div>').appendTo(emojiContainer);
            $('<div class="card-header"></div>').append($('<h4 class="my-0 font-weight-normal">' + emoji.name + '</h4>')).appendTo(card);
            var cardBody = $('<div class="card-body"></div>').appendTo(card);
            $('<h1 class="card-title pricing-card-title">' + emoji.emoji + '</h1> <small class="text-muted">/ ' + emoji.unicode + '</small>').appendTo(cardBody);

            var winText = (emoji.wins <= userData.wins) ? "text-success" : "text-danger";
            var tieText = (emoji.ties <= userData.ties) ? "text-success" : "text-danger";
            var lossText = (emoji.losses <= userData.losses) ? "text-success" : "text-danger";

            // Create stats list
            var statsList = $('<ul class="list-unstyled mt-3 mb-4"></ul>').appendTo(cardBody);
            $('<li class="' + winText + '"><i class="fas fa-plus mr-2"></i>' + userData.wins + "/" + emoji.wins + ' wins required</li>').appendTo(statsList); 
            $('<li class="' + tieText + '"><i class="fas fa-minus mr-2"></i>' + userData.ties + "/" + emoji.ties + ' ties required</li>').appendTo(statsList); 
            $('<li class="' + lossText + '"><i class="fas fa-xmark mr-2"></i>' + userData.losses + "/" + emoji.losses + ' losses required</li>').appendTo(statsList);
      
            if (winText === 'text-success' && tieText === 'text-success' && lossText === 'text-success') {
                $('<button type="button" class="btn btn-lg btn-block btn-outline-primary" onclick="equipEmoji(\''+ username + '\',\'' + emoji.unicode +'\')">Equip</button>').appendTo(cardBody);
            } else {
                $('<button type="button" class="btn btn-lg btn-block btn-outline-secondary" disabled>Equip</button>').appendTo(cardBody);
            }
            // Insert a bootstrap row every 4 cards
            if ((i + 1) % 4 === 0) {
                $('<div class="row"></div>').appendTo(emojiContainer);
            }
        }

        // Create a pie chart
        // var ctx = document.getElementById('chart').getContext('2d');
        // new Chart(ctx, {
        //     type: 'pie',
        //     data: {
        //         labels: ['Wins', 'Losses', 'Ties'],
        //         datasets: [{
        //             data: [userData.wins, userData.losses, userData.ties],
        //             backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
        //             borderWidth: 0
        //         }]
        //     },
        //     options: {
        //         responsive: true,
        //         legend: {
        //             position: 'bottom'
        //         },
        //         title: {
        //             display: true,
        //             text: 'Your Statistics'
        //         }
        //     }
        // });
    });
});
function equipEmoji(username, emoji) {
  console.log(emoji, username);
}