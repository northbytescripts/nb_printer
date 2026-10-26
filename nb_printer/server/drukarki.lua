
Drukarki = {
    lista = {},
    baza = false,
}

local function rozeslij()
    TriggerClientEvent('nb_printer:lista', -1, Drukarki.lista)
end

local function oczekuj(metoda, sql, params)
    if GetResourceState('oxmysql') ~= 'started' then return nil end

    local p = promise.new()
    local ok, err = pcall(function()
        exports.oxmysql[metoda](exports.oxmysql, sql, params or {}, function(wynik)
            p:resolve(wynik)
        end)
    end)

    if not ok then
        print(('^1[nb_printer] oxmysql (%s): %s^0'):format(metoda, tostring(err)))
        p:resolve(nil)
    end

    return Citizen.Await(p)
end

local function liczby(wiersz)
    wiersz.id = tonumber(wiersz.id)
    wiersz.x = tonumber(wiersz.x) or 0.0
    wiersz.y = tonumber(wiersz.y) or 0.0
    wiersz.z = tonumber(wiersz.z) or 0.0
    wiersz.heading = tonumber(wiersz.heading) or 0.0
    wiersz.model = tostring(wiersz.model or '')
    return wiersz
end

local function wczytajJson()
    local surowe = LoadResourceFile(GetCurrentResourceName(), Config.PlikJson or 'printers.json')
    local dane = {}
    if surowe and surowe ~= '' then
        local ok, decoded = pcall(json.decode, surowe)
        if ok and type(decoded) == 'table' then dane = decoded end
    end

    local lista = {}
    for i = 1, #dane do
        if type(dane[i]) == 'table' and dane[i].model then
            lista[#lista + 1] = liczby(dane[i])
        end
    end
    Drukarki.lista = lista
end

local function zapiszJson()
    local tresc = json.encode(Drukarki.lista)
    local ok = SaveResourceFile(GetCurrentResourceName(), Config.PlikJson or 'printers.json', tresc, #tresc)
    if not ok then
        print('^1[nb_printer] Nie udało się zapisać printers.json^0')
    end
    return ok
end

function Drukarki.Dodaj(model, x, y, z, heading)
    if Drukarki.baza then
        local id = oczekuj(
            'insert',
            'INSERT INTO nb_printers (model, x, y, z, heading) VALUES (?, ?, ?, ?, ?)',
            { model, x, y, z, heading }
        )
        if type(id) == 'table' then id = id.insertId or id.id end
        id = tonumber(id)
        if not id or id < 1 then return nil end

        local wpis = liczby({ id = id, model = model, x = x, y = y, z = z, heading = heading })
        Drukarki.lista[#Drukarki.lista + 1] = wpis
        rozeslij()
        return wpis
    end

    local maxId = 0
    for i = 1, #Drukarki.lista do
        local id = tonumber(Drukarki.lista[i].id) or 0
        if id > maxId then maxId = id end
    end

    local wpis = liczby({ id = maxId + 1, model = model, x = x, y = y, z = z, heading = heading })
    Drukarki.lista[#Drukarki.lista + 1] = wpis
    zapiszJson()
    rozeslij()
    return wpis
end

function Drukarki.Usun(id)
    id = tonumber(id)
    if not id then return false end

    if Drukarki.baza then
        local wynik = oczekuj('query', 'DELETE FROM nb_printers WHERE id = ?', { id })
        if wynik == nil then return false end
    end

    local zostaw = {}
    local bylo = false
    for i = 1, #Drukarki.lista do
        if tonumber(Drukarki.lista[i].id) == id then
            bylo = true
        else
            zostaw[#zostaw + 1] = Drukarki.lista[i]
        end
    end

    if not bylo then return false end
    Drukarki.lista = zostaw
    if not Drukarki.baza then zapiszJson() end
    rozeslij()
    return true
end

CreateThread(function()
    local chcemyBaze = Config.Zapis == 'oxmysql' and GetResourceState('oxmysql') == 'started'

    if chcemyBaze then
        oczekuj('query', [[
            CREATE TABLE IF NOT EXISTS `nb_printers` (
                `id` INT NOT NULL AUTO_INCREMENT,
                `model` VARCHAR(64) NOT NULL,
                `x` DOUBLE NOT NULL,
                `y` DOUBLE NOT NULL,
                `z` DOUBLE NOT NULL,
                `heading` DOUBLE NOT NULL DEFAULT 0,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        ]])

        local wiersze = oczekuj('query', 'SELECT id, model, x, y, z, heading FROM nb_printers', {})
        if type(wiersze) == 'table' then
            local lista = {}
            for i = 1, #wiersze do
                if type(wiersze[i]) == 'table' then
                    lista[#lista + 1] = liczby(wiersze[i])
                end
            end
            Drukarki.baza = true
            Drukarki.lista = lista
            print(('^2[nb_printer] Drukarki z bazy: %s^0'):format(#lista))
            rozeslij()
            return
        end

        print('^3[nb_printer] oxmysql nie oddał listy. Zapis przełączony na printers.json.^0')
    end

    wczytajJson()
    print(('^2[nb_printer] Drukarki z pliku JSON: %s^0'):format(#Drukarki.lista))
    rozeslij()
end)
