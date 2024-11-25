let wishes = [];

function render() {
  let headerLinkAfterLogin = document.getElementById('headerLinkAfterLogin');
  let footerLinkAfterLogin = document.getElementById('footerLinkAfterLogin');
  let loginformContent = document.getElementById('loginformContent');
  let contactformContent = document.getElementById('contactformContent');

  headerLinkAfterLogin.innerHTML = `
  <a href="./galerie.html">Hochzeitsfotos</a>
  `;

  footerLinkAfterLogin.innerHTML = `
  <a href="./galerie.html">Hochzeitsfotos</a>
  `;

  loginformContent.innerHTML = `
<form class="d_c_c_c gap-30" id="passwordForm" method="post" action="./templates/process_form_login.php">
    <label for="password">Passwort:</label>
    <input class="input-light" type="password" name="password" id="password" required>
    <button class="btn-dark" type="submit">Anmelden</button>
  </form>
`;

  contactformContent.innerHTML = `
<form class="d_c_c_c gap-20" id="contactForm" method="post" action="./templates/process_form_contact.php">
<label for="contactName">Name:</label>
<input class="input-light" type="text" name="contactName" id="contactName" required>

<label for="contactEmail">E-Mail:</label>
<input class="input-light" type="email" name="contactEmail" id="contactEmail" required>

<label for="contactMessage">Nachricht:</label>
<textarea class="textarea-light" name="contactMessage" id="contactMessage" type="text" required></textarea>

<button class="btn-dark" type="submit">Absenden</button>
</form>
`;

}

// Wird nach Login ausgeblendet
function hideElementsAfterLogin() {
  const elementsForHidden = document.getElementsByClassName('deactivateContentAfterLogin');
  for (let i = 0; i < elementsForHidden.length; i++) {
    elementsForHidden[i].style.display = 'none';
  }
}

