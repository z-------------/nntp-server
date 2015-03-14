<?php

$ip = $_SERVER["REMOTE_ADDR"];
if (!empty($_SERVER["HTTP_CLIENT_IP"])) {
    $ip = $_SERVER["HTTP_CLIENT_IP"];
} elseif (!empty($_SERVER["HTTP_X_FORWARDED_FOR"])) {
    $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
}

if (strrpos($ip, ",") !== FALSE) {
    $explodedIP = explode(",", $ip);
    $ip = $explodedIP[0];
}

$ipAPIURL = "http://ipinfo.io/" . $ip . "/geo";
$ipAPIResponse = file_get_contents($ipAPIURL);
$ipAPIData = json_decode($ipAPIResponse, TRUE);
$latLngStr = $ipAPIData["loc"];

$wxYQLQuery = "select condition from weather.forecast where woeid in (SELECT woeid FROM geo.placefinder WHERE text='" . $latLngStr . "' and gflags='R')";
$wxAPIURL = "https://query.yahooapis.com/v1/public/yql?q=" . urlencode($wxYQLQuery) . "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
$wxAPIResponse = file_get_contents($wxAPIURL);

header("Content-Type: application/json;charset=utf-8");
print($ip . $wxAPIResponse);

?>