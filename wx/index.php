<?php

$usedGet = array(
    ip => FALSE,
    coords => FALSE
);

$ip = $_SERVER["REMOTE_ADDR"];
if (!empty($_GET["ip"])) {
    $ip = $_GET["ip"];
    
    $usedGet["ip"] = TRUE;
} elseif (!empty($_SERVER["HTTP_CLIENT_IP"])) {
    $ip = $_SERVER["HTTP_CLIENT_IP"];
} elseif (!empty($_SERVER["HTTP_X_FORWARDED_FOR"])) {
    $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
}

if (strrpos($ip, ",") !== FALSE) {
    $explodedIP = explode(",", $ip);
    $ip = $explodedIP[0];
}

if (!empty($_GET["coords"])) {
    $latLngStr = $_GET["coords"];
    
    $usedGet["coords"] = TRUE;
    $usedGet["ip"] = NULL;
} else {
    $ipAPIURL = "http://ipinfo.io/" . $ip . "/geo";
    $ipAPIResponse = file_get_contents($ipAPIURL);
    $ipAPIData = json_decode($ipAPIResponse, TRUE);
    $latLngStr = $ipAPIData["loc"];
}

$wxYQLQuery = "SELECT item.condition,location FROM weather.forecast WHERE woeid IN (SELECT woeid FROM geo.placefinder WHERE text='" . $latLngStr . "' AND gflags='R')";
$wxAPIURL = "https://query.yahooapis.com/v1/public/yql?q=" . urlencode($wxYQLQuery) . "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
$wxAPIResponse = file_get_contents($wxAPIURL);

$response = json_decode($wxAPIResponse);
$response->debug = array(
    "ip" => $ip,
    "yql_query" => $wxYQLQuery,
    "yql_query_url" => $wxAPIURL,
    "ipinfo_url" => $ipAPIURL,
    "coords" => explode(",", $latLngStr),
    "used_get_parameter" => $usedGet
);
ksort($response->debug);

$response = json_encode($response, JSON_PRETTY_PRINT);

header("Content-Type: application/json;charset=utf-8");

print($response);

?>