// Wird gerendert, nach Login 
function renderAfterLogin() {
  let zusageformContent = document.getElementById('zusageformContent');
  let aboutUSText = document.getElementById('aboutUSText');
  let TrauungText = document.getElementById('TrauungText');
  let FeierText = document.getElementById('FeierText');
  let wishlistContent = document.getElementById('wishlistContent');
  let sonstigesContent = document.getElementById('sonstigesContent');
  let hotelsContent = document.getElementById('hotelsContent');
  let imageContent = document.getElementById('imageContent');

  // die entsprechenden Sektionen werden eingeblendet
  const elements = document.getElementsByClassName('activateContentAfterLogin');
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = 'block';
  }

  // Die entsprechenden Sektionen werden mit Inhalt gefüllt
  zusageformContent.innerHTML = `
  <div class="d_c_c_c text-center gap-40">
  <h2>Können wir fest mit dir rechnen?</h2>
  <p>Biite gib uns eine Rückmeldung, ob du verbindlich dabei bist oder nicht.<br>
      Du kommst nicht allein?
      Falls deine Begleitperson/Kinder mitkommen, ergänze dies bitte im Textfeld Anmerkungen.</p>
  <form class="" id="formifcome" method="post" action="./templates/process_form_feedback.php">
      <div class="d_c_c_c gap-20">
          <label for="nameifcome">Wie ist dein Name?</label>
          <input class="input-light" placeholder="" id="nameifcome" name="name_if_come" required>
          <label for="email_if_come">Wie ist deine E-Mail:</label>
          <input class="input-light" type="email" id="email_if_come" name="email_if_come" required>
      </div>

      <div class="space-m">&nbsp;</div>

      <div class="d_f_c_c gap-20 mobile-d_c_c_c">
          <div class="d_f_c_c gap-30 options-mobile">
              <label><input class="btn-light" type="button" name="yesComeBoth" id="yesComeBoth" value="Ich bin dabei!"
                      onclick="handleButtonClick('Ich bin dabei!'); showQuestions1()"></label>
          </div>
          <div class="d_f_c_c gap-30 options-mobile">
              <label><input class="btn-light" type="button" name="noComeWedding" id="noComeWedding"
                      value="Ich komme nicht!"
                      onclick="handleButtonClick('Ich komme nicht!'); setGuestCancelled()"></label>
          </div>
      </div>


      <div class="text-center" id="showAskIfUber"> <!-- ich verwende #klasse und setze dort ein display:none ein  -->
          <div class="space-m">&nbsp;</div>
          <p>Brauchst du eine Mitfahrgelegenheit?</p>
          <div class="space-s">&nbsp;</div>
          <div class="d_f_c_c gap-10 options-mobile">
              <label></label>
              <input class="btn-small-light" type="button" name="needDriver" id="needDriver" value="Ja"
                  onclick="handleButtonClick1('Ja, brauche eine Mitfahrgelegenheit'); activateNeedDriver()">
              <label></label>
              <input class="btn-small-light" type="button" name="dontNeedDriver" id="dontNeedDriver" value="Nein"
                  onclick="handleButtonClick1('Nein, brauche keine Mitfahrgelegenheit'); activateDontNeedDriver()">
          </div>
      </div>

      <div class="text-center" id="activatedByNeedDriver">
          <!-- ich verwende #klasse und setze dort ein display:none ein  -->
          <div class="space-m">&nbsp;</div>
          <div class="d_c_c_c gap-20">
              <p>Für welchen Weg benötigst du eine Mitfahrgelegenheit?</p>
              <div class="d_c_c_c gap-10 ">
                  <label for="wherePickUp">Hinfahrt</label>
                  <input class="input-light" type="text" id="wherePickUp" name="wherePickUp">
              </div>
              <div class="d_c_c_c gap-10">
                  <label for="whereDropOff">Rückfahrt (falls gewünscht)</label>
                  <input class="input-light" type="text" id="whereDropOff" name="whereDropOff">
              </div>
          </div>
      </div>

      <div class="text-center" id="activatedByDontNeedDrive">
          <div class="space-m">&nbsp;</div>
          <div class="d_c_c_c gap-20">
              <p>Wenn du mit dem Auto kommst, hast du noch Platz und möchtest einen oder mehrere Gäste mitnehmen?</p>
              <div class="d_f_c_c gap-10 options-mobile">
                  <label></label>
                  <input class="btn-small-light" type="button" name="giveSeats" id="giveSeats" value="Ja"
                      onclick="handleButtonClick2('Ja, biete Platz an'); activateSeats()">
                  <label></label>
                  <input class="btn-small-light" type="button" name="giveNoSeats" id="giveNoSeats" value="Nein"
                      onclick="handleButtonClick2('Nein, biete keine Plätze an'); activateNoSeats()">
              </div>
          </div>
      </div>

      <div class="text-center" id="activatedByGiveSeats">
          <div class="space-m">&nbsp;</div>
          <div class="d_c_c_c">
              <label for="amountSeats">Wie viele Plätze möchtes du anbieten?</label>
              <div class="space-s">&nbsp;</div>
              <input class="input-small-light" type="number" id="amountSeats" name="amountSeats" placeholder="0">
              <div class="space-m">&nbsp;</div>
              <label for="fromWhereStart">Von wo aus fährst du los?</label>
              <div class="space-s">&nbsp;</div>
              <input class="input-light" type="text" id="fromWhereStart" name="fromWhereStart">
          </div>
      </div>

      <div class="text-center" id="activatedByComeAsWell">
          <div class="space-m">&nbsp;</div>
          <div class="d_c_c_c">
              <p>Hast du Lebensmittelunverträglichkeiten?</p>
              <div class="space-s">&nbsp;</div>
              <div class="d_f_c_c gap-10 options-mobile">
                  <label></label>
                  <input class="btn-small-light" type="button" name="canNotEatAll" id="canNotEatAll" value="Ja"
                      onclick="handleButtonClick3('Ja, habe Lebensmittelunverträglichkeiten'); activateCanNotEatAll()">
                  <label></label>
                  <input class="btn-small-light" type="button" name="allCanEat" id="allCanEat" value="Nein"
                      onclick="handleButtonClick3('Nein, habe keine Lebensmittelunverträglichkeiten'); activateAllCanEat()">
              </div>
          </div>
      </div>

      <div class="text-center" id="activatedByCanNotEatAll">
          <div class="space-m">&nbsp;</div>
          <div class="d_c_c_c">
              <label for="descriptionEatAble">Beschreibe hier, was du nicht essen kannst:</label>
              <div class="space-s">&nbsp;</div>
              <textarea class="textarea-light" placeholder="" name="descriptionEatAble"
                  id="descriptionEatAble"></textarea>
          </div>
      </div>

      <div class="text-center" id="messageForComeNotComeDiv">
          <div class="space-m">&nbsp;</div>
          <div class="d_c_c_c">
              <p>Anmerkungen:</p>
              <div class="space-s">&nbsp;</div>
              <div class="d_c_c_c">
                  <label for="mesageForComeNotCome">Möchtest du uns noch etwas anderes mitteilen?</label>
                  <div class="space-s">&nbsp;</div>
                  <textarea class="textarea-light"
                      placeholder="Teile uns hier z.B. mit wie viele Personen dich begleiten werden."
                      name="mesageForComeNotCome" id="mesageForComeNotCome"></textarea>
              </div>
          </div>
      </div>

      <div class="space-m">&nbsp;</div>

      <!-- Die hidden Inputfelder sind nur für JA und NEIN Buttons, um ein Value mitzugeben -->
      <input type="hidden" id="buttonValueCome" name="buttonValueCome">
      <input type="hidden" id="buttonValueDrive" name="buttonValueDrive">
      <input type="hidden" id="buttonGiveSeats" name="buttonGiveSeats">
      <input type="hidden" id="buttonCanNotEatAll" name="buttonCanNotEatAll">

      <div class="d_c_c_c">
          <button class="btn-light" type="submit">ABSENDEN</button>
      </div>
  </form>
</div>
<div class="line"></div>
`;

  aboutUSText.innerHTML = `
<h2>Wer wir sind?</h2>
<p>„Wir sind Lena und Jonathan, zur Zeit leben wir in Esslingen-Zell, nur einen Steinwurf vom alten Neckar entfernt.
Kennengelernt haben wir uns in Darmstadt, wo wir uns kurz vor dem Lockdown das erste mal zu zweit getroffen haben. Daraufhin folgten regelmäßige Jogging-Verabredungen, gemeinsames Kochen und Ausflüge in das Darmstädter Umland. Sport machen wir immernoch gerne und seit Januar schwingen wir auch gemeinsam das Tanzbein (mehr oder weniger erfolgreich - aber überzeugt euch selbst). Auch das gemeinsame Kochen hat sich bis heute durchgezogen.
Trotzdem haben wir natürlich nichts dagegen, ab und an lokale Restaurants zu unterstützen.
Über Holland, Aachen und Portugal hat es uns von Darmstadt nach Esslingen verschlagen. Von dort kann Lena ihren Master in Elektrotechnik abschließen und Jonathan Wärmepumpen bei Bosch entwickeln.
Außerdem ist der christliche Glaube ein zentraler Bestandteil in unserem Alltag. So sind wir uns nicht nur das erste Mal in einem Gottesdienst begegnet, sondern besuchen auch hier in Esslingen eine Kirchengemeinde. Und natürlich freuen wir uns, nach der standesamtlichen Trauung letzten September, jetzt die für uns entscheidende kirchliche Hochzeit mit euch zu feiern!"
</p>
<p>Liebe Grüße, Lena & Jonathan</p>
`;

  TrauungText.innerHTML = `
<div class="space-m">&nbsp;</div>
                <h3>Trauung</h3>
                <p>Beginn: 13:00 Uhr<br>
                    Evangelische Kirche Wehrheim<br>
                    Hauptstraße 10, 61273 Wehrheim<br>
                    (Parkplatz: Am Bürgerhaus 1, Wehrheim)</p>
                <iframe class="googleMaps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1235.0531570463354!2d8.570852465099238!3d50.30374473867057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bdab69a10e5589%3A0x56f81b85388e5d00!2sEvangelische%20Kirche%20Wehrheim%20-%20Evangelische%20Kirchengemeinde%20Wehrheim!5e0!3m2!1sde!2sgr!4v1707251259061!5m2!1sde!2sgr"
                    allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
`;

  FeierText.innerHTML = `
<div class="space-m">&nbsp;</div>
                <h3>Feier</h3>
                <p>Beginn: siehe Einladung<br>
                    Holzbachtalhalle Friedrichsthal<br>
                    Zwerchweg 1, 61273 Wehrheim<br>
                    &nbsp;</p>
                <iframe class="googleMaps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6288.768631510241!2d8.617591475255864!3d50.33976796704642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bdab4ef4268dcf%3A0xb3425b9c0ff449e6!2sHolzbachtalhalle!5e0!3m2!1sde!2sgr!4v1707250990893!5m2!1sde!2sgr"
                    allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
`;


  wishlistContent.innerHTML = `
<h2 class="text-center" id="anchor-wishlist">Unsere Wunschliste</h2>
<div class="space-xs">&nbsp;</div>
<p class="text-center">Wenn du dich für einen Wunsch entschieden hast, dann klicke auf diesen und bestätige, damit dieser für andere nicht mehr sichtbar ist.</p>
<div class="space-xs">&nbsp;</div>
<div class="d_c_c_fs gap-20" id="showWishes"></div>
<div class="space-s">&nbsp;</div>
<p class="text-center">Da in unserer Wohnung nicht so viel Platz ist, freuen wir uns außer der Gegenstände auf unserer Wunschliste über immaterielle Geschenke, wie z.B. gemeinsame Unternehmungen oder einen Beitrag zur Finanzierung unserer Hochzeitsreise nach Lettland.</p> 
<p class="text-center">Gerne dürft ihr bei unseren Geschenken auch Abstriche machen und dafür etwas in die Kollekte am Ende des Gottesdienstes oder in die Spendenbox auf dem Geschenketisch werfen. Die Spenden sollen dem Hilfswerk <a class="a-style" href="https://www.gain-germany.org/" target="_blank">GAiN (Global Aid Network)</a> zugutekommen. GAiN setzt sich weltweit für Menschen in Not ein.</p>
`;

  sonstigesContent.innerHTML = `
    <div class="h2-underline">
      <h2>Sonstiges</h2>
    </div>
            <div class="space-s">&nbsp;</div>
            <h3>Idee für einen Beitrag?</h3>
            <p>Über Beiträge zum Programm freuen wir uns.
                Ansprechperson dafür ist Dana Jox: <a class="a-style" href="mailto:billi@jox.de">billi@jox.de</a>
            </p>
            <div class="space-s">&nbsp;</div>
            <h3>Mitwirkung beim Buffet (nach der Trauung):</h3>
            <p>Falls ihr etwas Süßes oder Herzhaftes zum Buffet nach der Trauung beitragen wollt,
                meldet euch bei Christa Schone:</p>
            <p><a class="a-style" href="tel:06081-981127">06081-981127</a> | <a class="a-style"
                    href="mailto:schone-family@t-online.de">schone-family@t-online.de</a></p>
                    <div class="space-s"></div>
          `;

          hotelsContent.innerHTML = `
  <div class="h2-underline">
  <h2>Übernachtungs-<br>
  möglichkeiten</h2>
</div>
<div class="space-s"></div>
  <h3>Kostenpflichtige Übernachtungs-<br>
  möglichkeiten:</h3>

  <div class="space-s"></div>
  <div class="d_c_c_c gap-20">
  <p>Unterkünfte in Wehrheim direkt:</p>
  <p><a class="a-style" href="https://www.limeshotel.de/?id=1&lang=de" target="_blank">Limes Hotel</a><br>
  Bis zum 30.05. ist dort ein Kontingent reserviert. Daher am besten nicht über die
  Website buchen, sondern eine E-Mail an <a class="a-style" href="mailto:info@limeshotel.de">info@limeshotel.de</a> schreiben. In der E-Mail sollte erwähnt werden, dass
  auf das Kontingent von Anna Schone, zur Hochzeit von Lena und Jonathan, zugegriffen werden soll.
  Dann gibt es auch 10% Preisnachlass :).</p>
  <p><a class="a-style" href="https://taunus.info/uebernachten/pensionen-gasthoefe/pension-auwiese/534/" target="_blank">Pension Auwiese</a></p>
  <p><a class="a-style" href="https://taunus.info/uebernachten/pensionen-gasthoefe/pension-jahnel/533/" target="_blank">Pension Jahnel in Wehrheim</a></p>
  </div>

  <div class="space-s"></div>
  <div class="d_c_c_c gap-20">
  <p>Wehrheim-Obernhain:</p>
  <p><a class="a-style" href="https://gasthaus-zum-taunus.de/" target="_blank">Gasthaus zum Taunus</a></p>
  <p><a class="a-style" href="https://www.zum-engel-wehrheim.de/" target="_blank">Gasthaus zum Engel</a></p>
  <p><a class="a-style" href="https://www.schlafen-im-dreiseithof.de/" target="_blank">Gasthaus Dreiseithof</a></p>
  </div>

  <div class="space-s"></div>
  <div class="d_c_c_c gap-20">
  <p>Wehrheim-Pfaffenwiesbach (nah am Ort der Feier):</p>
  <p><a class="a-style" href="https://taunus.info/uebernachten/ferienwohnungen/apartments-ross/543/" target="_blank">Apartments Ross</a></p>
  <p><a class="a-style" href="https://taunus.info/uebernachten/ferienwohnungen/ferienwohnung-im-weihergarten/219/" target="_blank">Ferienwohnung Im Weihergarten (für mind. 2 Übernachtungen)</a></p>
  </div>

  <div class="space-s"></div>
  <div class="d_c_c_c gap-20">
  <p><a class="a-style" href="https://taunus.info/uebernachten/?filter-city=wehrheim" target="_blank">Weitere kostenpflichtige Übernachtungsmöglichkeiten findet ihr hier</a></p>
  </div>

  <div class="space-m"></div>
  <h3>Kostenfreie Übernachtungs-<br>
  möglichkeiten:</h3>
  <div class="d_c_c_c gap-20">
  <p>Für kostenfreie Übernachtungen besteht das Angebot, bei gastfreundlichen Freunden von uns zu schlafen.
  Kontaktiert uns dafür persönlich, per Handy, E-Mail, oder über das Kontaktformular.</p>
  <p>Für alle, die ihr zu Hause auf vier Räder haben:<br>
  <a class="a-style" href="https://taunus.info/uebernachten/camping/wohnmobilstellplatz-wiesenparkplatz-am-freibad-ludwig-bender-bad/805/" target="_blank">Wohnmobilstellplatz Wiesenparkplatz am Freibad "Ludwig-Bender-Bad"</a></p>
  </div>
  `;

  imageContent.innerHTML = `
  <a class="a-style" href="./galerie.html" target="_blank">weitere Fotos ansehen</a>
  `;
  getWishesFromServer();
  setTimeout(renderVideo, 2000); // um der Seite noch einmal etwas mehr Zeit zu geben, wird das Video verspätet geladen, auch weil sich es ganz unten befindet.
}

