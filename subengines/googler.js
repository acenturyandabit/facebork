var scraper = require("google-search-scraper");
var gis = require('free-google-image-search');
const imageDataURI = require("image-data-uri");
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
            let regres = /^!google (.+)$/gi.exec(message.body);
            if (regres) {
                console.log("googling " + regres[1] + "...");
                let lm = message.threadID;
                let finished = false;
                scraper.search({
                    query: regres[1],
                    limit:10
                }, function (err, url, meta) {
                    // This is called for each result
                    if (err) throw err;
                    if (finished) return;
                    if (meta.desc) {
                        api.sendMessage(`We found this result:\n${meta.desc}\nAt this URL:\n${url}`,lm);
                        finished = true;
                    }
                });
            }
            //and again
            regres = /^!image (.+)$/gi.exec(message.body);
            if (regres) {
                console.log("getting image of" + regres[1] + "...");
                let lm = message.threadID;
                gis.searchImage(regres[1]).then((res) => {
                    //save it to a bloody file
                    let fn = "/tmp/" + Date.now().toString();
                    console.log("writing to " + fn);
                    imageDataURI.outputFile(result, fn).then((res) => {
                        //upload the bloody file
                        console.log("done,sending img");
                        api.sendMessage({ body: "Here is an image of " + regres[1], attachment: fs.createReadStream(res) }, lm, function (e, i) {
                            fs.unlink(res, (e) => { console.log(e || "green means clean!") });
                        })
                    });
                }).catch((e) => {
                    console.log(e);
                })
            }
        }
        this.toSaveData = function () {
            return this.state;
        }
        this.fromSaveData = function () {
            return this.state;
        }
    }
}