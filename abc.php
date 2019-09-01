<?php
$userid = isset($_GET['email']) ? $_GET['username'] : die();
$password = isset($_GET['password']) ? $_GET['password'] : die();
if($userid = "admin@thapar.edu" && $password = "admin12345"){
    header("Location: http://www.redirect.to.url.com/");
}

?>