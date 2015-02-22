var main = function(){
    console.log("we're in!");
    
    var msgsList = document.querySelectorAll(".list")[0];
    
    FB.api("me/notifications", function(r){
        console.log(r);

        r.data.forEach(function(datum){
            var hrtime = new HRTime(new Date(datum.created_time));
            var dateString = hrtime.time + " " + hrtime.unit + "s ago";
            
            var imgSrc = "//placehold.it/50x50";
            var titleString = datum.from.name;
            var contentString = datum.title;
            var notifID = datum.id;
            var url = datum.link;
            
            FB.api(datum.from.id + "/picture", function(r){
                var newSrc = r.data.url;
                document.querySelector(".list-item[data-item-id='" + notifID + "'] .item-img img").src = newSrc;
            });

            msgsList.appendChild(makeListItem(titleString, contentString, imgSrc, dateString, notifID, url));
        });
    });
};