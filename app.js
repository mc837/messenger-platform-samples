function sendToLuis(recipientId, messageText, callback){
  var luisUri = 'https://api.projectoxford.ai/luis/v1/application?id=dbffebbd-5180-4e8a-8b87-cb5b4593e31e&subscription-key=8a51881501224a6588ef6f73a215cc51';

  var questionUri = luisUri + '&q=' + encodeURIComponent(messageText);

  request({
      uri:questionUri,
      method: 'GET',
    },
    function(error, response, body){
      if(error != null){
        return messageText;
      }

      var stuff = JSON.parse(body);

      var intent = findHighestScoringEntity(stuff.intents).intent;
      var entity = findHighestScoringEntity(stuff.entities).entity;

      callback(intent + '_' + entity);
    });
};


function findHighestScoringEntity(arr) {
  var entity = {score: -1};

  arr.forEach(function(i) {
    if (i.score > entity.score)
      entity = i;
  });

  return entity;
}
