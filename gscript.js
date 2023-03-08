  function onSubmit(e) {
    try {
      var form = FormApp.getActiveForm();
      var responses = form.getResponses();
      var lastResponse = responses[responses.length - 1];
      var response = lastResponse.getItemResponses();
      var formData = {};
  
      for (var i = 0; i < response.length; i++) {
        formData[response[i].getItem().getTitle()] = response[i].getResponse();
      }
  
      var data = {
        "content": "New form submission:\n" + JSON.stringify(formData)
      };
  
      var options = {
        "method": "post",
        "payload": JSON.stringify(data),
        "contentType": "application/json"
      };
  
      var webhookUrl = "WEBHOOK_URL_HERE"; // Please make sure you input the discord.com url and exclude canary.discord/ptb.discord or any other clien
      UrlFetchApp.fetch(webhookUrl, options);
      
      Logger.log("Posted the form!");
      
      Utilities.sleep(500);
    } catch (error) {
      Logger.log("Can't post, help: " + error);
    }
  }
  