// Eine AJAX-Anfrage an den PHP-Endpunkt senden, um die Wünsche abzurufen
function getWishesFromServer() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', './templates/process_form_wishes.php', true); // Ändern Sie den Dateipfad entsprechend
  xhr.onload = function () {
    if (xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      var wishes = response.wishes;
      // Die Wünsche im localStorage speichern
      saveWishesToStorage(wishes);
      // Die Wünsche auf der Seite rendern
      renderWishes(wishes);
      // Überprüfen, ob keine Wünsche vorhanden sind und entsprechende Meldung anzeigen
      if (!wishes || wishes.length === 0) {
        var showWishes = document.getElementById('showWishes');
        showWishes.innerHTML = 'Es befinden sich keine Wünsche mehr in der Wunschliste';
      }
    }
  };
  xhr.send();
}

// Funktion, um die Wünsche im localStorage zu speichern
function saveWishesToStorage(wishes) {
  // HTML-Tags und Links entschärfen, bevor sie im localStorage gespeichert werden
  for (let i = 0; i < wishes.length; i++) {
    wishes[i] = escapeHtml(wishes[i]);
  }
  localStorage.setItem('wishes', JSON.stringify(wishes));
}

function renderWishes(wishes) {
  let showWishes = document.getElementById('showWishes');
  showWishes.innerHTML = '';
  if (wishes && wishes.length > 0) {
    for (let i = 0; i < wishes.length; i++) {
      const wish = unescapeHtml(wishes[i]);
      showWishes.innerHTML += generateWishRow(wish, i);
    }
  } else {
    showWishes.innerHTML = 'Es befinden sich keine Wünsche mehr in der Wunschliste';
  }
}

