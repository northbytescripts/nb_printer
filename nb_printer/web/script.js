'use strict';
/* =================================================================
   KONFIGURACJA – odpowiednik przyszłego config.lua
   (w FiveM można ją nadpisać wiadomością z Lua, patrz "ustawienia")
   ================================================================= */
const Config = {
  Marka: 'Northbyte',
  Jezyk: 'en',                    // 'en' | 'pl'
  DomyslneImie: 'John Doe',       // w FiveM imię przychodzi z frameworka (ESX/QB/ox)
  MaksTytul: 60,                  // maks. długość tytułu
  MaksZnakow: 1200,               // maks. długość treści
  CzasDruku: 3600,                // czas animacji drukowania (ms)
  CzasPowiadomienia: 4200,        // jak długo widać toast (ms)
  Zdjecie: {
    maxIlosc: 5,                  // maks. liczba zdjęć na dokumencie
    szerokosc: 190,               // domyślna szerokość nowego zdjęcia (px kartki)
    minSzerokosc: 70,
    maxSzerokosc: 520,
    przesuniecie: { x: 34, y: 26 }, // kolejne zdjęcia lądują lekko przesunięte
  },
  // Paleta kolorów tekstu w edytorze – tylko te kolory przejdą sanityzację
  KoloryTekstu: [
    { nazwa: 'Black',       kolor: '#1F2430' },
    { nazwa: 'Navy',        kolor: '#1A2A6C' },
    { nazwa: 'Blue',        kolor: '#1E88E5' },
    { nazwa: 'Red',         kolor: '#D32F2F' },
    { nazwa: 'Green',       kolor: '#2E7D32' },
    { nazwa: 'Orange',      kolor: '#EF6C00' },
    { nazwa: 'Purple',      kolor: '#7B1FA2' },
    { nazwa: 'Gray',        kolor: '#78808F' },
  ],
  Papier: 128,                    // tylko kosmetyka w stopce menu
  Toner: 76,                      // %

  // Tryby w menu głównym (wlaczony: false = karta "Wkrótce")
  Tryby: [
    { id: 'stworz',  ikona: 'stworz', kolor: '#1E88E5', wlaczony: true },
    { id: 'kopiuj',  ikona: 'kopiuj', kolor: '#1565C0', wlaczony: true },
    { id: 'zdjecie', ikona: 'aparat', kolor: '#243044', wlaczony: true },
  ],

  // Kopiowanie dokumentów z ekwipunku
  Kopiuj: {
    maxKopii: 5,                  // maks. liczba kopii jednym poleceniem
    znakWodny: true,              // domyślnie dodawaj nadruk "KOPIA"
  },

  // Druk zdjęć
  DrukZdjec: {
    maxKopii: 5,
    maxPodpis: 32,                // maks. długość podpisu pod zdjęciem
    maxZoom: 4,                   // maks. powiększenie przy kadrowaniu (×)
    domyslnyFormat: 'polaroid',
    // proporcja = [szerokość, wysokość] okna zdjęcia; polaroid = szeroki dolny margines na podpis
    Formaty: [
      { id: 'kwadrat',  proporcja: [1, 1] },
      { id: 'poziome',  proporcja: [3, 2] },
      { id: 'pionowe',  proporcja: [2, 3] },
      { id: 'polaroid', proporcja: [1, 1], polaroid: true },
    ],
  },

  // Szablony dokumentów – zmieniają WYŁĄCZNIE wygląd nagłówka
  Szablony: [
    { id: 'zwykly', etykieta: 'Plain', podtytul: 'General document',                 kolor: '#0A0F1E', ikona: 'kartka', jasny: true, wlaczony: true },
    { id: 'lspd',   etykieta: 'LSPD',   podtytul: 'Los Santos Police Department', kolor: '#1D3D8F', ikona: 'odznaka', wlaczony: true /* prace: { 'police' } */ },
    { id: 'ems',    etykieta: 'EMS',    podtytul: 'Emergency Medical Services',   kolor: '#D63A4A', ikona: 'krzyz',   wlaczony: true /* prace: { 'ambulance' } */ },
    { id: 'doj',    etykieta: 'DOJ',    podtytul: 'Department of Justice',        kolor: '#8A6A2F', ikona: 'waga',    wlaczony: true /* prace: { 'doj', 'lawyer' } */ },
    { id: 'lsc',    etykieta: 'LSC',    podtytul: 'Los Santos Customs',           kolor: '#16865A', ikona: 'klucz',   wlaczony: true /* prace: { 'mechanic' } */ },
    { id: 'fdr',    etykieta: 'FDR',    podtytul: 'Fire Department',              kolor: '#E0560F', ikona: 'plomien', wlaczony: true /* prace: { 'fire' } */ },
  ],
};

/* =================================================================
   TŁUMACZENIA – odpowiednik locales/pl.lua i locales/en.lua
   ================================================================= */
const Locales = {
  pl: {
    prompt: 'Użyj drukarki', prompt_pod: 'Biuro · Drukarka laserowa',
    marka_pod: 'Stacja wydruku', esc_zamknij: 'Zamknij', esc_wstecz: 'Wstecz', zamknij: 'Zamknij',
    drukarka: 'Drukarka',
    menu_etykieta: 'Panel drukarki', menu_tytul: 'Co chcesz dziś wydrukować?', menu_opis: 'Wybierz tryb pracy – dokument trafi prosto do Twojego ekwipunku.',
    tryb_stworz: 'Stwórz', tryb_stworz_opis: 'Zaprojektuj nowy dokument na gotowym szablonie służbowym.',
    tryb_kopiuj: 'Kopiuj', tryb_kopiuj_opis: 'Zrób wierną kopię dokumentu, który masz przy sobie.',
    tryb_zdjecie: 'Zdjęcie', tryb_zdjecie_opis: 'Wydrukuj zdjęcie w wysokiej jakości z adresu URL.',
    wkrotce: 'Wkrótce', rozpocznij: 'Rozpocznij', niedostepne: 'Niedostępne',
    gotowa: 'Drukarka gotowa', papier: 'Papier:', toner: 'Toner:', ark: 'ark.', menu_stopka: 'Northbyte PrintStation v1.0',
    krok1: 'Krok 1 z 2', szablony_tytul: 'Wybierz szablon', szablony_opis: 'Szablon zmienia tylko wygląd nagłówka – treść piszesz sam.',
    szablony_hint: 'Kliknij kartę, aby przejść do edytora', wybierz: 'Wybierz',
    krok2: 'Krok 2 z 2', edytor_tytul: 'Treść dokumentu', edytor_opis: 'Podgląd po lewej aktualizuje się na żywo.',
    podglad_live: 'Podgląd na żywo',
    tytul: 'Tytuł dokumentu', tytul_ph: 'np. Notatka służbowa', tresc: 'Treść', tresc_ph: 'Zacznij pisać treść dokumentu…\n\nEnter tworzy nową linię.',
    podpis: 'Podpisz dokument', podpis_opis: 'Odręczny podpis: %s',
    zdjecia: 'Zdjęcia', zdjecia_hint: 'Przeciągaj zdjęcia na kartce, aby je ułożyć', zdjecia_limit: 'Osiągnięto limit zdjęć', zdjecie_n: 'Zdjęcie %s',
    nar_obrotL: 'Obróć w lewo', nar_obrotP: 'Obróć w prawo', nar_prosto: 'Wyprostuj', nar_mniej: 'Zmniejsz', nar_wiecej: 'Powiększ',
    rt_b: 'Pogrubienie (Ctrl+B)', rt_i: 'Kursywa (Ctrl+I)', rt_u: 'Podkreślenie (Ctrl+U)', rt_kolor: 'Kolor tekstu', rt_wyczysc: 'Usuń formatowanie',
    zdjecie_url: 'Dodaj zdjęcie (URL)', opcjonalne: '— opcjonalnie', dodaj: 'Dodaj', przykladowe: 'Wstaw przykładowe',
    formaty: 'PNG, JPG, WEBP lub GIF · link http(s)',
    blad_url: 'Wklej link https:// ze zdjęciem (imgur, fivemanage albo discord).',
    blad_plik: 'Schowek ma sam obrazek, nie link. Skopiuj adres zdjęcia (https://…) i wklej go tutaj.',
    blad_wczyt: 'Nie udało się wczytać obrazu z tego adresu.',
    zdjecie_dodane: 'Zdjęcie dołączone', zdjecie_przykladowe: 'Przykładowe zdjęcie (offline)', usun: 'Usuń zdjęcie',
    zalacznik_nr: 'Załącznik nr 1 · materiał fotograficzny',
    wstecz: 'Wstecz', drukuj: 'Drukuj',
    nr_dok: 'Nr dokumentu', data: 'Data:', godzina: 'Godz.:', miejsce: 'Los Santos, San Andreas',
    bez_tytulu: 'Tytuł dokumentu', podpisano: 'Podpisano elektronicznie · %s',
    druk_tytul: 'Drukowanie…', druk_gotowe: 'Gotowe!', druk_dokument: 'Dokument:', druk_hint: 'Nie odchodź od drukarki do końca wydruku',
    druk_s1: 'Przygotowywanie dokumentu…', druk_s2: 'Nakładanie tuszu…', druk_s3: 'Wykańczanie wydruku…', druk_s4: 'Wydruk zakończony',
    wydrukowano: 'Wydrukowano: %s', w_ekwipunku: 'Dokument trafił do ekwipunku',
    brak_papieru: 'Brak papieru', limit_druk: 'Osiągnięto limit wydruków, spróbuj za %s min',
    brak_miejsca: 'Brak miejsca w ekwipunku', za_daleko: 'Jesteś za daleko od drukarki',
    zly_url: 'Niedozwolony adres zdjęcia', zly_tytul: 'Tytuł jest pusty albo za długi', za_dluga_tresc: 'Treść jest za długa',
    zla_ilosc: 'Za dużo kopii albo zdjęć', brak_gotowki: 'Nie masz wystarczająco gotówki',
    cooldown: 'Odczekaj chwilę przed kolejnym wydrukiem', zly_szablon: 'Ten szablon jest niedostępny',
    zly_dokument: 'Nie masz tego dokumentu', tryb_wylaczony: 'Ten tryb jest wyłączony', zly_format: 'Nieznany format zdjęcia',
    blad: 'Nie udało się wydrukować', blad_sprobuj: 'Wydruk nie został zapisany.', podglad_dok: 'Podgląd',
    mniej: 'Mniej', wiecej: 'Więcej',
    // --- Kopiuj ---
    kp_etykieta: 'Kopiowanie', kp_tytul: 'Dokumenty w ekwipunku', kp_szukaj_ph: 'Szukaj po tytule, autorze lub treści…', kp_wyczysc: 'Wyczyść',
    kp_wszystkie: 'Wszystkie', kp_kopie: 'Liczba kopii', kp_max: 'maks. %s', kp_znak: 'Znak wodny', kp_znak_opis: 'Nadruk <b>KOPIA</b> na kopii',
    kp_kopiuj: 'Kopiuj', kp_podglad: 'Podgląd · tylko do odczytu', kp_podpisany: 'Podpisany', kp_niepodpisany: 'Bez podpisu',
    kp_brak: 'Brak wyników', kp_brak_opis: 'Spróbuj innej frazy albo zmień filtr.',
    kp_pusto: 'Nie masz żadnych dokumentów do skopiowania',
    kp_pusto_opis: 'Dokumenty, które nosisz w ekwipunku, pojawią się tutaj. Stwórz nowy dokument, a potem wróć, aby zrobić jego kopię.',
    kp_pusto_stworz: 'Stwórz dokument', kopia_znak: 'KOPIA', kopia_podpis: 'Kopia zgodna z oryginałem',
    kopiowanie: 'Kopiowanie…', kp_s1: 'Skanowanie oryginału…', kp_s2: 'Drukowanie kopii %s z %s…',
    skopiowano: 'Skopiowano: %s', kopie_ekw1: 'Kopia trafiła do ekwipunku', kopie_ekwN: 'Kopie trafiły do ekwipunku',
    // --- Zdjęcie ---
    zd_etykieta: 'Druk zdjęcia', zd_tytul: 'Ustawienia odbitki', zd_url: 'Adres zdjęcia (URL)', zd_wczytaj: 'Wczytaj', zd_wklej: 'Wklej',
    zd_format: 'Format', fmt_kwadrat: 'Kwadrat', fmt_poziome: 'Poziome', fmt_pionowe: 'Pionowe', fmt_polaroid: 'Polaroid',
    zd_podpis: 'Podpis pod zdjęciem', zd_podpis_ph: 'np. Vespucci Beach, lato 2026', zd_podpis_puste: 'miejsce na podpis…',
    zd_kopie: 'Liczba kopii', zd_kopie_opis: 'Każda kopia to osobna odbitka', zd_drukuj: 'Drukuj zdjęcie', zd_podglad: 'Podgląd odbitki',
    zd_pusto: 'Wklej link do zdjęcia\nlub wstaw przykładowe', zd_wczytywanie: 'Wczytywanie zdjęcia…', zd_reset: 'Dopasuj kadr', zd_wskazowka: 'Przeciągnij · kółko myszy = zoom',
    druk_zdjecie_tytul: 'Drukowanie zdjęcia…', druk_zdjecie: 'Odbitka:', zd_s1: 'Kalibracja kolorów…', zd_s2: 'Nakładanie barwników…', zd_s3: 'Laminowanie odbitki…',
    wydrukowano_zdj: 'Wydrukowano zdjęcie', zdj_ekw1: 'Zdjęcie trafiło do ekwipunku', zdj_ekwN: 'Zdjęcia trafiły do ekwipunku', bez_podpisu: 'bez podpisu',
  },
  en: {
    prompt: 'Use printer', prompt_pod: 'Office · Laser printer',
    marka_pod: 'Print station', esc_zamknij: 'Close', esc_wstecz: 'Back', zamknij: 'Close',
    drukarka: 'Printer',
    menu_etykieta: 'Printer panel', menu_tytul: 'What would you like to print?', menu_opis: 'Pick a mode – the document goes straight to your inventory.',
    tryb_stworz: 'Create', tryb_stworz_opis: 'Design a new document using an official template.',
    tryb_kopiuj: 'Copy', tryb_kopiuj_opis: 'Make an exact copy of a document you carry.',
    tryb_zdjecie: 'Photo', tryb_zdjecie_opis: 'Print a high quality photo from a URL.',
    wkrotce: 'Soon', rozpocznij: 'Start', niedostepne: 'Unavailable',
    gotowa: 'Printer ready', papier: 'Paper:', toner: 'Toner:', ark: 'sh.', menu_stopka: 'Northbyte PrintStation v1.0',
    krok1: 'Step 1 of 2', szablony_tytul: 'Choose a template', szablony_opis: 'A template only changes the header look – you write the content.',
    szablony_hint: 'Click a card to open the editor', wybierz: 'Select',
    krok2: 'Step 2 of 2', edytor_tytul: 'Document content', edytor_opis: 'The preview on the left updates live.',
    podglad_live: 'Live preview',
    tytul: 'Document title', tytul_ph: 'e.g. Official note', tresc: 'Content', tresc_ph: 'Start typing the document…\n\nEnter creates a new line.',
    podpis: 'Sign document', podpis_opis: 'Handwritten signature: %s',
    zdjecia: 'Images', zdjecia_hint: 'Drag images on the sheet to arrange them', zdjecia_limit: 'Image limit reached', zdjecie_n: 'Image %s',
    nar_obrotL: 'Rotate left', nar_obrotP: 'Rotate right', nar_prosto: 'Straighten', nar_mniej: 'Smaller', nar_wiecej: 'Larger',
    rt_b: 'Bold (Ctrl+B)', rt_i: 'Italic (Ctrl+I)', rt_u: 'Underline (Ctrl+U)', rt_kolor: 'Text colour', rt_wyczysc: 'Clear formatting',
    zdjecie_url: 'Add image (URL)', opcjonalne: '— optional', dodaj: 'Add', przykladowe: 'Insert sample',
    formaty: 'PNG, JPG, WEBP or GIF · http(s) link',
    blad_url: 'Paste an https:// image link (imgur, fivemanage or discord).',
    blad_plik: 'The clipboard has an image file, not a link. Copy the image address (https://…) and paste that.',
    blad_wczyt: 'Could not load an image from this address.',
    zdjecie_dodane: 'Image attached', zdjecie_przykladowe: 'Sample image (offline)', usun: 'Remove image',
    zalacznik_nr: 'Attachment no. 1 · photo',
    wstecz: 'Back', drukuj: 'Print',
    nr_dok: 'Document no.', data: 'Date:', godzina: 'Time:', miejsce: 'Los Santos, San Andreas',
    bez_tytulu: 'Document title', podpisano: 'Signed electronically · %s',
    druk_tytul: 'Printing…', druk_gotowe: 'Done!', druk_dokument: 'Document:', druk_hint: 'Stay at the printer until it finishes',
    druk_s1: 'Preparing document…', druk_s2: 'Applying ink…', druk_s3: 'Finishing print…', druk_s4: 'Print complete',
    wydrukowano: 'Printed: %s', w_ekwipunku: 'Document added to your inventory',
    brak_papieru: 'Out of paper', limit_druk: 'Print limit reached, try again in %s min',
    brak_miejsca: 'Not enough inventory space', za_daleko: 'You are too far from the printer',
    zly_url: 'This image address is not allowed', zly_tytul: 'The title is empty or too long', za_dluga_tresc: 'The content is too long',
    zla_ilosc: 'Too many copies or images', brak_gotowki: 'You do not have enough cash',
    cooldown: 'Wait a moment before printing again', zly_szablon: 'This template is not available',
    zly_dokument: 'You do not have this document', tryb_wylaczony: 'This mode is disabled', zly_format: 'Unknown photo format',
    blad: 'Printing failed', blad_sprobuj: 'The print was not saved.', podglad_dok: 'Preview',
    mniej: 'Less', wiecej: 'More',
    kp_etykieta: 'Copying', kp_tytul: 'Documents in inventory', kp_szukaj_ph: 'Search by title, author or content…', kp_wyczysc: 'Clear',
    kp_wszystkie: 'All', kp_kopie: 'Copies', kp_max: 'max %s', kp_znak: 'Watermark', kp_znak_opis: '<b>COPY</b> stamp on the copy',
    kp_kopiuj: 'Copy', kp_podglad: 'Preview · read only', kp_podpisany: 'Signed', kp_niepodpisany: 'Unsigned',
    kp_brak: 'No results', kp_brak_opis: 'Try another phrase or change the filter.',
    kp_pusto: 'You have no documents to copy',
    kp_pusto_opis: 'Documents you carry in your inventory will show up here. Create a new document, then come back to copy it.',
    kp_pusto_stworz: 'Create document', kopia_znak: 'COPY', kopia_podpis: 'Certified true copy',
    kopiowanie: 'Copying…', kp_s1: 'Scanning original…', kp_s2: 'Printing copy %s of %s…',
    skopiowano: 'Copied: %s', kopie_ekw1: 'The copy was added to your inventory', kopie_ekwN: 'The copies were added to your inventory',
    zd_etykieta: 'Photo print', zd_tytul: 'Print settings', zd_url: 'Image address (URL)', zd_wczytaj: 'Load', zd_wklej: 'Paste',
    zd_format: 'Format', fmt_kwadrat: 'Square', fmt_poziome: 'Landscape', fmt_pionowe: 'Portrait', fmt_polaroid: 'Polaroid',
    zd_podpis: 'Caption', zd_podpis_ph: 'e.g. Vespucci Beach, summer 2026', zd_podpis_puste: 'caption goes here…',
    zd_kopie: 'Copies', zd_kopie_opis: 'Each copy is a separate print', zd_drukuj: 'Print photo', zd_podglad: 'Print preview',
    zd_pusto: 'Paste an image link\nor insert the sample', zd_wczytywanie: 'Loading photo…', zd_reset: 'Fit crop', zd_wskazowka: 'Drag · mouse wheel = zoom',
    druk_zdjecie_tytul: 'Printing photo…', druk_zdjecie: 'Print:', zd_s1: 'Calibrating colours…', zd_s2: 'Applying dyes…', zd_s3: 'Laminating…',
    wydrukowano_zdj: 'Photo printed', zdj_ekw1: 'The photo was added to your inventory', zdj_ekwN: 'The photos were added to your inventory', bez_podpisu: 'no caption',
  },
};

