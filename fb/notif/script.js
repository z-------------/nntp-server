var main = function(){
    console.log("we're in!");
    
    var $msgsList = $(".list");
    var msgsList = document.querySelectorAll(".list")[0];
    
    FB.api("me/notifications", function(r){
        console.log(r);

        r.data.forEach(function(datum){
            var dateString = new Date(datum.created_time).toLocaleTimeString();
            var imgSrc = "//placehold.it/50x50";
            var titleString = datum.from.name;
            var contentString = datum.title;

            msgsList.appendChild(makeListItem(titleString, contentString, imgSrc, dateString));
        });
    });
};