// Funktion zur Entschärfung von HTML-Tags und Links
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Funktion zur Rückkehr zur ursprünglichen Form von HTML-Tags und Links
function unescapeHtml(safe) {
  return safe
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&');
}

// dynamisch generierte Texte zukünftig alle in Funktionen auslagern. i muss auch übergeben werden, wenn diese Variable natürlich im Text vorkommt
function generateWishRow(wish, i) {
  return `<div class="d_f_fs_fs" id="wish${i}" onclick="confirmWish(${i})"><a class="wish-icon">&#x25A1;</a>&nbsp;&nbsp;&nbsp;${wish}</div>`;
}

function confirmWish(i) {
  let popupTitle = document.getElementById('popupTitle');
  let popupText = document.getElementById('popupText');
  let showMoreOption = document.getElementById('showMoreOption');
  popupTitle.innerHTML = ``;
  popupText.innerHTML = ``;
  showMoreOption.innerHTML = ``;
  popupTitle.innerHTML = `Möchtest du dieses Geschenk wirklich besorgen?`;
  popupText.innerHTML = `Wenn ja, dann wird dieser Wunsch aus der Liste entfernt.`;
  showMoreOption.innerHTML = `
  <button class="btn-light" onclick="deleteWish(${i})">Ja!</button>
  <button class="btn-light" onclick="closeWishPopup()">Nein!</button>
  `;
  displayPopupOneTime();
}

