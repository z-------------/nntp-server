<?php

$DEEPSKY_API_KEY = "cee3b9273198893fd753d6ad01863145";

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

if (!empty($_GET["lang"])) {
    $lang = $_GET["lang"];
} else {
    $lang = "en";
}

$wxAPIURL = "https://api.darksky.net/forecast/" . $DEEPSKY_API_KEY . "/" . $latLngStr . "?units=si&exclude=daily,hourly&lang=" . $lang;
$wxAPIResponse = file_get_contents($wxAPIURL);

$response = new stdClass();
$response->weather = json_decode($wxAPIResponse);
$response->debug = array(
    "ip" => $ip,
    "deepsky_url" => $wxAPIURL,
    "ipinfo_url" => $ipAPIURL,
    "coords" => explode(",", $latLngStr),
    "used_get_parameter" => $usedGet
);
ksort($response->debug);

$response = json_encode($response, JSON_PRETTY_PRINT);

header("Content-Type: application/json;charset=utf-8");

print($response);

?>
