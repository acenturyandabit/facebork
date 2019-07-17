//store some state stuff
let internalState={};

exports.engine = {
    switch: "pinto",
    regex: /.+/gi,
    processor: (regres, session) => {
        let cthread=session.lastMessage.threadID;
        if (!internalState[cthread])internalState[cthread]={count:0};
        //are we pinning something?
        if (session.lastMessage.body.match(/^pin$/)){
            //we are being instructed to pin something
            if (session.lastMessage.repliedTo){
                if (!internalState[cthread].list)internalState[cthread].list=[];
                internalState[cthread].list.push(session.lastMessage.repliedTo.messageID);
                //...and send back a confirmation message
                session.api.sendMessage("Pinning this message!",session.lastMessage.threadID,()=>{},session.lastMessage.repliedTo.messageID);
            }else{
                session.api.sendMessage("Reply to a message with 'pin' to pin it.",session.lastMessage.threadID);
            }
        }else if (session.lastMessage.body.match(/^unpin$/)){
            //we are being instructed to pin something
            if (session.lastMessage.repliedTo){
                if (!internalState[cthread].list){
                    session.api.sendMessage("Nothing was pinned...",session.lastMessage.threadID);
                }else{
                    let i=internalState[cthread].list.indexOf(session.lastMessage.repliedTo.messageID);
                    if (i==-1){
                        session.api.sendMessage("The message hasn't been pinned...",session.lastMessage.threadID);
                    }else{
                        session.api.sendMessage("Message unpinned.",session.lastMessage.threadID);
                        internalState[cthread].list.splice(i,1);
                    }
                }
                //...and send back a confirmation message
                session.api.sendMessage("Pinning this message!",session.lastMessage.threadID,()=>{},session.lastMessage.repliedTo.messageID);
            }else{
                session.api.sendMessage("Reply to a message with 'unpin' to unpin it.",session.lastMessage.threadID);
            }
        }else{
            internalState[cthread].count++;
            if (!(internalState[cthread].count%30)){
                //resend all pinned messages
                if (internalState[cthread].list)internalState[cthread].list.forEach((v,i)=>{
                    session.api.sendMessage("A pinned message",session.lastMessage.threadID,()=>{},v);
                })
            }
        }
    }
};