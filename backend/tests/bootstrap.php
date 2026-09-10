<?php

// Clear contact form rate-limit files before each test run,
// so ContactFormTest isn't affected by rate limiting between
// test cases sharing the same source IP.
foreach (glob("/tmp/contact_*.txt") as $file) {
    unlink($file);
}

require __DIR__ . "/../vendor/autoload.php";
