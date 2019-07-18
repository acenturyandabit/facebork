Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
  };
module.exports = {
    begin: function (message, api) {
        if (message.body == "!affirmation") {
            api.sendMessage("Affirmation bot started!", message.threadID);
            return true;
        }
        //return true if bot should start; otherwise return false.
    },
    bot: function template() {// a new bot with a new state is called for each thread.
        this.state = {};
        this.recieveMessage = function (message, api) {
            let regres = /(?:^|\s+)i ((.(?!\si\s))+)(\n|$)/gi.exec(message.body);
            if (regres) {
                let _message = "Wow, you " + regres[1] + "? ";
                let validationPrompts = [
                    "Great job!",
                    "You rule!",
                    "Congratulations!",
                    "Amazing!"
                ];
                _message += validationPrompts.sample();
                api.sendMessage(_message, message.threadID);
            }
            //return "quit" if we need to quit
            if (message.body == "!affirmation quit") {
                api.sendMessage("Affirmation quitting.", message.threadID);
                return "quit";
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