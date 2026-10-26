-- config.lua
-- Everything a server owner can change without touching the rest of the script.
-- After a change: ensure nb_printer (or restart the server).
-- Language of the UI and notifications: 'en' or 'pl'. Files: locales/en.json and locales/pl.json.

Config = {}

Config.Jezyk = 'en'

-- true prints short traces in the server console.
Config.Debug = false

-- NUI look. These defaults match the original preview.
-- promien        = corner radius inside the panel (cards, buttons)
-- zaokraglenie   = corner radius of the whole panel
-- logo           = false hides the mark. Or set an https:// or nui:// address.
-- podtytul       = nil uses the language file ("Print station").
Config.Wyglad = {
    akcent = '#1E88E5',
    akcentCiemny = '#1565C0',
    akcentJasny = '#E8F2FD',
    tlo = '#FFFFFF',
    tekst = '#1B2232',
    granat = '#0A0F1E',
    promien = '16px',
    zaokraglenie = '22px',
    nazwa = 'Northbyte',
    podtytul = nil,
    logo = nil,
    logoWlaczone = true,
}

-- Content limits. The server enforces these even if the NUI is bypassed.
Config.MaksTytul = 60
Config.MaksZnakow = 1200
Config.MaksHtml = 8000
Config.MaksUrl = 2000

-- Print animation length and toast length, in milliseconds.
Config.CzasDruku = 3600
Config.CzasPowiadomienia = 4200

-- Toner bar in the footer is cosmetic. It is not consumed.
Config.Toner = 76

-- Paper. Each document, copy and photo spends `naWydruk` items. 0 disables paper.
Config.Papier = {
    item = 'paper',
    naWydruk = 1,
}

-- Sliding window: how many prints (document + each copy + each photo) per how many seconds.
Config.Limit = {
    ilosc = 5,
    okno = 300,
}

-- Minimum gap between successful prints, in seconds. 0 disables it.
Config.Cooldown = 3

-- Optional fee. konto: 'cash' or 'bank'. On ESX, 'cash' means the money account.
Config.Koszt = {
    wlaczone = false,
    konto = 'cash',
    dokument = 25,
    kopia = 15,
    zdjecie = 20,
}

-- How close the player must stand for the server to accept a print.
-- DystansTarget is the ox_target eye range.
Config.Dystans = 3.0
Config.DystansTarget = 2.0

-- The prop spawns locally when a player walks up, and despawns when they leave.
Config.DystansSpawnu = 80.0
Config.DystansDespawnu = 100.0

-- true = ox_target on models from Config.Modele (printers already placed on the map).
Config.TargetNaModelu = true

-- false = a map printer that is not on the list can still be used.
-- The server then trusts the model coordinates (a cheater can fake them).
-- true = only printers from /printeradmin and Config.Lokacje work.
Config.TylkoZnaneLokalizacje = false

-- 'oxmysql' saves to the database. If oxmysql is down, the script falls back to JSON.
-- 'json' always writes PlikJson inside the resource folder.
Config.Zapis = 'oxmysql'
Config.PlikJson = 'printers.json'

-- Who can use /printeradmin. An ace OR a framework group is enough.
-- In server.cfg: add_ace group.admin nb_printer.admin allow
Config.Admin = {
    ace = 'nb_printer.admin',
    grupy = { 'admin', 'god' },
    esx = { 'admin', 'superadmin' },
    zasieg = 8.0,
    krokObrotu = 15,
    krokWysokosci = 0.05,
}

-- Sound after the server accepts a print, before the animation.
Config.Dzwiek = {
    wlaczone = true,
    nazwa = 'SELECT',
    zestaw = 'HUD_FRONTEND_DEFAULT_SOUNDSET',
}

-- Map blip for printers placed with the command. Off by default.
Config.Blip = {
    wlaczone = false,
    sprite = 525,
    kolor = 3,
    skala = 0.7,
}

-- ox_inventory item names. Definitions live in ox_items.lua.
Config.Przedmioty = {
    dokument = 'printed_document',
    zdjecie = 'printed_photo',
}

-- Document code, for example NB-2026-4821. Change the prefix if you want.
Config.Kod = {
    prefix = 'NB',
}

-- Item description (metadata.description). An empty {autor} drops out on its own.
-- {kopia} on a copy gets dopisekKopii. nil uses the language file ("COPY" / "KOPIA").
Config.Opis = {
    dokument = '{kod} · {szablon} · {autor} · {data}{kopia}',
    zdjecie = '{kod} · {format} · {data}',
    dopisekKopii = nil,
}

-- Images are allowed only from these domains, or their subdomains (for example i.imgur.com).
Config.Domeny = {
    'i.imgur.com',
    'imgur.com',
    'r2.fivemanage.com',
    'i.fivemanage.com',
    'cdn.discordapp.com',
    'media.discordapp.net',
    'media.discordapp.com',
    'cdn.discordapp.net',
    'images-ext-1.discordapp.net',
    'images-ext-2.discordapp.net',
}

-- Allowed file extensions. base64 is always rejected in game.
Config.Rozszerzenia = { 'png', 'jpg', 'jpeg', 'webp', 'gif' }

