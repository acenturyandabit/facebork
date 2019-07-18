
String.prototype.replaceAt = function (index, char) {
    return this.slice(0, index) + char + this.slice(index + char.length);
}
let dontSend = {};
module.exports = {
    begin: function (message, api) {
        if (message.body == "!borkify") {
            api.sendMessage("Borkify started!", message.threadID, (err, msg) => {
                dontSend[msg.messageID] = true;
            });
            return true;
        }
        //return true if bot should start; otherwise return false.
    },
    bot: function template() {
        this.state = {};
        this.recieveMessage = function (message, api) {
            //return "quit" if we need to quit
            if (message.body == "!borkify quit") {
                api.sendMessage("Borkify quitting.", message.threadID);
                return "quit";
            }
            if (message.senderID==api.getCurrentUserID())return;
            //borkify
            let result = message.body;
            for (let i = 0; i < result.length; i++) {
                if (i % 2) result = result.replaceAt(i, result[i].toUpperCase());
                else result = result.replaceAt(i, result[i].toLowerCase());
            }
            api.sendMessage(result, message.threadID, (err, msg) => {
                dontSend[msg.messageID] = true;
                //cache the outgoing message threadID
            });
        }
        this.toSaveData = function () {
            return this.state;
        }
        this.fromSaveData = function () {
            return this.state;
        }
    }
}