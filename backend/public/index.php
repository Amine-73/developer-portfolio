<?php

session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once __DIR__ . "/../config/database.php";

$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$method = $_SERVER["REQUEST_METHOD"];

/*
|--------------------------------------------------------------------------
| GET /api/projects
|--------------------------------------------------------------------------
*/

if ($method === "GET" && $uri === "/api/projects") {
    
    $stmt = $pdo->query(
        "SELECT
            p.id,
            p.title,
            p.slug,
            p.description,
            p.image_url,
            p.github_url,
            p.demo_url,
            p.featured,
            p.created_at,
            pt.technology
        FROM projects p
        LEFT JOIN project_technologies pt
            ON p.id = pt.project_id
        ORDER BY p.created_at DESC"
    );

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $projects = [];

    foreach ($rows as $row) {
        $id = $row["id"];

        if (!isset($projects[$id])) {
            $projects[$id] = [
                "id" => (int) $row["id"],
                "title" => $row["title"],
                "slug" => $row["slug"],
                "description" => $row["description"],
                "image_url" => $row["image_url"],
                "github" => $row["github_url"],
                "demo" => $row["demo_url"],
                "featured" => (bool) $row["featured"],
                "technologies" => []
            ];
        }

        if ($row["technology"] !== null) {
            $projects[$id]["technologies"][] = $row["technology"];
        }
    }

    echo json_encode(array_values($projects));
    exit;
}


/*
|--------------------------------------------------------------------------
| GET /api/projects/{slug}
|--------------------------------------------------------------------------
*/

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
            p.image_url,
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

    // $project = [
    //     "id" => (int) $rows[0]["id"],
    //     "title" => $rows[0]["title"],
    //     "slug" => $rows[0]["slug"],
    //     "description" => $row["description"],
    //     "image_url" => $row["image_url"],
    //     "github" => $row["github_url"],
    //     "demo" => $rows[0]["demo_url"],
    //     "featured" => (bool) $rows[0]["featured"],
    //     "technologies" => []
    // ];
    $project = [
        "id" => (int) $rows[0]["id"],
        "title" => $rows[0]["title"],
        "slug" => $rows[0]["slug"],
        "description" => $rows[0]["description"],
        "image_url" => $rows[0]["image_url"],
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


/*
|--------------------------------------------------------------------------
| POST /api/projects
|--------------------------------------------------------------------------
*/

if ($method === "POST" && $uri === "/api/projects") {
    requireAdmin();
    $data = json_decode(
        file_get_contents("php://input"),
        true
    );

    if (
        empty($data["title"]) ||
        empty($data["slug"]) ||
        empty($data["description"])
    ) {
        http_response_code(400);

        echo json_encode([
            "error" => "Title, slug and description are required"
        ]);

        exit;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare(
            "INSERT INTO projects (
                title,
                slug,
                description,
                github_url,
                demo_url,
                featured
            )
            VALUES (?, ?, ?, ?, ?, ?)"
        );

        $stmt->execute([
            $data["title"],
            $data["slug"],
            $data["description"],
            $data["github"] ?? null,
            $data["demo"] ?? null,
            !empty($data["featured"]) ? 1 : 0
        ]);

        $projectId = $pdo->lastInsertId();

        if (
            isset($data["technologies"]) &&
            is_array($data["technologies"])
        ) {
            $technologyStmt = $pdo->prepare(
                "INSERT INTO project_technologies (
                    project_id,
                    technology
                )
                VALUES (?, ?)"
            );

            foreach ($data["technologies"] as $technology) {
                $technologyStmt->execute([
                    $projectId,
                    $technology
                ]);
            }
        }

        $pdo->commit();

        http_response_code(201);

        echo json_encode([
            "message" => "Project created successfully",
            "id" => (int) $projectId
        ]);

        exit;

    } catch (PDOException $e) {
        $pdo->rollBack();

        http_response_code(500);

        echo json_encode([
            "error" => "Failed to create project"
        ]);

        exit;
    }
}



/*
|--------------------------------------------------------------------------
|Update part of CRUD 
|--------------------------------------------------------------------------
*/

