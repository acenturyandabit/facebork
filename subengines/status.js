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
            this.state.count=this.state.count || 0;
            activeThreads[message.threadID] = true;
            //Send a status message
            if (message.body.match(/^!status$/)) {
                api.sendMessage(`Sent messages count: ${this.state.count}`, message.threadID);
            }
            this.state.count++;
        }
        this.toSaveData = function () {
            return this.state;
        }
        this.fromSaveData = function (data) {
            this.state=data;
        }
    }
}