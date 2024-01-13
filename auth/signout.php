<?php
//signout.php

// Start the session
session_start();

$redirect = ($_SESSION['access'] === 'admin' ? '../admin/auth.admin.php' : '../auth/signin.php');

unset($_SESSION['UserLogin']);
unset($_SESSION['username']);
unset($_SESSION['access']);
unset($_SESSION['id']);

header("Location: $redirect");

?>