const {
  TextAnalyticsClient,
  TextAnalyticsApiKeyCredential
} = require("@azure/ai-text-analytics");
const credentials = require("./creds.js");

function GetAnalyzed(txt) {
  "use strict";
  const textAnalyticsClient = new TextAnalyticsClient(
    credentials.creds.endpoint,
    new TextAnalyticsApiKeyCredential(credentials.creds.key)
  );
  async function linkedEntityRecognition(client) {
    const linkedEntityInput = [txt];
    const entityResults = await client.recognizeLinkedEntities(
      linkedEntityInput
    );

    entityResults.forEach(document => {
      document.entities.forEach(entity => {
        console.log(`URL: ${entity.url}`);
        entity.matches.forEach(match => {
          console.log(txt.substr(match.offset, match.length + match.offset));
        });
      });
    });
  }
  linkedEntityRecognition(textAnalyticsClient);
}
exports.do = GetAnalyzed;