function deleteWish(index) {
  // Zuerst den Wunsch aus dem LocalStorage löschen
  let wishes = JSON.parse(localStorage.getItem('wishes'));
  let wishToDelete = unescapeHtml(wishes[index]);

  // Dann AJAX-Anfrage senden, um den ersten passenden Wunsch aus der Datenbank zu löschen
  let xhr = new XMLHttpRequest();
  xhr.open('POST', './templates/delete_wish.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Erfolgreich gelöscht, ggf. weitere Aktionen hier ausführen
      // Nachdem der Wunsch erfolgreich gelöscht wurde, die Wünsche neu vom Server abrufen und auf der Seite rendern
      getWishesFromServer();
      closeWishPopup();
    }
  };

  // Übergeben Sie den Wunschname an den Server, um nur den ersten passenden Eintrag zu löschen
  xhr.send('wish=' + encodeURIComponent(wishToDelete));
}

function closeWishPopup() {
  document.getElementById('popupFrame').style.display = 'none';
}
// wenn man der closePopup Funktion das event übergibt, kann man mit event.stopPropagation(); das unerwünschte Schließen verhindern

function closeButtonPopup() {
  document.getElementById('popupFrame').style.display = 'none';
}

function renderVideo() {
  let videoContent = document.getElementById('videoContent');

  videoContent.innerHTML = `
    <video class="video-home" id="footer-video" src = "./media/ourvideo.mp4" type = "video/mp4" autoplay loop ></video>
    `;
}