/* Przykładowe zdjęcie osadzone w pliku (działa offline) */
const PRZYKLADOWE_ZDJECIA = [
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHCAkIBgoJCAkMCwoMDxoRDw4ODx8WGBMaJSEnJiQhJCMpLjsyKSw4LCMkM0Y0OD0/QkNCKDFITUhATTtBQj//2wBDAQsMDA8NDx4RER4/KiQqPz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz//wgARCAEOAWgDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAgMBBAUABgf/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAB9DEO6c6dDcTqeDRq4/n7lMMjYtXW+vyhR0M6XJuKjzdkur21pWURZvt8vqaxsRVuenkMHGsjxcDxcDxcDxcDxcDxcLr2qfPaqxjy2NitZ1HGDOmO6e0urpdx67Sonpzr4noq0vl93L9TjQcw+nNFe2B5YfReS8/doLPnsbNzpES1usxq4un256EH3fkHHCjxcgw501U5zSpxRcx08Lp36GN0OfX49esIbrLrAH1xPT1mK/JHw+3as4D69AWK7WEen8lt7xqHUf25FwChea1bedeH2R9LjVLF9J5vNgao8ur/AENPS9HBskXXnXaXHd3DnVJzu2NToNRTvChJGdWFujWaWft1MazLa780uYHWWcPWYNa3leX0361hsVH91cUHK25kCvqbnim9OfqrPmfQdOWJ6HA9CUq12xZ4HXdv43Ne1W6c2pnCxrcseb3bH8XbyupazZqxdydWyZq2xNO3QxvSgq+sNFFhaFhNnG6qLFRLHB285OVth5+9Wwaha3SC5L5crTz9aygyvYNLWoX5rF9Bgb5VGz56rmt5dmseoUVfWJw/RedzpW55/wBbrLxFG8FRitNWL2faKepnZ0vo869n1qU2UEsXKoyxYq2JV1LKdTu7rnzxV48/ouDU6rtvNtJLUqi4zPbZYmJHPyZLLK2hnWv5fVzqDubZ6BHIi7gzmDPReN1953kKXcuJk01vY0XSTp6kUW3JamNplUjy83mV2kiHWF3ceRI089s6DWxYo2IfQvZg3WxtDUtTQIhJ1pNNZ5y7lWrLNk61RfTLxrFAu1oY6ebv2Ygk3q2sajM+2qqBs1C0M5SbFG2jUYmK2bcgDlVco2wBEdQuDkxKjlzRg1MrX17oNK9XhVvu1I4QtlZlJao2qMrWAVyxFunnTLi4owVI2AAtHnXyGsdZRuqiy0gQs0m03Y1NJlenhWAsvq2oEx4Lo484czSgtNKGrzc2oExD6Vqu5l2qN6Y7NhuWIO0Jn27qQGKmKVZtbYjWdkV2Vx+vm313M6xm5W68qvMRBF1a18e6vVm1SVyJddUOLIViq3wcuiWYHG64ZhluK3FxdctEo0Ssx52orPbZJacXYsquMljmzGbmWezqg1Z9OaEvQbj6Jc+u15X0ob54tP0k2eYb6AzzulrEKEhlWFlhTG6kz5bNhcfLYamJbAokYMGDzTza02oKxPgElgWIrwWIrxY2E9VFbBzaTJVvC02E1efVuc+miwnaylw10srTK8R3IqMdMq5MLFgwRIv6q/P4guHFZyILEIGnAqLGQobHQiB0L6igiFkUkFJGfU0qOdVoMNYBNtFHs4mtnVtircq5NiItsaokZwsGQKFnCYaNLhnC+LigKhuWivguXJPSQqW8ARFQ8XRBWpKdhlYtBWIinepmPXuUtS6F1JT9F5/10qLNh+dIcC4bwkFy4GcuBogIwRAOBGi4OMri65iZkjikHpknn2zNtWKpaGhIajlQh0AScwOZs4lmZZqb+pWo6Wed7XyHr82UMLOly0BfGIB9wPGAPdxwnAIsGh6eTPiZsjjvGa7TUQeasu0+kguJe6CILigTgB0VrBGHuYWpm+38X9CjBw9vE1Lnr/J+szYnuzqegiZCQwjiVzwIHFBBcADAB6eF2adS506K4InuI7iUeIQpEji5kKKQWYtPhbVXDL83v+d3jvceT9jL5rHv52ptem8/v41BEuUumSR4AgiCVFBMCFjIWsaCOLHV+EB0WT3CHENWYZML45XjislhbLy17MhENsiMpKtHnsL1Hlt40fXeQ9FNeezLdXWdj0vjbcegThBW2ONJt1s3rGsrMPSSh3PYrNNClgWKjpO6eP/EAC8QAAICAQMDAwMEAgIDAAAAAAECAAMRBBIhEBMxICIyFCMzBTA0QSRCFTVAQ0T/2gAIAQEAAQUCFYyahGQrNSM1MnbYn3t5OM6VMMdOO4BgXvWkKBDnKd0d22zIY7Il1oAtXYrbv/BMKMYd69FmYOoMzkZjIpGsrKuw6VKbCibVh8fTjOqIJYbBaiIKsWKzVyuzbGciaWz2U2Gw/vngPuMxiHMHkcQZ6uAU0/4d0zLaxYuo0+2aevuPp9OETrcSK66S7amzL2NlKjtDLEQupQbrVOKWKCs2fvmPwp5jcSvgnwJ5E+oYrpbML11HOn0P8rExNsIxCMxU2Vn5+QvD3qM1mWNsm/B9wehrd3THoAzBVwUIna49Nwm3a5g8/wB45HQWpBPEF1gg1MssR6tIMauZm6cmY6aikqfA0tBJsIrG4Ah8U13bQXNliMw03mbRO2uYJ/a46ZhaEdG4CNuEK5jL951xP7Cz+um0zkFbXWC847yZVlaIT9Qt5i2K0xMQjhc94ruSqsfXgYjrmaqvbaGCxFyU02/TXcaceP238Un0Wpk1Lk+iw7F7oMG1468hJUD3nJFgvaC8SvUgRdSDFZWlY+9K/wDs5buzqqjZGznSUF2xNR+AfG20VhLVZep4DWERLST1eUfP0U+TD0E1H4+Jpvgw5biulj3mH3ioAwphXEwwgtsEq1jKabRclf8A2ct8zWVBbVUKJqPwMcVFdwVSrVMzdbPg3iv8jNtAuGY3lOLY7RHJMp8x+gl3wZTjTfFvk/4af5DcXWfBfyMMxiwes7l0i8ozbaz/AJ+WlmcpqgZq3VmFyNFbJ1P8e33UNYRWLNqaJfZGzjJak/Gv8lvxi3VuW+S/kfgGV/PcJV8iYYeIOnExD8iNyVJi2z8tnwVWDy3izT/j0QG9FQImP+QDVy2N8n+K/OtgX1bYVKspcuxqE7ly4Ec4hslr409TZqHl9+w7jNA3+QT7v9m/BvAaryflV8z0PTuQWTuGFzlXwKXBst4s3iZHTYpiqFlNmy7UENpU/l01Nuul/wA3/FWSXrVlfVNxRqdxuu4rvNRp1KWq5O58zabNNVX2kSvIbGw+dPSig/Lbz/pb/JrzD5T5McQQ9Nom2YnMAEoA7tp9+2YM2tMdGJV0cqWOL11Rh1AeWYZn/FWB3O63ce0PXVb91z7iZ+ntsll2Rc4K6dTsPy3/AGyTkHdFG2pmbcw9omOScQExPnYPaPj/AHAMnbiGLCwWUFXst/JMnPTMvPuDy75hoiHFvy/9ClQVKK/tlXtvtqYztkGoQgdlFZnCsdOnGnQ7Q6+9bdsW3j/RSwlbjHcy1vzYABfyciZ5z0IPRgVZZZ50g+9aPf8A7DyWJbMztl5g+V/Lt7bEfBvbKr/HHh840xJbuGI9YS7YZQhM7TKhQqKH2FjXWpO5iuQ4+42VesMVeoobBhc8sCzt7ghHcJzOAem8GYwbfkvizmab8lrZc/IjFh+Uzy8XHduPvtwbh+W38X/z49jCIO3CeuZ3MLb+AZ3jcYu9bfuFbDwAYLdrWOFaw7x3K9xvBmczPu/1/rp7RMRgWI4jGaMcW8N23dvp2EbYer8ysDuWn3tgshBYMrRsdkMICMZmZmZmYxlfctUUFmG+mGx8C1zGsZYbC0TY8CRlrEdaidqYg+XPTPTbAMA+2ZzCZRntW7ZVhmuVMcQeMxhmUqd1nkVb4mncGvSnB0lxCaUhdVw2eOhMLT+v0/kEgDviCxWjOIbJvWZERlKXWhT3gIbczdyh43TMzyJgza07LtBpLJ9HbAe2tvuarILkFEG9/o1g0y4FIDbFyUrgQrM6jBdp3lnel6NE8f3G+ZgUldJWRZacVlqoLwgexXjGvH9Zmk+OopNlhoYN2nnZYRQygmbjAYIL0n1Bnfad0wkGYExGUY7VGO3phCVEVmgNpn35i0zssYKIEAmZmamAT+xH8mac7tPQcWN7ly29jWJvM3GI/JJYadrAmGxxDMTbHHtggndoE+oqgvabtQ026mdq4z6cT6emdmqbK54mZkTdNzT3GYmydubQJbnNmOzBG6aQ/bB98wJsE7STs1xaFM7aLNwnmYgSbRMRxxiATECVieJk9OJlZmZM90wZtmybJsmFmVm+bzMzMu828V55jczBmkh8ge2cztETcixnZuoQmbQOnE4mBNomJiZmWmDNs2ibZsM7Zm0T2CbxN5m6ZmZmZm6Z6X8GzmZM25JVRDNJ+dhhqa2avFazvGZ6YgUmCsCEAzYBD1xMTExNhmybJhRMqJvm8zMz1zMzdN3XHXUVezwm4TMOIZp+NRqSDZXk1TbNkAiVTIE8zjriYmJiYmIbIXPTMz1zMzdM9cTEx6BNWj7F/G0yIelfFln56eVEzNjGBeBNmOmJiYmJiY9WZmZmZnriYmPUtWZ9lIbmI8y0Yj+d3IXdGg+VlbMygKq1loExPaszA03Ym8TcJkTPXMz1z0z6MTHqEWiwzFSTvGE5PV/ndjIG5x4dQqp8xWWi1hYFhYQTiZ9GfQf2cepKHadqqufUAR3Z/Rgw8QCW8WPNCu7UPxfa25qR9/ibgo5aD0cdM/s4/YSmx52EWd6uuPbY/wCwIBLye6+Z+m05q1nF2FQaL3azeTAuJgzbNpmJtmOhx0wZiY6Y6n0Zi1u8GlwN9FUfUWGeT6cTaYB1ZgJYCYcTTVlKNaPuuJ+nru1XHXcBM5mZnoTz+1mAM5TSMZjT1R9WxjMWPrx15MJxBXYwtTt0WeEG60sEmrYm6yfpufqZgQjMEPA/dXS2NO1TTG1WI9tj+nMz6OQBkzaZnbArWRECjLTWE9pzmaX+UFE1J/yLPP6UPuZgzAMQwZ6Ezz0zOZzM9M+iy92nmZ9Hn0cmYEHM2iFgo5sldQWFpySiAT9SJzZ4/Ta92qlx+88/Sh7MdPMx0zP7PjnGOh6ZhMLTMz18znp5n9dcTHGRMl4mnE4WExapwoNpea0FXfcJ+mhjqsy5SrnM/Sye8bEWHU1w6xZ9bPrTPrRLNU7RncyvJK/E46GE9CZmZhg9GJjHT/bo7RasxQoLHaKybYqgSx+2mDZ01wyti4OgO2xrQssABbM01nbgbckz6M9FXc1NXbBh6Hp/fT//xAAkEQACAgICAgICAwAAAAAAAAAAAQIRECESIDBAMUEDEyJCUf/aAAgBAwEBPwGkccuWyNDRx2UP8Y1XgWHnhJIbE2TbsrEXbzsl042cXmPXkfxfyfqj9E4N7RtYT4kpEGmMk76KRzGNYTH2sscEyUaJnwSloQojWEViQkUV2eeKZxQ4ocDiRJFbKIookIQ80Vh55fRobHloWsJCKvpWVh5okih2bI7Gv8K8FZQhll4fa8Xl90PND7UNrGvr0KJZ/riiivDRRo0WXiWYv68Wiyy+7+Mx9ePqMWF6jEMXqMWF6jFi6LLZff8A/8QAJBEAAgICAgEFAAMAAAAAAAAAAAECERASICExAyIwQEETUWH/2gAIAQIBAT8Btm39lYUeid/hHryW6Loj6zvsjLbv4JYQsKcWxJEkj00qLH2iUdVj/BJEMXjZI2WZcaPcj+WRCaXTOnhrYhA9RO7ERVLg4mohPDQs0VwXqMjKyB5Ix7H4JTrwRlfnjEvF8lijZlsUmKRuiS/SBfRZJmxEeFmyyxZrCyrE6H2eByH4LrhZfBcFhYYu+V82Lgvgr4nhGyN0KZsdizeb51I1kaGhRSKzZHP7wv4bRsWzsorEcy+L3FM1RS5rMvry+ohiJfURIRLz9RDw/qIeKs1KRS5//8QAMxAAAgECAgkDAwQCAwEAAAAAAAERAiEQMRIgIjJBUWFxgQMwkUBCoSNScpIzsWKi4cH/2gAIAQEABj8CLYNET3xlFL4VITWEVOGJzZk0XgpI0WbtxNpwJ/RWN4zla+epV3EyRdRLljLzEuRJKbbd5JtKzRokLIfIbY8o+hu9FG8XLarsUP8A44tMsrKg0OhTOavqOMxmhwTIJWeE8h/6EqcuQqfSUviba9+5pPN4QuGC1GnT5TND1KojKdSvsLtjbHqdsVoUzA6aELR7yTE0kUU6PU0fV8PX6l8M9ZvwhLBYd8c/nCzjsZz3Nqn4KkqrwLG2pVCsrkI2shKJkqhQuJV3L3p4Fno8iat5HTCYvqZakzjOCJ6Y1amZl8Gb8l0mcUbyJUo2lPYtV845s9S8kNZodHC+Pcqpd5NEpf3FXb3nTqJj1ZMi2NJKdy8F0Wr8M2l5RsuT1e6wfd4Ufy5lJJT6nKrCvsITeRPXWSeq9Wr2bCTILlnqNtTOZpKx5eHp/wA8PSjiyFhX2Fs6Vh/sKb7Cyg2qYxeFPcnFCwsRhVrZaiMoGU4Qi5Xal5Zk7IvJwKP5EVZnptOYZs1FXRlfYWjyKqZmOJou6ZpJvRfB8MLEvCnvjo01SxC74rCr2UhOTKBilWweHqJ9C6XkXK5aqn5PT/mh9yOoj1ITzNGLOkpcLIlbrKUQjgaNhJNUvuXbq6oy/JbRNpr4Hb7RY6Lzxq1eJmcMLiLath9YKdG98igpbo4lH80PH1am6epDSezmL01Eqk0YmHJKSJWfIWSOLKad19jRmSSMKq6VfDLiRyKcXhOrnhcRbHhhnhKEy6/7CtUoaY5PJyPUo0U9LMezDiCjRpppfPmVd8K5E1wZNFdymqp/kb4FvwOokfVTiycLjLau8WeCIgznBQ3qLU0i55JirxUaUV8PuHopqZZTMQNouMnqUxTNy1MdStNzYb5mdjhAu2FmPmXeZYXN62WF8F2L8uBn+TyLuWcDb3hbVhQIg0SIzQqmeTMph8B3+1m6nBeq5KquNcXch8+ZtF79CtUrf6ngzUaI4U4LZmepcWCqXKTkXOWpbMgU54LsPsf+HnB8EO2CkXfCzkXYQu4u5QoM76scTqO7Viiq+dyyZLWyNSjSeXUhVqD9RQ4FV9uEy0OHfDxqTxJLvGpzxgyLRBpOqn5N4jg+JC4CFhOR1IYlch+xTyykc1aI9uKe2ZM3I0oL1F2bqlG3tGjelPkf5Kv6m+/6lhauZEnHGU4OvEurGxTGOf4wuZk3NLRqL+kZIipUzzGlCjlr1Ukm1SmW9CfBf0o7o3UZHFIVyGl3LNl/YyZuv4Nyr4Nx+TRgyfwObFhUzmf5EXFFNjKMP0q4Xc3p8m0/+5vP/ZZP4JjMWtMqBm4RTKNqS1P5LZ4VPmxVT8kpUdjdoOBFtW1NJw+De/BvM3jmbv4LwRpr5LVvwbNVTN2plqGu9RnSi/qv+peqpl1Pdm7QvBngidXsNDRottFvWqfgzeF+RlHk0dGS5z9jJ/1LUVfJs+ky3ox4Ptp+Da9f4Nr1amfc/JufJuU/Ba2NlrZocnpR+3Vq6E47pur4N1FqF8F48FlHtW9OkskvBvGeORlhnhkZYZmRkZ6np08YLplmWwrwWFjbeiWp0u50xy9/LDPCywz9mmIyORes54RzRAnwjMu9N9DY2e2pYuW9nLC+GRl7+npeBdMM8aO4tGmLC1LXNoyL29rgZ/Rr/QtWl9R9rnnCxf4MoLI6/WbVSpXU41shLRXQy1Mywi0LqKlXNqxYvUXcHEyMjJ/TWL2XU2npdjYSpRfUZYSXEvn2JF3LqEWLmzq8fpco7m3XL5Ij0qEuptOdW+FWE/tKqepYoXUywu7cvqLLyfq1n6VF+bLv49pwXY63xY6aeRJRJFHydeeOWGR/4Ze/ZST6lcI2KdJ8y2z2L+1c5mZYopXLgLjYmo6JYWLlyz1MscvZ2U2TW4P3VGwoJqc+5zP2jtfCmlcXg7cDqeCMM/oL7JtuWR6dJtVe5mXZyRbPmcCmVF8PT/kf/SvCt9NW/vZx29/ZRe7wsc2UJZFsjS/ZfCvvhXV1jHjqdC2Zf6G+N8YpRNW0ZM2FJtI5JH6dl+4p0eKLs0lklfCoyKoyi5epGbLU1G5+Tc/JuGy9FF6mzfjyZz1I+gjGCasjRSwtYsNsn1PC4YJ4d8G73fMgqsrmkrexBd+z/8QAKBAAAwACAgICAgIDAQEBAAAAAAERITFBUWFxEIGRobHRIMHwMPHh/9oACAEBAAE/IeSpJlkSUZxnJmWVEMPoaIuiCBG72RDVO0xgoyDwP36Y4Ep9ly16Mh4jY7/4RefJLpecj8TulR6nDEJUT/yn+VTsMMjmAeK+GMkKNDePlG3AlQ06npkyDspscjey1bv6HleNEEEfTPiqmx82Z5GwjfnsSm5Y7BD9ZjtD5JNFgaSh/ko3NumKPsJTfSG1I68/5z/wgyoyG9IhpTt/RRBKCRsxYdLw18VGsMhJXTkeOh28GwBogbp+4WqlcgXJ/gkXLChyI7TIMxex+hq4MqbaLurcouRndjNrl+Rdjv8AAaR5DZqK+if+c+VUuiyPzGpdFY/odMtH7DR+Bayjk+HLOiXMNzNiyqnV4IRiw82YJvIVcm/gdlmxBCtOEErdaCc+rDicMUuckRNuE+WjVdOgk60bM5NbwonLbo+INltP/BCRCzVGPtVHNsNRx/4NVFMFD60c2zGnwUK+Akq+GI5VViSDppLjYs23Mu0OJr4iuVfkINpojwTfvkguyInEuBjnkcdWKv0azn7Cu0HtpIovWRBq3tmYNqzYzkU5KmvAVbtxWmRdhE2qawx4BLVcGsv42yODqDwJe/jQ63wbMaNPizwdKh0Zlw2hl8BLDwX4flLyicA5toQNS4SnHItpysTslliqJ0aKIxtcdFXPcaMxcH1gz2PZjuF6ZJHMuXnApnGHyMtZtBCRKCEvJQVxs2Zl/wAA1e7ZiCK7+xIxq9f4wWBt9/4QU/UO/MIxwemQkvkZRMxFXIt50SXMdqOXJlk30PnslsT5Pag1vXrJgJ/8cijT5KjMpGj/AOF8KBGOkqqixsLJWbkQXATIKFEID9Qy4M5gi7w4Xn/B6voXVNfgT0svZCEOCPyl/g/mniK2xz+VFh0TI/VZVGzEYuNCKTssMEha4xtZcEtV+sDnbx9iPuKidnlGmJnx/R8R9b/ZCX4si+yCUlfnN+0mEPy3zS5Q5q2I2xF9XN/w38HxiKhvNNIevhP9gcWzy1P2IDDF/WNGuBvrgczmV01b76MXTNHpn8aOb+yETd38ZfyES9jyzHQxzRbheeZyj6tH/wBIOUTu2hM5/EnueMiKCIl0SWsmNZHWFvpjEmuDBAOzOOYJ5Hf2Jq4u8kPujV8MlIvscRWVcH8Xxm/2LY3JxsnyEbIx62MHFUP+sYNaLRiNpkZ6QkTqRmt6fwhWfYwRzkdCjFwGcDthGX2GZHsLrzW8x2WqlT20JYyeEnxX7YeIGGRyl/sqPqIbkk03RjJ1XnwLQusf5OCVt+DDSpdDHwF7KmtUxhBXU3YV8nJen5B1Vtg1tMe7Yc4LG98uvYp8R49jNo3sa9mXgeP6Hy9n6gxyxdfF9/kMT/2QiQGp+SIkggk0JoNvlspyX5RVMMbGVssLQdOlIOnkRx9ialPfoUmIj15NTJl8s05zRMTm1wXEKlg5ocsoM54FYoVx4IPOsKuO7QhW4PdmOqt3n9Cu1uSzyvwWxUxQx70Wb9lq5PBR7VqY8gZsWuzWVnoMPFPYwVeULlGl7RV1fgfn2JTI1qGXw/ANey+GMXKSK8swh3etiGnAvr9ke/5FRWvoSTNT9ka5Fmnlrow2xw0RudiDVWpwxM9hLyJTRNuUTGOhlGlpcFJzLnG0JTEa84nBjHmVbUWx2TDoe8JmSrMkGNHAYVNNwScN3PgMpk33+yd/aUX/AGKOPO3CRRtC4GBCllehUJZUHmVJt0nHyNXGKQew34zghXB5D2MlYNuIbW8t7fKEiNXAs8yZgyb+HRztkudZFsTb3jIqIN8HkHivGCvC/I41JKpb8jRljGzhI0aFomgcuFM8eRvtMZqZebJcyofpXOxSkySlLRTbNyMcWdf0RDI4m7hdjoQOXJdpxFg5PIWIbbe+kRUxLpEdZ/ITMh2qGkt4tMiYEx1SfKwVPghvvI/CFKlmKzYgpIav2hZFXYu8PcRqI8qBrJBYplhqicwim6uk4QnZNDK3yHcXMmgeNCt0aZr9+RjFTb7Nb4KOXSr7HXpemUhmnyFXHjFWT60+XhleX6CVUfaG0k28duCphOy00prp1gqeXNf6CMVkqekMTk5OzjQotjdWEe8gYSmSkWG94McNCJllIH5MHBG68Gdfs2N4DwN1lE2k3pByVl/2LHNR/qEyLg1/J+xrF1yESKDNUqi2Zv8AozwdN0j236IiNYxIFJoOzePYzDgxn6P2Ay+sXSxTkrAxvYpuLRPh2YXwVCLZNU5HPQZIqKsPwKt1KE32UpG20hQuKcuRG8UiTJ8sOsLVbLC7EqgPv2SZp4elHgwxyTRL1KKNl7leAzJyLQsX8hTm05E5pwbV6KJLwJ7VAmBuvL5FSXJtuFWHRVqcN+4ZTa5Am8YdaRC65Go7p2LdIxP0Qo1aERWF2Mk2GfAk3g9HC+m2OxlBhiqZii7n0hkpy55JESpln6B5GwYVVGWaOCEqv0jmKcNG3RHCEZxbh8pdGYNRORcJzXBbOl6CceWux7Zqvkarh1nLWvhTfb8DIGnovJP8heX8kmvRR0Vb51gyVNvkxDSzgzQHhofPKwesOWp5Xg40Ury9D0hN6Rp6XgWyG3p5JKK9mBq5NDJY0OhoORPBmg4hZNk2001BzZYSu0Nk9ML25vDf2IPB9AXwaZzpRz1UxiJZJnLGd1UmoyhKRb0kK3X6FVrCFO8POBQd6Oy3wJ/9BrJodWCJe0IRWVpeB276wqS0ljHtumqKjlUrEhPL6TOe3pGRHlke43ohtR/0Oop3TkMkTy6F/wDSWjbPsS1m+yrsmRTQx7iMPZfBKixB+xiyhD+HjQ0knLXT2Xir6OVH9GMzB3bIFKraRpniwjWCUa5DjOfLKG5/xFTsXyKOgYlUkPpRR1jHAg1agOO69C+y2NfYn6T/AAPb9hiFX24NFlK2Itu1LyGhyb/SbRF+4iz/ADqcUeh/+Rha0g0fqCFw+kiPLHkDFG07Pk5/hLXOAuRah6MSa0TgtjZ+lMO7kjzGV5iQTt2ENPcJ1YfY0nbFPwfYT8v4TQvxeVR+IGhf6ke3vts4Cnn+xT/8hB+mi36BCVv7oEvSv2bJLBlEwXooPu/2S4vzfsK5Yq4ZXSRyvoKue9GiTL+TWTSmYyUNtof0ukGzeS/D8FNi/wDhjA5d96WjRr8tsbbZbZ6DXl4QkLAzmjObOhJwfyzVE4/Foi+2HOR9SXRPH6HSMi2xPLEnZiYQttIj39EexjpF9DZyH5/B8xl5AnwBqqhmgaNoZJI/D+KzHnAklwKsIRVaed/g5U3f9TafRYR9C9mRWHYt2p9sS8qDXiNeA+ofQievg36KFds8mIF0TF4HsQR2fA2QF+obPl8lD8/hZliw8olGtiNWPylHvTNam/sp7TS6JVNOQ9z8CHKchxDby9Gn5GlSF8M/kdPOTehN3+z/AHyim7+Rvpe9C5FfkjWBon+IU5CZ8r+SVt/o5TX5ON+g+ofZPQ3ayxm+CmHI8/g2MkbF3IhF6OlRoZmGh9hL/qf8Qa+R6ZeaF7TwQ6FttLgz0Ju2abLOZhG3vjgjwxHmjT9kRRDjGkQR18Y+RnCT6ozthvHyNjYyzXBRWyP/AAEIQRvRgaueWR0qVPn2crkSddmmRpbQ3hlLsuEYVsy50MDbCvwLMzXQbhi8MRvFH2xI1eRnk8B/IaGBPlsvQwy/jfw5+KKghBIhG2OS9gY/s2ESC6EGqzQil95MeQmQxLh5Is0MPcjA6HsZACIThOkK6PuGG0/ZT4XVEvSZE8h5IyP+oS+y+RsggbKNy/DZIJMXb4JEmyeSePhG3Ez1BLUXcLMj+Y0KeBLI2zN+Wc/GGMo9QbQg/YmhnDJLtiSZbEvpDL+wOSUqtp7JZD88ErU9s9EyvRfNH5QwuD6FfxRn1SlKQS8mPiIo+8/HsSU0eBFcXeAxcNX2UbN+wx60Za8ChoRJMBEo76dM8kWcJTpSzO2JYRnXWk2HLOvjbY27UCeR+M/Ym+VPBTwhlds8Uyj9kZPJn/CiOknghevmkBtS7YQlan0jUqCphT4wJ2yISfPxgbRekVcoTxsZqW5oyPKZEJS/AqxipozBPwmW12v6H/LOh3lyZleoVNDF0zS+WPVhJ84CMtwaWco6BP2xifBogxzqEmSzR6I3P5cGIXgP+2vs3pIG3TJ/E4J2XOCPybYosGRCWWNVYEm+CV4EKzUxDp68YFRxqYKms/IcrZHmPUZMxkNnkN9b4om5wG5t7FK4PKEnDRliCY2Uma7G6OEQx0RcI2Qe/idi6ImGhgGvMyz/AJjMApe3llsW8lb1D2fwX2VvgucCzoWmTqUdTmaOZ7rpIVnI6exLTyYp3PBGGlfsgJ64S5GNg0i9EpuqhWaPF0wplST07yQRMvQnWV5H7PpC1pIbUz/HxDCfIyzFG3yW/PL+FOqedkf0T/o0kl6OQF0sCn2L0SowuF+St4+heQk3yVYI3yr0h8AREkPQ9saJsYq2/OJV+xUalz/QliHZkTYjc4nEqNzLfI+scHo9FVfseG8+zbfoRqkvRWIVeArd0ZZwfamsL9mj/st4ePYns2h9mfY/IbEynTfQWTe/JC1SmEvI86goyIj/AKjfcbJsQkaSYnSMg1IywYpcD5aMn+MdAt60rlmbV7IQ1zbLfQ2Rq0Cb5/RZz5cfIm7lAkuVgfsWXh2ja2eCqG0jLIk7NlJsPYyxKkLMVMdMbpDffwwYIc/O52Kp4QtjCpLZmLLhwrxwLvMdGuH5MRTRM4474F0YZEDVlwTr1tsSy10NQWD9ItyfAltO/hFZs+pBm1XaW/QpX9m6XVv8GoDR44MxtxvCyM7y34EV/wDNg1kE3hvpCuw/I34r2M2s8BP235GbJ/kAFXx82UwrlwBpdGGhg2l9mZFCCcmdSE8jFdvQsK0j1aOZzdjTqiaua4NtSZr5I4IwmeCQpSpKnaNJCGtItirO2xSnZwhMp96dCPGcCqzTTgrl/I1T4xggzZ6GVbgfc8dUZBMW1Q3sGhtvbo8tfFz8PgPwxyE2Nblb6MMCRQj7+DQ0IJH/2gAMAwEAAgADAAAAEL6HJv8A2VqDoRTLC4IIoIvZMzlihXu50cqNtEgNEA8/S3dwAGh8Zj47fP7Yv4Lg9rKL/wBuOSXhJshbD/1LnPD2KqFncBnN3nSu5JzVe+T5BHNriYGW9kxSIESmfRGZNVJor1FSgA6bVyVdDO1HiAT/AAdt3w7NgfjewT4d7ARFEAC7iteOGZuHzaa8fwiIOF1OxXCxsx0DMEPTXs98Mnw1Q4mo3hbz/jUWba0zYUzGLGBpOHHq8P8AdDrocCLqGIgyrfTse/WX2lkawDxnypqqjg59u8PfkePst+DzhQaL7ZZaQ5cdtsf9/wA86DgoBfn2uGueEPbLj3pwUL3lgKUlXaq6ycc6+L33Y0Mroe6F58aWmuXiZTrPbTQP2TAKWeFIYDWSNKmM5o8//8QAIBEBAQEAAwACAwEBAAAAAAAAAQARECExIEEwQFFhcf/aAAgBAwEBPxAY8nLpD1Lkjoj9m07JBHUGde2/H8G8g++Dw6zL4xkuohwY92kzO5suNOASPAvENZx/q9J8ngX3P0pV2LwvWkI+2rqc6IDH2wkCCW7fbeshDOC13IwI6u7vgnG2wm2jydGJt43Uih2QuUvpfcOyJ7YzssvFperO7zImx2ntJJyGt6hhY7yQvpOgTIY7LDEs7haMXU4A7w1mQwl3bZZ4h3euQna0PcD4yxhMkIktIkWELW8ApZ1J3wy3gew7ssbC2kZIYMbNew1ixBk1/L6vTq8k3uDDuzg6d2cepd8PXDe71MxxsLy7yP4l17gYJG2WWW2se9vMbY/yFsLC6kS3gXtkzO58kQY7iSyGXjbbbbLOMgbXwjonvk1xllnO8a45/V/xw1bLThtiPv4etg8Lcp+ZO1s3uTuz9JeH9YHc3n8OfjXH1ef1PV5m8/LbbbfhnzHdkJjDJfEuH5f/xAAfEQEBAQADAQADAQEAAAAAAAABABEQITFBIDBRYUD/2gAIAQIBAT8QSfY2ZHCwb0QmGecEkIIZBfYZQ+LFg6/DfwZ57LrkP5ywV8EobsLN8EAH1gzqw36vEz7tgNs+iy+2239wYx7Ftj4w+DYmMPB6DYnkI7gXWFh5BGdlg6jDy+2jsG6Tq7OPt1whtsN0kck0jrzqD73CJdMgEYTt8l2k6Runq2Xu3Jc4oHJY6Q9/guF4sJFj0Nn4xPsorKGWzhg5rYdQdy+kro4Y3ZdcvEW8iMl1dcO+7vIQaMjuyE/qYeoTE+zIQhkpsPX4GSYXiCyVLxCkjvbTJp5J9Rn9u9s77jYc6lL1wW99Wz5x4vEJw+XiHeoc23eUPbr5wOpSEk/lvG8szC+XjuR+znkFt8LX8l1yjy7Hq1hS7FvBxraetr+wP7H+m/wsfzhSz+BMcGcaWON4Pw6kvtj4WnhY/t/tg2Qx5GOx5ztscbx2/wAtvWKy8ssss51vAQh6tt/Hf2HvB/xN4293Q4Lv/i3mvl4/QH7fF7i9/nn6d/BdXuJ22BzSGX3g5//EACcQAQACAgICAgICAwEBAAAAAAEAESExQVFhcYGRobHB0RDh8PEg/9oACAEBAAE/ECBfQxSUOA6glgjuoJC1kXVhx8sdqhVuhoqNcK7HNf6lDW0f3dSjVCpXh/3A6LQxYX+x+IVIJgPSfk/MATo7jDuHL7hor6WzYl37go8UxqU3yx8wUtFJxYZu/OjEUoMd5Zy+Rz8yiMohyzwzXvLqPXEyZgt+auFuUuoxUqVK/wAVKlSv8ElSpUqVOg8L1Loh6aJwB8JcIgt8enqKXvgjUCYNuiGg3XuCPCe4kfRRvdYgdBWDYkEsyREA5BLwgyY4xV+VGD6jaqUC/wCiXTtoHBAAFKg+Vr9wcmL+lypzHpUwxnFv0Z4vfcKtI3kub6vOJlxdScZbvZnE3lK3aig83z1FYtGAnFVZwv6imvbLyye4p4FQaN8NdkysE0PLiYA1QuB8XK+DVlb5eokqVElSodpUqVKlSpUYQPQQVKjspf8AUypzhQS6XRRYY9QUMKMlyluw96P7moA/7ELJSYkMCys+mFQKjhVo41EOT1EzIPtqB6c1+4+CDcZBfMO63o3hSq9/6neZVaYGP8JAhk6FT98e4UNJZTYnXzTGMKAg4Rv16gCtOJV4ovvEawajg1ljHiQDofUGKcQGur/OZlMw0Nkx+Yt2HIbqPX2ywIwpwei4ky6bevx/hUSVK8Sv8VKlSv8ACpUs/wDQpjtVT5+BAxfK4HK9x68Pa25gWKbgvCqmfNSyPi9dQoPpEgh0AMDPhi9CVYKOeetRhiTSrIhyyjTfuPT0qL/uYhlS+cQhkHUEZU23cdGw7HiKUKhqi7IdRtFGb8S0tiNr5vb3ESNDQbrEfdDQC/cIDjeUVUxKMNnO7lcBhAXdeYdseg8L3e9cYPMzzCBuxw/iGBg2LD4vuVPSDWI8lSokqHLLMyK4ayRA7FCRVRquqioFJslSokNBLGJiEYa5dv1MroSyo7dzcl2Yv3Dc05gpYUDJAKLL8zBNXj/FONR6hhHz8wbIoAjsefULiBrTTnG5WZLRlfkpjaO+XQ+MMfNYWu+swt60bw4fuWDd+4Q5/hiVVabqN9zhBmyLC07VBKq7Q5UJDZKDY/n+4/dCHzYkQChqbCt/93CYGUnkfvOK4hDdEGg0L92SycBMUrKMnhCUaL7jM9uxOSXcEu8WyzdvKqxmFlpan5YkAClkNiVXiIOxeVipuvEQFDEI0kpQtyEqHni9S75dVdxITaN6M6MLD3cYGpXecw90KmErGB9Sg3YP8BuDEfCgtN0QrSPEwO5WkVSvfUMDFuQs23DxgGTG+0Wq1cFWJul4usnE73AIYdblmwD9gpx+pRLXi/ZuK5X0S/BesRlHO2F/qUjYY6nD19RLAZjt5h33Uw4phkQACjglgmAnq6uHgXgVuf1UAABALq9b9/1KBCCj41BsxAvFcj6l4VZVogPjfqV1ElRP8EqyLyqJmVcr/ARecQ6q2B8aiESOUcr5nctVX+6/6uJxcrjnt/iwIwCL3NFXKZiXaDmqhxVfEKGzZdDRHOMLlhprEUekxjH9O49ot3by8fP3K3YVkGs/oqUvC9P18tQhhf8AgNzLz8OT4hAKm3E0mz5JUZYNdemUGEfZB4hqPRxSSx8sNMCXd/BDhXlE8upU9KV+gs/MKoo6my7Sgi0V36nN+RXULVNTtXglSpUx6NNTZUzRpGMsTo//AAKuXK6iAVylecxIkSDEODyfzBCS2o2XX5l5ncBapZgJmhhPthJEkSsNg4j8qhRKXDzBkldWxjLuTKD4JzByVNDkYQwpks/pOdXYw+dwq6rVjgoy6xCO2CFH4jWU2szvKA1wwrkQfxGOn4ld1BwaZqOLbNGJzklfmS9GSmrFEF6GrrFOC+JdiDAFuU+++I7RFWzMefMqVAfH/MA11/tB9CVYUGqNxYcMd5ipMP3svlXdfvEQLgEJQWUL2mYm+Xc0l2b/AJcAtcwK6ZiqGmEvcQ4tgIeolA2jjwgbQPIysKwE3/TFYISzQeGHdwqeXUPCuOPcKzm8QQDRc+IMvkIHiGlIsIi1DFYGHQYiEkreErIi3r7F6PmU2Y8P+5ZE4NecVe5dAoYFY8LcW4C0RSjVSvJNYH8yqIdxwOvmJZm7YpgTOjRUUGX+o1ypgQvh8RbNZCxTjJnLNO7d2xw9Q+4vSQulEgiY+k6v+XPwErf4/wAwAV0NwkQxkYxnJ5jD3v6l/jfuCqUXDQPK/gmY/wC1L2gMcATNs/M8CGBWsSxDTMEAppPMbzgqU8YKlR6f0SvmihfMF4DNvFP9wVpEoYGr8VAoiSAHzKDKVeonvKCFrXwQqrVrZYjcgBqnuE+oEMsu5WaJUDCmokEKoyDDV6D/AGw4sdHyw++CVcTwwU3yQIqpgCIDb4iwBEAuPJqJyMquREXkXVWkXcu1yWHAzEJ1UdDMGgVKIWxFqXC8WNR5Fk4u7jBSgQocC2pYLh8R+iWAOwg35gHTlHEqrViFGmiXgWvSe5eSqTf5iKKk37iwSgC3JjMan/24zmdot9GH7hBlim/n+Jc+0MeoM3m1dWWAsv8AzhisX8rI49oJXnFwEAG7mZSWm+aguiW1bb1XER0nZAD3dxSgW+YwTuCQ0m6l0skhaM6+oN0aVncvD/UYNGrpZV8EczkC8YZn9R9xMBs0tO2IFuVVi7xHaSUeV8ynxYsBRxnBmNatwIjrLphpXHJwPPqNepJrSy7LFbGvZKhGqEH0ceZouCLvo2MfuOdWih+BUThe6l1SPb7gsGWrW4V58Zdv1LSZUhzWZjRhKpg0UG9KcuH1NjwfzBcpSL4jZViARZzL2nONh3XPbGMo25UAagA55uWJNepXBY14iEFl3oiVGjT8GANj1MECgiBxAHMTj1JxQU3X9wqvhm28+cuYjgw8OIsPzqLuD6aP4ihoMgmmLmvwMO79WnD0w+tvAc9e44dXYqwydnuJmGEAr3mZMDqnAF19xyVgEZLZXgFSzOiCTDTRcjjcWJsQKwiGfEufChYoptq4N/kVmgPFNQ5PaeMsZyPUZMqauxf9wIa3VDk3+IIUCIEIruIZqvQjlSpWNFZWwsG6g1OeMPcVyVsGhc17gW4yU4g2yi74eoUTAf6RNYApIxDo680wtzbBbHxdjdOJSXVwXu4YCCI/cWii4wZJVKSqEWmXTokVKAWR2kyAqGaXENCjlZbGys0GfLGCjKx1DOshutVqEUEaEUjrqYGBFulgDUIovmNa3qaYK2PEI5sepcCivRfMAcF9iTDgReaHXJHpaW8QnhbLyRBdFQZq87zFsuwF26xLgoqmj9RkrRUtZBhl8xaXqt1LV9JcD4sQkli8b3KzhdjNwDQXccUDyz9/iFs6z0GmqgxtQBWG2+RUWUQJRRgTnUBSIZq7zriVVY1DW2tPjM7PFGkwR8QAUjXHxKbm+Xc7uYKgt76mcgIUhFCty5t9YhQMWWDHqIrEQFjxE5Chu23mUcVo8m4h3QODLFwjtYXCGjFmN7iwoa1XicFX/uLAsWDuPNyr+YgQulfuCYg00V9wOoRYF8eJgCji10xhLYNwqqNAbau3xFcAU28lIH3E4rBVWp15ePiUFDRqzcr2BmQ0XPgRu7PcRAuqzHEbnYtCqzx6hElSizRXbmOyCWOqvB9zJZryqIvoCTyuYD20DYaIGYJQRAMQukGlgXgxE/rRcv8AEf8AuA40FAe/E4aOgMK/3AfEhlccaxbHsdeNxQwQCtLblZjgVCKZGhceYk1IXS2LPZcyVotbmu9SrJkoa3XUZGbW2Qc2SxMqfN4+sSihYs0ycYiDbIyDhgM6hqBdTXhV7owFy9ug02twK6i6YNwRgb3LZ4/wsjMDRbXcqANH3SMMoUgYoite/wBo1pSmvcVK8WOxhrzBSicgF9vMUq4q61B3VP7jLIFKbt7+xFCrrXhLzghSoxuwYuZqAW5Utbtu4o+wW1tjWFkstmuHxLhQ0td4Q40/82ZCb/hHQpZPj4lVRIoeoEV6PLKSBSVGAdzHV4OCDb+4oQoIahHVtiMCZ+4MSDbelP8AuECUogXmS5x2Sxyc86gQJzRFEcEBwFMBcDX0EZacgYtC6O8PMpKRkoFKaHfxDrSbaacarOIo1QgCWZdPHmO8AkKt4p/rcSISuw2vGINkFa3jBjxBdpB38zAXTqXh6qpzcrDvAYlFg6mj3AAUFvGFRXoUQaC51ZuiWsDV7G8zNdDuGdxtxg10mXW91ki0FtEvviYQkUMfncSQXFMqD0StyCFL7WSjQobZGs+7iBmBTLE494iq0+LbCE4BLcWZllnEtMoRp6FOaDEWsJA+KYyDhK/hCXcKKgM6IYaS8j8wARicpYk3pc0M7pZKsXus/MBB5hJ6iFh33xB0lArqFXiAJUFUunasNsvAAVie8twWHDcEv+JbExeGIMnKAETkzCRT42Y4ToicGcJse3EcG5sMC+RfzFJKA0AaMMzx3Q5PuAVzjWl/UWo7ChgY5WhkeiAVNAMTleL7gHmdGDr/AHiywdj+5RKJwmERWoPNo1PwxAnEiHkM+HyZjbNjChN7PEAQlZ72c+oSsyB/62WAKv7imKUKuaJaqF9SCMrTdILEgFL+t8TCweOniBL+9n8QraJtv0nUT1daI+8SscRWRR8zMisF34bGHbNTG3NUFwahzqK3nm2xRjgjNPEsldpcpsCQunDs8EXEKV3fgj6OGxWsQkHpKYhYMHKU65jCqnJb/cZEYF4agfYJTVXN74JUSMFgo5xuBCuIU8W6YoAraAt+4tavyP7hkAiWHUtLYygijHqFlCL81GS1awX/AIDWCvqKlVQioHYpVGebEKPegfti4EIC1vKI5yzTAYqKvo8SsAUYLgxUBRmMx+IXzKGV1/QhrXXeDn1FpREu27qnHplEhUiP/uF1oAKRXyxsgLoGfRCqIYv8kwBqPI/zE/gwfwls+FGvuyCKYa1neZQ1EaR8RfbNTzHZ1A7I2PbbREMFHPbev1CCAZDkuc7iP5lkYqWwcvxM4lNqtnFRViA22hLxlj0bglgF5ZcqoNR48/EPki6A3xBosAiHwk2RfBIUqQqi9S4rHKWywAjzLQpRsBbLoVD40Zw88aRZbacNR3me6/RHi53tS/mPekogqInfKx+ac4v2Y2U0r1vxcocpZRI+6iw6MT+mAUPd/wDoSsNc0D81Ea+nl/mF1vOJLrD7bESug7n+ZxhapX83ANUHRP4iuU+AlPlS6hAsqXdYfzNuZUdQYRnmByYv+IxAqi+xhKUwgAjv0IWjOWXYl4afuZUON0PzF3KTzEzBKDHMylDKTfipUjDd1DxmHzrWVofmbl8Jo+4ioAeCXeLeplPwVBLBRZxUWIVBGLd0H7MKXHmwH6GO19+vojcvmf5sobT5LT8CxogDsX6CA/ff72C4p4f0ITIQqifaVQF4o7FjeuoMNHsJYUY9MUMvuPeR9Ghzi8sQOUe0SWTZ4EBS0AvbBhY3qY3czdc0qO8XZOwkMXgshHk0HazXDwqG185j3l4Rsw/xladW0GPmcsdCvvULqg0v2aJekPLcbv8AIglJ6qZiy76cwNr/ABLNTk5mL/cCulIDaaTJpVfljVAf9FE5xOrY25F8xTz9pwBfmXO31CmoIBbCHGfUyZF9yjR8CO1T3j/E+hlLwqcV+zEIlsc/AVLHKfeYhMwfUSwY29jeZgKwaawSlAm4s4NedzEueyPxkweMi/qEEnMNo2L+JpCe4FLq6DLKBnzTtehmVfdej6fyw+tWiA+DEq+Z8ShnXyMrlr5H67hd9xRj1M1vuYWAKo/Mf3jDSvUs4+uJ8fqJNEttA95in/UeE/MyP2MB01LsM9TsPZUqWoHYMfEuBP8AcvYiun/U4dfsiuPgQ7Lv1HDqOGJR0HuZc29RFazxGzFQW5qXhZI4vsV49kAGLNGmDd4EKhR44QyoFrKiMB2lO8X/ABLlbeHs4mGWtI+WerIa+f8ASVGbszP2iIpTtSN5h+5cyj3NbRfKoQ+y74CfEQh7RpGVfsJQgz9Q04vxHNwx8H7npHwj4wygj1X5i1JPQ2+iG4HsB+WVsj5P6CVKzep+7i8AeVf9R5gegJmA+25k4ZdMD3LjljZmkEQN/MRURZdH3LTi/mHOogcrhiqrlKazHbH9fL2S+AFUt/25bDH3ZHCRXQqI6SAW1dZiYzpkqznPqA8BXka4V7hyDQs0ZZSdvuKcge4ossL1Uy1T4CvmIwn0K/2jXMDA3R8QoIGa5f1+5TUAcTiAfmdA+o2cfUf/AARFcf4kHER1LOc+T83KHD6GiK25/M9CIG7PqKu4Fi5qBwMW9hiPIi3L8QRVrCzjMG7agdFsEGqh5MFeYc6wb8SlDb4NSkJRKA07qFystl4OvqogaQNbbjGNOiSiVlV1mMeG/Ucz/wBEq1DBdXij8TE6EHBxmYSwPNyyhuEVxYQ9B+Y+hYN1/UTKlhxB7rmFnSvOceuogL0TJm/iIcil7gHT8R5VR6JnqqlJNyuAAT3iEdwDHHuUNoGboPMDRbiBrEbFDXxLOZfm5SwLkYGtPqUnmi2Fshg5Z2cTlDfcMMQYq1rQQhQV7P0RQwCxcavUtO68u2D+VZi7DW1ry7gGAJwP8eIXA5rMJ4HJTUBYeCmWYM4/cRaDRdtRwfEEJ0k5fUFSA7Fj/TjCD7zNkLQXZeg5l1U4yLff9ELKhiwogbL3Fm6fGIjIHyf3Fi0StXGgU9kSYt9QO4jtjwpA4jkyxlqLGy9Rbgz7ZSNj2E6KcRRz1LWlXkgQzvzAbeuYrQX1AOcE6hUxl2lsrxhlqCsUssrFW1qj1KwO8BR8x+YlAD9qjxW8lwNBX45g1cdCVeZnzGBOGpaHnVr6mi2j2sAFzL7JWKOoQSztYpNr+yPGy6/5UG5Jo2wsCj0v3DaRhyR67YHUJTJ5lvN80wroaeJZd10JKXysZICCCNGtub6izSfUusAxWoOqA8s0LAYq44SyKuu4mcn1DPUymsMADDXc0UJ7hmjDgBmF3aPzxOwNOKihSvtIWIOdASnL/wAD9wNRFyL+pR16pLf+8sokTrQ+Jmat8ssZYdMbTSDPcsK2dRpsYsYoWEK5uAxfBjxiNTfC6rUVAKc+3B+5ilormSnMelbR3LlzK/aBBQHdV9R9QwGx/EYHruPl5iaaBwf+TAs+jtDliuQi/cb3bVZzUCwqzzBBVHbEJh57jnSJCphvzKjKrFVsTTKxuo6/3EolJeA84lG2t0wdj0gBtz8wNuGNG4FXSt8QadX56l6ozwZu4QgcxKY2N1P9sBItH/GY6F8KfiDeh2blGivFSharO6zKFQbPGGNDFj9zQtM5agnFnBcGAqYu2yjQFRtBTwtgwRlibwf1L6JaBVnl7uYwj3AxVYfiWpzyNsA5pvGMJmkWtjQ9HPvUGLBMoW/MVUV9t/iV2zU7xBP8IhaFmaG5aokO+ZhsjoR+YJcJN5/qUi736i9rgySoRYrFRrm7pInD9QbcQepq8sYDq/7lGnq7+5QK0aLgsjdFWwoFEnUYq6dCva4aj2af8uJnWG4Wfy/ggrxShSnlixOxVb+YCh+LggwAPzE7TfMwwN1RXcVLW7qWTg8pmIQ0xl0EYUq4zcBLDTkuoPgS14fmLjkMGHHZG21kUH7Ru5m3+ovyQumHlu/LCx3lV4ykI5Gh/DAQ2+jKL+4PCPAdRu0ZMBf1HCy6qjJ9wlQF00Uip4YQGIuxW6hc8HqAAaxq4JLDJSj4gCyvdxjZb6jnx+CIWg16lRgiGFvqJNL9wEUViOQYCRSrF9XLxnwFwroN/A1DlhOnPz4IZ0eB6OiUgXvc4unJKLMbq7MwEKRwsUlMDg8OZxLVvGCNOjiioNEW51LklHyZpheVi8rjHFRKCUd3nwQFLAq6qXy22sz+IqwvLaK6hECip3n+iK2Kne8ziYLzYIWgE0+30DccYqC7Rv8AmBQE0t2eYAUfw1fmA1BZeB/dQX3sq6GURwc2y/MW6KDyfmADSDiy/UVYoea3AYb9Q3dGDyxa+Ioi/CiCwc1LUCt7JSsDKW8RCrSKdSxTzGBGxMbrzRERpObb6QSBRWQF+iWI3cU+QhtRZaiiZOagVmFmwvy1Fwbnm2IcBGWhgxEw0HgGoReXkzqNGWat8TSLHsncEOeIsyEH3MwBTi0mASNAZW5YDtcVfUXsxVPZf1BVIGzKfBuZOS+xaGWI6zAZoRWA8Y5iLuna5f6PBMIcO3QTOXtjJr7nv/SMqqfgjW+r2zZ9E1k9ALmDIl5bqbxA5Egsv+iGuEOb7nIUI4ZnDbOUxuF3mntG+u2qwVGaCtS3AHxBDWHuCnKXl2zDduZ7xNzp6/zuUoV3t/2YoEYNBKoKZvSMNbIfhiEjGM7gyG/MTAQurt1XFf6lGB07A5gW7Gi8LADp1hykRMJvslnHlJqNbvzm7+JgS01TzBV9RKmcsJlwhAU28jiC2goC0d8TbSzcFejiFvoBDm7qV6egbjNgHquVcH7i0APSGPY1/bmLXJOaGB8F/wAxyAb4ENy1NZeoi+sGeSUDeDYDPuOk4esQTSh3ZB1WJqZepfs0xlX4gl0OU/PmUch4WoPD01hg6oV5gJpT4lM0lHxCUKvJNDNcR1Lh5ytFTZgCLAEPkh8z1dZgJg9HcqwWd01MqxTA18XMyoDQHn/yAbSBgtcoArAKUwFUXlnTpXcwjgHlF/ohsN24LuubniHSLWPUup2pEo4ldlFiujxvMHt2ZQv6ITrKVSyQ4yrVZ8t5l0fogIQa9sX0P8wcLY27YctuHZDeC8UlvqVzbUWhHAfefiLtZpunEChmEWVb+Nxhp+kTFMpXF2fbcWbV8l/UZWvl/mL3rWQT8rf+EsY/8DqClKuj/UIETQGflmV9o5Ww7vClZsmKU3EEBFLKnIQnMTyNYBlXJ7jpwqLRit4mbTEdwmrJeKIhA7BeHuX0qishGlWuSynUKBBAteIKGUQKxXzLnRq7Q/EBFigXy+J2zMsrnfsNY37mgwxXj2ECir224uVLPFXX3DwYga3FJbVtpohNlFtttHUEDOWw+2LVOOm7lBndrfl7fcaRQ8Je+O4Gn/ZGZaXm0dq5mM3jmE0vagf3LSEVkYvmHyR6Cf3AafwXUnJ9wUqlDQ2bqNW3swns7uHVfmWsUS7LCqiLbUCNoW1XEfQtyuIZYI8A9R1z9vMUL2huN95+5Zd16mdh3o0Q/wAX/9k=',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
];

