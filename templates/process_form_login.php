<?php
// Starten der Benutzersitzung
session_start();

// vordefiniertes Passwort
$correctPassword = '123-sei-d8bei';

// Überprüfen, ob das übermittelte Passwort mit dem vordefinierten Passwort übereinstimmt
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    $submittedPassword = $_POST['password'];

    if ($submittedPassword === $correctPassword) {
        // Passwort ist korrekt
        // Setzen der Session-Variable, um den Benutzer als eingeloggt zu markieren
        $_SESSION['loggedIn'] = '%klsajsdkjlkas2993012039!394sjkxma';
        
        // Weiterleitung zur Startseite mit Erfolgsmeldung
        header('Location: https://lenathans-hochzeit.de/index.html?success_message=Anmeldung%20erfolgreich');
        exit();
    } else {
        // Passwort ist nicht korrekt
        header('Location: https://lenathans-hochzeit.de/index.html?error_message=Falsches%20Passwort');
        exit();
    }
} else {
    // Weiterleitung oder Handhabung der Situation, in der das Formular nicht ordnungsgemäß übermittelt wurde
    header('Location: https://lenathans-hochzeit.de/index.html?error_message=Form%20submission%20error');
    exit();
}
?>