var makeListItem = function(title, content, img, date){
    var elem = document.createElement("li");
    
    var imgElem = document.createElement("img");
    imgElem.src = img;
    elem.appendChild(imgElem);
    
    var titleElem = document.createElement("h3");
    titleElem.textContent = title;
    elem.appendChild(titleElem);
    
    var contentElem = document.createElement("p");
    contentElem.textContent = content;
    elem.appendChild(contentElem);
    
    var dateElem = document.createElement("date");
    dateElem.textContent = date;
    elem.appendChild(dateElem);
    
    return elem;
};

var main = function(){
    console.log("we're in!");
    
    var $msgsBtn = $(".msgs-btn");
    var msgsBtn = document.querySelectorAll(".msgs-btn")[0];
    var $notifsBtn = $(".notifs-btn");
    var notifsBtn = document.querySelectorAll(".notifs-btn")[0];
    
    var $msgsList = $(".msgs-list");
    var msgsList = document.querySelectorAll(".msgs-list")[0];
    var $notifsList = $(".notifs-list");
    var notifsList = document.querySelectorAll(".notifs-list")[0];
    
    $msgsBtn.click(function(){
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
                        membersArray.push(toNode.name);
                    });

                    msgsList.appendChild(makeListItem(membersArray.join(", "), contentString, imgSrc, dateString));
                }
            });
        });
    });
    
    $notifsBtn.click(function(){
        FB.api("me/notifications", function(r){
            console.log(r);
            
            /*var msgElem = document.createElement("li");
            msgElem.innerHTML = "<h3 class='msg-name'></h3>";
            msgElem.querySelector(".msg-name").textContent = */
        });
    });
};