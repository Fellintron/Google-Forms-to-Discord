const webhooks = ["weebhook_link_here"]; // weeb hook because hrish is dumb


const title = "title_name", avatarImage = "random_png", shortDescription = "yes", colour = "010101", mention = "", type = "OFF";

const additionalFeatures = {
    converttoLink: 'ON', 
    converttoMention: 'OFF' 
}


const form = FormApp.getActiveForm(), allResponses = form.getResponses(), latestResponse = allResponses[allResponses.length - 1];
let response;
var items = [];

try {
    response = latestResponse.getItemResponses()
} catch (error) {
    throw "No Response bozo"
}

// uhhhhh making surew webhooks are entered, stole this from another gh :walkaway: 
for (const hook of webhooks) {
    if (!/^(?:https?:\/\/)?(?:www\.)?(?:(?:canary|ptb)\.)?discord(?:app)?\.com\/api\/webhooks\/\d+\/[\w-+]+$/i.test(hook)) throw `Webhook ${i + 1 || 1} is not valid.`;
}

if (avatarImage && !/\.(jpeg|jpg|gif|png|webp)$/.test(avatarImage)) throw "Image URL is not a direct link";


for (var i = 0; i < response.length; i++) {
    const question = response[i].getItem().getTitle(), answer = response[i].getResponse();
    if (answer == "") continue;
    items.push({ "name": question, "value": answer });

    function data(item) {
        const linkValidate = /(?:(?:https?|http?):\/\/)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/i;

        
        if (additionalFeatures.converttoMention == 'ON' && !isNaN(item.value) && item.value.length == 18) item.value = `<@!${item.value}>`;
        
        if (additionalFeatures.converttoLink == 'ON' && type.toLowerCase() !== 'text') {
            
            if (linkValidate.test(item.value)) item.value = `[${item.value}](${item.value})`;
        } else {
            
            if (additionalFeatures.converttoLink == 'ON' && linkValidate.test(item.value)) item.value = `<${item.value}>`;
        }

        return [`**${item.name}**`, `${item.value}`].join("\n");
    }
}

if (items.map(data).toString().length + shortDescription.length > 1999) throw "calm down you can't add more stuff smh";

function plainText(e) {

    const text = {
        "method": "post",
        "headers": { "Content-Type": "application/json" },
        "muteHttpExceptions": true,
        "payload": JSON.stringify({
            "content": `${mention ? mention : ''}${title ? `**${title}**` : `**${form.getTitle()}**`}\n\n${shortDescription ? `${shortDescription}\n\n${items.map(data).join('\n\n')}` : items.map(data).join('\n\n')}`
        }),
    };

    for (var i = 0; i < webhooks.length; i++) { UrlFetchApp.fetch(webhooks[i], text); };
}

function embedText(e) {

    const embed = {
        "method": "post",
        "headers": { "Content-Type": "application/json" },
        "muteHttpExceptions": true,
        "payload": JSON.stringify({
            "content": mention ? mention : '',
            "embeds": [{
                "title": title ? title : form.getTitle(), 
                "description": shortDescription ? `${shortDescription}\n\n${items.map(data).join('\n\n')}` : items.map(data).join('\n\n'), 
                "thumbnail": { url: avatarImage ? encodeURI(avatarImage) : null },
                "color": colour ? parseInt(colour.substr(1), 16) : Math.floor(Math.random() * 16777215), 
                "timestamp": new Date().toISOString() // Today's date.
            }]
        }),
    };

    
    for (var i = 0; i < webhooks.length; i++) { UrlFetchApp.fetch(webhooks[i], embed); };
}