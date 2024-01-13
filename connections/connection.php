<?php

// function connection() {
    
//     $dbServer = "localhost";
//     $dbUser = "root"; //Name of the user
//     $dbPassword = ""; //DB Password of that user
//     $dbName = "shoepee_db"; //Name of the database
    
//     $connectionInfo = array(
//         "Database" => $dbName,
//         "UID" => $dbUser,
//         "PWD" => $dbPassword
//     );

//     $conn = new PDO("sqlsrv:Server=localhost;Database=shoepee_db", $dbUser, $dbPassword);

//     $conn = sqlsrv_connect($dbServer, $connectionInfo);

//     return $con;
// }

function connection() {
    
    $host = "localhost";
    $username = "root";
    $password = "";
    $database = "shoepee_db";

    $con = new mysqli($host, $username, $password, $database);

    if ($con->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $con->connect_error);
    }

    return $con;
}

// function connection()
// {
//     $host = "localhost";
//     $username = "root";
//     $password = "";
//     $dbname = "shoepee_db";

//     try {
//         $pdo = new PDO("mysql:host=$host;dbnsmr=$dbname", $username, $password);
//         $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//         return $pdo;

//     } catch (PDOException $e) {
//         throw new Exception("Connection failed: " . $e->getmessage());
//     }
// }

?>