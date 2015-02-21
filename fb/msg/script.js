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

                var contentString = "";
                var lastMessage = datum.comments.data[datum.comments.data.length - 1];
                if (lastMessage.message) {
                    contentString = lastMessage.from.name + ": " + lastMessage.message;
                } else {
                    contentString = lastMessage.from.name + " sent a file";
                }

                var membersArray = [];
                datum.to.data.forEach(function(toNode){
                    if (toNode.id !== USER_ID) {
                        membersArray.push(toNode.name);
                    }
                });

                msgsList.appendChild(makeListItem(membersArray.join(", "), contentString, imgSrc, dateString));
            }
        });
    });
};