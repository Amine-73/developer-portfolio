<?php

use PHPUnit\Framework\TestCase;

class ContactFormTest extends TestCase
{
    private const BASE_URL = "http://localhost:8000";

    protected function setUp(): void
    {
        foreach (glob("/tmp/contact_*.txt") as $file) {
            unlink($file);
        }
    }

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

    public function testInvalidEmailIsRejected(): void
    {
        $result = $this->request("POST", "/api/contact", [
            "name" => "PHPUnit Tester",
            "email" => "not-an-email",
            "message" => "This is a test message.",
        ]);

        $this->assertEquals(400, $result["status"]);
        $this->assertEquals("Invalid email address", $result["body"]["error"]);
    }

    public function testMissingFieldsAreRejected(): void
    {
        $result = $this->request("POST", "/api/contact", [
            "name" => "PHPUnit Tester",
        ]);

        $this->assertEquals(400, $result["status"]);
        $this->assertEquals(
            "Name, email and message are required",
            $result["body"]["error"]
        );
    }

    public function testOversizedMessageIsRejected(): void
    {
        $result = $this->request("POST", "/api/contact", [
            "name" => "PHPUnit Tester",
            "email" => "phpunit@example.com",
            "message" => str_repeat("A", 5001),
        ]);

        $this->assertEquals(400, $result["status"]);
        $this->assertEquals(
            "Input exceeds the allowed length",
            $result["body"]["error"]
        );
    }
}