-- Editor palette. The server drops a span that uses any other color.
Config.KoloryTekstu = {
    { nazwa = 'Black',  kolor = '#1F2430' },
    { nazwa = 'Navy',   kolor = '#1A2A6C' },
    { nazwa = 'Blue',   kolor = '#1E88E5' },
    { nazwa = 'Red',    kolor = '#D32F2F' },
    { nazwa = 'Green',  kolor = '#2E7D32' },
    { nazwa = 'Orange', kolor = '#EF6C00' },
    { nazwa = 'Purple', kolor = '#7B1FA2' },
    { nazwa = 'Gray',   kolor = '#78808F' },
}

-- Menu cards.
-- nazwa, opis = nil uses the language file. A string replaces the translation.
-- kolor       = top bar and icon color, hex
-- ikona       = stworz, kopiuj, aparat, kartka, odznaka, krzyz, waga, klucz, plomien
-- wlaczony    = false keeps the card with a "Soon" label
-- jobs        = same rules as templates. Empty means everyone.
Config.Tryby = {
    { id = 'stworz',  ikona = 'stworz', kolor = '#1E88E5', wlaczony = true },
    { id = 'kopiuj',  ikona = 'kopiuj', kolor = '#1565C0', wlaczony = true },
    { id = 'zdjecie', ikona = 'aparat', kolor = '#243044', wlaczony = true },
}

-- Photos placed on a document. This is not the separate photo print.
Config.Zdjecie = {
    maxIlosc = 5,
    szerokosc = 190,
    minSzerokosc = 70,
    maxSzerokosc = 520,
    przesuniecie = { x = 34, y = 26 },
}

Config.Kopiuj = {
    maxKopii = 5,
    znakWodny = true,
}

-- Photo formats. Order is the button order.
-- id        = stored on the item. Do not change it after people have printed.
-- nazwa     = button label. Empty uses the language file (fmt_<id>).
-- proporcja = { width, height }
-- polaroid  = true leaves a wide bottom margin for a caption
Config.DrukZdjec = {
    maxKopii = 5,
    maxPodpis = 32,
    maxZoom = 4,
    domyslnyFormat = 'polaroid',
    Formaty = {
        { id = 'kwadrat',  proporcja = { 1, 1 } },
        { id = 'poziome',  proporcja = { 3, 2 } },
        { id = 'pionowe',  proporcja = { 2, 3 } },
        { id = 'polaroid', proporcja = { 1, 1 }, polaroid = true },
    },
}

-- Document templates.
-- Who can see a template and print it, including a copy. Everyone else does not see it.
--   no jobs, or {}              = everyone, including a player with no job
--   { police = 3 }              = job "police", grade 3 and up
--   { police = 3, sheriff = 3 } = several jobs, each with its own minimum
--   { 'police' }                = job name only, any grade
-- Grade: ESX uses job.grade, QB/Qbox uses job.grade.level. 0 means every grade of that job.
-- Job names must match the framework (police, ambulance, mechanic...).
--
-- Bar at the top of the sheet:
--   nazwa       = label on the template card
--   pasekNazwa  = text on the bar. Empty: brand name when jasny, otherwise nazwa
--   podtytul    = second line of the bar
--   kolor       = bar color, hex. When jasny the bar is white and kolor stays on the icons
--   ikona       = kartka, logo, odznaka, krzyz, waga, klucz, plomien
--   jasny       = true makes a white bar and dark text (plain sheet)
--   wlaczony    = false hides the template from everyone
Config.Szablony = {
    { id = 'zwykly', nazwa = 'Plain', podtytul = 'General document',            kolor = '#0A0F1E', ikona = 'kartka',  jasny = true, wlaczony = true },
    { id = 'lspd',   nazwa = 'LSPD',  podtytul = 'Los Santos Police Department', kolor = '#1D3D8F', ikona = 'odznaka', wlaczony = true, jobs = { police = 3 } },
    { id = 'ems',    nazwa = 'EMS',   podtytul = 'Emergency Medical Services',   kolor = '#D63A4A', ikona = 'krzyz',   wlaczony = true, jobs = { ambulance = 3 } },
    { id = 'doj',    nazwa = 'DOJ',   podtytul = 'Department of Justice',        kolor = '#8A6A2F', ikona = 'waga',    wlaczony = true, jobs = { doj = 3, lawyer = 3 } },
    { id = 'lsc',    nazwa = 'LSC',   podtytul = 'Los Santos Customs',           kolor = '#16865A', ikona = 'klucz',   wlaczony = true, jobs = { mechanic = 3 } },
    { id = 'fdr',    nazwa = 'FDR',   podtytul = 'Fire Department',              kolor = '#E0560F', ikona = 'plomien', wlaczony = true, jobs = { fire = 3 } },
}

-- Models that can take a target, and that an admin picks for the hologram.
Config.Modele = {
    { model = 'prop_printer_01', etykieta = 'Office printer' },
    { model = 'prop_printer_02', etykieta = 'Small printer' },
    { model = 'v_res_printer',   etykieta = 'Home printer' },
    { model = 'prop_copier_01',  etykieta = 'Copier' },
}

-- Fixed spots. Two styles:
--   model + spawn = local prop plus a target on that prop
--   strefa = true  = ox_target sphere only, no prop (the printer is already in the interior)
Config.Lokacje = {
    -- { x = 441.20, y = -981.90, z = 30.69, heading = 90.0, model = 'prop_printer_01', spawn = true },
    -- { x = 440.00, y = -980.00, z = 30.69, strefa = true, promien = 1.2 },
}
