var makeListItem = function(title, content, img, date, id, url){
    var elem = document.createElement("li");
    elem.classList.add("list-item");
    elem.dataset.itemId = id;
    elem.innerHTML = "<div class='item-img'><img src='" + img + "'></div><div class='item-content'><h3>" + title + "</h3><p>" + content + "</p><date>" + date + "</date></div>";
    elem.addEventListener("click", function(){
        window.open(url);
    });
    return elem;
};

var USER_ID;

FB.init({
    appId: "943767175668482",
    cookie: true,
    xfbml: true,
    version: "v2.2"
});

function statusChangeCallback(response) {
    console.log(response);
    if (response.status === "connected") {
        main();
        USER_ID = response.authResponse.userID;
        document.body.classList.remove("not-authed");
    } else if (response.status === "not_authorized") {
        console.log("please log in with fb");
        document.body.classList.add("not-authed");
    } else {
        console.log("please log in to fb");
        document.body.classList.add("not-authed");
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