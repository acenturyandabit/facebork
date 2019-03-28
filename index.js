const fs = require("fs");
const login = require("facebook-chat-api");
const conceptEngine = require("./ceng.js");
//const speak = require("speakeasy-nlp");
var sessions = {};
var credentials = {
  email: "YOUR FB EMAIL HERE",
  password: "YOUR FB PASSWORD HERE"
};
if (fs.existsSync("appstate.json")) {
  login({
      appState: JSON.parse(fs.readFileSync("appstate.json", "utf8"))
    },
    (err, api) => {
      if (err) return console.error(err);
      beginHost(api);
      // Here you can use the api
    }
  );
} else {
  login(credentials, (err, api) => {
    if (err) return console.error(err);
    fs.writeFileSync("appstate.json", JSON.stringify(api.getAppState()));
    beginHost(api);
  });
}

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};
////////////Stuff above this line is pretty done already..

function beginHost(api) {
  api.setOptions({
    selfListen: true
  });
  api.listen((err, message) => {
    //only listen to messages from registered senders
    if (err){
      console.log(err);
      return;
    }
    if (!sessions[message.threadID]) {
      //check if we want to start a new session
      if (message.body == "!start bot") {
        sessions[message.threadID] = new conceptEngine.session(api);
        api.sendMessage("Bot started!",message.threadID);
      }
      return;
    }
    sessions[message.threadID].process(message);
  });
  /*setInterval(() => {
    passiveHost(api);
  }, 10000);*/
}












/*
Starting simple. We want to understand what is going on.

Record all messages. We should be able to see the objective state.

*/

//Pythagoras15
/*
function passiveHost(api) {
  for (i in sessions) {
    if (Date.now() - sessions[i].lastMessage > 1000 * 60) {
      api.sendMessage(prompts.sample(),sessions[i].tid);
      sessions[i].lastMessage = Date.now();
    }
  }
  //go through sessions and bump them based on certain criteria
}
*/
/*var condition=true;
function wait () {
  if (condition) setTimeout(wait, 1000);
  else speak.classify("preserve me!");
}
wait();*/