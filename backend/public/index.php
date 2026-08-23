<?php

header("Content-Type: application/json");

$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$method = $_SERVER["REQUEST_METHOD"];

$projects = [
    [
        "id" => 1,
        "title" => "Task Manager",
        "slug" => "task-manager",
        "description" => "A task management application for creating, updating and organizing tasks.",
        "technologies" => ["Next.js", "TypeScript", "PHP", "MySQL"]
    ],
    [
        "id" => 2,
        "title" => "AI Automation Assistant",
        "slug" => "ai-automation-assistant",
        "description" => "An AI-powered automation system using agents and external services.",
        "technologies" => ["n8n", "AI", "APIs", "PostgreSQL"]
    ],
    [
        "id" => 3,
        "title" => "Developer Portfolio",
        "slug" => "developer-portfolio",
        "description" => "A full-stack portfolio built with Next.js, PHP, MySQL and Docker.",
        "technologies" => ["Next.js", "PHP", "MySQL", "Docker"]
    ]
];

if ($method === "GET" && $uri === "/api/projects") {
    echo json_encode($projects);
    exit;
}

if (
    $method === "GET" &&
    preg_match("#^/api/projects/([^/]+)$#", $uri, $matches)
) {
    $slug = $matches[1];

    foreach ($projects as $project) {
        if ($project["slug"] === $slug) {
            echo json_encode($project);
            exit;
        }
    }

    http_response_code(404);

    echo json_encode([
        "error" => "Project not found"
    ]);

    exit;
}

http_response_code(404);

echo json_encode([
    "error" => "Route not found"
]);