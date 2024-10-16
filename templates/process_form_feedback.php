<?php
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

// Überprüfung, ob die Tabelle existiert
$table = 'if_come_table';
$check_table_query = "SHOW TABLES LIKE '$table'";
$table_exists_result = $conn->query($check_table_query);

// Überprüfen des Abfrageergebnisses
if ($table_exists_result) {
    if ($table_exists_result->num_rows == 0) {
        // Tabelle existiert nicht, sie erstellen
        $create_table_query = "CREATE TABLE $table (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            buttonValueCome VARCHAR(50) DEFAULT 'nicht ausgewählt',
            buttonValueDrive VARCHAR(50) DEFAULT 'nicht ausgewählt',
            wherePickUp VARCHAR(50) DEFAULT 'nicht angegeben',
            whereDropOff VARCHAR(50) DEFAULT 'nicht angegeben',
            buttonGiveSeats VARCHAR(50) DEFAULT 'nicht ausgewählt',
            amountSeats INT(6) DEFAULT NULL,
            fromWhereStart VARCHAR(50) DEFAULT 'nicht angegeben',
            buttonCanNotEatAll VARCHAR(50) DEFAULT 'nicht ausgewählt',
            descriptionEatAble VARCHAR(400) DEFAULT 'nichts angegeben',
            mesageForComeNotCome VARCHAR(600) DEFAULT 'nichts angegeben'
        )";

        if ($conn->query($create_table_query) === TRUE) {
            //echo "Die Tabelle $table wurde erfolgreich erstellt."; // Ausgabe entfernt
        } else {
            echo "Fehler beim Erstellen der Tabelle: " . $conn->error;
        }
    } else {
        //echo "Die Tabelle $table existiert bereits."; // Ausgabe entfernt
    }
} else {
    echo "Fehler beim Überprüfen der Tabelle: " . $conn->error;
}

// Formulardaten verarbeiten
if(isset($_POST['name_if_come'], $_POST['email_if_come'], $_POST['buttonValueCome'])) {
    $name = $_POST['name_if_come'];
    $email = $_POST['email_if_come'];
    $buttonValueIfCome = $_POST['buttonValueCome'];
    
    // Überprüfen, ob Name, E-Mail und buttonValueCome nicht leer sind
    if(empty($name) || empty($email) || empty($buttonValueIfCome)) {
        echo "<script>window.location.href = 'https://lenathans-hochzeit.de?error_feedback_message=Mindestens%20alle%20Felder%20m%C3%BCssen%20ausgef%C3%BCllt%20sein';</script>";
        exit();
    }
} else {
    // Falls eines der Felder nicht gesetzt ist, auf die Indexseite mit Fehlermeldung weiterleiten
    echo "<script>window.location.href = 'https://lenathans-hochzeit.de?error_feedback_message=Mindestens%20alle%20Felder%20m%C3%BCssen%20ausgef%C3%BCllt%20sein';</script>";
    exit();
}

// Andere Felder initialisieren
$buttonValueIfDrive= $_POST['buttonValueDrive'] ?? null;
$wherePickUp= $_POST['wherePickUp'] ?? null;
$whereDropOff= $_POST['whereDropOff'] ?? null;
$buttonGiveNoSeats= $_POST['buttonGiveSeats'] ?? null;
$amountSeats= $_POST['amountSeats'] ?? null;
$fromWhereStart= $_POST['fromWhereStart'] ?? null;
$buttonAllCanEat= $_POST['buttonCanNotEatAll'] ?? null;
$descriptionEatAble= $_POST['descriptionEatAble'] ?? null;
$mesageForComeNotCome= $_POST['mesageForComeNotCome'] ?? null;

// E-Mail zusammenstellen
$to = "kontakt@lenathans-hochzeit.de"; // E-Mail-Adresse, an die die Nachricht gesendet werden soll
$subject = "Neue Zu-/Absage für Hochzeit von: $name";
$body = "Email: $email\n\n  Name: $name\n\n  Rückmeldung: $buttonValueIfCome\n\n  Brauchst du eine Mitfahrgelegenheit: $buttonValueIfDrive!\n\n  Brauche Mitfahrgelegeneit für Hinfahrt von: $wherePickUp.\n\n Brauche Mitfahrgelegeneit für Rückfahrt nach: $whereDropOff.\n\n Möchtest du einen oder mehrere Gäste mitnehmen: $buttonGiveNoSeats\n\n Wie viele Sitzplätze kannst du anbieten: $amountSeats\n\n Von wo aus fährst du los: $fromWhereStart\n\n Hast du Lebensmittelunverträglichkeiten: $buttonAllCanEat\n\n Beschreibe, was du nicht essen kannst: $descriptionEatAble\n\n Anmerkungen: $mesageForComeNotCome\n";
$headers = "From: Lenathans Hochzeit <kontakt@lenathans-hochzeit.de>\r\n";

// E-Mail senden
$email_sent = mail($to, $subject, $body, $headers);
if ($email_sent) {
    // Daten in die Datenbank einfügen
    $insert_query = "INSERT INTO $table (name, email, buttonValueCome, buttonValueDrive, wherePickUp, whereDropOff, buttonGiveSeats, amountSeats, fromWhereStart, buttonCanNotEatAll, descriptionEatAble, mesageForComeNotCome) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($insert_query);
    $stmt->bind_param('sssssssissss', $name, $email, $buttonValueIfCome, $buttonValueIfDrive, $wherePickUp, $whereDropOff, $buttonGiveNoSeats, $amountSeats, $fromWhereStart, $buttonAllCanEat, $descriptionEatAble, $mesageForComeNotCome);
    if ($stmt->execute()) {
        // Erfolgreich gespeichert, Weiterleitung mit JavaScript
        echo "<script>window.location.href = 'https://lenathans-hochzeit.de?success_feedback_message=Zusage%20erfolgreich';</script>";
        $conn->close(); // Verbindung zur Datenbank schließen, bevor der Header gesendet wird
        exit();
    } else {
        echo "Fehler beim Einfügen des Datensatzes: " . $conn->error;
        $conn->close(); // Verbindung zur Datenbank schließen, bevor die Fehlermeldung gesendet wird
    }

} else {
    // Fehler beim Senden
    echo "Fehler beim Versenden der E-Mail.";
    exit();
}
?>
