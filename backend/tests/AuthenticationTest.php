<?php

use PHPUnit\Framework\TestCase;

class AuthenticationTest extends TestCase
{
    private const BASE_URL = "http://localhost:8000";

    private function request(string $method, string $path, ?array $body = null): array
    {
        $ch = curl_init(self::BASE_URL . $path);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);

        if ($body !== null) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        }

        $response = curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return [
            "status" => $statusCode,
            "body" => json_decode($response, true),
        ];
    }

    public function testGetMeWithoutAuthReturns401(): void
    {
        $result = $this->request("GET", "/api/me");

        $this->assertEquals(401, $result["status"]);
        $this->assertEquals("Authentication required", $result["body"]["error"]);
    }

    public function testDeleteProjectWithoutAuthReturns401(): void
    {
        $result = $this->request("DELETE", "/api/projects/some-fake-slug");

        $this->assertEquals(401, $result["status"]);
        $this->assertEquals("Authentication required", $result["body"]["error"]);
    }

    public function testCreateProjectWithoutAuthReturns401(): void
    {
        $result = $this->request("POST", "/api/projects", [
            "title" => "Test",
            "slug" => "test",
            "description" => "test",
        ]);

        $this->assertEquals(401, $result["status"]);
        $this->assertEquals("Authentication required", $result["body"]["error"]);
    }
}
