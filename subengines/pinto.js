let dontCount = {};
let activeThreads = {};
module.exports = {
    begin: function (message, api) {
        //auto start if not started
        if (!activeThreads[message.threadID]) {
            return true;
        } else return false;
    },
    bot: function bot() {
        this.state = {
            count: 0,
            list: []
        };
        this.recieveMessage = function (message, api) {
            activeThreads[message.threadID] = true;
            //are we pinning something?
            if (message.body.match(/^pin$/)) {
                //we are being instructed to pin something
                if (message.repliedTo) {
                    this.state.list.push(message.repliedTo.messageID);
                    //...and send back a confirmation message
                    api.sendMessage("Pinning this message!", message.threadID, (err, msg) => { dontCount[msg.messageID] = true; }, message.repliedTo.messageID);
                } else {
                    api.sendMessage("Reply to a message with 'pin' to pin it.", message.threadID, (err, msg) => { dontCount[msg.messageID] = true; });
                }
            } else if (message.body.match(/^unpin$/)) {
                //we are being instructed to pin something
                if (message.repliedTo) {
                    if (!this.state.list) {
                        api.sendMessage("Nothing was pinned...", message.threadID, (err, msg) => { dontCount[msg.messageID] = true; });
                    } else {
                        let i = this.state.list.indexOf(message.repliedTo.messageID);
                        if (i == -1) {
                            api.sendMessage("The message hasn't been pinned...", message.threadID, (err, msg) => { dontCount[msg.messageID] = true; });
                        } else {
                            api.sendMessage("Message unpinned.", message.threadID, (err, msg) => { dontCount[msg.messageID] = true; });
                            this.state.list.splice(i, 1);
                        }
                    }
                    //...and send back a confirmation message
                    api.sendMessage("Pinning this message!", message.threadID, (err, msg) => { dontCount[msg.messageID] = true; }, message.repliedTo.messageID);
                } else {
                    api.sendMessage("Reply to a message with 'unpin' to unpin it.", message.threadID, (err, msg) => { dontCount[msg.messageID] = true; });
                }
            } else {
                if (dontCount[message.messageID]) {
                    return;
                }
                this.state.count++;
                if (!(this.state.count % 30)) {
                    //resend all pinned messages
                    if (this.state.list) this.state.list.forEach((v, i) => {
                        api.sendMessage("A pinned message", message.threadID, () => { }, v);
                    })
                }
            }
        }
        this.toSaveData = function () {
            return this.state;
        }
        this.fromSaveData = function (data) {
            this.state = data;
        }
    }
}