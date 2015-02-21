var makeListItem = function(title, content, img, date, id){
    var elem = document.createElement("li");
    elem.classList.add("list-item");
    elem.dataset.chatId = id;
    elem.innerHTML = "<div class='item-img'><img src='" + img + "'></div><div class='item-content'><h3>" + title + "</h3><p>" + content + "</p><date>" + date + "</date></div>";
    return elem;
};