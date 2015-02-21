var main = function(){
    console.log("we're in!");
    
    var $msgsList = $(".list");
    var msgsList = document.querySelectorAll(".list")[0];
    
    FB.api("me/inbox", function(r){
        console.log(r);

        r.data.forEach(function(datum){
            if (datum.comments) {
                var dateString = new Date(datum.updated_time).toLocaleTimeString();
                var imgSrc = "//placehold.it/50x50";
                
                var chatID = datum.id;

                var contentString = "";
                var lastMessage = datum.comments.data[datum.comments.data.length - 1];
                var lastSenderName = lastMessage.from.name.split(" ")[0];
                if (lastMessage.from.id === USER_ID) lastSenderName = "you";
                if (lastMessage.message) {
                    contentString = "<span class='last-sender'>" + lastSenderName + "</span>: " + lastMessage.message;
                } else {
                    contentString = "<span class='last-sender'>" + lastSenderName + "</span> sent a file";
                }

                var membersArray = [];
                var idsArray = [];
                datum.to.data.forEach(function(toNode){
                    if (toNode.id !== USER_ID) {
                        membersArray.push(toNode.name);
                        idsArray.push(toNode.id);
                    }
                });
                
                if (idsArray.length === 1) {
                    FB.api(idsArray[0] + "/picture", function(r){
                        var newSrc = r.data.url;
                        document.querySelector(".list-item[data-item-id='" + chatID + "'] .item-img img").src = newSrc;
                    });
                }

                msgsList.appendChild(makeListItem(membersArray.join(", "), contentString, imgSrc, dateString, chatID));
            }
        });
    });
};