
String.prototype.replaceAt = function (index, char) {
    return this.slice(0, index) + char + this.slice(index + char.length);
}
let dontSend = {};
module.exports = {
    begin: function (message, api) {
        if (message.body == "!uwu") {
            api.sendMessage("uwu started!", message.threadID, (err, msg) => {
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
            if (message.body == "!uwu quit") {
                api.sendMessage("uwu quitting T.T", message.threadID);
                return "quit";
            }
            if (message.senderID == api.getCurrentUserID()) return;

            let result = message.body;
            result = result.replace(/u/gi, "uwu");
            result = result.replace(/o/gi, "owo");
            result = result.replace(/r/gi, "w");
            let uwus = [
                "（＠￣∇￣＠）",
                "(^▽^＠)",
                "ヾ(@^▽^@)ノ",
                "(((＼（＠v＠）／)))",
                "＼(*T▽T*)／",
                "＼（＾▽＾）／",
                "＼（Ｔ∇Ｔ）／",
                "ヽ( ★ω★)ノ",
                "ヽ(；▽；)ノ",
                "ヾ(。◕ฺ∀◕ฺ)ノ",
                "ヾ(＠† ▽ †＠）ノ",
                "ヾ(＠^∇^＠)ノ",
                "ヾ(＠^▽^＠)ﾉ",
                "ヾ（＠＾▽＾＠）ノ",
                "ヾ(＠゜▽゜＠）ノ",
                "ヾ(@°▽°@)ノ",
                "ヾ(＠°▽°＠)ﾉ",
                "ヽ(*≧ω≦)ﾉ",
                "ヽ(*⌒∇⌒*)ﾉ",
                "ヽ(^。^)丿",
                "ヽ(＾Д＾)ﾉ",
                "ヽ(=^･ω･^=)丿",
                "⸂⸂⸜(രᴗര๑)⸝⸃⸃",
                "⸜(ّᶿധّᶿ)⸝",
                "ヽ(｡･ω･｡)ﾉ",
                "╰(‘ω’ )╯",
                "╰(°ㅂ°)╯",
                "┗(＾∀＾)┛",
                "ヾ(๑’౪`๑)ﾉﾞ",
                "ヾ(*Őฺ∀Őฺ*)ﾉ",
                "╰(✧∇✧)╯",
                "✯⸜(ّᶿ̷ധّᶿ̷)⸝✯",
                "◦°˚(´°౪°`)/˚°◦",
                "(-ㅂ-)/",
                "◦°˚(*❛‿❛)/˚°◦",
                "╰(◉ᾥ◉)╯",
                "⌒°(ᴖ◡ᴖ)°⌒",
                "ヾ(´∀｀○)ﾉ",
                "｡ﾟ✶ฺ.ヽ(*´∀`*)ﾉ.✶ฺﾟ｡",
                "＼(;ﾟ∇ﾟ)/",
                "ヽ(*´∀`)ﾉﾞ",
                "✧⁺⸜(●′▾‵●)⸝⁺✧",
                "ヾ(`ω`　)/",
                "◦°˚☻/˚°◦",
                "ヾ(｡^ω^｡)ノ",
                "⸜(ّᶿॕധّᶿॕ)⸝",
                "⸜(ؔᶿധؔᶿ)⸝",
                "╰( ･ ᗜ ･ )╯",
                "┏○ ＼(ﾟ 0ﾟ ;)/┓",
                "҉*( ‘ω’ )/*҉",
                "ヽ(^◇^*)/",
                "ヾ(≧∇≦)ゞ",
                "*。ヾ(｡>ｖ<｡)ﾉﾞ*。",
                "☆*~ﾟ⌒(‘-‘*)⌒ﾟ~*☆",
                "ヽ(ﾟ∀ﾟ)ﾉ",
                "ヾ(o≧∀≦o)ﾉﾞ",
                ".｡ﾟ+.ヽ| ゝ∀・*|ﾉ｡+.ﾟ",
                "(ﾟ<|＼(･ω･)／|>ﾟ)",
                "╰| ° ◞౪◟ ° |╯",
                "ヽ༼>ل͜<༽ﾉ",
                "ヽ[ヘ ل͟ ヘ]╯",
                "＼(・ω・)/",
                "ヽ（゜ω゜○）ノ",
                "☆~~ヾ(>▽<)ﾉ｡･☆",
                "＼（*´･∀･｀*）／",
                "＼（゜э゜）／",
                "ヾ(￣◇￣)ノ",
                "ヾ【*≧д≦】ノ",
                "ヽ(^O^)ノ",
                "ヾ(´▽｀*)ﾉ☆",
                "ヾ(・∀・｀*)ﾉ☆",
                "☆ヾ(*´▽｀)ﾉ",
                "☆ヾ(*´・∀・)ﾉ",
                "ヾ(*・ω・)ノ",
                "ヾ(・ω・*)ノ",
                "ヽ( ´￢`)ﾉ",
                "ヾ(≧∪≦*)ノ〃",
                "ヾ(*ゝω・*)ノ",
                "＼（○＾ω＾○）／",
                "╰(*´︶`*)╯",
                "ヽ( ´ー`)ノ",
                "┝＼( ‘∇^*)^☆／┥",
                "ヽ(^o^)丿",
                "┗|⌒O⌒|┛",
                "┗|・o・|┛",
                "ヾ(●・◇・●)ノ",
                "ヽ( ‘ω’ )ﾉ",
                "((ヾ(* ´∀｀)ノ))",
                "ヽ(´∇｀)ﾉ",
                "･:*+.(( °ω° ))/.:+",
                "ヽ(^□^｡)ノ",
                "ヾ(o✪‿✪o)ｼ",
                "＼(*ﾟ∀ﾟ*)／",
                "＼(*^￢^*)／",
                "Ψ(≧ω≦)Ψ",
                "ヽ(*≧л≦)ﾉ",
                "⸜₍ᕏ͜⁎₎⸝",
                "୧☉□☉୨"
            ];
            result += uwus.sample();
            api.sendMessage(result, message.threadID);
        }
        this.toSaveData = function () {
            return this.state;
        }
        this.fromSaveData = function () {
            return this.state;
        }
    }
}