let activatedContent = false;
let activatedContentByAskUber = false;
let activatedContentByNeedDriverTrueFalse = false;
let activateContentByCanNotEatAllTrueFalse = false;


// Überprüfe den Wert und ändere die Sichtbarkeit entsprechend, wenn Gast kommt oder nicht
function activateContent() {
  var showMitfahrgelegenheit = document.getElementById('showAskIfUber');
  var showMitfahrgelegenheitAsWell = document.getElementById('activatedByNeedDriver');
  var showAskIfGiveNoSeats = document.getElementById('activatedByDontNeedDrive');
  var showAskIfGiveSeats = document.getElementById('activatedByGiveSeats');
  var showAskIfCanEatAll = document.getElementById('activatedByComeAsWell');
  var showDescriptionEatAble = document.getElementById('activatedByCanNotEatAll');
  var showDescriptionEatAble = document.getElementById('messageForComeNotComeDiv');

  // Der Inhalt wird sichtbar, sobald = true ist
  if (activatedContent) { // ist genau wie  == true
    showMitfahrgelegenheit.style.display = 'block';
    showMitfahrgelegenheitAsWell.style.display = 'none';
    showAskIfGiveNoSeats.style.display = 'none';
    showAskIfGiveSeats.style.display = 'none';
    showAskIfCanEatAll.style.display = 'block';
    showDescriptionEatAble.style.display = 'none';
    messageForComeNotComeDiv.style.display = 'block';
  }
  else {
    showMitfahrgelegenheit.style.display = 'none';
    showMitfahrgelegenheitAsWell.style.display = 'none';
    showAskIfGiveNoSeats.style.display = 'none';
    showAskIfGiveSeats.style.display = 'none';
    showAskIfCanEatAll.style.display = 'none';
    showDescriptionEatAble.style.display = 'none';
    messageForComeNotComeDiv.style.display = 'block';
  }
}

// Überprüfe den Wert und ändere die Sichtbarkeit entsprechend, wenn Gast mitgenommen werden muss
function activateContentByAskUber() {
  var showWherePickUp = document.getElementById('activatedByNeedDriver');
  var showAskIfGiveNoSeats = document.getElementById('activatedByDontNeedDrive');

  // Der Inhalt wird sichtbar, sobald = true ist
  if (activatedContentByAskUber) { // ist genau wie  == true
    showWherePickUp.style.display = 'block';
    showAskIfGiveNoSeats.style.display = 'none';

  }
  else {
    showWherePickUp.style.display = 'none';
    showAskIfGiveNoSeats.style.display = 'block';
  }
}

