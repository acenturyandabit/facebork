module.exports = {
    begin:function(message,api){
        if (message.body=="!template"){
            api.sendMessage("Template bot started!",message.threadID);
            return true;
        }
        //return true if bot should start; otherwise return false.
    },
    bot: function template() {
        this.state = {};
        this.recieveMessage = function (message,api) {
            //return "quit" if we need to quit
            return (message.body=="!template quit")?quit:undefined;
        }
        this.toSaveData = function () {
            return this.state;
        }
        this.fromSaveData = function () {
            return this.state;
        }
    }
}