/* Logo Northbyte (wariant jasny: niebieski sześciokąt + granatowe N ze strzałką północy) */
function logoSvg(rozmiar = 32, kolorN = '#0A0F1E') {
  return `<svg width="${rozmiar}" height="${rozmiar}" viewBox="40 14 432 484" aria-label="Northbyte" role="img"><path fill="#1E88E5" fill-rule="evenodd" d="M256 20 L460.38 138 L460.38 374 L256 492 L51.62 374 L51.62 138 Z M77.62 153.01 L77.62 358.99 L256 461.98 L434.38 358.99 L434.38 153.01 L256 50.02 Z"/><path fill="${kolorN}" d="M145 363 L145 173 L207 173 L297 296.91 L297 203 L275 203 L321 145 L367 203 L345 203 L345 363 L283 363 L193 239.09 L193 363 Z"/></svg>`;
}

/* =================================================================
   IKONY – własne, proste SVG (stroke = currentColor)
   ================================================================= */
const IKONY = {
  obrotL: '<path d="M3.5 4v5h5"/><path d="M4 9a8.5 8.5 0 1 1-.4 5"/>',
  obrotP: '<path d="M20.5 4v5h-5"/><path d="M20 9a8.5 8.5 0 1 0 .4 5"/>',
  poziom: '<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>',
  minus: '<path d="M5 12h14"/>',
  dol: '<path d="M6 9l6 6 6-6"/>',
  gumka: '<path d="M8.5 20.5h12"/><path d="M14.6 4.4l5 5a1.5 1.5 0 010 2.1L11 20.5H7l-3.6-3.6a1.5 1.5 0 010-2.1L12.5 4.4a1.5 1.5 0 012.1 0z"/><path d="M9 10l5 5"/>',
  odznaka: '<path d="M12 2.6l7.4 2.9v5.7c0 4.5-3 8.4-7.4 10.2-4.4-1.8-7.4-5.7-7.4-10.2V5.5z"/><path d="M12 7.7l1.25 2.55 2.8.4-2.03 1.97.48 2.8L12 14.1l-2.5 1.32.48-2.8L7.95 10.65l2.8-.4z"/>',
  krzyz: '<path d="M9.4 3.5h5.2v5.9h5.9v5.2h-5.9v5.9H9.4v-5.9H3.5V9.4h5.9z"/>',
  waga: '<path d="M12 5v15M8 20.5h8M4.5 7.5h15"/><circle cx="12" cy="4.2" r="1.2"/><path d="M2.5 14.5l2.5-7 2.5 7a2.5 2.5 0 01-5 0zM16.5 14.5l2.5-7 2.5 7a2.5 2.5 0 01-5 0z"/>',
  klucz: '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>',
  plomien: '<path d="M12 21.5c3.9 0 7-2.7 7-6.6 0-3.2-1.9-5.5-3.6-7.3-.3 1.6-1.1 2.8-2.4 3.4.3-3.2-1-6.5-4-8.2.2 2.8-1.1 4.9-2.7 6.7C5 11.2 5 13 5 14.9c0 3.9 3.1 6.6 7 6.6z"/><path d="M12 21.5c-1.7 0-2.9-1.2-2.9-2.8 0-1.6 1.1-2.5 1.9-3.5.4.9 1 1.5 1.8 1.8.2-.9.7-1.6 1.4-2.1.5 1 .7 2 .7 3.8 0 1.6-1.2 2.8-2.9 2.8z"/>',
  kartka: '<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  stworz: '<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h4"/><path d="M14 3v5h5v2"/><path d="M18.4 13.6a1.9 1.9 0 012.7 2.7L16 21.4l-3.5.9.9-3.5z"/>',
  kopiuj: '<rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15H4.5A2.5 2.5 0 012 12.5v-8A2.5 2.5 0 014.5 2h8A2.5 2.5 0 0115 4.5V5"/>',
  aparat: '<path d="M22 18.5a2 2 0 01-2 2H4a2 2 0 01-2-2V8.5a2 2 0 012-2h3.2L9 4h6l1.8 2.5H20a2 2 0 012 2z"/><circle cx="12" cy="13" r="3.8"/>',
  wstecz: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  dalej: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  zamknij: '<path d="M17 7L7 17M7 7l10 10"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  drukarka: '<path d="M6 9V3h12v6"/><path d="M6 18H4.5A2.5 2.5 0 012 15.5v-4A2.5 2.5 0 014.5 9h15a2.5 2.5 0 012.5 2.5v4a2.5 2.5 0 01-2.5 2.5H18"/><path d="M6 14h12v7H6z"/>',
  link: '<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>',
  kosz: '<path d="M3.5 6h17M8.5 6V4.5A1.5 1.5 0 0110 3h4a1.5 1.5 0 011.5 1.5V6M18.5 6l-.9 13.1a2 2 0 01-2 1.9H8.4a2 2 0 01-2-1.9L5.5 6M10 10.5v6M14 10.5v6"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  podpis: '<path d="M3 16.5c2.5-.5 3.6-8.5 5.8-8.5 1.8 0-.9 8.6 1.7 8.6 2 0 2.7-4.6 4.6-4.6 1.4 0 .9 3.7 2.7 3.7 1 0 1.8-.7 2.2-1.2"/><path d="M3 20.5h18"/>',
  tytul: '<path d="M4.5 7V4.5h15V7M9 19.5h6M12 4.5v15"/>',
  kalendarz: '<rect x="3.5" y="4.5" width="17" height="16" rx="2.5"/><path d="M16 2.5v4M8 2.5v4M3.5 10h17"/>',
  zegar: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  pinezka: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  blad: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v4.5M12 16h.01"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
  iskry: '<path d="M12 3.5l1.7 4.6 4.6 1.7-4.6 1.7L12 16.1l-1.7-4.6-4.6-1.7 4.6-1.7z"/><path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
  skrzynka: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  lupa: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  klodka: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5"/>',
  kadr: '<path d="M6 2.5V18h15.5"/><path d="M2.5 6H18v15.5"/>',
  dlon: '<path d="M8 13V5.5a1.5 1.5 0 013 0V11"/><path d="M11 10.5V4a1.5 1.5 0 013 0v6.5"/><path d="M14 10.5V5.5a1.5 1.5 0 013 0V13"/><path d="M17 11.5a1.5 1.5 0 013 0V15a6.5 6.5 0 01-6.5 6.5h-1.2a6 6 0 01-4.6-2.1L4.4 15.6a1.6 1.6 0 012.4-2.1L8 14.8"/>',
  pobierz: '<path d="M12 4v11M7 10.5l5 5 5-5M4.5 20h15"/>',
  pioro: '<path d="M4 20l1.2-4.6L15.6 5a2.1 2.1 0 013 3L8.2 18.4z"/><path d="M13.5 7l3 3"/>',
};
/** Zwraca kod SVG ikony o podanym rozmiarze */
function ikona(nazwa, rozmiar = 18, grubosc = 1.8) {
  return `<svg width="${rozmiar}" height="${rozmiar}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${grubosc}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IKONY[nazwa] || ''}</svg>`;
}

