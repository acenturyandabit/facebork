module.exports = {
    begin:function(message,api){
        if (message.body=="!template"){
            api.sendMessage("Template bot started!",message.threadID);
            return true;
        }
        //return true if bot should start; otherwise return false.
    },
    bot: function template() {// a new bot with a new state is called for each thread.
        this.state = {};
        this.recieveMessage = function (message,api) {
            //does the message match a command?
            if (message.body.match(/^sth$/)) {
                api.sendMessage("Send something", message.threadID);
            }
            //return "quit" if we need to quit
            return (message.body=="!template quit")?quit:undefined;
        }
        this.toSaveData = function () {
            return this.state;
        }
        this.fromSaveData = function (data) {
            this.state=data;
        }
    }
}