if (
    $method === "PUT" &&
    preg_match("#^/api/projects/([^/]+)$#", $uri, $matches)
    
) {
    requireAdmin();
    $slug = $matches[1];

    $data = json_decode(
        file_get_contents("php://input"),
        true
    );

    if (
        empty($data["title"]) ||
        empty($data["description"])
    ) {
        http_response_code(400);

        echo json_encode([
            "error" => "Title and description are required"
        ]);

        exit;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare(
            "SELECT id FROM projects WHERE slug = ?"
        );

        $stmt->execute([$slug]);

        $project = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$project) {
            $pdo->rollBack();

            http_response_code(404);

            echo json_encode([
                "error" => "Project not found"
            ]);

            exit;
        }

        $projectId = $project["id"];

        $updateStmt = $pdo->prepare(
            "UPDATE projects
             SET
                title = ?,
                description = ?,
                github_url = ?,
                demo_url = ?,
                featured = ?
             WHERE id = ?"
        );

        $updateStmt->execute([
            $data["title"],
            $data["description"],
            $data["github"] ?? null,
            $data["demo"] ?? null,
            !empty($data["featured"]) ? 1 : 0,
            $projectId
        ]);

        if (
            isset($data["technologies"]) &&
            is_array($data["technologies"])
        ) {
            $deleteTechStmt = $pdo->prepare(
                "DELETE FROM project_technologies
                 WHERE project_id = ?"
            );

            $deleteTechStmt->execute([$projectId]);

            $insertTechStmt = $pdo->prepare(
                "INSERT INTO project_technologies (
                    project_id,
                    technology
                )
                VALUES (?, ?)"
            );

            foreach ($data["technologies"] as $technology) {
                $insertTechStmt->execute([
                    $projectId,
                    $technology
                ]);
            }
        }

        $pdo->commit();

        echo json_encode([
            "message" => "Project updated successfully"
        ]);

        exit;

    } catch (PDOException $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }

        http_response_code(500);

        echo json_encode([
            "error" => "Failed to update project"
        ]);

        exit;
    }
}

/*
|--------------------------------------------------------------------------
|CRUD operation  DELETE.
|--------------------------------------------------------------------------
*/


if (
    $method === "DELETE" &&
    preg_match("#^/api/projects/([^/]+)$#", $uri, $matches)
    
) {
    requireAdmin(); 
    $slug = $matches[1];

    try {
        $stmt = $pdo->prepare(
            "SELECT id FROM projects WHERE slug = ?"
        );

        $stmt->execute([$slug]);

        $project = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$project) {
            http_response_code(404);

            echo json_encode([
                "error" => "Project not found"
            ]);

            exit;
        }

        $deleteStmt = $pdo->prepare(
            "DELETE FROM projects WHERE id = ?"
        );

        $deleteStmt->execute([
            $project["id"]
        ]);

        echo json_encode([
            "message" => "Project deleted successfully"
        ]);

        exit;

    } catch (PDOException $e) {
        http_response_code(500);

        echo json_encode([
            "error" => "Failed to delete project"
        ]);

        exit;
    }
}


/*
|--------------------------------------------------------------------------
| /api/login
|--------------------------------------------------------------------------
*/




if ($method === "POST" && $uri === "/api/login") {

    $data = json_decode(
        file_get_contents("php://input"),
        true
    );

    if (
        empty($data["email"]) ||
        empty($data["password"])
    ) { 
        http_response_code(400);

        echo json_encode([
            "error" => "Email and password are required"
        ]);

        exit;
    }

    $stmt = $pdo->prepare(
        "SELECT id, email, password
         FROM admins
         WHERE email = ?"
    );

    $stmt->execute([
        $data["email"]
    ]);

    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if (
        !$admin ||
        !password_verify(
            $data["password"],
            $admin["password"]
        )
    ) {
        http_response_code(401);

        echo json_encode([
            "error" => "Invalid email or password"
        ]);

        exit;
    }

    // Create the authenticated session ONLY after verification
    $_SESSION["admin_id"] = $admin["id"];
    $_SESSION["admin_email"] = $admin["email"];

    echo json_encode([
        "message" => "Login successful",
        "admin" => [
            "id" => (int) $admin["id"],
            "email" => $admin["email"]
        ]
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| authenticated endpoint // /api/me route
|--------------------------------------------------------------------------
*/



if ($method === "GET" && $uri === "/api/me") {
    requireAdmin();

    echo json_encode([
        "admin" => [    
            "id" => (int) $_SESSION["admin_id"],
            "email" => $_SESSION["admin_email"]
        ]
    ]);

    exit;
}

function requireAdmin(): void
{
    if (empty($_SESSION["admin_id"])) {
        http_response_code(401);

        echo json_encode([
            "error" => "Authentication required"
        ]);

        exit;
    }
}

/*
|--------------------------------------------------------------------------
| POST /api/logout
|--------------------------------------------------------------------------
*/

if ($method === "POST" && $uri === "/api/logout") {
    session_unset();
    session_destroy();

    echo json_encode([
        "message" => "Logged out successfully"
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

http_response_code(404);

echo json_encode([
    "error" => "Route not found"
]);