var $loginBtn = $(".login-btn");
var loginBtn = document.querySelectorAll(".login-btn")[0];

FB.init({
    appId: "943767175668482",
    cookie: true,
    version: "v2.2"
});

function statusChangeCallback(response) {
    console.log(response);
    if (response.status === "connected") {
        main();
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

$loginBtn.click(function(){
    FB.login(checkLoginState, {
        scope: "read_mailbox,manage_notifications"
    });
});