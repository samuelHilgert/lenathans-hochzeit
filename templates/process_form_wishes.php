<?php
// Verbindung zur Datenbank herstellen
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

// Tabelle erstellen, wenn sie nicht existiert
$sql_create_table = "CREATE TABLE IF NOT EXISTS wishes_table (
                        wish VARCHAR(1000) NOT NULL
                    )";

if ($conn->query($sql_create_table) !== TRUE) {
    die("Error creating table: " . $conn->error);
}

// Diesen Abschnitt auskommentieren, wenn Wünsche nicht erneut geladen werden sollen, wenn Liste leer ist.
/*
// Wünsche in die Tabelle einfügen, wenn sie noch nicht vorhanden sind
$sql_check_wishes = "SELECT * FROM wishes_table";
$result = $conn->query($sql_check_wishes);

if ($result->num_rows == 0) {
    $wishes = array(
        "Kaffeekanne (ca. 1 L) mit Thermo-Funktion in neutraler Farbe", 
        "Schnellkochtopf (ca. 5 L)", 
        "Stehlampe mit Farben aus hellem Holz oder Perlweiß", 
        "Gutschein für ein schönes Café oder Restaurant in und um Esslingen", 
        "Gutschein für ein schönes Café oder Restaurant in und um Esslingen", 
        "Gutschein für ein schönes Café oder Restaurant in und um Esslingen", 
        "Gutschein für ein schönes Café oder Restaurant in und um Esslingen", 
        "Handtuch von ecobain <a class='a-style' href='https://www.ecobain.de' target='_blank'>Link</a>", 
        "Handtuch von ecobain <a class='a-style' href='https://www.ecobain.de' target='_blank'>Link</a>", 
        "Handtuch von ecobain <a class='a-style' href='https://www.ecobain.de' target='_blank'>Link</a>", 
        "Wiederverwendbares Backpapier 2 Stk.", 
        "Bräter, ofenfest (ca. 5 L)",
        "Gewürzmörser",
        "Glaskaraffe mit Deckel",
        "Hausschuhe-Set für Gäste", 
        "1 Set Kuchenteller (4-6 Stk.) mit Farben wie hier: <a class='a-style' href='https://www.etsy.com/de/listing/1410859009/dinner-plate-ceramic-plate-ceramic-matt?ref=share_v4_lx' target='_blank'>Link</a>", 
        "1 Set Speiseteller (4-6 Stk.) mit Farben wie hier: <a class='a-style' href='https://www.etsy.com/de/listing/1410859009/dinner-plate-ceramic-plate-ceramic-matt?ref=share_v4_lx' target='_blank'>Link</a>", 
        "Butterfässchen, siehe: <a class='a-style' href='https://kilner.de/products/butterfass-mit-drehkurbel-1-liter' target='_blank'>Link</a>"
    );

    $sql_insert_wish = $conn->prepare("INSERT INTO wishes_table (wish) VALUES (?)");
    foreach ($wishes as $wish) {
        // URL-decode den Wunsch, bevor er in die Datenbank eingefügt wird
        $decoded_wish = urldecode($wish);
        $sql_insert_wish->bind_param("s", $decoded_wish);
        if ($sql_insert_wish->execute() !== TRUE) {
            die("Error inserting wish: " . $conn->error);
        }
    }
}
*/

// Wünsche aus der Tabelle abrufen
$sql_select_wishes = "SELECT wish FROM wishes_table";
$result = $conn->query($sql_select_wishes);

$wishes = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $wishes[] = $row["wish"];
    }
}

// Verbindung schließen
$conn->close();

// Assoziatives Array erstellen, um einen Schlüssel für die Wünsche zu haben
$response = array(
    'wishes' => $wishes
);

// JSON-Ausgabe der Wünsche mit einem Schlüssel "wishes"
header('Content-Type: application/json');
echo json_encode($response);
?>