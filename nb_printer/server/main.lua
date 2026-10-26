
math.randomseed(os.time() % 2147483647)
math.random()
math.random()

local uzyteKody = {}
local limity = {}

local function dbg(msg)
    if Config.Debug then
        print('[nb_printer] ' .. tostring(msg))
    end
end

local function ilePapieru(src)
    local item = Config.Papier and Config.Papier.item
    if type(item) ~= 'string' or item == '' then return 0 end
    local ok, ile = pcall(function()
        return exports.ox_inventory:Search(src, 'count', item)
    end)
    if not ok then return 0 end
    return tonumber(ile) or 0
end

local function potrzebaPapieru(ile)
    local na = Config.Papier and tonumber(Config.Papier.naWydruk) or 1
    if not na or na < 1 then return 0 end
    return math.floor(na) * ile
end

local function porazka(src, klucz, minuty)
    return {
        ok = false,
        klucz = klucz,
        minuty = minuty,
        papier = ilePapieru(src),
    }
end

local function sukces(src)
    return { ok = true, papier = ilePapieru(src) }
end

local function jobPasuje(praca, stopien, jobs)
    if jobs == nil then return true end
    if type(jobs) ~= 'table' then return false end

    local mapa = false
    local jest = false
    for k, _ in pairs(jobs) do
        jest = true
        if type(k) ~= 'number' then mapa = true end
    end
    if not jest then return true end

    praca = string.lower(praca or '')
    stopien = tonumber(stopien) or 0

    if mapa then
        for nazwa, minG in pairs(jobs) do
            if type(nazwa) == 'string' and string.lower(nazwa) == praca then
                return stopien >= (tonumber(minG) or 0)
            end
        end
        return false
    end

    for i = 1, #jobs do
        local wpis = jobs[i]
        if type(wpis) == 'string' and string.lower(wpis) == praca then
            return true
        end
    end
    return false
end

local function trybWlaczony(id)
    for i = 1, #(Config.Tryby or {}) do
        local tryb = Config.Tryby[i]
        if tryb.id == id then return tryb.wlaczony ~= false end
    end
    return false
end

local function znajdzSzablon(id)
    if type(id) ~= 'string' then return nil end
    for i = 1, #(Config.Szablony or {}) do
        local s = Config.Szablony[i]
        if s.id == id and s.wlaczony ~= false then return s end
    end
    return nil
end

local IKONY = {
    kartka = true, logo = true, odznaka = true, krzyz = true, waga = true,
    klucz = true, plomien = true, stworz = true, kopiuj = true, aparat = true,
}

local function kolorHex(v, domyslny)
    if type(v) == 'string' and (v:match('^#%x%x%x%x%x%x$') or v:match('^#%x%x%x$')) then
        return v
    end
    return domyslny
end

local function ikonaBezpieczna(v, domyslna)
    if type(v) == 'string' and IKONY[v] then return v end
    return domyslna
end

local function wierszSzablonu(s)
    return {
        id = s.id,
        etykieta = s.etykieta or s.nazwa or s.id,
        podtytul = s.podtytul or '',
        kolor = kolorHex(s.kolor, '#0A0F1E'),
        ikona = ikonaBezpieczna(s.ikona, 'kartka'),
        jasny = s.jasny == true or (s.jasny ~= false and s.id == 'zwykly'),
        pasekNazwa = type(s.pasekNazwa) == 'string' and s.pasekNazwa or nil,
        wlaczony = true,
    }
end

