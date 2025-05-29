<?php
// Laat fouten zien (voor debugging)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Stuur altijd JSON terug
header('Content-Type: application/json');

// ✅ Stap 1: Verbinden met je database
$host = 'localhost';            // Gebruik 'localhost' als je MySQL in dezelfde container draait, of 'db' bij Docker Compose
$user = 'm4proggebruiker';      // Jouw gebruikersnaam
$pass = 'WACHTWOORD';           // Vervang dit door je echte wachtwoord
$db   = 'product-filter-voltronics';           // De naam van je database

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(["error" => "Databaseverbinding mislukt: " . $conn->connect_error]);
    exit;
}

// ✅ Stap 2: Haal zoekterm op
$zoekterm = $_GET['query'] ?? '';
$zoekterm = "%" . $zoekterm . "%";

// ✅ Stap 3: Query voorbereiden
$sql = "SELECT name, description FROM products WHERE name LIKE ? OR description LIKE ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["error" => "Fout in prepare(): " . $conn->error]);
    exit;
}

$stmt->bind_param("ss", $zoekterm, $zoekterm);
$stmt->execute();
$result = $stmt->get_result();

// ✅ Stap 4: Resultaten ophalen
$producten = [];
while ($row = $result->fetch_assoc()) {
    $producten[] = $row;
}

echo json_encode($producten);
?>
