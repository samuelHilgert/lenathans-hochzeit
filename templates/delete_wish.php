<?php
$host_name = 'db5015242875.hosting-data.io';
$database = 'dbs12573039';
$user_name = 'dbu2741293';
$password = 'HochzeitLenathan2024';

// Verbindung herstellen
$conn = new mysqli($host_name, $user_name, $password, $database);

// Verbindung prüfen
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Überprüfen, ob die POST-Variablen gesetzt sind
if (!isset($_POST['wish'])) {
    die("Error: 'wish' parameter not provided");
}

// Wunsch aus der AJAX-Anfrage abrufen und bereinigen
$wish = $conn->real_escape_string($_POST['wish']);

// Wunsch aus der Datenbank löschen (nur den ersten passenden Eintrag)
$sql_delete_wish = "DELETE FROM wishes_table WHERE wish = '$wish' LIMIT 1";
if ($conn->query($sql_delete_wish) === TRUE) {
    // Erfolgreich gelöscht
    echo "Wish deleted successfully";
} else {
    echo "Error deleting wish: " . $conn->error;
}

// Verbindung schließen
$conn->close();
?>