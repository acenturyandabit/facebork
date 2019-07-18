let activeThreads = {};
module.exports = {
    begin: function (message, api) {
        //auto start if not started
        if (!activeThreads[message.threadID]) {
            return true;
        } else return false;
    },
    bot: function template() {// a new bot with a new state is called for each thread.
        this.state = {};
        this.recieveMessage = function (message, api) {
            activeThreads[message.threadID] = true;
            //Does the message match a command?
            if (message.body.match(/^sth$/)) {
                api.sendMessage("Send something", message.threadID);
            }
        }
        this.toSaveData = function () {
            return this.state;
        }
        this.fromSaveData = function (data) {
            this.state=data;
        }
    }
}