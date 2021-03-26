//LINE Developersで取得したアクセストークンに置き換える
var CHANNEL_ACCESS_TOKEN = 'アクセストークン';

function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  var replytoken= json.events[0].replyToken;
  if (typeof replytoken === 'undefined') {
    return;
  }
  //送られてきたメッセージを取得
  var user_message = json.events[0].message.text;

  var url = 'https://api.line.me/v2/bot/message/reply';

  //返信用メッセージを作成
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replytoken,
      'messages': [{
        'type': 'text',
        'text': user_message,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
