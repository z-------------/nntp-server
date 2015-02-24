<?php

$ip = $_SERVER["REMOTE_ADDR"];
if (!empty($_SERVER["HTTP_CLIENT_IP"])) {
    $ip = $_SERVER["HTTP_CLIENT_IP"];
} elseif (!empty($_SERVER["HTTP_X_FORWARDED_FOR"])) {
    $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
}

$ipAPIURL = "http://gd.geobytes.com/GetCityDetails?fqcn=" . $ip;
$ipAPIResponse = file_get_contents($ipAPIURL);
$ipAPIData = json_decode($ipAPIResponse, TRUE);
$latLngStr = $ipAPIData["geobyteslatitude"] . "," . $ipAPIData["geobyteslongitude"];

$wxYQLQuery = "set api_key='2319d1510ebae6b2d61d69ec6dc6ac14' on flickr.places; select * from weather.woeid where w in (select place.woeid from flickr.places(1) where (lat,lon) in (" . $latLngStr . ")) and u='c'";
$wxAPIURL = "https://query.yahooapis.com/v1/public/yql?q=" . urlencode($wxYQLQuery) . "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
$wxAPIResponse = file_get_contents($wxAPIURL);
$wxAPIData = json_decode($wxAPIResponse, TRUE);

var_dump($wxAPIURL);

?>