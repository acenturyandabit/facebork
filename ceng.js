String.prototype.replaceAt = function (index, char) {
  return this.slice(0, index) + char + this.slice(index + char.length);
}

let regexes = {
  "root": {
    regex: /!root/gi,
    processor: (regres, session) => {
      if (session.lastMessage.senderID==session.cuid){
        session.state.rootThreadID=session.lastMessage.threadID;
        session.api.sendMessage("This thread is now ROOT. Security priviledges upgraded.", session.lastMessage.threadID);
      }
    }
  },
  "affirmation": {
    switch: "affirmation",
    regex: /(?:^|\s+)i ((.(?!\si\s))+)(\n|$)/gi,
    processor: (regres, session) => {
      let _message = "Wow, you " + regres[1] + "? ";
      let validationPrompts = ["Great job!", "You rule!", "Congratulations!", "Amazing!"];
      _message += validationPrompts.sample();
      session.api.sendMessage(_message, session.lastMessage.threadID);
    }
  },
  "borkify": {
    switch: "bork",
    regex: /.+/gi,
    processor: (regres, session) => {
      if (session.lastMessage.senderID == session.cuid) return; //dont self bork otherwise it will infinite loop!
      let result = regres[0];
      for (let i = 0; i < regres[0].length; i++) {
        if (i % 2) result = result.replaceAt(i, regres[0][i].toUpperCase());
        else result = result.replaceAt(i, regres[0][i].toLowerCase());
      }
      session.api.sendMessage(result, session.lastMessage.threadID);
    }
  }
}


exports.session = function (api) {
  this.state = {};
  this.api = api;
  this.cuid = api.getCurrentUserID();
  this.smartSend=function(message,threadID){
    //send a message
    //on callback, store message as 'sent by bot'
    //filter incoming messages against 'sent by bot' list
  }
  this.process = function (message) {
    this.lastMessage = message;
    for (let i in regexes) {
      if (regexes[i].switch) {
        if (message.body == "!" + regexes[i].switch) {
          this.state[regexes[i].switch] = !this.state[regexes[i].switch];
          this.api.sendMessage(i + " " + ((this.state[regexes[i].switch]) ? "Activated!" : "Deactivated!"), this.lastMessage.threadID);
          return;
        } else {
          if (this.state[regexes[i].switch]) {
            regexes[i].regex.lastIndex = 0;
            tryparse = regexes[i].regex.exec(message.body);
            if (tryparse) {
              regexes[i].processor(tryparse, this);
            }
          }
        }
      }
    }
  }
  this.toSaveData = function () {

  }
  this.fromSaveData = function () {

  }
}