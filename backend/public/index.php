<?php

header("Content-Type: application/json");

require_once __DIR__ . "/../config/database.php";

$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$method = $_SERVER["REQUEST_METHOD"];

    if (
    $method === "GET" &&
    preg_match("#^/api/projects/([^/]+)$#", $uri, $matches)
) {
    $slug = $matches[1];

    $stmt = $pdo->prepare(
        "SELECT
            p.id,
            p.title,
            p.slug,
            p.description,
            p.github_url,
            p.demo_url,
            p.featured,
            p.created_at,
            pt.technology
        FROM projects p
        LEFT JOIN project_technologies pt
            ON p.id = pt.project_id
        WHERE p.slug = ?"
    );

    $stmt->execute([$slug]);

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($rows)) {
        http_response_code(404);

        echo json_encode([
            "error" => "Project not found"
        ]);

        exit;
    }

    $project = [
        "id" => (int) $rows[0]["id"],
        "title" => $rows[0]["title"],
        "slug" => $rows[0]["slug"],
        "description" => $rows[0]["description"],
        "github" => $rows[0]["github_url"],
        "demo" => $rows[0]["demo_url"],
        "featured" => (bool) $rows[0]["featured"],
        "technologies" => []
    ];

    foreach ($rows as $row) {
        if ($row["technology"] !== null) {
            $project["technologies"][] = $row["technology"];
        }
    }

    echo json_encode($project);
    exit;
}

    http_response_code(404);

    echo json_encode([
        "error" => "Route not found"
    ]);