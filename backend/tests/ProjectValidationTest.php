<?php

use PHPUnit\Framework\TestCase;

class ProjectValidationTest extends TestCase
{
    private const BASE_URL = "http://localhost:8000";
    private static ?string $sessionCookie = null;

    private function request(string $method, string $path, ?array $body = null, bool $withAuth = false): array
    {
        $ch = curl_init(self::BASE_URL . $path);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
        curl_setopt($ch, CURLOPT_HEADER, true);

        if ($body !== null) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        }

        if ($withAuth && self::$sessionCookie) {
            curl_setopt($ch, CURLOPT_COOKIE, self::$sessionCookie);
        }

        $response = curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $headers = substr($response, 0, $headerSize);
        $bodyText = substr($response, $headerSize);
        curl_close($ch);

        if (preg_match('/Set-Cookie:\s*(PHPSESSID=[^;]+)/i', $headers, $matches)) {
            self::$sessionCookie = $matches[1];
        }

        return [
            "status" => $statusCode,
            "body" => json_decode($bodyText, true),
        ];
    }

    public static function setUpBeforeClass(): void
    {
        $ch = curl_init(self::BASE_URL . "/api/login");
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            "email" => "admin@portfolio.local",
            "password" => "ChangeMe123!",
        ]));

        $response = curl_exec($ch);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $headers = substr($response, 0, $headerSize);
        curl_close($ch);

        if (preg_match('/Set-Cookie:\s*(PHPSESSID=[^;]+)/i', $headers, $matches)) {
            self::$sessionCookie = $matches[1];
        }
    }

    public function testEmptySlugAfterSanitizationIsRejected(): void
    {
        $result = $this->request("POST", "/api/projects", [
            "title" => "Test",
            "slug" => "!!!",
            "description" => "test",
        ], withAuth: true);

        $this->assertEquals(400, $result["status"]);
        $this->assertEquals(
            "Slug must contain at least one letter or number",
            $result["body"]["error"]
        );
    }

    public function testOversizedTitleIsRejected(): void
    {
        $result = $this->request("POST", "/api/projects", [
            "title" => str_repeat("A", 300),
            "slug" => "phpunit-length-test",
            "description" => "test",
        ], withAuth: true);

        $this->assertEquals(400, $result["status"]);
        $this->assertEquals(
            "Title must be 255 characters or fewer",
            $result["body"]["error"]
        );
    }

    public function testInvalidUrlIsRejected(): void
    {
        $result = $this->request("POST", "/api/projects", [
            "title" => "PHPUnit URL Test",
            "slug" => "phpunit-url-test",
            "description" => "test",
            "github" => "not-a-url",
        ], withAuth: true);

        $this->assertEquals(400, $result["status"]);
        $this->assertEquals("Github must be a valid URL", $result["body"]["error"]);
    }

    public function testNonStringTechnologyIsRejected(): void
    {
        $result = $this->request("POST", "/api/projects", [
            "title" => "PHPUnit Tech Test",
            "slug" => "phpunit-tech-test",
            "description" => "test",
            "technologies" => ["React", 123],
        ], withAuth: true);

        $this->assertEquals(400, $result["status"]);
        $this->assertEquals(
            "Each technology must be a non-empty string up to 100 characters",
            $result["body"]["error"]
        );
    }
}
