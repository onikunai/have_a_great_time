// -----------------------------------------------------------------------------
// 定数の設定
const LINE_CHANNEL_ACCESS_TOKEN = 'S8OSNXHq8fVoYQWCQiMaR7BKi6PDWNj7jOQoKGCERVaIdMzVrUKzFyWrZn3ajcguROeqyB64DM9AspzpySOSanvEXuP1vk5JhHWs4Jywhj0WEj1nl0VqJjrePzcZh8lskqWCBdFdR2qt+Qpi66cAEwdB04t89/1O/w1cDnyilFU='; // 追加

// -----------------------------------------------------------------------------
// モジュールのインポート
var express = require('express');
var bodyParser = require('body-parser'); // 追加
var request = require('request'); // 追加
var mecab = require('mecabaas-client'); // 追加
var app = express();

// ミドルウェア設定
app.use(bodyParser.json());

// -----------------------------------------------------------------------------
// Webサーバー設定
var port = (process.env.PORT || 3000);
var server = app.listen(port, function() {
    console.log('Node is running on port ' + port);
});

// -----------------------------------------------------------------------------
// ルーター設定
app.get('/', function(req, res, next){
    res.send('Node is running on port ' + port);
});
// app.post('/webhook', function(req, res, next){
//   res.status(200).end();
//   for (var event of req.body.events){
//       if (event.type == 'message'){
//           console.log(event.message);
//       }
//   }
// });
app.post('/webhook', function(req, res, next){
  res.status(200).end();
  for (var event of req.body.events){
      if (event.type == 'message' && event.message.text == 'ハロー'){
          var headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
          }
          var body = {
              replyToken: event.replyToken,
              messages: [{
                  type: 'text',
                  text: 'こんにちはー'
              }]
          }
          var url = 'https://api.line.me/v2/bot/message/reply';
          request({
              url: url,
              method: 'POST',
              headers: headers,
              body: body,
              json: true
          });
      }
  }
});

// app.post('/webhook', function(req, res, next){
//   res.status(200).end();
//   for (var event of req.body.events){
//       if (event.type == 'message' && event.message.text){
//            // Mecabクラウドサービスでメッセージを解析
//           mecab.parse(event.message.text)
//           .then(
//               function(response){
//                     // 解析結果を出力
//                   console.log(response);
//               }
//           );

//       }
//   }
// });