// Überprüfe den Wert und ändere die Sichtbarkeit entsprechend, wenn Gast eine Mitfahrgelegenheit braucht oder nicht
function activatedContentByNeedDriver() {
  var showAskIfGiveNoSeats = document.getElementById('activatedByGiveSeats');
  var showAskIfGiveSeats = document.getElementById('activatedByGiveSeats');

  // Der Inhalt wird sichtbar, sobald = true ist
  if (activatedContentByNeedDriverTrueFalse) { // ist genau wie  == true
    showAskIfGiveNoSeats.style.display = 'block';
    showAskIfGiveSeats.style.display = 'none';
  }
  else {
    showAskIfGiveNoSeats.style.display = 'none';
    showAskIfGiveSeats.style.display = 'block';
  }
}

// Überprüfe den Wert und ändere die Sichtbarkeit entsprechend, wenn Gast eine Lebensmmittelunverträglichkeit hat oder nicht
function activateContentByCanNotEatAll() {
  var showAskIfCanEatAll = document.getElementById('activatedByComeAsWell');
  var showDescriptionEatAble = document.getElementById('activatedByCanNotEatAll');

  // Der Inhalt wird sichtbar, sobald = true ist
  if (activateContentByCanNotEatAllTrueFalse) { // ist genau wie  == true
    showDescriptionEatAble.style.display = 'block';
  }
  else {
    showDescriptionEatAble.style.display = 'none';
  }
}


// Hiermit übermitten die Buttons einen Wert (gerade wichtig bei Ja und Nein Buttons)
function handleButtonClick(value) {
  document.getElementById('buttonValueCome').value = value;
}

function handleButtonClick1(value) {
  document.getElementById('buttonValueDrive').value = value;
}

function handleButtonClick2(value) {
  document.getElementById('buttonGiveSeats').value = value;
}

function handleButtonClick3(value) {
  document.getElementById('buttonCanNotEatAll').value = value;
}


// Wenn Gast zur Trauung und Feier kommt: 
function showQuestions1() {
  var borderSetYesComeBoth = document.getElementById('yesComeBoth'); // yesComeBoth bekommt aktivierten Rahmen
  borderSetYesComeBoth.style.border = '3px solid rgb(201, 139, 59)';

  var borderSetNoComeWedding = document.getElementById('noComeWedding');  // noCome bekommt normalen Rahmen
  borderSetNoComeWedding.style.border = '1px solid rgb(124, 109, 101)';

  activatedContent = true; // Hiermit wird der Inhalt sichtbar
  activateContent();
}

// Wenn Gast ganz absagt: 
function setGuestCancelled() {

  var borderSetNoComeWedding = document.getElementById('noComeWedding'); // noCome bekommt aktivierten Rahmen
  borderSetNoComeWedding.style.border = '3px solid rgb(201, 139, 59)';

  var borderSetYesComeBoth = document.getElementById('yesComeBoth'); // yesComeBoth bekommt normalen Rahmen
  borderSetYesComeBoth.style.border = '1px solid rgb(124, 109, 101)';

  activatedContent = false; // Hiermit wird der Inhalt nicht mehr sichtbar gemacht
  activateContent();
}


// Wenn Gast kommt, wird er gefrat, ob er eine Mitfahrgelegenheit braucht.
// JA
function activateNeedDriver() {
  var needDriverSet = document.getElementById('needDriver'); // needDriver bekommt aktivierten Rahmen
  needDriverSet.style.border = '3px solid rgb(201, 139, 59)';

  var dontNeedDriverSet = document.getElementById('dontNeedDriver'); // dontNeedDriver bekommt normalen Rahmen
  dontNeedDriverSet.style.border = '1px solid rgb(124, 109, 101)';

  activatedContentByAskUber = true; // Hiermit wird der Inhalt sichtbar
  activateContentByAskUber();
}

// NEIN
function activateDontNeedDriver() {

  var dontNeedDriverSet = document.getElementById('dontNeedDriver'); // dontNeedDriver bekommt aktivierten Rahmen
  dontNeedDriverSet.style.border = '3px solid rgb(201, 139, 59)';

  var needDriverSet = document.getElementById('needDriver'); // needDriver bekommt normalen Rahmen
  needDriverSet.style.border = '1px solid rgb(124, 109, 101)';

  activatedContentByAskUber = false; // Hiermit wird der Inhalt nicht sichtbar
  activateContentByAskUber();
}