local function szablonyGracza(src)
    local praca, stopien = Bridge.Praca(src), Bridge.Stopien(src)
    local lista = {}
    for i = 1, #(Config.Szablony or {}) do
        local s = Config.Szablony[i]
        if s.wlaczony ~= false and jobPasuje(praca, stopien, s.jobs) then
            lista[#lista + 1] = wierszSzablonu(s)
        end
    end
    return lista
end

local function katalogSzablonow()
    local lista = {}
    for i = 1, #(Config.Szablony or {}) do
        local s = Config.Szablony[i]
        if type(s) == 'table' and s.id and s.wlaczony ~= false then
            lista[#lista + 1] = wierszSzablonu(s)
        end
    end
    return lista
end

local function trybyGracza(src)
    local praca, stopien = Bridge.Praca(src), Bridge.Stopien(src)
    local lista = {}
    for i = 1, #(Config.Tryby or {}) do
        local tr = Config.Tryby[i]
        if type(tr) == 'table' and tr.id and jobPasuje(praca, stopien, tr.jobs) then
            lista[#lista + 1] = {
                id = tr.id,
                ikona = ikonaBezpieczna(tr.ikona, 'kartka'),
                kolor = kolorHex(tr.kolor, '#1E88E5'),
                nazwa = type(tr.nazwa) == 'string' and tr.nazwa or nil,
                opis = type(tr.opis) == 'string' and tr.opis or nil,
                wlaczony = tr.wlaczony ~= false,
            }
        end
    end
    return lista
end

local function imieCzyste(src)
    local n = Sanity.Utnij(Bridge.Imie(src) or '', 48)
    n = n:gsub('%s+', ' '):gsub('^%s+', ''):gsub('%s+$', '')
    if n == '' then return GetPlayerName(src) or 'Nieznany' end
    return n
end

local function graczBlisko(src, info)
    local ped = GetPlayerPed(src)
    if not ped or ped == 0 then return false end
    local pc = GetEntityCoords(ped)
    local maxD = Config.Dystans or 3.0

    local function bliskoPunktu(x, y, z)
        x, y, z = tonumber(x), tonumber(y), tonumber(z)
        if not x or not y or not z then return false end
        return #(pc - vector3(x, y, z)) <= maxD
    end

    if type(info) == 'table' and tonumber(info.id) then
        local id = tonumber(info.id)
        for i = 1, #Drukarki.lista do
            local d = Drukarki.lista[i]
            if tonumber(d.id) == id and bliskoPunktu(d.x, d.y, d.z) then
                return true
            end
        end
    end

    for i = 1, #(Config.Lokacje or {}) do
        local l = Config.Lokacje[i]
        if bliskoPunktu(l.x, l.y, l.z) then return true end
    end

    for i = 1, #Drukarki.lista do
        local d = Drukarki.lista[i]
        if bliskoPunktu(d.x, d.y, d.z) then return true end
    end

    if Config.TargetNaModelu and not Config.TylkoZnaneLokalizacje and type(info) == 'table' then
        if bliskoPunktu(info.x, info.y, info.z) and Sanity.Model(info.model) then
            return true
        end
    end

    return false
end

local function zlozOpis(wzor, pola)
    local tekst = (wzor or ''):gsub('{(%w+)}', function(klucz)
        return tostring(pola[klucz] or '')
    end)
    local poprzedni
    repeat
        poprzedni = tekst
        tekst = tekst:gsub(' ·  · ', ' · ')
    until tekst == poprzedni
    tekst = tekst:gsub('^%s*·%s*', ''):gsub('%s*·%s*$', '')
    return tekst
end

local function nowyKod()
    local rok = os.date('%Y')
    local prefix = (Config.Kod and Config.Kod.prefix) or 'NB'
    for _ = 1, 30 do
        local kod = ('%s-%s-%04d'):format(prefix, rok, math.random(0, 9999))
        if not uzyteKody[kod] then
            uzyteKody[kod] = true
            return kod
        end
    end
    local kod = ('%s-%s-%d'):format(prefix, rok, os.time() % 100000)
    uzyteKody[kod] = true
    return kod
end

local function wpisLimitu(src)
    local id = Bridge.Identyfikator(src)
    local wpis = limity[id]
    if not wpis then
        wpis = { czasy = {}, ostatni = 0 }
        limity[id] = wpis
    end
    return wpis
end

local function sprawdzLimit(src, ile)
    local wpis = wpisLimitu(src)
    local teraz = os.time()
    local cooldown = tonumber(Config.Cooldown) or 0
    if cooldown > 0 and wpis.ostatni > 0 and (teraz - wpis.ostatni) < cooldown then
        return false, 'cooldown'
    end

    local okno = (Config.Limit and Config.Limit.okno) or 300
    local zostaw = {}
    for i = 1, #wpis.czasy do
        if teraz - wpis.czasy[i] < okno then
            zostaw[#zostaw + 1] = wpis.czasy[i]
        end
    end
    wpis.czasy = zostaw

    local max = (Config.Limit and Config.Limit.ilosc) or 5
    if #wpis.czasy + ile > max then
        local najstarszy = wpis.czasy[1] or teraz
        local zostalo = okno - (teraz - najstarszy)
        local minuty = math.max(1, math.ceil(zostalo / 60))
        return false, 'limit_druk', minuty
    end

    return true
end

local function zapiszWydruk(src, ile)
    local wpis = wpisLimitu(src)
    local teraz = os.time()
    wpis.ostatni = teraz
    for _ = 1, ile do
        wpis.czasy[#wpis.czasy + 1] = teraz
    end
end

local function cenaZa(rodzaj, ile)
    if not Config.Koszt or Config.Koszt.wlaczone ~= true then return 0 end
    local sztuka = tonumber(Config.Koszt[rodzaj]) or 0
    if sztuka < 0 then sztuka = 0 end
    return math.floor(sztuka) * ile
end

local function kopiaTabeli(zrodlo)
    local kopia = {}
    for klucz, wartosc in pairs(zrodlo) do
        kopia[klucz] = wartosc
    end
    return kopia
end

local function wydaj(src, rodzaj, ile, przedmiot, metadata)
    local papier = potrzebaPapieru(ile)
    local cena = cenaZa(rodzaj, ile)
    local konto = (Config.Koszt and Config.Koszt.konto) or 'cash'

    if papier > 0 and ilePapieru(src) < papier then
        return porazka(src, 'brak_papieru')
    end
    if cena > 0 and Bridge.Pieniadze(src, konto) < cena then
        return porazka(src, 'brak_gotowki')
    end

    local okCarry, carry = pcall(function()
        return exports.ox_inventory:CanCarryItem(src, przedmiot, ile, metadata)
    end)
    if okCarry and carry == false then
        return porazka(src, 'brak_miejsca')
    end

    if papier > 0 then
        local zabrano = exports.ox_inventory:RemoveItem(src, Config.Papier.item, papier)
        if not zabrano then return porazka(src, 'brak_papieru') end
    end

    if cena > 0 and not Bridge.ZabierzPieniadze(src, konto, cena) then
        if papier > 0 then
            exports.ox_inventory:AddItem(src, Config.Papier.item, papier)
        end
        return porazka(src, 'brak_gotowki')
    end

    local dodane = 0
    for _ = 1, ile do
        local dodano = exports.ox_inventory:AddItem(src, przedmiot, 1, kopiaTabeli(metadata))
        if dodano then
            dodane = dodane + 1
        else
            break
        end
    end

    local nieudane = ile - dodane
    if nieudane > 0 then
        local na = Config.Papier and tonumber(Config.Papier.naWydruk) or 1
        if papier > 0 and na and na >= 1 then
            exports.ox_inventory:AddItem(src, Config.Papier.item, nieudane * math.floor(na))
        end
        if cena > 0 then
            Bridge.OddajPieniadze(src, konto, math.floor(cena / ile) * nieudane)
        end
    end

    if dodane == 0 then
        return porazka(src, 'brak_miejsca')
    end

    zapiszWydruk(src, dodane)
    dbg(('wydruk %s x%s dla %s'):format(przedmiot, dodane, src))
    return sukces(src)
end

local function wygladNui()
    local w = Config.Wyglad or {}
    local out = {
        akcent = w.akcent,
        akcentCiemny = w.akcentCiemny,
        akcentJasny = w.akcentJasny,
        tlo = w.tlo,
        tekst = w.tekst,
        granat = w.granat,
        promien = w.promien,
        zaokraglenie = w.zaokraglenie,
        nazwa = w.nazwa,
        logoWlaczone = w.logoWlaczone ~= false,
    }
    if type(w.podtytul) == 'string' and w.podtytul ~= '' then out.podtytul = w.podtytul end
    if type(w.logo) == 'string' and w.logo ~= '' then out.logo = w.logo end
    if w.logo == false or w.logoWlaczone == false then out.logoWlaczone = false end
    return out
end

local function paczkaUstawien(src)
    local w = Config.Wyglad or {}
    return {
        akcja = 'ustawienia',
        Jezyk = Config.Jezyk or 'en',
        Marka = w.nazwa or 'Northbyte',
        MaksTytul = Config.MaksTytul,
        MaksZnakow = Config.MaksZnakow,
        CzasDruku = Config.CzasDruku,
        CzasPowiadomienia = Config.CzasPowiadomienia,
        Toner = Config.Toner,
        LogoWlaczone = w.logoWlaczone ~= false,
        BlokujBase64 = true,
        Przykladowe = false,
        Zdjecie = Config.Zdjecie,
        KoloryTekstu = Config.KoloryTekstu,
        Tryby = trybyGracza(src),
        Katalog = katalogSzablonow(),
        Kopiuj = Config.Kopiuj,
        DrukZdjec = Config.DrukZdjec,
        Szablony = szablonyGracza(src),
        Domeny = Config.Domeny,
        Rozszerzenia = Config.Rozszerzenia,
        teksty = Slownik,
        wyglad = wygladNui(),
        papier = ilePapieru(src),
    }
end

local function iloscAlboNil(v, max)
    local n = tonumber(v)
    if not n then return nil end
    n = math.floor(n)
    if n < 1 or n > max then return nil end
    return n
end

local function metadaneDokumentu(szablon, tytul, html, podpisany, imie, kod, data, zdjecia, kopia, znakWodny)
    local dopisek = ''
    if kopia then dopisek = (Config.Opis and Config.Opis.dopisekKopii) or (' · ' .. L('kopia_znak')) end
    local opis = zlozOpis(Config.Opis and Config.Opis.dokument, {
        kod = kod,
        szablon = szablon.etykieta or szablon.nazwa or szablon.id,
        autor = podpisany and imie or '',
        data = data,
        kopia = dopisek,
    })
    return {
        label = tytul,
        description = opis,
        kod = kod,
        template = szablon.id,
        title = tytul,
        body = html,
        signed = podpisany == true,
        name = podpisany and imie or '',
        date = data,
        images = zdjecia,
        kopia = kopia == true,
        znakWodny = znakWodny == true,
    }
end

local alfabet64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
local pobraniaObrazu = {}
local trwaObraz = {}

local function naBase64(dane)
    local czesci = {}
    local n = #dane
    local i = 1
    local idx = 1
    while i <= n do
        local a = dane:byte(i)
        local b = (i + 1 <= n) and dane:byte(i + 1) or nil
        local c = (i + 2 <= n) and dane:byte(i + 2) or nil
        local trojka = a * 65536 + (b or 0) * 256 + (c or 0)
        local c1 = math.floor(trojka / 262144) % 64
        local c2 = math.floor(trojka / 4096) % 64
        local c3 = b and (math.floor(trojka / 64) % 64) or nil
        local c4 = c and (trojka % 64) or nil
        czesci[idx] = alfabet64:sub(c1 + 1, c1 + 1)
            .. alfabet64:sub(c2 + 1, c2 + 1)
            .. (c3 and alfabet64:sub(c3 + 1, c3 + 1) or '=')
            .. (c4 and alfabet64:sub(c4 + 1, c4 + 1) or '=')
        idx = idx + 1
        i = i + 3
    end
    return table.concat(czesci)
end

local function typObrazu(b)
    if type(b) ~= 'string' or #b < 12 then return nil end
    if b:byte(1) == 137 and b:sub(2, 4) == 'PNG' then return 'image/png' end
    if b:byte(1) == 255 and b:byte(2) == 216 then return 'image/jpeg' end
    if b:sub(1, 4) == 'GIF8' then return 'image/gif' end
    if b:sub(1, 4) == 'RIFF' and b:sub(9, 12) == 'WEBP' then return 'image/webp' end
    return nil
end

local function mozePobracObraz(src)
    local teraz = os.time()
    local lista = pobraniaObrazu[src] or {}
    local swieze = {}
    for i = 1, #lista do
        if teraz - lista[i] < 60 then swieze[#swieze + 1] = lista[i] end
    end
    if #swieze >= 8 then
        pobraniaObrazu[src] = swieze
        return false
    end
    swieze[#swieze + 1] = teraz
    pobraniaObrazu[src] = swieze
    return true
end

lib.callback.register('nb_printer:obraz', function(src, url)
    local czysty = Sanity.Url(url)
    if not czysty or trwaObraz[src] or not mozePobracObraz(src) then return { ok = false } end
    trwaObraz[src] = true
    local p = promise.new()
    local skonczone = false
    local function skoncz(wynik)
        if skonczone then return end
        skonczone = true
        p:resolve(wynik)
    end
    SetTimeout(12000, function()
        skoncz({ code = 0, body = '' })
    end)
    PerformHttpRequest(czysty, function(code, body)
        skoncz({ code = code, body = body })
    end, 'GET', '', {
        ['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        ['Accept'] = 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    })
    local odp = Citizen.Await(p)
    trwaObraz[src] = nil
    if not odp or tonumber(odp.code) ~= 200 or type(odp.body) ~= 'string' then return { ok = false } end
    if #odp.body < 32 or #odp.body > 3145728 then return { ok = false } end
    local typ = typObrazu(odp.body)
    if not typ then return { ok = false } end
    return { ok = true, dane = 'data:' .. typ .. ';base64,' .. naBase64(odp.body) }
end)

lib.callback.register('nb_printer:ustawienia', function(src)
    return paczkaUstawien(src)
end)

lib.callback.register('nb_printer:proszeListe', function()
    return Drukarki.lista
end)

lib.callback.register('nb_printer:czyAdmin', function(src)
    return Bridge.CzyAdmin(src) == true
end)

lib.callback.register('nb_printer:otworz', function(src, info)
    if not graczBlisko(src, info) then
        return { ok = false, klucz = 'za_daleko' }
    end
    return {
        ok = true,
        imie = imieCzyste(src),
        papier = ilePapieru(src),
        szablony = szablonyGracza(src),
        tryby = trybyGracza(src),
        katalog = katalogSzablonow(),
    }
end)

lib.callback.register('nb_printer:dokumenty', function(src)
    local nazwa = Config.Przedmioty.dokument
    local ok, surowe = pcall(function()
        return exports.ox_inventory:Search(src, 'slots', nazwa)
    end)
    local lista = {}
    if not ok or type(surowe) ~= 'table' then return lista end

    local function dodaj(slot)
        if type(slot) ~= 'table' or slot.name ~= nazwa or not slot.slot then return end
        local m = slot.metadata or {}
        lista[#lista + 1] = {
            id = tostring(slot.slot),
            template = m.template or 'zwykly',
            title = m.title or m.label or '',
            body = m.body or '',
            signed = m.signed == true,
            name = m.name or '',
            date = m.date or '',
            nr = m.kod or '',
            images = m.images or {},
            kopia = m.kopia == true,
            znakWodny = m.znakWodny == true,
        }
    end

    if surowe.slot and surowe.name then
        dodaj(surowe)
    else
        for _, slot in pairs(surowe) do
            dodaj(slot)
        end
    end

    return lista
end)

lib.callback.register('nb_printer:drukuj', function(src, dane, drukarka)
    if type(dane) ~= 'table' then return porazka(src, 'blad') end
    if not trybWlaczony('stworz') then return porazka(src, 'tryb_wylaczony') end
    if not graczBlisko(src, drukarka) then return porazka(src, 'za_daleko') end

    local szablon = znajdzSzablon(dane.template)
    if not szablon or not jobPasuje(Bridge.Praca(src), Bridge.Stopien(src), szablon.jobs) then
        return porazka(src, 'zly_szablon')
    end

    local tytul = Sanity.Tytul(dane.title)
    -- Pusty tytuł: NUI pozwala drukować samą treść, więc dajemy domyślną nazwę (jak w podglądzie)
    if not tytul and (type(dane.title) ~= 'string' or not dane.title:find('%S')) then
        tytul = Sanity.Tytul(L('bez_tytulu'))
    end
    if not tytul then return porazka(src, 'zly_tytul') end

    local html = Sanity.Html(dane.body)
    if html == nil then return porazka(src, 'za_dluga_tresc') end

    local zdjecia = Sanity.Zdjecia(dane.images)
    if not zdjecia then return porazka(src, 'zly_url') end

    local mozna, klucz, minuty = sprawdzLimit(src, 1)
    if not mozna then return porazka(src, klucz, minuty) end

    local imie = imieCzyste(src)
    local podpisany = dane.signed == true
    local metadata = metadaneDokumentu(
        szablon, tytul, html, podpisany, imie, nowyKod(), os.date('%d.%m.%Y %H:%M'), zdjecia, false, false
    )
    return wydaj(src, 'dokument', 1, Config.Przedmioty.dokument, metadata)
end)

lib.callback.register('nb_printer:kopiuj', function(src, dane, drukarka)
    if type(dane) ~= 'table' then return porazka(src, 'blad') end
    if not trybWlaczony('kopiuj') then return porazka(src, 'tryb_wylaczony') end
    if not graczBlisko(src, drukarka) then return porazka(src, 'za_daleko') end

    local ile = iloscAlboNil(dane.kopie, (Config.Kopiuj and Config.Kopiuj.maxKopii) or 5)
    if not ile then return porazka(src, 'zla_ilosc') end

    local slotId = tonumber(dane.id)
    if not slotId then return porazka(src, 'zly_dokument') end

    local okSlot, slot = pcall(function()
        return exports.ox_inventory:GetSlot(src, slotId)
    end)
    if not okSlot or type(slot) ~= 'table' or slot.name ~= Config.Przedmioty.dokument then
        return porazka(src, 'zly_dokument')
    end

    local m = slot.metadata or {}
    local szablon = znajdzSzablon(m.template)
    if not szablon or not jobPasuje(Bridge.Praca(src), Bridge.Stopien(src), szablon.jobs) then
        return porazka(src, 'zly_szablon')
    end

    local tytul = Sanity.Tytul(m.title or m.label)
    if not tytul then return porazka(src, 'zly_dokument') end

    local html = Sanity.Html(m.body or '')
    if html == nil then return porazka(src, 'zly_dokument') end

    local zdjecia = Sanity.Zdjecia(m.images)
    if not zdjecia then return porazka(src, 'zly_url') end

    local mozna, klucz, minuty = sprawdzLimit(src, ile)
    if not mozna then return porazka(src, klucz, minuty) end

    local kod = m.kod
    if type(kod) ~= 'string' or kod == '' or #kod > 32 then kod = nowyKod() end
    local imie = Sanity.Utnij(m.name or '', 48)
    local data = type(m.date) == 'string' and m.date or os.date('%d.%m.%Y %H:%M')
    local metadata = metadaneDokumentu(
        szablon, tytul, html, m.signed == true, imie, kod, data, zdjecia, true, dane.znakWodny == true
    )
    return wydaj(src, 'kopia', ile, Config.Przedmioty.dokument, metadata)
end)

lib.callback.register('nb_printer:drukujZdjecie', function(src, dane, drukarka)
    if type(dane) ~= 'table' then return porazka(src, 'blad') end
    if not trybWlaczony('zdjecie') then return porazka(src, 'tryb_wylaczony') end
    if not graczBlisko(src, drukarka) then return porazka(src, 'za_daleko') end

    local ile = iloscAlboNil(dane.kopie, (Config.DrukZdjec and Config.DrukZdjec.maxKopii) or 5)
    if not ile then return porazka(src, 'zla_ilosc') end

    local srcZdjecia = Sanity.Url(dane.src)
    if not srcZdjecia then return porazka(src, 'zly_url') end

    local format
    if type(dane.format) == 'string' then
        for i = 1, #(Config.DrukZdjec.Formaty or {}) do
            if Config.DrukZdjec.Formaty[i].id == dane.format then
                format = Config.DrukZdjec.Formaty[i]
                break
            end
        end
    end
    if not format then return porazka(src, 'zly_format') end

    local podpis = Sanity.Podpis(dane.podpis, (Config.DrukZdjec and Config.DrukZdjec.maxPodpis) or 32)
    if podpis == nil then return porazka(src, 'zly_tytul') end

    local mozna, klucz, minuty = sprawdzLimit(src, ile)
    if not mozna then return porazka(src, klucz, minuty) end

    local kod = nowyKod()
    local data = os.date('%d.%m.%Y %H:%M')
    local nazwaFormatu = L('fmt_' .. format.id)
    local metadata = {
        label = podpis ~= '' and podpis or L('item_zdjecie'),
        description = zlozOpis(Config.Opis and Config.Opis.zdjecie, {
            kod = kod,
            format = nazwaFormatu,
            data = data,
        }),
        kod = kod,
        src = srcZdjecia,
        format = format.id,
        podpis = podpis,
        crop = Sanity.Kadr(dane.crop, Config.DrukZdjec and Config.DrukZdjec.maxZoom),
        date = data,
    }
    return wydaj(src, 'zdjecie', ile, Config.Przedmioty.zdjecie, metadata)
end)

lib.callback.register('nb_printer:postaw', function(src, dane)
    if not Bridge.CzyAdmin(src) then return { ok = false, klucz = 'brak_uprawnien' } end
    if type(dane) ~= 'table' then return { ok = false, klucz = 'blad_zapis' } end

    local model = Sanity.Model(dane.model)
    if not model then return { ok = false, klucz = 'model_zly' } end

    local x, y, z = tonumber(dane.x), tonumber(dane.y), tonumber(dane.z)
    local heading = tonumber(dane.heading) or 0.0
    if not x or not y or not z or x ~= x or y ~= y or z ~= z or heading ~= heading then
        return { ok = false, klucz = 'blad_zapis' }
    end
    if math.abs(x) > 10000 or math.abs(y) > 10000 or z < -200.0 or z > 2000.0 then
        return { ok = false, klucz = 'blad_zapis' }
    end

    heading = heading % 360.0
    if heading < 0 then heading = heading + 360.0 end

    local ped = GetPlayerPed(src)
    if not ped or ped == 0 then return { ok = false, klucz = 'za_daleko_postaw' } end
    local zasieg = (Config.Admin and Config.Admin.zasieg or 8.0) + 4.0
    if #(GetEntityCoords(ped) - vector3(x, y, z)) > zasieg then
        return { ok = false, klucz = 'za_daleko_postaw' }
    end

    local wpis = Drukarki.Dodaj(model, x + 0.0, y + 0.0, z + 0.0, heading + 0.0)
    if not wpis then return { ok = false, klucz = 'blad_zapis' } end
    return { ok = true }
end)

lib.callback.register('nb_printer:usun', function(src, id)
    if not Bridge.CzyAdmin(src) then return false end
    return Drukarki.Usun(id) == true
end)
