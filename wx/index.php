<?php

$ip = $_SERVER["REMOTE_ADDR"];

if (!empty($_SERVER["HTTP_CLIENT_IP"])) {
    $ip = $_SERVER["HTTP_CLIENT_IP"];
} elseif (!empty($_SERVER["HTTP_X_FORWARDED_FOR"])) {
    $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
}

$API_KEY = "f23a8d5803e02eb71baa30cc2ab0c2a8";
$apiURL = "https://api.forecast.io/forecast/" . $API_KEY . "/";

$ipApiURL = "http://gd.geobytes.com/GetCityDetails?fqcn=" . $ip;

$ipAPIResponse = file_get_contents($ipApiURL);
$ipAPIData = json_decode($ipAPIResponse, TRUE);

print($ipAPIData["geobyteslatitude"] . "," $ipAPIData["geobyteslongitude"]);

?>