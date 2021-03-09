/**
 *
 * @Author:     Jeff Hatton
 * @Created:    2021.3.05
 *
 * @Description: Member Messaging Util functions
 *
 */
export function mostRecentMessages(messageData){
    const mostRecentMessages = [];
    for (let i = 0; i < messageData.length; i++) {
        if (!mostRecentMessages.length){
            mostRecentMessages.push(messageData[i]);
        } else {
            let conversationExists=false;
            for (let j = 0; j < mostRecentMessages.length; j++){
                if (isSameConversation(messageData[i], mostRecentMessages[j])){
                    conversationExists=true;
                    if (isMoreRecentMessageTime(mostRecentMessages[j].dateSent, messageData[i].dateSent)){
                        mostRecentMessages[j] = messageData[i];
                    }
                }
            }
            if (!conversationExists){
                mostRecentMessages.push(messageData[i])
            }
        }
    }
    return mostRecentMessages;
}
export function isMoreRecentMessageTime(time1, time2){
    return (time2>time1)
        ? true
        : false;
}
export function isSameConversation(message1, message2){
    return ((message1.senderId==message2.senderId && message1.receiverId==message2.receiverId)||(message1.senderId==message2.receiverId && message1.receiverId==message2.senderId))
        ? true
        : false;
}