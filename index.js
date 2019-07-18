const fs = require("fs");
const login = require("facebook-chat-api");
const credentials = require("./password.js");
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

function guid(n = 5) {
  let allowed = "1234567890qwertyuiopasdfghjklzxcvbnm";
  let ret = "";
  for (let i = 0; i < n; i++) {
    ret += allowed[Math.floor(Math.random() * allowed.length)];
  }
  return ret;
}

////////////Stuff above this line is pretty done already..
var botTemplates = {};
//load all the botTemplates
var botTemplateList = [
  "pinto",
  "borkify",
  "googler",
  "status",
  "affirmation",
  "uwu"
]
botTemplateList.forEach((v, i) => {
  botTemplates[v] = require(`./subengines/${v}.js`);
})
var sessions = {};
function beginHost(api) {
  //load past session data
  try {
    let sessionData = JSON.parse(fs.readFileSync("sessions.json") || "{}");
    for (let t in sessionData) {
      sessions[t] = {};
      for (let b in sessionData[t]) {
        sessions[t][b] = {
          type: sessionData[t][b].type,
          bot: new botTemplates[sessionData[t][b].type].bot()
        }
        sessions[t][b].bot.fromSaveData(sessionData[t][b].data);
      }
    }
  } catch (e) {
    //probably new start
  }

  api.setOptions({
    selfListen: true
  });
  api.listen((err, message) => {
    if (err) {
      console.log(err);
      return;
    }
    //send the message to all current listeners
    if (sessions[message.threadID]) {
      for (i in sessions[message.threadID]) {
        try {
          if (sessions[message.threadID][i].bot.recieveMessage(message, api) == "quit") {
            //delete this bot, if requested
            delete sessions[message.threadID][i];
          }
        }
        catch (e) {
          console.log(e);
        }
      }
    }
    // check if we want to start a new bot
    for (let i in botTemplates) {
      if (botTemplates[i].begin(message, api)) {
        if (!sessions[message.threadID]) {
          sessions[message.threadID] = {};
        }
        let uid = guid();
        sessions[message.threadID][uid] = {
          type: i,
          bot: new botTemplates[i].bot()
        };
        //run after create
        try {
          if (sessions[message.threadID][uid].bot.recieveMessage(message, api) == "quit") {
            //delete this bot, if requested
            delete sessions[message.threadID][uid];
          }
        }
        catch (e) {
          console.log(e);
        }
      }
    }
  });
  /*setInterval(() => {
    passiveHost(api);
  }, 10000);*/
}

function saveToFile() {
  let sessionData = {};
  for (let t in sessions) {
    sessionData[t] = {};
    for (let i in sessions[t]) {
      sessionData[t][i] = {
        type: sessions[t][i].type,
        data: sessions[t][i].bot.toSaveData()
      }
    }
  }
  fs.writeFileSync("sessions.json", JSON.stringify(sessionData));
}

process.on("SIGINT", () => {
  try {
    saveToFile();
  } catch (e) {
    console.log(e);
  } process.exit();
});