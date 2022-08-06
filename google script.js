var POST_URL = "discord shit here";

function onSubmit(e) {
  var form = FormApp.getActiveForm();
  var allResponses = form.getResponses();
  var latestResponse = allResponses[allResponses.length - 1];
  var response = latestResponse.getItemResponses();
  var items = [];
  var currentEmbedCharacterNum = 0

  for (var i = 0; i < response.length; i++) {
    var question = response[i].getItem().getTitle();
    var answer = response[i].getResponse();
    try {
      var parts = answer.match(/[\s\S]{1,1024}/g) || [];
    } catch (e) {
      var parts = answer;
    }

    if (answer == "") {
      continue;
    }

    if (question.length > 256){
      question = question.substring(0, 220) + "...";
    } 

    for (var j = 0; j < parts.length; j++) {
      currentEmbedCharacterNum += parts[j].length + question.length;
      if (currentEmbedCharacterNum >= 5000){
        sendEmbed(items);
        Utilities.sleep(50)
        currentEmbedCharacterNum = 0;
        items = [];
      }

      if (j == 0) {
        items.push({
          "name": question,
          "value": parts[j],
          "inline": false
        });
      } else {
        items.push({
          "name": question.concat(" (cont.)"),
          "value": parts[j],
          "inline": false
        });
      }
    }
  }
  sendEmbed(items);

};

function sendEmbed(items){
  var options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
    },
    "payload": JSON.stringify({
      "embeds": [{
        "title": "Some shit here",
        "color": 33023, 
        "fields": items,
        "footer": {
          "text": "Some footer here"
        },
        "timestamp": new Date().toISOString()
      }]
    })
  };

  // Post the data to the webhook.
  UrlFetchApp.fetch(POST_URL, options);
}