/* =================================================================
   POMOCNICZE
   ================================================================= */
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
let JEST_FIVEM = false;

function nazwaGry() {
  try {
    if (typeof GetParentResourceName === 'function') return GetParentResourceName();
  } catch (e) { /* poza grą tej funkcji nie ma */ }
  return '';
}

function odswiezFivem() {
  JEST_FIVEM = nazwaGry() !== '';
  return JEST_FIVEM;
}

/** Tłumaczenie klucza; %s zastępowane kolejnymi argumentami */
function t(klucz, ...arg) {
  let tekst = (Locales[Config.Jezyk] || Locales.en)[klucz] ?? (Locales.en || Locales.pl)[klucz] ?? klucz;
  arg.forEach(a => { tekst = tekst.replace('%s', a); });
  return tekst;
}

/** Wstawia ikony w elementy z atrybutem data-ikona */
function wstawIkony(korzen = document) {
  $$('[data-ikona]', korzen).forEach(el => {
    const svg = ikona(el.dataset.ikona, Number(el.dataset.rozmiar) || 18);
    if (el.tagName === 'SPAN') el.outerHTML = svg;   // placeholder → sama ikona
    else el.innerHTML = svg;                           // kontener → ikona w środku
  });
}

/** Wstawia logo w elementy z atrybutem data-logo="rozmiar" */
function bezpieczneLogo(url) {
  url = String(url || '').trim();
  if (/^(https?:|nui:)\/\//i.test(url) && !/["'<>\\]/.test(url)) return url;
  return '';
}

function wstawLoga(korzen = document) {
  $$('[data-logo]', korzen).forEach(el => {
    const rozmiar = Number(el.dataset.logo) || 24;
    if (Config.LogoWlaczone === false) { el.innerHTML = ''; return; }
    const url = bezpieczneLogo(Config.LogoUrl);
    if (url) {
      el.innerHTML = `<img alt="" src="${escapeHtml(url)}" width="${rozmiar}" height="${rozmiar}" style="width:${rozmiar}px;height:${rozmiar}px;object-fit:contain">`;
      return;
    }
    el.innerHTML = logoSvg(rozmiar);
  });
}

/** Ustawia teksty z Locales w elementach z data-t */
function zastosujTlumaczenia() {
  document.documentElement.lang = Config.Jezyk;
  $$('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
  $$('[data-t-title]').forEach(el => { el.title = t(el.dataset.tTitle); });
  $$('[data-t-html]').forEach(el => { el.innerHTML = t(el.dataset.tHtml); });   // tylko zaufane teksty z Locales
  $('#kpSzukaj').placeholder = t('kp_szukaj_ph');
  $('#zdPodpis').placeholder = t('zd_podpis_ph');
  $('#inTytul').placeholder = t('tytul_ph');
  $('#inTresc').dataset.placeholder = t('tresc_ph');
}

const dwa = n => String(n).padStart(2, '0');
const formatDaty = d => `${dwa(d.getDate())}.${dwa(d.getMonth() + 1)}.${d.getFullYear()}`;
const formatGodziny = d => `${dwa(d.getHours())}:${dwa(d.getMinutes())}`;
const inicjaly = imie => imie.split(/\s+/).filter(Boolean).map(s => s[0]).slice(0, 2).join('').toUpperCase();

/* =================================================================
   NUI – komunikacja z Lua
   W przeglądarce tylko loguje do konsoli, w FiveM wysyła POST.
   ================================================================= */
async function nui(nazwa, dane = {}) {
  odswiezFivem();
  if (!JEST_FIVEM) {
    console.log(`[NUI → ${nazwa}]`, dane);
    return { ok: true };
  }
  try {
    const odp = await fetch(`https://${nazwaGry()}/${nazwa}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(dane),
    });
    return await odp.json().catch(() => ({}));
  } catch (e) {
    console.warn(`[NUI] Błąd callbacku ${nazwa}:`, e);
    return {};
  }
}

/* =================================================================
   STAN APLIKACJI
   ================================================================= */
const stan = {
  otwarte: false,
  ekran: 'menu',
  imie: Config.DomyslneImie,
  szablon: null,      // obiekt z Config.Szablony
  tytul: '',
  tresc: '',
  podpis: false,
  trescTekst: '',     // czysty tekst (do licznika znaków)
  zdjecia: [],        // [{ id, src, x, y, w, rot }] – kolejność = kolejność warstw (z-order)
  zaznaczone: null,   // id zaznaczonego zdjęcia
  nastepneId: 1,
  probka: 0,          // które przykładowe zdjęcie wstawić następne
  skala: 1,           // aktualna skala kartki w podglądzie
  drukuje: false,
  tylkoOdczyt: false,  // true = podgląd przedmiotu z ekwipunku, bez menu drukarki
  czytanieFoto: null,
  czytanieZoom: 1,    // powiększenie kartki / odbitki na podglądzie (1 = dopasowanie do ekranu)
  trybDruku: 'stworz', // 'stworz' | 'kopiuj' | 'zdjecie' – do okruszków i ekranu druku
  nrDok: '',
  dataDok: new Date(),
};

/* =================================================================
   OTWIERANIE / ZAMYKANIE
   ================================================================= */
function ustawPapier(ile) {
  const n = Number(ile);
  if (!Number.isFinite(n)) return;
  Config.Papier = Math.max(0, Math.floor(n));
  const el = $('#papierIlosc');
  if (el) el.textContent = `${Config.Papier} ${t('ark')}`;
}

function otworz(imie, extra) {
  if (stan.drukuje) return;
  if (stan.otwarte && !stan.tylkoOdczyt) return;
  stan.tylkoOdczyt = false;
  stan.otwarte = true;
  document.body.classList.remove('tylko-kartka');
  if (imie) stan.imie = String(imie);
  if (extra && typeof extra === 'object') {
    if (typeof extra.papier === 'number') Config.Papier = extra.papier;
    if (typeof extra.toner === 'number') Config.Toner = extra.toner;
    if (Array.isArray(extra.szablony)) Config.Szablony = extra.szablony;
    if (Array.isArray(extra.tryby)) Config.Tryby = extra.tryby;
    if (Array.isArray(extra.katalog)) Config.Katalog = extra.katalog;
  }
  $('#graczImie').textContent = stan.imie;
  $('#graczInicjaly').textContent = inicjaly(stan.imie);
  $('#podpisOpis').textContent = t('podpis_opis', stan.imie);
  $('#podpowiedz').classList.add('schowana');
  $('#nakladka').classList.add('otwarta');
  renderujMenu();
  renderujSzablony();
  pokazEkran('menu', false, true);
}

function zamknij(zLua = false) {
  if (!stan.otwarte || stan.drukuje) return;
  stan.otwarte = false;
  stan.tylkoOdczyt = false;
  document.body.classList.remove('tylko-kartka');
  $('#nakladka').classList.remove('otwarta');
  if (!zLua) nui('zamknij');
  // w podglądzie przeglądarkowym przywracamy podpowiedź [E]
  if (!JEST_FIVEM) setTimeout(() => $('#podpowiedz').classList.remove('schowana'), 380);
}

/* =================================================================
   PRZEŁĄCZANIE EKRANÓW (z animacją wejścia/wyjścia)
   ================================================================= */
function pokazEkran(id, wstecz = false, bezWyjscia = false) {
  const stary = $(`.ekran[data-ekran="${stan.ekran}"]`);
  const nowy = $(`.ekran[data-ekran="${id}"]`);
  $$('.ekran').forEach(e => e.classList.remove('aktywny', 'wychodzi', 'wstecz'));
  if (stary && stary !== nowy && !bezWyjscia) {
    stary.classList.add('wychodzi');
    if (wstecz) stary.classList.add('wstecz');
    setTimeout(() => stary.classList.remove('wychodzi', 'wstecz'), 300);
  }
  // numerujemy elementy .st – kolejne pojawiają się z opóźnieniem
  $$('.st', nowy).forEach((el, i) => el.style.setProperty('--i', i));
  void nowy.offsetWidth; // restart animacji
  nowy.classList.add('aktywny');
  if (wstecz) nowy.classList.add('wstecz');
  stan.ekran = id;
  aktualizujOkruszki();
  $('#escOpis').textContent = id === 'menu' ? t('esc_zamknij') : t('esc_wstecz');
  if (id === 'edytor') requestAnimationFrame(skalujKartke);
  if (id === 'kopiuj') requestAnimationFrame(skalujKopie);
  if (id === 'zdjecie') requestAnimationFrame(() => dopasujOdbitke(false));
  if (id === 'czytanie') requestAnimationFrame(skalujCzytanie);
}

function aktualizujOkruszki() {
  const czesci = [t('drukarka')];
  const e = stan.ekran, druk = e === 'druk';
  if (['szablony', 'edytor'].includes(e) || (druk && stan.trybDruku === 'stworz')) czesci.push(t('tryb_stworz'));
  if ((e === 'edytor' || (druk && stan.trybDruku === 'stworz')) && stan.szablon) czesci.push(stan.szablon.etykieta);
  if (e === 'kopiuj' || (druk && stan.trybDruku === 'kopiuj')) czesci.push(t('tryb_kopiuj'));
  if (e === 'zdjecie' || (druk && stan.trybDruku === 'zdjecie')) czesci.push(t('tryb_zdjecie'));
  if (e === 'czytanie') czesci.push(t('podglad_dok'));
  $('#okruszki').innerHTML = czesci.map((c, i) => {
    const sep = i ? ikona('chevron', 14, 2) : '';
    const tekst = i === czesci.length - 1 ? `<b>${c}</b>` : c;
    return `<span class="okr" style="animation-delay:${i * 60}ms">${sep}${tekst}</span>`;
  }).join('');
}

function wstecz() {
  if (stan.drukuje) return;
  if (stan.tylkoOdczyt || stan.ekran === 'czytanie') return zamknij();
  if (stan.ekran === 'edytor') pokazEkran('szablony', true);
  else if (['szablony', 'kopiuj', 'zdjecie'].includes(stan.ekran)) pokazEkran('menu', true);
  else zamknij();
}

/* =================================================================
   EKRAN 1 – MENU
   ================================================================= */
function szablonJasny(s) {
  if (!s) return false;
  if (s.jasny === true) return true;
  if (s.jasny === false) return false;
  return s.id === 'zwykly';
}

function godloSzablonu(s, rozmiar, grubosc, logoBiale) {
  if (!s) return ikona('kartka', rozmiar, grubosc);
  if (szablonJasny(s) && (!s.ikona || s.ikona === 'kartka' || s.ikona === 'logo')) {
    return logoSvg(rozmiar, logoBiale ? '#fff' : '#0A0F1E');
  }
  return ikona(s.ikona || 'kartka', rozmiar, grubosc);
}

function nazwaPaska(s) {
  if (s && typeof s.pasekNazwa === 'string' && s.pasekNazwa !== '') return s.pasekNazwa;
  if (szablonJasny(s)) return Config.Marka;
  return (s && (s.etykieta || s.nazwa)) || '';
}

function renderujMenu() {
  $('#karty').innerHTML = Config.Tryby.map(tr => `
    <button class="karta st ${tr.wlaczony ? '' : 'wylaczona'}" type="button" data-tryb="${tr.id}" style="--k:${tr.kolor || '#1E88E5'}" ${tr.wlaczony ? '' : 'aria-disabled="true"'}>
      <span class="karta__pas"></span>
      ${tr.wlaczony ? '' : `<span class="znaczek"><i></i>${t('wkrotce')}</span>`}
      <div class="karta__ilustracja"><div class="karta__ikona">${ikona(tr.ikona, 40, 1.7)}</div></div>
      <div class="karta__tytul">${escapeHtml(tr.nazwa || t('tryb_' + tr.id))}</div>
      <div class="karta__opis">${escapeHtml(tr.opis || t('tryb_' + tr.id + '_opis'))}</div>
      <div class="karta__stopka">
        <span>${tr.wlaczony ? t('rozpocznij') : t('niedostepne')}</span>
        <span class="strzalka">${ikona('dalej', 17, 2)}</span>
      </div>
    </button>`).join('');

  $$('#karty .karta').forEach(k => k.addEventListener('click', () => {
    if (k.classList.contains('wylaczona')) {         // "Wkrótce" – delikatne potrząśnięcie
      k.classList.remove('potrzasnij'); void k.offsetWidth; k.classList.add('potrzasnij');
      return;
    }
    if (k.dataset.tryb === 'stworz') pokazEkran('szablony');
    else if (k.dataset.tryb === 'kopiuj') otworzKopiuj();
    else if (k.dataset.tryb === 'zdjecie') otworzZdjecie();
  }));

  $('#papierIlosc').textContent = `${Config.Papier} ${t('ark')}`;
  $('#tonerIlosc').textContent = `${Config.Toner}%`;
  $('#tonerPasek').style.width = `${Config.Toner}%`;
}

/* =================================================================
   EKRAN 2 – SZABLONY
   ================================================================= */
function renderujSzablony() {
  $('#szablony').innerHTML = Config.Szablony.map(s => `
    <button class="szablon st ${s.wlaczony ? '' : 'wylaczony'}" type="button" data-szablon="${s.id}" style="--k:${s.kolor}">
      <div class="szablon__znak">${ikona(s.ikona, 120, 1.4)}</div>
      <div class="mini ${szablonJasny(s) ? 'zwykly' : ''}">
        <div class="mini__pas"><span class="em">${godloSzablonu(s, 11, 2.2, false)}</span><span class="ln"><i></i><i></i></span></div>
        <div class="mini__body"><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div class="mini__podpis"></div>
      </div>
      <div class="szablon__info">
        <div class="szablon__ikona">${ikona(s.ikona, 20, 1.9)}</div>
        <div class="szablon__nazwa">${s.etykieta}</div>
        <div class="szablon__pod">${s.podtytul}</div>
        <div class="szablon__wybierz">${t('wybierz')} ${ikona('dalej', 14, 2.2)}</div>
      </div>
    </button>`).join('');

  $$('#szablony .szablon').forEach(b => b.addEventListener('click', () => wybierzSzablon(b.dataset.szablon)));
}

function wybierzSzablon(id) {
  const s = Config.Szablony.find(x => x.id === id && x.wlaczony);
  if (!s) return;
  stan.szablon = s;
  stan.dataDok = new Date();
  stan.nrDok = `NB-${stan.dataDok.getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
  ustawWygladSzablonu();
  aktualizujDokument();
  pokazEkran('edytor');
  setTimeout(() => $('#inTytul').focus({ preventScroll: true }), 450);
}

/* =================================================================
   EKRAN 3 – EDYTOR + PODGLĄD NA ŻYWO
   ================================================================= */
function ustawWygladSzablonu() {
  const s = stan.szablon;
  document.documentElement.style.setProperty('--kolor-szablonu', s.kolor);
  const dok = $('#dok');
  dok.classList.toggle('zwykly', szablonJasny(s));
  $('#dokGodlo').innerHTML = godloSzablonu(s, 34, 1.7, false);
  $('#dokZnak').innerHTML = ikona(s.ikona, 300, 1.2);
  $('#dokNazwa').textContent = nazwaPaska(s);
  $('#dokPod').textContent = s.podtytul;
  $('#dokNr').textContent = stan.nrDok;
  $('#dokData').textContent = formatDaty(stan.dataDok);
  $('#dokGodzina').textContent = formatGodziny(stan.dataDok);
  $('#chipIkona').innerHTML = godloSzablonu(s, 14, 2.2, true);
  $('#chipNazwa').textContent = s.etykieta;
}

/** Odświeża podgląd dokumentu na podstawie stanu */
function aktualizujDokument() {
  const tytul = stan.tytul.trim();
  const elTytul = $('#dokTytul');
  elTytul.textContent = tytul || t('bez_tytulu');
  elTytul.classList.toggle('pusty', !tytul);

  // stan.tresc to JUŻ zsanityzowany HTML (tylko b/i/u/span z kolorem z palety/br/div)
  const elTresc = $('#dokTresc');
  elTresc.innerHTML = stan.tresc;
  if (document.activeElement === $('#inTresc')) {
    const ostatni = elTresc.lastElementChild;
    const cel = ostatni && ostatni.tagName === 'DIV' ? ostatni : elTresc;
    cel.insertAdjacentHTML('beforeend', '<span class="kursor"></span>');
  }
  $('#dokSzkielet').classList.toggle('ukryty', stan.trescTekst.length > 0);
  $('#inTresc').classList.toggle('pusty', stan.trescTekst.length === 0 && !$('#inTresc').querySelector('div'));

  // liczniki
  const lt = $('#licznikTytul');
  lt.textContent = `${stan.tytul.length} / ${Config.MaksTytul}`;
  ustawKlaseLicznika(lt, stan.tytul.length, Config.MaksTytul);
  const lc = $('#licznikTresc');
  lc.textContent = `${stan.trescTekst.length} / ${Config.MaksZnakow}`;
  ustawKlaseLicznika(lc, stan.trescTekst.length, Config.MaksZnakow);
  const proc = Math.min(100, (stan.trescTekst.length / Config.MaksZnakow) * 100);
  const pasek = $('#pasekTresci');
  pasek.style.width = `${proc}%`;
  pasek.style.background = proc >= 100 ? 'var(--blad)' : proc >= 85 ? 'var(--ostrzezenie)' : 'var(--akcent)';

  // przycisk Drukuj aktywny, gdy jest tytuł lub treść
  $('#btnDrukuj').disabled = !(tytul || stan.trescTekst.trim());
  skalujKartke();
}

function ustawKlaseLicznika(el, ile, max) {
  el.classList.toggle('blisko', ile >= max * 0.85 && ile < max);
  el.classList.toggle('limit', ile >= max);
}

/** Skaluje kartkę A4 tak, by zmieściła się w panelu podglądu */
function skalujKartke() {
  const pane = $('#podglad'), dok = $('#dok'), ramka = $('#kartkaRamka');
  if (!pane.clientWidth) return;
  const wys = Math.max(792, dok.offsetHeight);   // kartka rośnie przy długiej treści – wtedy zmniejszamy skalę
  const s = Math.min((pane.clientWidth - 48) / 560, (pane.clientHeight - 58 - 26) / wys, 1);
  stan.skala = s;
  dok.style.transform = `scale(${s})`;
  ramka.style.width = `${560 * s}px`;
  ramka.style.height = `${dok.offsetHeight * s}px`;
}

/* --- podpis --- */
function przelaczPodpis(wl = !stan.podpis) {
  stan.podpis = wl;
  const btn = $('#btnPodpis'), blok = $('#dokPodpis');
  btn.classList.toggle('wl', wl);
  btn.setAttribute('aria-checked', String(wl));
  blok.classList.remove('rysuj');
  if (wl) {
    $('#podpisTekst').textContent = stan.imie;
    $('#podpisImie').textContent = stan.imie;
    $('#podpisData').textContent = t('podpisano', `${formatDaty(new Date())}, ${formatGodziny(new Date())}`);
    void blok.offsetWidth;                 // restart animacji kreślenia
    blok.classList.add('widoczny', 'rysuj');
  } else {
    blok.classList.remove('widoczny');
  }
  setTimeout(skalujKartke, 460);
}

/* =================================================================
   EDYTOR TEKSTU SFORMATOWANEGO + SANITYZACJA
   ================================================================= */
const TAGI_USUWANE = new Set(['script','style','iframe','object','embed','img','svg','video','audio','canvas','link','meta','input','textarea','select','button','form','template','noscript']);
const PALETA = () => Config.KoloryTekstu.map(k => k.kolor.toLowerCase());

/** Zamienia dowolny zapis koloru (#abc, #aabbcc, rgb()) na #rrggbb */
function normalizujKolor(k) {
  if (!k) return null;
  k = String(k).trim().toLowerCase();
  let m = k.match(/^#([0-9a-f]{3})$/);
  if (m) return '#' + m[1].split('').map(c => c + c).join('');
  if (/^#[0-9a-f]{6}$/.test(k)) return k;
  m = k.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) return '#' + m.slice(1, 4).map(n => Number(n).toString(16).padStart(2, '0')).join('');
  return null;
}
/** Zwraca kolor tylko, jeśli jest w palecie z Config */
function dozwolonyKolor(k) {
  const n = normalizujKolor(k);
  return n && PALETA().includes(n) ? n : null;
}

/**
 * Sanityzacja HTML – przepuszcza WYŁĄCZNIE: b/strong → <b>, i/em → <i>, u, br, div/p → <div>
 * oraz <span style="color:#xxxxxx"> z kolorem z palety. Wszystkie atrybuty są usuwane.
 * Używane przy podglądzie i przed wysłaniem do Lua (serwer i tak powinien sprawdzić ponownie!).
 */
function sanityzuj(html) {
  const tpl = document.createElement('template');   // zawartość <template> jest bezczynna – nic się nie wykona ani nie wczyta
  tpl.innerHTML = html;
  const przejdz = wezel => {
    let out = '';
    wezel.childNodes.forEach(n => {
      if (n.nodeType === 3) { out += escapeHtml(n.nodeValue); return; }
      if (n.nodeType !== 1) return;
      const tag = n.tagName.toLowerCase();
      if (TAGI_USUWANE.has(tag)) return;
      if (tag === 'br') { out += '<br>'; return; }
      let srodek = przejdz(n);
      // Kolor: <font color> albo style="color" (Chromium dokleja go też do <b>/<i>/<u>) – tylko z palety
      const kolor = dozwolonyKolor(tag === 'font' ? n.getAttribute('color') : n.style.color);
      if (kolor) srodek = `<span style="color:${kolor}">${srodek}</span>`;
      if (tag === 'b' || tag === 'strong') out += `<b>${srodek}</b>`;
      else if (tag === 'i' || tag === 'em') out += `<i>${srodek}</i>`;
      else if (tag === 'u') out += `<u>${srodek}</u>`;
      else if (tag === 'div' || tag === 'p') out += `<div>${srodek}</div>`;
      else out += srodek;                             // span/font i inne tagi (np. <a>) – sam tekst, bez atrybutów
    });
    return out;
  };
  return przejdz(tpl.content);
}

/** Czysty tekst edytora (do licznika) */
function tekstEdytora() {
  return $('#inTresc').innerText.replace(/\n$/, '');
}

function odswiezTresc() {
  const ed = $('#inTresc');
  stan.trescTekst = tekstEdytora();
  stan.tresc = stan.trescTekst.trim() ? sanityzuj(ed.innerHTML) : '';
  aktualizujDokument();
  aktualizujStanPaska();
}

/** Podświetla aktywne przyciski B/I/U i kolor dla bieżącego zaznaczenia */
function aktualizujStanPaska() {
  if (document.activeElement !== $('#inTresc')) return;
  ['bold', 'italic', 'underline'].forEach(cmd => {
    $(`.rt-btn[data-rt="${cmd}"]`).classList.toggle('aktywny', document.queryCommandState(cmd));
  });
  const kolor = normalizujKolor(document.queryCommandValue('foreColor')) || Config.KoloryTekstu[0].kolor.toLowerCase();
  $('#rtPasek').style.setProperty('--kolor-rt', kolor);
  $$('.rt-probka').forEach(p => p.classList.toggle('aktywna', p.dataset.kolor.toLowerCase() === kolor));
}

let kolorPisania = null;   // kolor wybrany przy pustym zaznaczeniu (dla następnych znaków)
function formatuj(cmd, wartosc = null) {
  const ed = $('#inTresc');
  if (document.activeElement !== ed) ed.focus();
  const zwiniete = window.getSelection().isCollapsed;
  document.execCommand(cmd, false, wartosc);
  // Chromium gubi oczekujący kolor "do pisania" po B/I/U przy pustym zaznaczeniu – przywracamy go
  if (cmd === 'foreColor') kolorPisania = zwiniete ? wartosc : null;
  else if (zwiniete && kolorPisania && cmd !== 'removeFormat') document.execCommand('foreColor', false, kolorPisania);
  if (cmd === 'removeFormat') kolorPisania = null;
  odswiezTresc();
}

function renderujPalete() {
  $('#rtPaleta').innerHTML = Config.KoloryTekstu.map(k =>
    `<button type="button" class="rt-probka" style="--k:${k.kolor}" data-kolor="${k.kolor}" title="${k.nazwa}"></button>`).join('');
}

/** Ile znaków można jeszcze wpisać */
const wolneZnaki = () => Config.MaksZnakow - tekstEdytora().length;

function podepnijEdytorTresci() {
  const ed = $('#inTresc'), pasek = $('#rtPasek'), paleta = $('#rtPaleta');
  // mousedown z preventDefault – kliknięcie w pasek nie zabiera zaznaczenia z edytora
  pasek.addEventListener('mousedown', e => { if (e.target.closest('button')) e.preventDefault(); });
  $$('.rt-btn[data-rt]').forEach(b => b.addEventListener('click', () => formatuj(b.dataset.rt)));
  $('#rtKolorBtn').addEventListener('click', () => paleta.classList.toggle('otwarta'));
  paleta.addEventListener('click', e => {
    const p = e.target.closest('.rt-probka'); if (!p) return;
    formatuj('foreColor', p.dataset.kolor);
    paleta.classList.remove('otwarta');
  });
  document.addEventListener('mousedown', e => { if (!e.target.closest('.rt-kolor')) paleta.classList.remove('otwarta'); });

  // <b>/<i>/<u>/<font> zamiast style="…" (ustawiamy raz – ponowne wywołanie kasuje styl "do pisania")
  ed.addEventListener('focus', () => document.execCommand('styleWithCSS', false, false), { once: true });
  ed.addEventListener('input', () => { kolorPisania = null; odswiezTresc(); });
  ed.addEventListener('focus', () => { aktualizujDokument(); aktualizujStanPaska(); });
  ed.addEventListener('blur', aktualizujDokument);
  document.addEventListener('selectionchange', aktualizujStanPaska);

  // skróty Ctrl+B / Ctrl+I / Ctrl+U
  ed.addEventListener('keydown', e => {
    if (!(e.ctrlKey || e.metaKey)) return;
    const mapa = { b: 'bold', i: 'italic', u: 'underline' };
    const cmd = mapa[e.key.toLowerCase()];
    if (cmd) { e.preventDefault(); formatuj(cmd); }
  });
  // limit znaków (liczony na czystym tekście)
  ed.addEventListener('beforeinput', e => {
    if (!e.inputType.startsWith('insert') || e.inputType === 'insertFromPaste') return;
    const sel = window.getSelection();
    if (wolneZnaki() <= 0 && sel && sel.isCollapsed) e.preventDefault();
  });
  // wklejanie i upuszczanie – zawsze jako czysty tekst (bez stylów, linków, obrazków)
  const wstawTekst = tekst => {
    tekst = tekst.replace(/\r\n?/g, '\n').slice(0, Math.max(0, wolneZnaki()));
    if (tekst) document.execCommand('insertText', false, tekst);
  };
  ed.addEventListener('paste', e => { e.preventDefault(); wstawTekst(e.clipboardData.getData('text/plain')); });
  ed.addEventListener('drop', e => { e.preventDefault(); wstawTekst(e.dataTransfer.getData('text/plain')); });
}

/* =================================================================
   ZDJĘCIA – wiele na dokument, swobodnie układane na kartce
   ================================================================= */
let WZOR_OBRAZU = /^https?:\/\/[^\s/$.?#][^\s]*\.(png|jpe?g|gif|webp|bmp)(\?[^\s]*)?$/i;

function pokazBladZdjecia(klucz) {
  const w = $('#wejscieZdjecie');
  w.classList.remove('blad'); void w.offsetWidth; w.classList.add('blad');
  $('#bladZdjecia').innerHTML = `<div class="komunikat-bledu">${ikona('blad', 14, 2)}<span>${t(klucz)}</span></div>`;
}
function wyczyscBladZdjecia() {
  $('#wejscieZdjecie').classList.remove('blad');
  $('#bladZdjecia').innerHTML = '';
}

function dodajZdjecieZUrl() {
  if (stan.zdjecia.length >= Config.Zdjecie.maxIlosc) return pokazBladZdjecia('zdjecia_limit');
  const url = bezpiecznySrc(wyciagnijUrl($('#inZdjecie').value) || $('#inZdjecie').value.trim());
  if (!url) return pokazBladZdjecia('blad_url');
  zaladujDoImg(new Image(), url, () => { $('#inZdjecie').value = ''; dodajZdjecie(url); }, () => pokazBladZdjecia('blad_wczyt'));
}

function wstawPrzykladowe() {
  if (stan.zdjecia.length >= Config.Zdjecie.maxIlosc) return pokazBladZdjecia('zdjecia_limit');
  dodajZdjecie(PRZYKLADOWE_ZDJECIA[stan.probka++ % PRZYKLADOWE_ZDJECIA.length]);
}

/** Dodaje zdjęcie – każde kolejne lekko przesunięte, by nie leżały idealnie na sobie */
function dodajZdjecie(src) {
  wyczyscBladZdjecia();
  const n = stan.zdjecia.length, cfg = Config.Zdjecie;
  // start: pod treścią dokumentu
  const dok = $('#dok'), tresc = $('#dokTresc');
  const dolTresci = (tresc.getBoundingClientRect().bottom - dok.getBoundingClientRect().top) / stan.skala;
  const y0 = Math.min(Math.max(dolTresci + 18, 230), 792 - 330);
  const zdj = {
    id: stan.nastepneId++, src,
    x: 44 + n * cfg.przesuniecie.x,
    y: Math.round(y0 + n * cfg.przesuniecie.y),
    w: cfg.szerokosc,
    rot: [-3, 2.5, -1.5, 3.5, -2.5][n % 5],
    nowe: true,
  };
  stan.zdjecia.push(zdj);
  zaznacz(zdj.id);
}

function usunZdjecie(id) {
  const i = stan.zdjecia.findIndex(z => z.id === id);
  if (i < 0) return;
  stan.zdjecia.splice(i, 1);
  if (stan.zaznaczone === id) stan.zaznaczone = null;
  const el = $(`.foto[data-id="${id}"]`);
  if (el) { el.classList.add('wychodzi'); setTimeout(() => el.remove(), 280); }
  renderujZdjecia();
}

/** Zaznacza zdjęcie i przenosi je na wierzch (koniec tablicy = najwyższa warstwa) */
function zaznacz(id) {
  stan.zaznaczone = id;
  const i = stan.zdjecia.findIndex(z => z.id === id);
  if (i >= 0) stan.zdjecia.push(stan.zdjecia.splice(i, 1)[0]);
  renderujZdjecia();
}
function odznacz() {
  if (stan.zaznaczone === null) return;
  stan.zaznaczone = null;
  renderujZdjecia();
}

/** Synchronizuje DOM (kartka, miniatury, pasek narzędzi) ze stanem */
function renderujZdjecia() {
  const warstwa = $('#dokWarstwa');
  // numer = kolejność dodania (stały), z-index = kolejność w tablicy
  const wgId = [...stan.zdjecia].sort((a, b) => a.id - b.id);
  stan.zdjecia.forEach((z, i) => {
    let el = $(`.foto[data-id="${z.id}"]`, warstwa);
    if (!el) {
      el = document.createElement('div');
      el.className = 'foto';
      el.dataset.id = z.id;
      el.innerHTML = `<div class="foto__ramka"><img alt="" draggable="false"></div><span class="foto__nr"></span><span class="uchwyt uchwyt--obrot" data-uchwyt="obrot"></span><span class="uchwyt uchwyt--rozmiar" data-uchwyt="rozmiar"></span>`;
      $('img', el).src = z.src;
      warstwa.appendChild(el);
      podepnijPrzeciaganie(el);
    }
    if (z.nowe) { el.classList.add('wchodzi'); delete z.nowe; setTimeout(() => el.classList.remove('wchodzi'), 650); }
    ustawStylZdjecia(el, z);
    el.style.zIndex = i + 1;
    el.classList.toggle('zaznaczone', z.id === stan.zaznaczone);
    $('.foto__nr', el).textContent = wgId.indexOf(z) + 1;
  });

  // miniatury w formularzu + puste sloty do limitu
  const max = Config.Zdjecie.maxIlosc;
  $('#listaZdjec').innerHTML = wgId.map((z, i) => `
    <div class="miniatura ${z.id === stan.zaznaczone ? 'zaznaczona' : ''}" data-id="${z.id}" title="${t('zdjecie_n', i + 1)}">
      <img src="${z.src}" alt="">
      <span class="miniatura__nr">${i + 1}</span>
      <button type="button" class="miniatura__usun" data-usun="${z.id}" title="${t('usun')}">${ikona('zamknij', 12, 2.6)}</button>
    </div>`).join('') + Array.from({ length: max - wgId.length }, () =>
    `<button type="button" class="miniatura miniatura--pusta" data-pusta>${ikona('plus', 16, 2)}</button>`).join('');

  // licznik i blokada po osiągnięciu limitu
  const pelne = stan.zdjecia.length >= max;
  const lz = $('#licznikZdjec');
  lz.textContent = `${stan.zdjecia.length} / ${max}`;
  lz.classList.toggle('limit', pelne);
  $('#btnDodajZdjecie').disabled = pelne;
  $('#inZdjecie').disabled = pelne;
  $('#wejscieZdjecie').classList.toggle('zablokowane', pelne);
  $('#btnPrzykladowe').classList.toggle('ukryty', pelne || JEST_FIVEM || Config.Przykladowe === false);
  $('#zdjeciaPodpowiedz').textContent = pelne ? t('zdjecia_limit') : stan.zdjecia.length ? t('zdjecia_hint') : t('formaty');

  // pasek narzędzi zaznaczonego zdjęcia
  const zaz = stan.zdjecia.find(z => z.id === stan.zaznaczone);
  $('#pasekFoto').classList.toggle('widoczny', !!zaz);
  if (zaz) {
    $('#pasekFotoMini').src = zaz.src;
    $('#pasekFotoNazwa').textContent = `${t('zdjecie_n', wgId.indexOf(zaz) + 1)} · ${Math.round(zaz.rot)}°`;
  }
}

function ustawStylZdjecia(el, z) {
  el.style.left = `${z.x}px`;
  el.style.top = `${z.y}px`;
  el.style.width = `${z.w}px`;
  el.style.transform = `rotate(${z.rot}deg)`;
}

/** Przeciąganie, skalowanie (uchwyt w rogu) i obracanie (uchwyt u góry) myszą */
function podepnijPrzeciaganie(el) {
  el.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    e.preventDefault(); e.stopPropagation();
    if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
    const id = Number(el.dataset.id);
    if (stan.zaznaczone !== id) zaznacz(id);
    const z = stan.zdjecia.find(q => q.id === id);
    const tryb = e.target.dataset.uchwyt || 'przesun';
    const start = { px: e.clientX, py: e.clientY, x: z.x, y: z.y, w: z.w };
    const r = el.getBoundingClientRect();
    const srodek = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    el.setPointerCapture(e.pointerId);
    el.classList.add('przeciaganie');

    const ruch = ev => {
      const dx = (ev.clientX - start.px) / stan.skala, dy = (ev.clientY - start.py) / stan.skala;
      if (tryb === 'przesun') {
        const h = el.offsetHeight, H = $('#dok').offsetHeight;
        z.x = Math.round(Math.min(Math.max(start.x + dx, -z.w / 2), 560 - z.w / 2));
        z.y = Math.round(Math.min(Math.max(start.y + dy, -h / 2), H - h / 2));
      } else if (tryb === 'rozmiar') {
        // ruch myszy rzutujemy na oś obróconego zdjęcia
        const rad = -z.rot * Math.PI / 180;
        const lokalneX = dx * Math.cos(rad) - dy * Math.sin(rad);
        z.w = Math.round(Math.min(Math.max(start.w + lokalneX, Config.Zdjecie.minSzerokosc), Config.Zdjecie.maxSzerokosc));
      } else if (tryb === 'obrot') {
        let kat = Math.atan2(ev.clientY - srodek.y, ev.clientX - srodek.x) * 180 / Math.PI + 90;
        if (kat > 180) kat -= 360;
        if (ev.shiftKey) kat = Math.round(kat / 15) * 15;      // Shift = co 15°
        else if (Math.abs(kat) < 4) kat = 0;                  // przyciąganie do poziomu
        z.rot = Math.round(kat * 10) / 10;
        $('#pasekFotoNazwa').textContent = `${t('zdjecie_n', [...stan.zdjecia].sort((a, b) => a.id - b.id).indexOf(z) + 1)} · ${Math.round(z.rot)}°`;
      }
      ustawStylZdjecia(el, z);
    };
    const koniec = () => {
      el.classList.remove('przeciaganie');
      el.removeEventListener('pointermove', ruch);
      el.removeEventListener('pointerup', koniec);
      el.removeEventListener('pointercancel', koniec);
    };
    el.addEventListener('pointermove', ruch);
    el.addEventListener('pointerup', koniec);
    el.addEventListener('pointercancel', koniec);
  });
}

/** Akcje paska narzędzi – działają na zaznaczonym zdjęciu */
function akcjaZdjecia(akcja) {
  const z = stan.zdjecia.find(q => q.id === stan.zaznaczone);
  if (!z) return;
  const cfg = Config.Zdjecie;
  const skaluj = f => {
    const nw = Math.min(Math.max(Math.round(z.w * f), cfg.minSzerokosc), cfg.maxSzerokosc);
    z.x = Math.round(z.x - (nw - z.w) / 2);       // skalujemy względem środka
    z.w = nw;
  };
  if (akcja === 'obrotL') z.rot = Math.round(z.rot - 15);
  else if (akcja === 'obrotP') z.rot = Math.round(z.rot + 15);
  else if (akcja === 'prosto') z.rot = 0;
  else if (akcja === 'mniej') skaluj(0.85);
  else if (akcja === 'wiecej') skaluj(1.15);
  else if (akcja === 'usun') return usunZdjecie(z.id);
  renderujZdjecia();
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Czyści edytor (po wydruku) */
function resetujEdytor() {
  stan.tytul = ''; stan.tresc = ''; stan.trescTekst = '';
  $('#inTytul').value = ''; $('#inTresc').innerHTML = ''; $('#inZdjecie').value = '';
  if (stan.podpis) przelaczPodpis(false);
  stan.zdjecia = []; stan.zaznaczone = null;
  $('#dokWarstwa').innerHTML = '';
  renderujZdjecia();
  wyczyscBladZdjecia();
  aktualizujDokument();
}

/* =================================================================
   EKRAN 4 – DRUKOWANIE (wspólna animacja dla: Stwórz / Kopiuj / Zdjęcie)
   ================================================================= */
/**
 * Uruchamia animację drukarki.
 * o = { tryb, tytul, etykieta, nazwa, kopie, kolor, zwykly, zdjecia, podpis, znakKopii, status(p), koniec() }
 */
function animujDruk(o) {
  stan.drukuje = true;
  stan.trybDruku = o.tryb;
  const druk = $('#druk'), il = $('#drukarkaIl');
  druk.classList.remove('trwa', 'gotowe', 'tryb-zdjecie', 'z-kopia');
  druk.classList.toggle('tryb-zdjecie', o.tryb === 'zdjecie');
  druk.classList.toggle('z-kopia', !!o.znakKopii);
  il.style.setProperty('--czas', `${Config.CzasDruku}ms`);
  il.style.setProperty('--kolor-szablonu', o.kolor || 'var(--granat)');
  $('.di-kartka').classList.toggle('zwykly', !!o.zwykly);
  $('#diFoto').style.display = o.zdjecia ? 'block' : 'none';
  $('#diSig').style.visibility = o.podpis ? 'visible' : 'hidden';
  $('#drukTytul').textContent = o.tytul;
  $('#drukEtykieta').textContent = o.etykieta;
  $('#drukNazwa').textContent = o.nazwa;
  const ile = $('#drukKopie');
  ile.textContent = `×${o.kopie || 1}`;
  ile.classList.toggle('ukryty', !(o.kopie > 1));
  pokazEkran('druk');
  void druk.offsetWidth;
  druk.classList.add('trwa');

  // pasek postępu sterowany przez requestAnimationFrame
  const start = performance.now();
  const pasek = $('#postepPasek'), procent = $('#postepProcent'), status = $('#postepStatus');
  const krok = teraz => {
    const p = Math.min(1, (teraz - start) / Config.CzasDruku);
    const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;   // easeInOut
    pasek.style.width = `${(e * 100).toFixed(1)}%`;
    procent.textContent = `${Math.round(e * 100)}%`;
    status.textContent = p >= 1 ? t('druk_s4') : o.status(p);
    if (p < 1) return requestAnimationFrame(krok);
    druk.classList.add('gotowe');
    $('#drukTytul').textContent = t('druk_gotowe');
    o.koniec();
  };
  requestAnimationFrame(krok);
}

function tekstBledu(odp) {
  const klucz = (odp && odp.klucz) || 'blad';
  if (odp && odp.minuty != null) return t(klucz, odp.minuty);
  return t(klucz);
}

function pokazBladWydruku(odp) {
  if (odp && typeof odp.papier === 'number') ustawPapier(odp.papier);
  pokazToast(tekstBledu(odp), t('blad_sprobuj'));
}

/** Najpierw serwer (papier, limit, przedmiot), dopiero potem animacja. */
async function wyslijWydruk(nazwa, dane) {
  stan.drukuje = true;
  const odp = await nui(nazwa, dane);
  if (!odp || odp.ok === false) {
    stan.drukuje = false;
    pokazBladWydruku(odp);
    return null;
  }
  if (typeof odp.papier === 'number') ustawPapier(odp.papier);
  return odp;
}

function poAnimacji(fn) {
  setTimeout(() => {
    fn();
    stan.drukuje = false;
  }, 1100);
}

/* --- Stwórz: druk nowego dokumentu --- */
async function drukuj() {
  if ($('#btnDrukuj').disabled || stan.drukuje || !stan.szablon) return;
  const tytul = stan.tytul.trim() || t('bez_tytulu');
  odznacz();
  const odp = await wyslijWydruk('drukuj', {
    template: stan.szablon.id,
    title: stan.tytul.trim(),
    body: stan.tresc,
    bodyText: stan.trescTekst,
    signed: stan.podpis,
    name: stan.imie,
    images: stan.zdjecia.map(({ src, x, y, w, rot }) => ({ src, x, y, w, rot })),
  });
  if (!odp) return;
  animujDruk({
    tryb: 'stworz', tytul: t('druk_tytul'), etykieta: t('druk_dokument'), nazwa: `„${tytul}”`,
    kolor: stan.szablon.kolor, zwykly: szablonJasny(stan.szablon),
    zdjecia: stan.zdjecia.length > 0, podpis: stan.podpis,
    status: p => t(p < .33 ? 'druk_s1' : p < .8 ? 'druk_s2' : 'druk_s3'),
    koniec: () => poAnimacji(() => {
      pokazToast(t('wydrukowano', tytul), t('w_ekwipunku'));
      resetujEdytor();
      pokazEkran('menu', true);
    }),
  });
}

let toastTimer = null;
function pokazToast(tytul, opis) {
  const el = $('#toast');
  $('#toastTytul').textContent = tytul;
  $('#toastOpis').textContent = opis;
  el.style.setProperty('--t', `${Config.CzasPowiadomienia}ms`);
  el.classList.remove('widoczny'); void el.offsetWidth; el.classList.add('widoczny');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('widoczny'), Config.CzasPowiadomienia);
}

/* =================================================================
   WSPÓLNE – stepper (− 1 +), bezpieczne liczby i adresy obrazów
   ================================================================= */
const ogranicz = (v, min, max) => Math.min(max, Math.max(min, v));
const liczba = (v, min, max, dom) => { const n = Number(v); return Number.isFinite(n) ? ogranicz(n, min, max) : dom; };

/** Zwraca adres obrazu tylko, jeśli jest bezpieczny (http/https do pliku graficznego albo osadzony data:image) */
function domenaDozwolona(src) {
  if (!Array.isArray(Config.Domeny) || !Config.Domeny.length) return true;
  let host = '';
  try { host = new URL(src).hostname.toLowerCase(); } catch { return false; }
  return Config.Domeny.some(d => {
    d = String(d).replace(/^\*\./, '').toLowerCase();
    return host === d || host.endsWith('.' + d);
  });
}

function wyciagnijUrl(tekst) {
  const m = String(tekst || '').match(/https?:\/\/[^\s<>"']+/i);
  return m ? m[0].replace(/[.,;]+$/g, '') : '';
}

function rozszerzenieDozwolone(ext) {
  ext = String(ext || '').toLowerCase();
  const lista = (Config.Rozszerzenia || ['png', 'jpg', 'jpeg', 'webp', 'gif']).map(e => String(e).toLowerCase());
  if (lista.includes(ext)) return true;
  return (ext === 'jpg' || ext === 'jpeg') && (lista.includes('jpg') || lista.includes('jpeg'));
}

function bezpiecznySrc(src) {
  src = String(src || '').trim().replace(/^['"<]+|[>'"]+$/g, '');
  const blokujBase64 = JEST_FIVEM || Config.BlokujBase64 === true;
  if (!blokujBase64 && /^data:image\/(png|jpe?g|webp|gif);base64,[a-z0-9+/=]+$/i.test(src)) return src;
  if (blokujBase64 && /^data:/i.test(src)) return null;
  if (!/^https?:\/\//i.test(src) || /[\s"'\\<>]/.test(src)) return null;
  let path = '';
  try {
    const u = new URL(src);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    path = u.pathname || '';
  } catch { return null; }
  if (!domenaDozwolona(src)) return null;
  const ext = (path.match(/\.([a-z0-9]+)$/i) || [])[1];
  if (ext && !rozszerzenieDozwolone(ext)) return null;
  return src;
}

/** 1 = w górę (powiększ), -1 = w dół. W FiveM deltaY bywa 0, zostaje wheelDelta. */
function kierunekKola(e) {
  if (e.deltaY) return e.deltaY < 0 ? 1 : -1;
  if (e.wheelDelta) return e.wheelDelta > 0 ? 1 : -1;
  if (e.detail) return e.detail < 0 ? 1 : -1;
  return 0;
}

/** Podpina stepper: el = .stepper, pobierz() → wartość, ustaw(n) zapisuje nową */
function podepnijStepper(el, pobierz, ustaw, max) {
  const wyjscie = $('output', el);
  const odswiez = () => {
    const v = pobierz();
    wyjscie.textContent = v;
    $('[data-krok="-1"]', el).disabled = v <= 1;
    $('[data-krok="1"]', el).disabled = v >= max();
  };
  el.addEventListener('click', e => {
    const b = e.target.closest('[data-krok]'); if (!b || b.disabled) return;
    ustaw(ogranicz(pobierz() + Number(b.dataset.krok), 1, max()));
    wyjscie.classList.remove('skok'); void wyjscie.offsetWidth; wyjscie.classList.add('skok');
    odswiez();
  });
  odswiez();
  return odswiez;
}

/** Zamienia datę z Lua (unix s/ms, "DD.MM.RRRR GG:MM" albo ISO) na Date */
function parsujDate(v) {
  if (typeof v === 'number' && Number.isFinite(v)) return new Date(v < 1e12 ? v * 1000 : v);
  const m = String(v || '').match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})(?:[ ,T]+(\d{1,2}):(\d{2}))?/);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0));
  const d = new Date(v);
  return isNaN(d) ? new Date() : d;
}

/* =================================================================
   EKRAN 5 – KOPIUJ
   Lista przychodzi z Lua: SendNUIMessage({ akcja = 'dokumenty', lista = { ... } })
   Każdy dokument ma kształt payloadu 'drukuj' + id, date (i opcjonalnie nr).
   ================================================================= */

/* Przykładowe dokumenty – TYLKO w podglądzie przeglądarkowym (w FiveM lista przychodzi z Lua) */
const MOCK_DOKUMENTY = [
  {
    id: 'doc_8f21', template: 'lspd', title: 'Notatka służbowa – zatrzymanie pojazdu', nr: 'NB-2026-4821',
    date: '26.10.2026 09:51', signed: true, name: 'Jan Kowalski',
    body: 'Dnia 26.10.2026 o godz. 09:42 zatrzymano do kontroli pojazd Karin Sultan (nr rej. <b>42 ŻÓŁW</b>).<div><br></div><div>Kierowca <u>Paweł Nowak</u> przekroczył dozwoloną prędkość o <b><span style="color:#d32f2f">48 km/h</span></b>. Nałożono mandat w wysokości <span style="color:#1e88e5">2 500 $</span>.</div><div><br></div><div><i>Materiał dowodowy w załącznikach.</i></div>',
    images: [{ src: 'PRZYKLAD:0', x: 40, y: 398, w: 200, rot: -3 }, { src: 'PRZYKLAD:2', x: 312, y: 404, w: 200, rot: 2.5 }],
  },
  {
    id: 'doc_77c4', template: 'ems', title: 'Karta informacyjna – SOR Pillbox Hill', nr: 'NB-2026-4790',
    date: '25.10.2026 22:14', signed: true, name: 'dr Marta Zielińska',
    body: '<b>Pacjent:</b> Piotr Lewandowski, ur. 14.03.1994<div><b>Przyjęty:</b> 25.10.2026, 21:37 – transport ZRM</div><div><br></div><div><b>Rozpoznanie:</b> złamanie kości promieniowej prawej, otarcia naskórka przedramienia.</div><div><br></div><div>Wykonano RTG, nastawienie i unieruchomienie w opatrunku gipsowym. Podano leki przeciwbólowe.</div><div><br></div><div><span style="color:#d32f2f"><b>Zalecenia:</b></span> kontrola w poradni ortopedycznej za 7 dni, <u>zakaz prowadzenia pojazdów do odwołania</u>.</div>',
    images: [],
  },
  {
    id: 'doc_5a10', template: 'doj', title: 'Wyrok – sygn. akt II K 214/26', nr: 'NB-2026-4702',
    date: '24.10.2026 15:30', signed: true, name: 'sędzia Tomasz Mazur',
    body: '<b>W IMIENIU STANU SAN ANDREAS</b><div><br></div><div>Sąd Okręgowy w Los Santos, II Wydział Karny, po rozpoznaniu sprawy <b>Marka Nowickiego</b>, oskarżonego o czyn z art. 178a § 1 k.k.,</div><div><br></div><div><b>uznaje oskarżonego winnym</b> zarzucanego mu czynu i wymierza karę grzywny w wysokości <span style="color:#1a2a6c"><b>15 000 $</b></span> oraz zakaz prowadzenia pojazdów na okres <b>2 lat</b>.</div><div><br></div><div><u>Wyrok jest prawomocny.</u></div>',
    images: [],
  },
  {
    id: 'doc_31be', template: 'lsc', title: 'Faktura nr 1043/10/2026', nr: 'NB-2026-4655',
    date: '23.10.2026 18:05', signed: true, name: 'Kamil Wójcik',
    body: '<b>Nabywca:</b> Jan Kowalski<div><b>Pojazd:</b> Pegasus Vacca · nr rej. 07 LSC 88</div><div><br></div><div>1. Wymiana zawieszenia sportowego – <b>2 900 $</b></div><div>2. Tuning silnika (poziom 3) – <b>1 450 $</b></div><div>3. Lakierowanie, kolor perłowy – <b>500 $</b></div><div><br></div><div>Razem do zapłaty: <b>4 850 $</b> · <span style="color:#2e7d32"><b>OPŁACONO</b></span></div>',
    images: [{ src: 'PRZYKLAD:1', x: 300, y: 430, w: 210, rot: 2 }],
  },
  {
    id: 'doc_0d93', template: 'zwykly', title: 'List do Ani', nr: 'NB-2026-4512',
    date: '20.10.2026 21:40', signed: false, name: 'Jan Kowalski',
    body: '<i>Droga Aniu,</i><div><br></div><div>dziękuję za wczorajszy wieczór na molo w Del Perro. Zostawiam Ci ten list w skrzynce, bo wiem, że rano wyjeżdżasz do Sandy Shores.</div><div><br></div><div>Odezwij się, gdy dojedziesz – <span style="color:#7b1fa2">będę czekać na wiadomość</span>.</div><div><br></div><div><i>Ściskam mocno,</i></div><div><b>Jan</b></div>',
    images: [],
  },
  {
    id: 'doc_c6f2', template: 'fdr', title: 'Raport z akcji ratowniczo-gaśniczej nr 88/2026', nr: 'NB-2026-4433',
    date: '18.10.2026 04:12', signed: true, name: 'kpt. Michał Dąbrowski',
    body: '<b>Miejsce:</b> magazyn przy Elysian Fields Fwy<div><b>Zgłoszenie:</b> 18.10.2026, 02:41 · <b>Zakończenie:</b> 04:05</div><div><br></div><div>Pożar wewnętrzny hali magazynowej o powierzchni ok. 600 m². Zadysponowano <b>3 zastępy</b>. Ewakuowano 4 osoby, <span style="color:#ef6c00"><b>1 osoba poszkodowana</b></span> przekazana ZRM.</div><div><br></div><div>Przyczyna: prawdopodobnie zwarcie instalacji elektrycznej.</div>',
    images: [{ src: 'PRZYKLAD:0', x: 176, y: 432, w: 208, rot: -1.5 }],
  },
].map(d => ({ ...d, images: d.images.map(z => ({ ...z, src: PRZYKLADOWE_ZDJECIA[Number(z.src.split(':')[1])] })) }));

const stanKp = {
  lista: [],          // znormalizowane, bezpieczne dokumenty
  wczytano: false,
  filtr: 'wszystkie', // id szablonu albo 'wszystkie'
  szukaj: '',
  wybrany: null,      // id wybranego dokumentu
  kopie: 1,
  znak: Config.Kopiuj.znakWodny,
};

const szablonWgId = id => {
  const katalog = Array.isArray(Config.Katalog) ? Config.Katalog : [];
  return katalog.find(s => s.id === id)
    || Config.Szablony.find(s => s.id === id)
    || Config.Szablony[0]
    || { id: 'zwykly', etykieta: 'Plain', kolor: '#0A0F1E', ikona: 'kartka', jasny: true, podtytul: '' };
};

/** Dane z Lua NIGDY nie są zaufane – normalizujemy typy i ponownie sanityzujemy treść */
function normalizujDokument(r, i) {
  if (!r || typeof r !== 'object') return null;
  const tekst = v => (v == null ? '' : String(v));
  const s = szablonWgId(r.template);
  const data = parsujDate(r.date);
  const body = sanityzuj(tekst(r.body));
  const tpl = document.createElement('template');
  tpl.innerHTML = body.replace(/<\/div>/g, '</div> ');
  const zdjecia = (Array.isArray(r.images) ? r.images : []).slice(0, Config.Zdjecie.maxIlosc).map(z => {
    const src = z && bezpiecznySrc(z.src);
    if (!src) return null;
    return { src, x: liczba(z.x, -300, 860, 40), y: liczba(z.y, -300, 1400, 300), w: liczba(z.w, Config.Zdjecie.minSzerokosc, Config.Zdjecie.maxSzerokosc, 190), rot: liczba(z.rot, -180, 180, 0) };
  }).filter(Boolean);
  return {
    id: tekst(r.id ?? `dok_${i}`).slice(0, 64),
    template: s.id,
    title: tekst(r.title).slice(0, Config.MaksTytul).trim(),
    body, tekst: tpl.content.textContent.replace(/\s+/g, ' ').trim(),
    signed: !!r.signed,
    name: tekst(r.name).slice(0, 40).trim() || '—',
    data,
    nr: tekst(r.nr || `NB-${data.getFullYear()}-${String(1000 + i).slice(-4)}`).slice(0, 24),
    images: zdjecia,
  };
}

/** Wejście do trybu Kopiuj – prosi Lua o listę dokumentów */
function otworzKopiuj() {
  stanKp.wczytano = false;
  stanKp.szukaj = ''; $('#kpSzukaj').value = ''; $('#kpSzukajPole').classList.remove('ma-tekst');
  $('#kopiuj').classList.remove('pusto');
  renderujListeKopii();
  pokazEkran('kopiuj');
  nui('pobierzDokumenty').then(odp => { if (odp && Array.isArray(odp.lista)) ustawDokumenty(odp.lista); });
  // w przeglądarce symulujemy odpowiedź Lua
  if (!JEST_FIVEM) setTimeout(() => window.postMessage({ akcja: 'dokumenty', lista: MOCK_DOKUMENTY }, '*'), 420);
}

function ustawDokumenty(lista) {
  stanKp.lista = (Array.isArray(lista) ? lista : []).slice(0, 100).map(normalizujDokument).filter(Boolean)
    .sort((a, b) => b.data - a.data);
  stanKp.wczytano = true;
  if (!stanKp.lista.some(d => d.id === stanKp.wybrany)) stanKp.wybrany = stanKp.lista[0]?.id ?? null;
  if (stanKp.filtr !== 'wszystkie' && !stanKp.lista.some(d => d.template === stanKp.filtr)) stanKp.filtr = 'wszystkie';
  const pusto = stanKp.lista.length === 0;
  const kp = $('#kopiuj');
  if (kp.classList.contains('pusto') !== pusto) {
    kp.classList.toggle('pusto', pusto);
    $$('.st', kp).forEach(el => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
  }
  renderujListeKopii();
  renderujPodgladKopii(true);
}

/** Do wyszukiwania: małe litery bez polskich znaków (znak po znaku – długość się nie zmienia) */
const zwin = s => [...s].map(c => (c === 'ł' || c === 'Ł') ? 'l' : c.normalize('NFD')[0].toLowerCase()).join('');

function widoczneDokumenty() {
  const q = zwin(stanKp.szukaj.trim());
  return stanKp.lista.filter(d =>
    (stanKp.filtr === 'wszystkie' || d.template === stanKp.filtr) &&
    (!q || zwin(`${d.title} ${d.name} ${d.tekst} ${szablonWgId(d.template).etykieta}`).includes(q)));
}

/** Podświetla trafienie w tekście (bezpiecznie – reszta jest escapowana) */
function podswietl(tekst) {
  const q = zwin(stanKp.szukaj.trim());
  const i = q ? zwin(tekst).indexOf(q) : -1;
  if (i < 0) return escapeHtml(tekst);
  return escapeHtml(tekst.slice(0, i)) + `<mark>${escapeHtml(tekst.slice(i, i + q.length))}</mark>` + escapeHtml(tekst.slice(i + q.length));
}

function renderujListeKopii() {
  const lista = $('#kpLista');
  $('#kpIle').textContent = stanKp.wczytano ? stanKp.lista.length : '…';

  // chipy: Wszystkie + szablony, które faktycznie występują
  const liczby = {};
  stanKp.lista.forEach(d => { liczby[d.template] = (liczby[d.template] || 0) + 1; });
  $('#kpFiltry').innerHTML = [`<button type="button" class="chip ${stanKp.filtr === 'wszystkie' ? 'aktywny' : ''}" data-filtr="wszystkie">${t('kp_wszystkie')} <span class="n">${stanKp.lista.length}</span></button>`]
    .concat(Config.Szablony.filter(s => liczby[s.id]).map(s =>
      `<button type="button" class="chip ${stanKp.filtr === s.id ? 'aktywny' : ''}" data-filtr="${s.id}" style="--k:${s.kolor}"><span class="kr"></span>${s.etykieta}</button>`)).join('');

  if (!stanKp.wczytano) {
    lista.innerHTML = '<div class="kp-szkielet"></div>'.repeat(4);
    $('#btnKopiuj').disabled = true;
    return;
  }
  const widoczne = widoczneDokumenty();
  if (!widoczne.length) {
    lista.innerHTML = `<div class="kp-brak"><div class="ik">${ikona('lupa', 22, 1.8)}</div><b>${t('kp_brak')}</b>${t('kp_brak_opis')}</div>`;
  } else {
    lista.innerHTML = widoczne.map((d, i) => {
      const s = szablonWgId(d.template), zw = szablonJasny(s);
      return `
      <button type="button" class="dok-karta ${d.id === stanKp.wybrany ? 'wybrany' : ''}" data-id="${escapeHtml(d.id)}" style="--k:${s.kolor};--d:${i}">
        <span class="dok-karta__ikona ${zw ? 'zwykly' : ''}"><span class="pas">${godloSzablonu(s, 11, 2.4, false)}</span><span class="ln"><i></i><i></i><i></i></span></span>
        <span class="dok-karta__info">
          <span class="dok-karta__tytul" style="display:block">${podswietl(d.title || t('bez_tytulu'))}</span>
          <span class="dok-karta__meta">${ikona('kalendarz', 12, 2)}<span>${formatDaty(d.data)}</span><span class="kropka"></span><b>${podswietl(d.name)}</b>${d.images.length ? `<span class="kropka"></span>${ikona('aparat', 12, 2)}<span>${d.images.length}</span>` : ''}</span>
        </span>
        <span class="dok-karta__prawo">
          <span class="dok-karta__szablon">${s.etykieta}</span>
          ${d.signed ? `<span class="odznaka-podpis">${ikona('check', 11, 3)}${t('kp_podpisany')}</span>` : `<span class="odznaka-podpis brak">${t('kp_niepodpisany')}</span>`}
        </span>
      </button>`;
    }).join('');
  }
  $('#btnKopiuj').disabled = !wybranyDokument();
}

const wybranyDokument = () => stanKp.lista.find(d => d.id === stanKp.wybrany) || null;

/** HTML dokumentu z danych – te same klasy co podgląd w edytorze, więc wygląda identycznie */
function htmlDokumentu(d, znakWodny) {
  const s = szablonWgId(d.template), zw = szablonJasny(s);
  const data = `${formatDaty(d.data)}, ${formatGodziny(d.data)}`;
  const zdjecia = d.images.map((z, i) => `
    <div class="foto" style="left:${z.x}px;top:${z.y}px;width:${z.w}px;transform:rotate(${z.rot}deg);z-index:${i + 1}">
      <div class="foto__ramka"><img src="${escapeHtml(z.src)}" alt="" draggable="false"></div>
    </div>`).join('');
  const podpis = d.signed ? `
    <div class="dok__podpis widoczny statyczny"><div>
      <div class="podpis__odreczny">
        <div class="podpis__tekst">${escapeHtml(d.name)}</div>
        <svg class="podpis__zawijas" viewBox="0 0 200 22" preserveAspectRatio="none" fill="none"><path d="M4 14 C 40 22, 90 4, 130 12 S 185 16, 196 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      </div>
      <div class="podpis__linia"></div>
      <div class="podpis__imie">${escapeHtml(d.name)}</div>
      <div class="podpis__data">${t('podpisano', data)}</div>
    </div></div>` : '';
  return `
  <article class="dok ${zw ? 'zwykly' : ''}" style="--kolor-szablonu:${s.kolor}">
    <div class="dok__znak-wodny">${ikona(s.ikona, 300, 1.2)}</div>
    <header class="dok__naglowek">
      <div class="dok__godlo">${godloSzablonu(s, 34, 1.7, false)}</div>
      <div class="dok__organizacja"><div class="dok__nazwa">${escapeHtml(nazwaPaska(s))}</div><div class="dok__pod">${escapeHtml(s.podtytul)}</div></div>
      <div class="dok__meta"><span>${t('nr_dok')}</span><b>${escapeHtml(d.nr)}</b></div>
    </header>
    <div class="dok__cialo">
      <h2 class="dok__tytul">${escapeHtml(d.title || t('bez_tytulu'))}</h2>
      <div class="dok__kreska"></div>
      <div class="dok__info">
        <span>${ikona('kalendarz', 12)}${t('data')} <b>${formatDaty(d.data)}</b></span>
        <span>${ikona('zegar', 12)}${t('godzina')} <b>${formatGodziny(d.data)}</b></span>
        <span>${ikona('pinezka', 12)}<b>${t('miejsce')}</b></span>
      </div>
      <div class="dok__tresc">${d.body /* już zsanityzowane w normalizujDokument */}</div>
      ${podpis}
    </div>
    <div class="dok__warstwa">${zdjecia}</div>
    <div class="dok__kopia ${znakWodny ? 'widoczny' : ''}"><div><span>${t('kopia_podpis')}</span><b>${t('kopia_znak')}</b><span>${escapeHtml(d.nr)}</span></div></div>
  </article>`;
}

function renderujPodgladKopii(animuj) {
  const d = wybranyDokument();
  const ramka = $('#kpRamka');
  $('#kpPodglad').classList.toggle('ukryty', !d && stanKp.wczytano && false);
  if (!d) { $('#kpDok').innerHTML = ''; $('#kpChipNazwa').textContent = '—'; return; }
  const s = szablonWgId(d.template);
  $('#kpDok').innerHTML = htmlDokumentu(d, stanKp.znak);
  $('#kpChipIkona').innerHTML = godloSzablonu(s, 14, 2.2, true);
  $('#kpChipIkona').style.background = s.kolor;
  $('#kpChipNazwa').textContent = s.etykieta;
  if (animuj) { ramka.classList.remove('zmiana'); void ramka.offsetWidth; ramka.classList.add('zmiana'); }
  aktualizujStos();
  skalujKopie();
}

/** Stos kartek za podglądem pokazuje liczbę kopii */
function aktualizujStos() {
  $('#kpStos1').classList.toggle('widoczny', stanKp.kopie >= 2);
  $('#kpStos2').classList.toggle('widoczny', stanKp.kopie >= 3);
  $('#btnKopiujIle').textContent = `×${stanKp.kopie}`;
}

function skalujKopie() {
  const pane = $('#kpPodglad'), dok = $('#kpDok .dok'), ramka = $('#kpRamka');
  if (!pane.clientWidth || !dok) return;
  const wys = Math.max(792, dok.offsetHeight);
  const s = Math.min((pane.clientWidth - 64) / 560, (pane.clientHeight - 58 - 34) / wys, 1);
  dok.style.transform = `scale(${s})`;
  ramka.style.width = `${560 * s}px`;
  ramka.style.height = `${dok.offsetHeight * s}px`;
}

function wybierzDokument(id) {
  if (id === stanKp.wybrany) return;
  stanKp.wybrany = id;
  $$('#kpLista .dok-karta').forEach(k => k.classList.toggle('wybrany', k.dataset.id === id));
  $('#btnKopiuj').disabled = !wybranyDokument();
  renderujPodgladKopii(true);
}

function przelaczZnakWodny(wl = !stanKp.znak) {
  stanKp.znak = wl;
  const b = $('#kpZnak');
  b.classList.toggle('wl', wl);
  b.setAttribute('aria-checked', String(wl));
  const z = $('#kpDok .dok__kopia');
  if (z) z.classList.toggle('widoczny', wl);
}

async function kopiuj() {
  const d = wybranyDokument();
  if (!d || stan.drukuje) return;
  const s = szablonWgId(d.template), kopie = stanKp.kopie, tytul = d.title || t('bez_tytulu');
  const odp = await wyslijWydruk('kopiuj', { id: d.id, kopie, znakWodny: stanKp.znak });
  if (!odp) return;
  animujDruk({
    tryb: 'kopiuj', tytul: t('kopiowanie'), etykieta: t('druk_dokument'), nazwa: `„${tytul}”`, kopie,
    kolor: s.kolor, zwykly: szablonJasny(s), zdjecia: d.images.length > 0, podpis: d.signed, znakKopii: stanKp.znak,
    status: p => p < .22 ? t('kp_s1') : p < .9 ? t('kp_s2', Math.min(kopie, 1 + Math.floor((p - .22) / .68 * kopie)), kopie) : t('druk_s3'),
    koniec: () => poAnimacji(() => {
      pokazToast(t('skopiowano', tytul) + (kopie > 1 ? ` (x${kopie})` : ''), t(kopie > 1 ? 'kopie_ekwN' : 'kopie_ekw1'));
      pokazEkran('kopiuj', true);
    }),
  });
}

/** Strzałki ↑/↓ zmieniają wybrany dokument */
function przesunWybor(kierunek) {
  const w = widoczneDokumenty();
  if (!w.length) return;
  const i = w.findIndex(d => d.id === stanKp.wybrany);
  const nowy = w[ogranicz(i + kierunek, 0, w.length - 1)];
  wybierzDokument(nowy.id);
  const el = $(`#kpLista .dok-karta[data-id="${CSS.escape(nowy.id)}"]`);
  if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function podepnijKopiuj() {
  const szukaj = $('#kpSzukaj');
  szukaj.addEventListener('input', () => {
    stanKp.szukaj = szukaj.value.slice(0, 60);
    $('#kpSzukajPole').classList.toggle('ma-tekst', !!szukaj.value);
    renderujListeKopii();
    const w = widoczneDokumenty();   // podgląd zawsze pokazuje dokument z listy
    if (w.length && !w.some(d => d.id === stanKp.wybrany)) wybierzDokument(w[0].id);
  });
  szukaj.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); przesunWybor(e.key === 'ArrowDown' ? 1 : -1); }
  });
  $('#kpWyczysc').addEventListener('click', () => { szukaj.value = ''; szukaj.dispatchEvent(new Event('input')); szukaj.focus(); });
  $('#kpFiltry').addEventListener('click', e => {
    const c = e.target.closest('[data-filtr]'); if (!c) return;
    stanKp.filtr = c.dataset.filtr;
    renderujListeKopii();
    // gdy wybrany dokument zniknął z listy – wybierz pierwszy widoczny
    const w = widoczneDokumenty();
    if (w.length && !w.some(d => d.id === stanKp.wybrany)) wybierzDokument(w[0].id);
    c.scrollIntoView?.({ inline: 'nearest', block: 'nearest' });
  });
  $('#kpLista').addEventListener('click', e => {
    const k = e.target.closest('.dok-karta'); if (k) wybierzDokument(k.dataset.id);
  });
  $('#kpKopieMax').textContent = t('kp_max', Config.Kopiuj.maxKopii);
  podepnijStepper($('#kpStepper'), () => stanKp.kopie, n => { stanKp.kopie = n; aktualizujStos(); }, () => Config.Kopiuj.maxKopii);
  $('#kpZnak').addEventListener('click', () => przelaczZnakWodny());
  przelaczZnakWodny(stanKp.znak);
  $('#btnKopiuj').addEventListener('click', kopiuj);
  $('#btnPustoStworz').addEventListener('click', () => pokazEkran('szablony'));
}

/* =================================================================
   EKRAN 6 – ZDJĘCIE (tylko druk fotografii)
   crop = { x, y, zoom }: x/y = środek kadru w ułamkach zdjęcia (0..1), zoom ≥ 1 względem "cover"
   ================================================================= */
const PRZYKLADOWE_FOTO = 'data:image/jpeg;base64,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';

const stanZd = {
  src: null, iw: 0, ih: 0,
  format: Config.DrukZdjec.domyslnyFormat,
  podpis: '',
  kopie: 1,
  crop: { x: .5, y: .5, zoom: 1 },
};
const formatZd = () => Config.DrukZdjec.Formaty.find(f => f.id === stanZd.format) || Config.DrukZdjec.Formaty[0];

function otworzZdjecie() {
  pokazEkran('zdjecie');
}

function paraProporcji(p) {
  if (Array.isArray(p)) return [Number(p[0]) || 1, Number(p[1]) || 1];
  if (p && typeof p === 'object') {
    return [Number(p[1] ?? p['1'] ?? p.w) || 1, Number(p[2] ?? p['2'] ?? p.h) || 1];
  }
  return [1, 1];
}

function listaFormatow() {
  const surowe = Config.DrukZdjec && Config.DrukZdjec.Formaty;
  const lista = Array.isArray(surowe)
    ? surowe
    : (surowe && typeof surowe === 'object'
      ? Object.keys(surowe).sort((a, b) => Number(a) - Number(b)).map(k => surowe[k])
      : []);
  return lista.filter(f => f && f.id).map(f => ({
    id: String(f.id),
    nazwa: typeof f.nazwa === 'string' ? f.nazwa : '',
    proporcja: paraProporcji(f.proporcja),
    polaroid: f.polaroid === true,
  }));
}

function nazwaFormatu(f) {
  if (!f) return '';
  if (f.nazwa) return f.nazwa;
  const klucz = 'fmt_' + f.id;
  const tlum = t(klucz);
  return tlum === klucz ? f.id : tlum;
}

function renderujFormaty() {
  const el = $('#zdFormaty');
  if (!el) return;
  const formaty = listaFormatow();
  Config.DrukZdjec.Formaty = formaty;
  $$('.segment', el).forEach(b => b.remove());
  el.style.setProperty('--ile', String(Math.max(formaty.length, 1)));
  el.insertAdjacentHTML('beforeend', formaty.map(f => {
    const [w, h] = f.proporcja, k = 20 / Math.max(w, h);
    const wym = f.polaroid ? 'width:17px;height:21px' : `width:${Math.round(w * k)}px;height:${Math.round(h * k)}px`;
    return `<button type="button" class="segment" role="radio" data-format="${escapeHtml(f.id)}"><span class="ksztalt ${f.polaroid ? 'polaroid' : ''}"><i style="${wym}"></i></span>${escapeHtml(nazwaFormatu(f))}</button>`;
  }).join(''));
  if (!el.dataset.podepiete) {
    el.dataset.podepiete = '1';
    el.addEventListener('click', e => { const b = e.target.closest('[data-format]'); if (b) ustawFormat(b.dataset.format); });
  }
  ustawFormat(stanZd.format || Config.DrukZdjec.domyslnyFormat);
}

function ustawFormat(id) {
  const f = Config.DrukZdjec.Formaty.find(x => x.id === id) || Config.DrukZdjec.Formaty[0];
  if (!f) return;
  stanZd.format = f.id;
  const i = Config.DrukZdjec.Formaty.indexOf(f);
  $$('#zdFormaty .segment').forEach(b => { const ak = b.dataset.format === f.id; b.classList.toggle('aktywny', ak); b.setAttribute('aria-checked', String(ak)); });
  const tlo = $('#zdFormaty .segmenty__tlo');
  tlo.style.width = `calc((100% - 20px) / ${Config.DrukZdjec.Formaty.length})`;
  tlo.style.transform = `translateX(calc(${i} * (100% + 4px)))`;
  $('#zdFormatOpis').textContent = `${f.proporcja[0]} : ${f.proporcja[1]}`;
  const chip = $('#zdChip');
  if (chip) chip.textContent = `${nazwaFormatu(f)} · ${f.proporcja[0]}:${f.proporcja[1]}`;
  $('#zdOdbitka').classList.toggle('polaroid', !!f.polaroid);
  odswiezPodpisZdjecia();
  dopasujOdbitke(true);
}

/** Rozmiar okna zdjęcia zależy od formatu i miejsca w podglądzie */
function dopasujOdbitke(animuj) {
  const pane = $('#zdPodglad'), okno = $('#zdOkno');
  if (!pane.clientWidth) return;
  const f = formatZd(), [pw, ph] = f.proporcja, r = pw / ph;
  let W, H;
  if (f.polaroid) { W = H = 360; }
  else { H = Math.min(400, 500 / r); W = H * r; }
  const ramka = f.polaroid ? 18 * 2 : 32, dol = f.polaroid ? 84 - 18 : (stanZd.podpis ? 50 - 16 : 0);
  const dostH = pane.clientHeight - 54 - 8 - 80 - 24, dostW = pane.clientWidth - 80;
  const k = Math.min(1, dostH / (H + ramka + dol), dostW / (W + ramka));
  okno.style.width = `${Math.round(W * k)}px`;
  okno.style.height = `${Math.round(H * k)}px`;
  // podczas animacji rozmiaru okna przeliczamy położenie zdjęcia w każdej klatce
  const koniec = performance.now() + (animuj ? 520 : 0);
  const klatka = () => { ulozZdjecie(); if (performance.now() < koniec) requestAnimationFrame(klatka); };
  klatka();
}

function ulozZdjecie() {
  if (!stanZd.src) return;
  const okno = $('#zdOkno'), img = $('#zdImg'), c = stanZd.crop;
  const W = okno.clientWidth, H = okno.clientHeight;
  const s = Math.max(W / stanZd.iw, H / stanZd.ih) * c.zoom;
  const dw = stanZd.iw * s, dh = stanZd.ih * s;
  // środek kadru ograniczony tak, by nie wyjść poza zdjęcie
  const mx = W / (2 * dw), my = H / (2 * dh);
  c.x = ogranicz(c.x, mx, 1 - mx);
  c.y = ogranicz(c.y, my, 1 - my);
  img.style.width = `${dw}px`;
  img.style.height = `${dh}px`;
  img.style.transform = `translate(${W / 2 - c.x * dw}px, ${H / 2 - c.y * dh}px)`;
  odswiezSkaleOdbitki();
}

/** Cała odbitka rośnie razem z zoomem – samo kadrowanie w środku okna tego nie pokazuje. */
function odswiezSkaleOdbitki() {
  const el = $('#zdOdbitka');
  if (!el) return;
  const z = stanZd.src ? Math.min(stanZd.crop.zoom || 1, 2.4) : 1;
  el.style.transformOrigin = 'center center';
  el.style.transform = `rotate(-1.2deg) scale(${z})`;
}

/** Zoom z zachowaniem punktu pod kursorem (px, py – współrzędne w oknie) */
function ustawZoom(nowy, px, py) {
  if (!stanZd.src) return;
  const okno = $('#zdOkno'), c = stanZd.crop;
  const W = okno.clientWidth, H = okno.clientHeight;
  if (px == null) { px = W / 2; py = H / 2; }
  const s0 = Math.max(W / stanZd.iw, H / stanZd.ih);
  const dw = stanZd.iw * s0 * c.zoom, dh = stanZd.ih * s0 * c.zoom;
  const ix = c.x + (px - W / 2) / dw, iy = c.y + (py - H / 2) / dh;
  c.zoom = ogranicz(nowy, 1, Config.DrukZdjec.maxZoom);
  const dw2 = stanZd.iw * s0 * c.zoom, dh2 = stanZd.ih * s0 * c.zoom;
  c.x = ix - (px - W / 2) / dw2;
  c.y = iy - (py - H / 2) / dh2;
  ulozZdjecie();
  odswiezZoomUI();
}
function odswiezZoomUI() {
  const z = Math.round(stanZd.crop.zoom * 100);
  $('#zdZoom').value = z;
  $('#zdZoomWartosc').textContent = `${z}%`;
}

function pokazBladZd(klucz) {
  const w = $('#zdUrlPole');
  w.classList.remove('blad'); void w.offsetWidth; w.classList.add('blad');
  $('#zdBlad').innerHTML = `<div class="komunikat-bledu">${ikona('blad', 14, 2)}<span>${t(klucz)}</span></div>`;
}
function wyczyscBladZd() { $('#zdUrlPole').classList.remove('blad'); $('#zdBlad').innerHTML = ''; }

function wczytajZdjecieZUrl() {
  const url = bezpiecznySrc(wyciagnijUrl($('#zdUrl').value) || $('#zdUrl').value.trim());
  if (!url) return pokazBladZd('blad_url');
  $('#zdUrl').value = url;
  ustawZdjecie(url);
}

function tekstSchowka(cd) {
  if (!cd) return '';
  return cd.getData('text/plain') || cd.getData('text') || cd.getData('text/uri-list') || '';
}

function wklejZdjecieZeZdarzenia(e) {
  if (stan.ekran !== 'zdjecie') return;
  if (e.target && e.target.id === 'zdPodpis') return;
  const cd = e.clipboardData;
  const url = wyciagnijUrl(tekstSchowka(cd));
  if (url) {
    e.preventDefault();
    $('#zdUrl').value = url;
    wczytajZdjecieZUrl();
    return;
  }
  const pozycje = cd && cd.items ? Array.from(cd.items) : [];
  if (pozycje.some(it => it.kind === 'file' && /^image\//i.test(it.type))) {
    e.preventDefault();
    pokazBladZd('blad_plik');
  }
}

function hostDiscorda(url) {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return h === 'discord.com' || h.endsWith('.discord.com')
      || h.endsWith('.discordapp.com') || h.endsWith('.discordapp.net');
  } catch { return false; }
}

/** Gra często blokuje Discorda w oknie NUI. Wtedy plik ściąga serwer i oddaje podgląd. */
function zaladujDoImg(img, url, onOk, onBlad) {
  odswiezFivem();
  const surowe = String(url || '');
  const adres = surowe.startsWith('data:image/') ? surowe : bezpiecznySrc(surowe);
  if (!img || !adres) { if (onBlad) onBlad(); return; }
  img.dataset.nbRecznie = '1';
  img.referrerPolicy = 'no-referrer';
  let skonczone = false;
  let idzieSerwer = false;
  const sukces = () => { if (skonczone) return; skonczone = true; if (onOk) onOk(img); };
  const porazka = () => { if (skonczone) return; skonczone = true; if (onBlad) onBlad(); };
  const przezSerwer = async () => {
    if (idzieSerwer || adres.startsWith('data:')) { if (!idzieSerwer) porazka(); return; }
    idzieSerwer = true;
    const odp = await nui('pobierzObraz', { url: adres });
    const dane = odp && odp.dane;
    if (skonczone) return;
    if (!odp || odp.ok !== true || typeof dane !== 'string' || !dane.startsWith('data:image/')) {
      porazka();
      return;
    }
    img.onload = sukces;
    img.onerror = porazka;
    img.src = dane;
  };
  if (!adres.startsWith('data:') && JEST_FIVEM && hostDiscorda(adres)) {
    przezSerwer();
    return;
  }
  img.onload = sukces;
  img.onerror = () => { przezSerwer(); };
  img.src = adres;
}

window.addEventListener('error', e => {
  const img = e.target;
  if (!img || img.tagName !== 'IMG' || img.dataset.nbRecznie || img.dataset.nbProxy) return;
  const url = img.getAttribute('src') || '';
  if (!/^https?:\/\//i.test(url) || !bezpiecznySrc(url)) return;
  img.dataset.nbProxy = '1';
  nui('pobierzObraz', { url }).then(odp => {
    if (odp && odp.ok === true && typeof odp.dane === 'string' && odp.dane.startsWith('data:image/')) img.src = odp.dane;
  });
}, true);

function ustawZdjecie(src) {
  const okno = $('#zdOkno');
  const pusty = okno.querySelector('.zd-pusto span:last-child');
  if (pusty) pusty.textContent = t('zd_wczytywanie');
  okno.classList.add('wczytywanie');
  wyczyscBladZd();
  zaladujDoImg($('#zdImg'), src, img => {
    okno.classList.remove('wczytywanie');
    if (pusty) pusty.textContent = t('zd_pusto');
    wyczyscBladZd();
    stanZd.src = String(src).startsWith('data:') ? src : (bezpiecznySrc(src) || src);
    stanZd.iw = img.naturalWidth; stanZd.ih = img.naturalHeight;
    stanZd.crop = { x: .5, y: .5, zoom: 1 };
    okno.classList.remove('ma-zdjecie');
    void okno.offsetWidth;
    okno.classList.add('ma-zdjecie');
    $('#zdNarzedzia').classList.remove('nieaktywne');
    $('#zdZoom').max = Config.DrukZdjec.maxZoom * 100;
    ulozZdjecie(); odswiezZoomUI();
    $('#btnDrukujZdjecie').disabled = false;
  }, () => {
    okno.classList.remove('wczytywanie', 'ma-zdjecie');
    if (pusty) pusty.textContent = t('zd_pusto');
    $('#zdNarzedzia').classList.add('nieaktywne');
    $('#btnDrukujZdjecie').disabled = true;
    pokazBladZd('blad_wczyt');
  });
}

function odswiezPodpisZdjecia() {
  const p = stanZd.podpis.trim(), el = $('#zdPodpisNaZdjeciu'), f = formatZd();
  el.textContent = p || (f.polaroid ? t('zd_podpis_puste') : '');
  el.classList.toggle('puste', !p);
  const przed = $('#zdOdbitka').classList.contains('z-podpisem');
  $('#zdOdbitka').classList.toggle('z-podpisem', !!p);
  $('#zdPodpisLicznik').textContent = `${stanZd.podpis.length} / ${Config.DrukZdjec.maxPodpis}`;
  ustawKlaseLicznika($('#zdPodpisLicznik'), stanZd.podpis.length, Config.DrukZdjec.maxPodpis);
  if (przed !== !!p && !f.polaroid) dopasujOdbitke(true);
}

function podepnijKadrowanie() {
  const okno = $('#zdOkno');
  okno.addEventListener('pointerdown', e => {
    if (!stanZd.src || e.button !== 0) return;
    e.preventDefault();
    const c = stanZd.crop, start = { px: e.clientX, py: e.clientY, x: c.x, y: c.y };
    const s = Math.max(okno.clientWidth / stanZd.iw, okno.clientHeight / stanZd.ih) * c.zoom;
    const dw = stanZd.iw * s, dh = stanZd.ih * s;
    okno.setPointerCapture(e.pointerId);
    okno.classList.add('przeciaganie');
    const ruch = ev => { c.x = start.x - (ev.clientX - start.px) / dw; c.y = start.y - (ev.clientY - start.py) / dh; ulozZdjecie(); };
    const koniec = () => { okno.classList.remove('przeciaganie'); okno.removeEventListener('pointermove', ruch); okno.removeEventListener('pointerup', koniec); okno.removeEventListener('pointercancel', koniec); };
    okno.addEventListener('pointermove', ruch);
    okno.addEventListener('pointerup', koniec);
    okno.addEventListener('pointercancel', koniec);
  });
  let zoomTimer = null;
  okno.addEventListener('wheel', e => {
    if (!stanZd.src || e.__nbKolo) return;
    const kier = kierunekKola(e);
    if (!kier) return;
    e.__nbKolo = true;
    e.preventDefault();
    const r = okno.getBoundingClientRect();
    ustawZoom(stanZd.crop.zoom * (kier > 0 ? 1.18 : 1 / 1.18), e.clientX - r.left, e.clientY - r.top);
    okno.classList.add('zoomuje'); clearTimeout(zoomTimer);
    zoomTimer = setTimeout(() => okno.classList.remove('zoomuje'), 500);
  }, { passive: false });
  okno.addEventListener('dblclick', () => { stanZd.crop = { x: .5, y: .5, zoom: 1 }; ulozZdjecie(); odswiezZoomUI(); });
  $('#zdZoom').addEventListener('input', e => ustawZoom(Number(e.target.value) / 100));
  $$('#zdNarzedzia [data-zoom]').forEach(b => b.addEventListener('click', () => ustawZoom(stanZd.crop.zoom * (b.dataset.zoom === '1' ? 1.2 : 1 / 1.2))));
  $('#zdReset').addEventListener('click', () => { stanZd.crop = { x: .5, y: .5, zoom: 1 }; ulozZdjecie(); odswiezZoomUI(); });
}

function podepnijZdjecie() {
  $('#zdWczytaj').addEventListener('click', wczytajZdjecieZUrl);
  renderujFormaty();
  podepnijKadrowanie();
  $('#zdWklej').addEventListener('click', async () => {
    try {
      const tekst = await navigator.clipboard.readText();
      const url = wyciagnijUrl(tekst) || String(tekst || '').trim();
      if (!url) { $('#zdUrl').focus(); return pokazBladZd('blad_url'); }
      $('#zdUrl').value = url;
      wczytajZdjecieZUrl();
    } catch { $('#zdUrl').focus(); pokazBladZd('blad_url'); }
  });
  $('#zdUrl').addEventListener('keydown', e => { if (e.key === 'Enter') wczytajZdjecieZUrl(); });
  $('#zdUrl').addEventListener('input', wyczyscBladZd);
  $('#zdOkno').addEventListener('click', () => { if (!stanZd.src) $('#zdUrl').focus(); });
  document.addEventListener('paste', wklejZdjecieZeZdarzenia);
  $('#zdPrzykladowe').addEventListener('click', () => { $('#zdUrl').value = ''; ustawZdjecie(PRZYKLADOWE_FOTO); });
  const inP = $('#zdPodpis');
  inP.maxLength = Config.DrukZdjec.maxPodpis;
  inP.addEventListener('input', () => { stanZd.podpis = inP.value; odswiezPodpisZdjecia(); });
  $('#zdKopieOpis').textContent = t('zd_kopie_opis');
  stanZd.odswiezKopie = podepnijStepper($('#zdStepper'), () => stanZd.kopie, n => { stanZd.kopie = n; }, () => Config.DrukZdjec.maxKopii);
  odswiezPodpisZdjecia();
  $('#btnDrukujZdjecie').addEventListener('click', drukujZdjecie);
}

async function drukujZdjecie() {
  if (!stanZd.src || stan.drukuje) return;
  const f = formatZd(), [pw, ph] = f.proporcja, kopie = stanZd.kopie, podpis = stanZd.podpis.trim();
  // miniatura odbitki wysuwająca się z drukarki – ten sam kadr co w podglądzie
  const Wm = Math.round(Math.min(104, 118 * pw / ph)), Hm = Math.round(Wm * ph / pw);
  const el = $('#diZdjecie');
  el.style.width = `${Wm + 14}px`; el.style.marginLeft = `${-(Wm + 14) / 2}px`;
  el.classList.toggle('polaroid', !!f.polaroid);
  const ob = $('#diZdjecieObraz');
  ob.style.aspectRatio = `${pw} / ${ph}`;
  const c = stanZd.crop, s = Math.max(Wm / stanZd.iw, Hm / stanZd.ih) * c.zoom, dw = stanZd.iw * s, dh = stanZd.ih * s;
  ob.innerHTML = '<img alt="" style="position:absolute;left:0;top:0;max-width:none">';
  const img = $('img', ob);
  img.src = $('#zdImg').currentSrc || stanZd.src;
  Object.assign(img.style, { width: `${dw}px`, height: `${dh}px`, transform: `translate(${Wm / 2 - c.x * dw}px, ${Hm / 2 - c.y * dh}px)` });
  $('#diZdjecieNapis').textContent = f.polaroid ? podpis : '';

  const odp = await wyslijWydruk('drukujZdjecie', {
    src: stanZd.src, format: f.id, podpis, kopie,
    crop: { x: +c.x.toFixed(4), y: +c.y.toFixed(4), zoom: +c.zoom.toFixed(3) },
  });
  if (!odp) return;
  animujDruk({
    tryb: 'zdjecie', tytul: t('druk_zdjecie_tytul'), etykieta: t('druk_zdjecie'),
    nazwa: `${nazwaFormatu(f)} · ${podpis ? `„${podpis}”` : t('bez_podpisu')}`, kopie,
    status: p => t(p < .3 ? 'zd_s1' : p < .82 ? 'zd_s2' : 'zd_s3'),
    koniec: () => poAnimacji(() => {
      pokazToast((podpis ? `${t('wydrukowano_zdj')}: ${podpis}` : t('wydrukowano_zdj')) + (kopie > 1 ? ` (x${kopie})` : ''), t(kopie > 1 ? 'zdj_ekwN' : 'zdj_ekw1'));
      resetujZdjecie();
      pokazEkran('menu', true);
    }),
  });
}

function resetujZdjecie() {
  stanZd.src = null; stanZd.podpis = ''; stanZd.kopie = 1; stanZd.crop = { x: .5, y: .5, zoom: 1 };
  $('#zdUrl').value = ''; $('#zdPodpis').value = '';
  $('#zdOkno').classList.remove('ma-zdjecie'); $('#zdImg').removeAttribute('src');
  odswiezSkaleOdbitki();
  $('#zdNarzedzia').classList.add('nieaktywne');
  $('#btnDrukujZdjecie').disabled = true;
  stanZd.odswiezKopie();
  ustawFormat(Config.DrukZdjec.domyslnyFormat);
  odswiezZoomUI();
}

/* =================================================================
   ZDARZENIA
   ================================================================= */
function podepnijZdarzenia() {
  $('#podpowiedz').addEventListener('click', () => otworz());
  $('#btnZamknij').addEventListener('click', () => zamknij());
  $$('[data-akcja="wstecz"]').forEach(b => b.addEventListener('click', wstecz));

  const inTytul = $('#inTytul');
  inTytul.maxLength = Config.MaksTytul;
  inTytul.addEventListener('input', () => { stan.tytul = inTytul.value; aktualizujDokument(); });
  podepnijEdytorTresci();

  $('#btnPodpis').addEventListener('click', () => przelaczPodpis());
  $('#btnDodajZdjecie').addEventListener('click', dodajZdjecieZUrl);
  $('#inZdjecie').addEventListener('keydown', e => { if (e.key === 'Enter') dodajZdjecieZUrl(); });
  $('#inZdjecie').addEventListener('input', wyczyscBladZdjecia);
  $('#btnPrzykladowe').addEventListener('click', wstawPrzykladowe);
  // miniatury: klik = zaznacz, × = usuń, pusty slot = fokus na pole URL
  $('#listaZdjec').addEventListener('click', e => {
    const usun = e.target.closest('[data-usun]');
    if (usun) return usunZdjecie(Number(usun.dataset.usun));
    if (e.target.closest('[data-pusta]')) return $('#inZdjecie').focus();
    const m = e.target.closest('.miniatura[data-id]');
    if (m) zaznacz(Number(m.dataset.id));
  });
  // pasek narzędzi zdjęcia
  $$('#pasekFoto [data-foto]').forEach(b => b.addEventListener('click', () => akcjaZdjecia(b.dataset.foto)));
  // klik w puste miejsce kartki / podglądu = odznacz
  $('#podglad').addEventListener('pointerdown', e => { if (!e.target.closest('.foto, .pasek-foto')) odznacz(); });
  $('#btnDrukuj').addEventListener('click', drukuj);

  // Klawiatura: E otwiera (tylko podgląd), ESC cofa / zamyka
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && stan.otwarte) {
      e.preventDefault();
      if (stan.ekran === 'edytor' && stan.zaznaczone !== null) return odznacz();   // najpierw odznacz zdjęcie
      if (stan.ekran === 'kopiuj' && $('#kpSzukaj').value) { $('#kpWyczysc').click(); $('#kpSzukaj').blur(); return; }   // najpierw wyczyść wyszukiwanie
      wstecz(); return;
    }
    // Delete usuwa zaznaczone zdjęcie (gdy nie piszemy w polu)
    const wPolu = e.target.closest && e.target.closest('input, textarea, [contenteditable="true"]');
    if (stan.ekran === 'edytor' && stan.zaznaczone !== null && !wPolu && (e.key === 'Delete' || e.key === 'Backspace')) {
      e.preventDefault(); return akcjaZdjecia('usun');
    }
    // ↑/↓ na liście dokumentów (Kopiuj)
    if (stan.otwarte && stan.ekran === 'kopiuj' && !wPolu && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault(); return przesunWybor(e.key === 'ArrowDown' ? 1 : -1);
    }
    if (!stan.otwarte && !JEST_FIVEM && (e.key === 'e' || e.key === 'E')) otworz();
  });

  // Wiadomości z Lua: SendNUIMessage({ akcja = 'otworz', imie = 'Jan Kowalski' })
  window.addEventListener('message', e => {
    const d = e.data || {};
    if (d.akcja === 'ustawienia') zastosujUstawienia(d);
    else if (d.akcja === 'otworz') { odswiezFivem(); ukryjPrzykladowe(); otworz(d.imie, d); }
    else if (d.akcja === 'zamknij') zamknij(true);
    else if (d.akcja === 'dokumenty') ustawDokumenty(d.lista);
    else if (d.akcja === 'podglad') otworzPodgladPrzedmiotu(d);
    else if (d.akcja === 'papier') ustawPapier(d.ilosc);
  });

  window.addEventListener('resize', () => { skalujKartke(); skalujKopie(); dopasujOdbitke(false); skalujCzytanie(); });
  podepnijKopiuj();
  try { podepnijZdjecie(); } catch (err) { console.warn('[nb_printer] zdjecie', err); }
}


function ukryjPrzykladowe() {
  odswiezFivem();
  const pokaz = !JEST_FIVEM && Config.Przykladowe !== false;
  ['#btnPrzykladowe', '#zdPrzykladowe'].forEach(sel => {
    const el = $(sel);
    if (!el) return;
    el.classList.toggle('ukryty', !pokaz);
    el.style.display = pokaz ? '' : 'none';
  });
}

/** Lua nadpisuje kolory, teksty, limity i szablony. Wygląd domyślny zostaje, dopóki config go nie zmieni. */
function zastosujWyglad(w) {
  if (!w || typeof w !== 'object') return;
  const mapa = {
    akcent: '--akcent', akcentCiemny: '--akcent-ciemny', akcentJasny: '--akcent-jasny',
    tlo: '--tlo', tekst: '--tekst', granat: '--granat',
  };
  Object.entries(mapa).forEach(([k, css]) => { if (w[k]) document.documentElement.style.setProperty(css, w[k]); });
  // promien = zaokrąglenia w środku (domyślnie 16px). zaokraglenie = róg całego panelu (domyślnie 22px w CSS).
  if (w.promien) document.documentElement.style.setProperty('--promien', w.promien);
  if (w.zaokraglenie) {
    const panel = document.querySelector('.panel');
    if (panel) panel.style.borderRadius = w.zaokraglenie;
  }
  if (w.nazwa) Config.Marka = String(w.nazwa);
  if (w.podtytul) {
    const lang = Config.Jezyk || 'en';
    (Locales[lang] || Locales.en).marka_pod = String(w.podtytul);
  }
  if (typeof w.logo === 'string') Config.LogoUrl = w.logo;
  if (w.logo === false || w.logoWlaczone === false) Config.LogoWlaczone = false;
  else if (w.logoWlaczone === true) Config.LogoWlaczone = true;
}

function zastosujUstawienia(d) {
  if (!d || typeof d !== 'object') return;
  if (d.Jezyk) Config.Jezyk = d.Jezyk;
  ['Marka', 'MaksTytul', 'MaksZnakow', 'CzasDruku', 'CzasPowiadomienia', 'Toner', 'LogoUrl', 'LogoWlaczone', 'BlokujBase64', 'Przykladowe'].forEach(k => {
    if (d[k] !== undefined) Config[k] = d[k];
  });
  if (d.Zdjecie) Config.Zdjecie = Object.assign({}, Config.Zdjecie, d.Zdjecie);
  if (Array.isArray(d.KoloryTekstu)) Config.KoloryTekstu = d.KoloryTekstu;
  if (Array.isArray(d.Tryby)) Config.Tryby = d.Tryby;
  if (Array.isArray(d.Katalog)) Config.Katalog = d.Katalog;
  if (d.Kopiuj) Config.Kopiuj = Object.assign({}, Config.Kopiuj, d.Kopiuj);
  if (d.DrukZdjec) Config.DrukZdjec = Object.assign({}, Config.DrukZdjec, d.DrukZdjec);
  if (Array.isArray(d.Szablony)) Config.Szablony = d.Szablony;
  if (Array.isArray(d.Domeny)) Config.Domeny = d.Domeny;
  if (Array.isArray(d.Rozszerzenia) && d.Rozszerzenia.length) {
    const ext = [...new Set(d.Rozszerzenia.map(e => (e === 'jpg' || e === 'jpeg') ? 'jpe?g' : String(e).replace(/[^a-z0-9]/gi, '')))].filter(Boolean).join('|');
    if (ext) WZOR_OBRAZU = new RegExp('^https?:\\/\\/\\S+\\.(' + ext + ')(\\?\\S*)?$', 'i');
  }
  if (d.teksty && typeof d.teksty === 'object') {
    const lang = Config.Jezyk || 'en';
    Locales[lang] = Object.assign({}, Locales[lang] || Locales.en, d.teksty);
  }
  if (d.wyglad) zastosujWyglad(d.wyglad);
  if (typeof d.papier === 'number') Config.Papier = d.papier;
  zastosujTlumaczenia();
  wstawLoga();
  const nazwa = $('#markaNazwa'); if (nazwa) nazwa.textContent = Config.Marka;
  renderujPalete();
  renderujMenu();
  renderujSzablony();
  if ($('#zdFormaty')) renderujFormaty();
  const tytul = $('#inTytul'); if (tytul) tytul.maxLength = Config.MaksTytul;
  const podpis = $('#zdPodpis'); if (podpis) podpis.maxLength = Config.DrukZdjec.maxPodpis;
  const km = $('#kpKopieMax'); if (km) km.textContent = t('kp_max', Config.Kopiuj.maxKopii);
  ukryjPrzykladowe();
  const opis = $('#podpisOpis'); if (opis) opis.textContent = t('podpis_opis', stan.imie);
}

function skalujCzytanie() {
  if (stan.ekran !== 'czytanie') return;
  const foto = $('#czytanieFoto');
  if (foto && !foto.classList.contains('ukryty')) { ulozCzytanieFoto(); return; }
  const pane = $('#czytanieWidok'), dok = $('#czytanieDok .dok'), ramka = $('#czytanieRamka');
  if (!dok || !ramka) return;
  const z = stan.czytanieZoom || 1;
  ramka.style.transform = 'none';
  dok.style.transform = 'none';
  dok.style.zoom = '1';
  const wys = Math.max(792, dok.offsetHeight || dok.scrollHeight || 792);
  const szerPane = Math.max((pane && pane.clientWidth) || 0, window.innerWidth || 0, 320);
  const wysPane = Math.max((pane && pane.clientHeight) || 0, window.innerHeight || 0, 320);
  const bazowy = Math.min((szerPane - 64) / 560, (wysPane - 160) / wys, 1);
  const s = bazowy > 0.05 ? bazowy : 1;
  dok.style.transformOrigin = 'top left';
  dok.style.transform = 'scale(' + s + ')';
  ramka.style.width = Math.round(560 * s) + 'px';
  ramka.style.height = Math.round(wys * s) + 'px';
  ramka.style.transformOrigin = 'center center';
  ramka.style.transform = 'scale(' + z + ')';
}

function pokazCzytanieDokumentu(surowe) {
  const widok = $('#czytanieWidok');
  widok.classList.remove('zd-podglad');
  $('#czytanieScena').classList.remove('ukryty');
  $('#czytanieFoto').classList.add('ukryty');
  const d = normalizujDokument(surowe || {}, 0);
  const znak = !!(surowe && (surowe.znakWodny || (surowe.kopia && surowe.znakWodny !== false)));
  if (!d) { $('#czytanieDok').innerHTML = ''; return; }
  const s = szablonWgId(d.template);
  $('#czytanieDok').innerHTML = htmlDokumentu(d, znak);
  $('#czytanieChipIkona').innerHTML = godloSzablonu(s, 14, 2.2, true);
  $('#czytanieChipIkona').style.background = s.kolor;
  $('#czytanieChipNazwa').textContent = s.etykieta;
  requestAnimationFrame(skalujCzytanie);
}

function ulozCzytanieFoto() {
  const meta = stan.czytanieFoto;
  const okno = $('#czytanieOkno'), img = $('#czytanieImg');
  if (!meta || !okno || !img || !meta.iw) return;
  const f = Config.DrukZdjec.Formaty.find(x => x.id === meta.format) || Config.DrukZdjec.Formaty[0];
  const pane = $('#czytanieWidok');
  const [pw, ph] = f.proporcja, r = pw / ph;
  let W, H;
  if (f.polaroid) W = H = 360;
  else { H = Math.min(400, 500 / r); W = H * r; }
  const ramka = f.polaroid ? 36 : 32;
  const dol = f.polaroid ? 66 : (meta.podpis ? 34 : 0);
  const dostH = Math.max(160, pane.clientHeight - 54 - 8 - 80 - 24);
  const dostW = Math.max(160, pane.clientWidth - 80);
  const bazowy = Math.min(1, dostH / (H + ramka + dol), dostW / (W + ramka));
  const k = bazowy;
  const ow = Math.round(W * k);
  const oh = Math.round(H * k);
  okno.style.width = ow + 'px';
  okno.style.height = oh + 'px';
  const c = meta.crop || { x: .5, y: .5, zoom: 1 };
  const s = Math.max(ow / meta.iw, oh / meta.ih) * (Number(c.zoom) || 1);
  const dw = meta.iw * s, dh = meta.ih * s;
  img.style.width = dw + 'px';
  img.style.height = dh + 'px';
  img.style.transform = 'translate(' + (ow / 2 - (Number(c.x) || .5) * dw) + 'px, ' + (oh / 2 - (Number(c.y) || .5) * dh) + 'px)';
}

function pokazCzytanieZdjecia(surowe) {
  const src = bezpiecznySrc(surowe && surowe.src);
  const widok = $('#czytanieWidok');
  widok.classList.add('zd-podglad');
  $('#czytanieScena').classList.add('ukryty');
  $('#czytanieFoto').classList.remove('ukryty');
  const f = Config.DrukZdjec.Formaty.find(x => x.id === (surowe && surowe.format)) || Config.DrukZdjec.Formaty[0];
  const podpis = String((surowe && surowe.podpis) || '').slice(0, Config.DrukZdjec.maxPodpis);
  $('#czytanieOdbitka').classList.toggle('polaroid', !!f.polaroid);
  $('#czytanieOdbitka').classList.toggle('z-podpisem', !!podpis);
  const napis = $('#czytanieNapis');
  napis.textContent = podpis || (f.polaroid ? t('zd_podpis_puste') : '');
  napis.classList.toggle('puste', !podpis);
  $('#czytanieChipIkona').innerHTML = ikona('aparat', 11, 2.2);
  $('#czytanieChipIkona').style.background = 'var(--akcent)';
  $('#czytanieChipNazwa').textContent = nazwaFormatu(f);
  const img = $('#czytanieImg');
  const okno = $('#czytanieOkno');
  okno.style.pointerEvents = 'none';
  stan.czytanieFoto = { src, format: f.id, podpis, crop: (surowe && surowe.crop) || { x: .5, y: .5, zoom: 1 }, iw: 0, ih: 0 };
  if (!src) { img.removeAttribute('src'); return; }
  zaladujDoImg(img, src, () => {
    stan.czytanieFoto.iw = img.naturalWidth || 1;
    stan.czytanieFoto.ih = img.naturalHeight || 1;
    ulozCzytanieFoto();
    odswiezZoomPodgladu();
  }, () => {});
  requestAnimationFrame(ulozCzytanieFoto);
}

function odswiezZoomPodgladu() {
  const z = stan.czytanieZoom || 1;
  const el = $('#czytanieZoomWartosc');
  if (el) el.textContent = Math.round(z * 100) + '%';
  if (stan.ekran !== 'czytanie') return;
  const foto = $('#czytanieFoto');
  const fotoWidoczne = foto && !foto.classList.contains('ukryty');
  if (fotoWidoczne) {
    const odbitka = $('#czytanieOdbitka');
    if (odbitka) {
      odbitka.style.transformOrigin = 'center center';
      odbitka.style.transform = 'rotate(-1.2deg) scale(' + z + ')';
    }
    if (stan.czytanieFoto && stan.czytanieFoto.iw) ulozCzytanieFoto();
  } else skalujCzytanie();
}

function zmienZoomPodgladu(mnoznik) {
  const teraz = stan.czytanieZoom || 1;
  stan.czytanieZoom = Math.min(4, Math.max(0.4, teraz * mnoznik));
  odswiezZoomPodgladu();
}

function otworzPodgladPrzedmiotu(d) {
  if (stan.drukuje) return;
  stan.tylkoOdczyt = true;
  stan.otwarte = true;
  document.body.classList.add('tylko-kartka');
  stan.czytanieZoom = 1;
  odswiezZoomPodgladu();
  $('#podpowiedz').classList.add('schowana');
  $('#nakladka').classList.add('otwarta');
  if (d && d.typ === 'zdjecie') pokazCzytanieZdjecia(d.zdjecie || {});
  else pokazCzytanieDokumentu((d && d.dokument) || d || {});
  pokazEkran('czytanie', false, true);
}

/* =================================================================
   START
   ================================================================= */
function start() {
  odswiezFivem();
  if (!JEST_FIVEM) document.body.classList.add('tryb-podglad');
  $('#markaNazwa').textContent = Config.Marka;
  wstawIkony();
  wstawLoga();
  zastosujTlumaczenia();
  renderujPalete();
  renderujZdjecia();
  renderujMenu();
  renderujSzablony();
  $('#podpisOpis').textContent = t('podpis_opis', stan.imie);
  podepnijZdarzenia();
  const czytanie = $('#czytanieWidok');
  let ostatniZoom = 0;
  const klikZoom = (e) => {
    const btn = e.target.closest && e.target.closest('#czytanieZoomMniej, #czytanieZoomWiecej, #czytanieZoomWartosc');
    if (!btn || !stan.tylkoOdczyt) return;
    const teraz = Date.now();
    if (teraz - ostatniZoom < 220) { e.preventDefault(); e.stopPropagation(); return; }
    ostatniZoom = teraz;
    e.preventDefault();
    e.stopPropagation();
    if (btn.id === 'czytanieZoomWartosc') { stan.czytanieZoom = 1; odswiezZoomPodgladu(); return; }
    zmienZoomPodgladu(btn.id === 'czytanieZoomWiecej' ? 1.35 : 1 / 1.35);
  };
  document.addEventListener('click', klikZoom);
  document.addEventListener('pointerdown', klikZoom, true);
  if (czytanie) {
    czytanie.addEventListener('click', e => {
      if (!stan.tylkoOdczyt) return;
      if (e.target.closest('#czytanieZoom, .dok, .kartka-ramka, .zd-odbitka')) return;
      zamknij();
    });
  }
  const koloPodgladu = e => {
    if (e.__nbKolo) return;
    const kier = kierunekKola(e);
    if (!kier) return;
    if (stan.tylkoOdczyt && stan.ekran === 'czytanie') {
      e.__nbKolo = true;
      e.preventDefault();
      zmienZoomPodgladu(kier > 0 ? 1.2 : 1 / 1.2);
      return;
    }
    if (stan.ekran !== 'zdjecie' || !stanZd.src) return;
    if (e.target && e.target.closest && e.target.closest('#zdOkno')) return;
    e.__nbKolo = true;
    e.preventDefault();
    const okno = $('#zdOkno');
    const r = okno.getBoundingClientRect();
    ustawZoom(stanZd.crop.zoom * (kier > 0 ? 1.18 : 1 / 1.18), e.clientX - r.left, e.clientY - r.top);
  };
  window.addEventListener('wheel', koloPodgladu, { passive: false, capture: true });
  window.addEventListener('mousewheel', koloPodgladu, { passive: false, capture: true });
  document.addEventListener('keydown', e => {
    if (!stan.tylkoOdczyt || stan.ekran !== 'czytanie') return;
    if (e.key === '+' || e.key === '=' || e.key === 'Add') { e.preventDefault(); zmienZoomPodgladu(1.35); }
    else if (e.key === '-' || e.key === '_' || e.key === 'Subtract') { e.preventDefault(); zmienZoomPodgladu(1 / 1.35); }
  });
  const mniej = $('#czytanieZoomMniej'), wiecej = $('#czytanieZoomWiecej');
  if (mniej) mniej.title = t('nar_mniej');
  if (wiecej) wiecej.title = t('nar_wiecej');
  aktualizujDokument();
  ukryjPrzykladowe();
  // w przeglądarce pokazujemy podpowiedź [E]; w FiveM czekamy na wiadomość z Lua
  if (!JEST_FIVEM) setTimeout(() => $('#podpowiedz').classList.remove('schowana'), 200);
  if (JEST_FIVEM) nui('gotowe');
}
// wczytujemy czcionki przed startem (podpis musi być gotowy do animacji)
Promise.all([document.fonts.load('40px "NB Podpis"'), document.fonts.load('600 14px "NB Inter"'), document.fonts.load('600 24px "NB Odreczne"')]).catch(() => {}).then(start);
