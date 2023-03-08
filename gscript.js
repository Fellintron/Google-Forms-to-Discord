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
  
      var fields = [];
      for (var key in formData) {
        fields.push({
          "name": key,
          "value": formData[key],
          "inline": false
        });
      }
  
      var embed = {
        "title": "New form submission",
        "color": 16711680,
        "fields": fields,
        "timestamp": new Date().toISOString()
      };
  
      var data = {
        "embeds": [embed]
      };
  
      var options = {
        "method": "post",
        "payload": JSON.stringify(data),
        "contentType": "application/json"
      };
  
      var webhookUrl = "WEBHOOK_URL_HERE"; // Please make sure you input the discord.com url and exclude canary.discord/ptb.discord or any other clienT

      if (ScriptProperties.getProperties().webhookUrl) {
        webhookUrl = ScriptProperties.getProperties().webhookUrl;
      } else {
        webhookUrl = Browser.inputBox("Enter the Discord webhook URL:");
        ScriptProperties.setProperties({"webhookUrl": webhookUrl});
      }
  
      UrlFetchApp.fetch(webhookUrl, options);
      
      Logger.log("Posted the form!");
      
      Utilities.sleep(500);
    } catch (error) {
      Logger.log("Unable to post, help: " + error);
    }
  }
  