function activateSeats() {
  var borderSetGiveSeats = document.getElementById('giveSeats');  // giveSeats bekommt aktivierten Rahmen
  borderSetGiveSeats.style.border = '3px solid rgb(201, 139, 59)';

  var borderSetGiveNoSeats = document.getElementById('giveNoSeats'); // giveNoSeats bekommt normalen Rahmen
  borderSetGiveNoSeats.style.border = '1px solid rgb(124, 109, 101)';

  activatedContentByNeedDriverTrueFalse = false; // Hiermit wird der Inhalt nicht sichtbar
  activatedContentByNeedDriver();
}


function activateNoSeats() {
  var borderSetGiveNoSeats = document.getElementById('giveNoSeats'); // giveNoSeats bekommt aktivierten Rahmen
  borderSetGiveNoSeats.style.border = '3px solid rgb(201, 139, 59)';

  var borderSetGiveSeats = document.getElementById('giveSeats');  // giveSeats bekommt normalen Rahmen
  borderSetGiveSeats.style.border = '1px solid rgb(124, 109, 101)';

  activatedContentByNeedDriverTrueFalse = true; // Hiermit wird der Inhalt nicht sichtbar
  activatedContentByNeedDriver();
}

// Wenn Gast kommt, wird er zudem gefrat, ob er eine Lebensmittelunverträglichkeit hat.
// Wenn Gast bestätigt, dass er eine LUV hat
function activateCanNotEatAll() {

  var borderSetCanNotEatAll = document.getElementById('canNotEatAll');  // canNotEatAll bekommt aktivierten Rahmen
  borderSetCanNotEatAll.style.border = '3px solid rgb(201, 139, 59)';

  var borderSetAllCanEat = document.getElementById('allCanEat');   // allCanEat bekommt normalen Rahmen
  borderSetAllCanEat.style.border = '1px solid rgb(124, 109, 101)';

  activateContentByCanNotEatAllTrueFalse = true; // Hiermit wird der Inhalt sichtbar
  activateContentByCanNotEatAll();
}

// Wenn Gast bestätigt, dass er keine LUV hat
function activateAllCanEat() {

  var borderSetAllCanEat = document.getElementById('allCanEat');   // allCanEat bekommt aktivierten Rahmen
  borderSetAllCanEat.style.border = '3px solid rgb(201, 139, 59)';

  var borderSetCanNotEatAll = document.getElementById('canNotEatAll');  // canNotEatAll bekommt normalen Rahmen
  borderSetCanNotEatAll.style.border = '1px solid rgb(124, 109, 101)';

  activateContentByCanNotEatAllTrueFalse = false; // Hiermit wird der nächste Inhalt nicht sichtbar
  activateContentByCanNotEatAll();
}

// Hier ist die Funktion, um das Burger Menu erst anzuzeigen, wenn auf das Icon geklickt wird
let burgerMenuClicked = false;
function burgerMenu() {
  let burgerMenu = document.getElementById("burgerMenu");
  let burgerUl = document.getElementById("burgerUl");
  if (burgerMenuClicked) {
    burgerMenu.style.display = "none";
    burgerUl.style.display = "none";
    burgerMenuClicked = false; // Setze den Status auf "nicht geklickt" zurück
  } else {
    burgerMenu.style.display = "flex";
    burgerUl.style.display = "flex";
    burgerMenuClicked = true; // Setze den Status auf "geklickt"
  }
}

// DISPLAY POPUP
function displayPopupOneTime() {
  let oneTime = 0;
  for (let oneTime = 0; oneTime < 1; oneTime++) {
    document.getElementById('popupFrame').style.display = 'block';
  }
  oneTime = 0;
}


// Weiterleitung zur Startseite
function backToHome() {
  // Verzögerte Weiterleitung zur Startseite und zum Popup-Fenster
  setTimeout(function () {
    window.location.href = './index.html';
  }, 5000); // Verzögerung in Millisekunden (hier 3000 für 3 Sekunden)
}


function logOut() {
  if (sessionStorage.getItem('loggedIn') === '%klsajsdkjlkas2993012039!394sjkxma') {
    sessionStorage.setItem('loggedIn', 'false');
    popupTitle.innerHTML = `Du bist abgemeldet!`;
    popupText.innerHTML = `Du kannst dich jederzeit wieder anmelden, um die Inhalte noch einmal zu sehen. :)`;
    showMoreOption.innerHTML = `<a class="btn-light popup-link" href="./index.html">Okay!</a>`;
    displayPopupOneTime();
    backToHome();
  }
}

setInterval(getWishesFromServer, 3000); // 2 sek. bis Wunschliste erneut aktualisiert wird