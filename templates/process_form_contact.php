<?php
// Fehlermeldungen anzeigen
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Verbindung zur Datenbank herstellen
$host_name = 'db5015242875.hosting-data.io';
$database = 'dbs12573039';
$user_name = 'dbu2741293';
$password = 'HochzeitLenathan2024';

// Verbindung herstellen
$conn = new mysqli($host_name, $user_name, $password, $database);

// Überprüfen der Verbindung
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// Überprüfen, ob die Tabelle existiert, andernfalls erstellen
$table = 'message_contactform_table';
$check_table_query = "SHOW TABLES LIKE '$table'";
$table_exists_result = $conn->query($check_table_query);

// Überprüfen des Abfrageergebnisses
if (!$table_exists_result) {
    echo "Fehler beim Überprüfen der Tabelle: " . $conn->error;
    exit();
}

if ($table_exists_result->num_rows == 0) {
    // Tabelle existiert nicht, erstellen
    $create_table_query = "CREATE TABLE $table (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(50) NOT NULL,
        nachricht TEXT NOT NULL
    )";
    if ($conn->query($create_table_query) === FALSE) {
        echo "Fehler beim Erstellen der Tabelle: " . $conn->error;
        exit();
    }
}

// Formulardaten verarbeiten
if(isset($_POST['contactName'], $_POST['contactEmail'], $_POST['contactMessage'])) {
    $name = $_POST['contactName'];
    $email = $_POST['contactEmail'];
    $message = $_POST['contactMessage'];
} else {
    echo "<script>alert('Es müssen zuerst alle Felder ausgefüllt werden.');</script>";
    exit();
}

// E-Mail zusammenstellen
$to = "kontakt@lenathans-hochzeit.de"; // Empfänger
$subject = "Neue Nachricht über Hochzeitswebseite von $name";
$body = "Name: $name\nEmail: $email\nNachricht: $message";
$headers = "From: Lenathans Hochzeit <kontakt@lenathans-hochzeit.de>\r\n";

// E-Mail senden
$email_sent = mail($to, $subject, $body, $headers);

// Überprüfen, ob die E-Mail erfolgreich gesendet wurde
if ($email_sent) {
    // Daten in die Datenbank einfügen
    $insert_query = "INSERT INTO $table (name, email, nachricht) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($insert_query);
    $stmt->bind_param('sss', $name, $email, $message);
    
    if (!$stmt->execute()) {
        header('Location: https://lenathans-hochzeit.de/index.html?error_mail_message=Formular%20Fehler');
        exit();
    } else {
        header('Location: https://lenathans-hochzeit.de/index.html?success_mail_message=Versand%20erfolgreich');
        exit();
    }
} else {
    header('Location: https://lenathans-hochzeit.de/index.html?error_mail_message=Versand%20Fehler');
    exit();
}

// Verbindung zur Datenbank schließen
$conn->close();
?>