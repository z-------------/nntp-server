var makeListItem = function(title, content, img, date, id){
    var elem = document.createElement("li");
    elem.classList.add("list-item");
    elem.dataset.itemId = id;
    elem.innerHTML = "<div class='item-img'><img src='" + img + "'></div><div class='item-content'><h3>" + title + "</h3><p>" + content + "</p><date>" + date + "</date></div>";
    return elem;
};

var USER_ID;

FB.init({
    appId: "943767175668482",
    cookie: true,
    version: "v2.2"
});

document.addEventListener("DOMContentLoaded", function(){
    var loginBtn = document.querySelectorAll(".login-btn")[0];

    function statusChangeCallback(response) {
        console.log(response);
        if (response.status === "connected") {
            main();
            USER_ID = response.authResponse.userID;
            loginBtn.classList.remove("visible");
        } else if (response.status === "not_authorized") {
            console.log("please log in with fb");
            loginBtn.classList.add("visible");
        } else {
            console.log("please log in to fb");
            loginBtn.classList.add("visible");
        }
    }

    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

    loginBtn.addEventListener("click", function(){
        FB.login(checkLoginState, {
            scope: "read_mailbox,manage_notifications"
        });
    });
});