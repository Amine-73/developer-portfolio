<?php

$host = getenv("MYSQL_HOST") ?: "database";
$dbname = getenv("MYSQL_DATABASE") ?: "portfolio";
$username = getenv("MYSQL_USER") ?: "portfolio_user";
$password = getenv("MYSQL_PASSWORD");

if (!$password) {
    throw new RuntimeException(
        "MYSQL_PASSWORD environment variable is not configured"
    );
}


try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    $pdo->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

} catch (PDOException $e) {
    die("Database connection failed");
}
