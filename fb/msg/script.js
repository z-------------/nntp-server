var FB_MESSAGES_URL = "http://www.facebook.com/messages";

var main = function(){
    console.log("we're in!");
    
    var msgsList = document.querySelectorAll(".list")[0];
    
    FB.api("me/inbox", function(r){
        console.log(r);

        r.data.forEach(function(datum){
            if (datum.comments) {
                var hrtime = new HRTime(new Date(datum.updated_time));
                var dateString = hrtime.time + " " + hrtime.unit + "s ago";
                var imgSrc = "/img/person.svg";
                var chatURL = FB_MESSAGES_URL;
                var chatID = datum.id;
                var messages = datum.comments.data;

                var contentString = "";
                var lastMessage = messages[messages.length - 1];
                var lastSenderName = lastMessage.from.name.split(" ")[0];
                if (lastMessage.from.id === USER_ID) lastSenderName = "you";
                if (lastMessage.message) {
                    contentString = "<span class='last-sender'>" + lastSenderName + "</span>: " + lastMessage.message;
                } else {
                    contentString = "<span class='last-sender'>" + lastSenderName + "</span> sent a file";
                }
                
                var idsArray = [];
                datum.to.data.forEach(function(toNode){
                    if (toNode.id !== USER_ID) {
                        idsArray.push(toNode.id);
                    }
                });
                
                var membersArray = [];
                messages.reverse().forEach(function(message){
                    var id = message.from.id;
                    var name = message.from.name;
                    if (membersArray.indexOf(name) === -1 && id !== USER_ID && idsArray.indexOf(id) !== -1) {
                        membersArray.push(name);
                    }
                });
                
                var membersString = membersArray.join("");
                if (membersArray.length === (datum.to.data.length - 1)) {
                    membersString = membersArray.join(", ");
                } else if (membersArray.length > 1 || idsArray.length > 1) {
                    membersString = membersArray.join(", ") + " and " + (datum.to.data.length - 1 - membersArray.length) + " others";
                }
                
                if (idsArray.length === 1) { // individual chat
                    FB.api(idsArray[0] + "/picture", function(r){
                        var newSrc = r.data.url;
                        document.querySelector(".list-item[data-item-id='" + chatID + "'] .item-img img").src = newSrc;
                    });
                } else { // group chat
                    chatURL = "http://www.facebook.com/messages/conversation-" + chatID;
                    imgSrc = "/img/people.svg";
                }

                msgsList.appendChild(makeListItem(membersString, contentString, imgSrc, dateString, chatID, chatURL));
            }
        });
    });
};