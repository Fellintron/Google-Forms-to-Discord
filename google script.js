function onSubmit(e) {

  var form = FormApp.getActiveForm();

  var responses = form.getResponses();

  var lastResponse = responses[responses.length - 1];

  var response = lastResponse.getItemResponses();

  var formData = {};

  for (var i = 0; i < response.length; i++) {

    formData[response[i].getItem().getTitle()] = response[i].getResponse();

  }

  var embed = {
    title: "New Form Submission",
    color: 0x00FF00, 
    fields: Object.keys(formData).map(key => {
      return {
        name: key,
        value: formData[key],
        inline: false
      };
    }),
    timestamp: new Date().toISOString()
  };

  var webhookUrl = PropertiesService.getScriptProperties().getProperty('webhookUrl');

  if (!webhookUrl) {
    webhookUrl = Browser.inputBox("Enter the Discord webhook URL:");
    PropertiesService.getScriptProperties().setProperty('webhookUrl', webhookUrl);
  }

  var data = {
    embeds: [embed]
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(data)
  };

  UrlFetchApp.fetch(webhookUrl, options);

  Logger.log("Posted form submission to Discord!");

}
