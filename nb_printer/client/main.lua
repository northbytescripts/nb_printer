
NB = {
    aktywna = nil,
    otwarte = false,
    jestAdmin = false,
    drukarki = {},
    encje = {},
    nasze = {},
    blipy = {},
    strefy = {},
    hasheModeli = nil,
    hologram = nil,
    stawia = false,
    model = nil,
}

if Config.Modele and Config.Modele[1] then
    NB.model = Config.Modele[1].model
end

function ZaladujModel(model)
    if type(model) ~= 'string' then return nil end
    local hash = joaat(model)
    if not IsModelInCdimage(hash) then return nil end
    RequestModel(hash)
    local koniec = GetGameTimer() + 5000
    while not HasModelLoaded(hash) do
        if GetGameTimer() > koniec then return nil end
        Wait(10)
    end
    return hash
end

local function powiadom(klucz, typ, ...)
    lib.notify({
        title = L('powiadomienie'),
        description = L(klucz, ...),
        type = typ or 'inform',
    })
end

local function wynikNui(wynik)
    if type(wynik) ~= 'table' then
        wynik = { ok = false, klucz = 'blad' }
    end
    if wynik.ok then
        if Config.Dzwiek and Config.Dzwiek.wlaczone then
            PlaySoundFrontend(-1, Config.Dzwiek.nazwa or 'SELECT', Config.Dzwiek.zestaw or 'HUD_FRONTEND_DEFAULT_SOUNDSET', true)
        end
    else
        if wynik.minuty then
            powiadom(wynik.klucz or 'blad', 'error', wynik.minuty)
        else
            powiadom(wynik.klucz or 'blad', 'error')
        end
    end
    return wynik
end

function OtworzDrukarke()
    local dane = lib.callback.await('nb_printer:otworz', false, NB.aktywna)
    if not dane or not dane.ok then
        powiadom((dane and dane.klucz) or 'za_daleko', 'error')
        NB.aktywna = nil
        return
    end

    SendNUIMessage({
        akcja = 'otworz',
        imie = dane.imie,
        papier = dane.papier,
        toner = Config.Toner,
        szablony = dane.szablony,
        tryby = dane.tryby,
        katalog = dane.katalog,
    })
    SetNuiFocus(true, true)
    NB.otwarte = true
end

local function zamknijFocus()
    SetNuiFocus(false, false)
    NB.otwarte = false
    NB.aktywna = nil
end

RegisterNUICallback('gotowe', function(_, cb)
    cb({ ok = true })
    CreateThread(function()
        local dane = lib.callback.await('nb_printer:ustawienia', false)
        if type(dane) == 'table' then
            SendNUIMessage(dane)
        end
    end)
end)

RegisterNUICallback('zamknij', function(_, cb)
    zamknijFocus()
    cb({ ok = true })
end)

RegisterNUICallback('drukuj', function(dane, cb)
    local ok, wynik = pcall(function()
        return lib.callback.await('nb_printer:drukuj', false, dane, NB.aktywna)
    end)
    if not ok then
        cb(wynikNui({ ok = false, klucz = 'blad' }))
        return
    end
    cb(wynikNui(wynik))
end)

RegisterNUICallback('kopiuj', function(dane, cb)
    local ok, wynik = pcall(function()
        return lib.callback.await('nb_printer:kopiuj', false, dane, NB.aktywna)
    end)
    if not ok then
        cb(wynikNui({ ok = false, klucz = 'blad' }))
        return
    end
    cb(wynikNui(wynik))
end)

RegisterNUICallback('drukujZdjecie', function(dane, cb)
    local ok, wynik = pcall(function()
        return lib.callback.await('nb_printer:drukujZdjecie', false, dane, NB.aktywna)
    end)
    if not ok then
        cb(wynikNui({ ok = false, klucz = 'blad' }))
        return
    end
    cb(wynikNui(wynik))
end)

RegisterNUICallback('pobierzObraz', function(dane, cb)
    local url = type(dane) == 'table' and dane.url or nil
    local ok, wynik = pcall(function()
        return lib.callback.await('nb_printer:obraz', false, url)
    end)
    if not ok or type(wynik) ~= 'table' then
        cb({ ok = false })
        return
    end
    cb(wynik)
end)

RegisterNUICallback('pobierzDokumenty', function(_, cb)
    local ok, lista = pcall(function()
        return lib.callback.await('nb_printer:dokumenty', false)
    end)
    if not ok or type(lista) ~= 'table' then
        cb({ lista = {} })
        return
    end
    cb({ lista = lista })
end)

local function slotZArgumentow(...)
    local n = select('#', ...)
    for i = n, 1, -1 do
        local v = select(i, ...)
        if type(v) == 'table' and type(v.metadata) == 'table' and v.slot then
            return v
        end
    end
end

local function otworzPodglad(wiadomosc)
    SendNUIMessage(wiadomosc)
    SetNuiFocus(true, true)
    NB.otwarte = true
end

exports('uzyjDokument', function(...)
    local slot = slotZArgumentow(...)
    local m = slot and slot.metadata or {}
    otworzPodglad({
        akcja = 'podglad',
        typ = 'dokument',
        dokument = {
            id = m.kod,
            template = m.template,
            title = m.title or m.label,
            body = m.body or '',
            signed = m.signed == true,
            name = m.name,
            date = m.date,
            nr = m.kod,
            images = m.images or {},
            kopia = m.kopia == true,
            znakWodny = m.znakWodny == true,
        },
    })
end)

exports('uzyjZdjecie', function(...)
    local slot = slotZArgumentow(...)
    local m = slot and slot.metadata or {}
    otworzPodglad({
        akcja = 'podglad',
        typ = 'zdjecie',
        zdjecie = {
            src = m.src,
            format = m.format,
            podpis = m.podpis,
            crop = m.crop,
        },
    })
end)

local function dodajTarget(encja, punkt)
    exports.ox_target:addLocalEntity(encja, {
        {
            name = 'nb_printer_uzyj_' .. tostring(punkt.id),
            icon = 'fas fa-print',
            label = L('target_uzyj'),
            distance = Config.DystansTarget or 2.0,
            onSelect = function()
                NB.aktywna = {
                    id = punkt.id,
                    x = punkt.x,
                    y = punkt.y,
                    z = punkt.z,
                    model = punkt.model,
                }
                OtworzDrukarke()
            end,
        },
        {
            name = 'nb_printer_usun_' .. tostring(punkt.id),
            icon = 'fas fa-trash',
            label = L('target_usun'),
            distance = Config.DystansTarget or 2.0,
            canInteract = function()
                return NB.jestAdmin and type(punkt.id) == 'number'
            end,
            onSelect = function()
                local ok = lib.callback.await('nb_printer:usun', false, punkt.id)
                if ok then
                    powiadom('usunieto', 'success')
                else
                    powiadom('brak_uprawnien', 'error')
                end
            end,
        },
    })
end

local function usunProp(id)
    local ent = NB.encje[id]
    if ent then
        NB.nasze[ent] = nil
        if DoesEntityExist(ent) then
            pcall(function()
                exports.ox_target:removeLocalEntity(ent)
            end)
            DeleteEntity(ent)
        end
    end
    NB.encje[id] = nil
    if NB.blipy[id] then
        RemoveBlip(NB.blipy[id])
        NB.blipy[id] = nil
    end
end

local function stworzProp(punkt)
    local hash = ZaladujModel(punkt.model)
    if not hash then return end
    local obj = CreateObject(hash, punkt.x, punkt.y, punkt.z, false, false, false)
    SetModelAsNoLongerNeeded(hash)
    if not obj or obj == 0 then return end

    FreezeEntityPosition(obj, true)
    SetEntityHeading(obj, punkt.heading or 0.0)
    SetEntityInvincible(obj, true)
    SetEntityAsMissionEntity(obj, true, true)
    SetEntityCanBeDamaged(obj, false)

    NB.encje[punkt.id] = obj
    NB.nasze[obj] = punkt.id
    dodajTarget(obj, punkt)

    if Config.Blip and Config.Blip.wlaczone and type(punkt.id) == 'number' then
        local blip = AddBlipForCoord(punkt.x, punkt.y, punkt.z)
        SetBlipSprite(blip, Config.Blip.sprite or 525)
        SetBlipColour(blip, Config.Blip.kolor or 3)
        SetBlipScale(blip, Config.Blip.skala or 0.7)
        SetBlipAsShortRange(blip, true)
        BeginTextCommandSetBlipName('STRING')
        AddTextComponentSubstringPlayerName(L('blip_nazwa'))
        EndTextCommandSetBlipName(blip)
        NB.blipy[punkt.id] = blip
    end
end

local function punkty()
    local lista = {}
    for i = 1, #NB.drukarki do
        local d = NB.drukarki[i]
        local id = tonumber(d.id)
        if id and type(d.model) == 'string' then
            lista[#lista + 1] = {
                id = id,
                model = d.model,
                x = (tonumber(d.x) or 0.0) + 0.0,
                y = (tonumber(d.y) or 0.0) + 0.0,
                z = (tonumber(d.z) or 0.0) + 0.0,
                heading = (tonumber(d.heading) or 0.0) + 0.0,
            }
        end
    end

    for i = 1, #(Config.Lokacje or {}) do
        local l = Config.Lokacje[i]
        if not l.strefa and l.model and l.spawn ~= false and l.x and l.y and l.z then
            lista[#lista + 1] = {
                id = 'cfg-' .. i,
                model = l.model,
                x = l.x + 0.0,
                y = l.y + 0.0,
                z = l.z + 0.0,
                heading = (l.heading or 0.0) + 0.0,
            }
        end
    end

    return lista
end

local zajeteOdswiezanie = false

local function odswiezPropy()
    if zajeteOdswiezanie then return end
    zajeteOdswiezanie = true

    local chciane = punkty()
    local mapa = {}
    for i = 1, #chciane do
        mapa[chciane[i].id] = chciane[i]
    end

    local doUsuniecia = {}
    for id in pairs(NB.encje) do
        if not mapa[id] then doUsuniecia[#doUsuniecia + 1] = id end
    end
    for i = 1, #doUsuniecia do
        usunProp(doUsuniecia[i])
    end

    local ped = PlayerPedId()
    local tu = GetEntityCoords(ped)
    local spawn = Config.DystansSpawnu or 80.0
    local despawn = Config.DystansDespawnu or 100.0

    for i = 1, #chciane do
        local p = chciane[i]
        local odleglosc = #(tu - vector3(p.x, p.y, p.z))
        local jest = NB.encje[p.id] and DoesEntityExist(NB.encje[p.id])
        if jest and odleglosc >= despawn then
            usunProp(p.id)
        elseif not jest and odleglosc <= spawn then
            stworzProp(p)
        end
    end

    zajeteOdswiezanie = false
end

RegisterNetEvent('nb_printer:lista', function(lista)
    if type(lista) ~= 'table' then return end
    NB.drukarki = lista
end)

CreateThread(function()
    while true do
        odswiezPropy()
        Wait(1000)
    end
end)

CreateThread(function()
    while true do
        local czekaj = 1500
        local tu = GetEntityCoords(PlayerPedId())
        local blisko = false
        for _, ent in pairs(NB.encje) do
            if DoesEntityExist(ent) and #(GetEntityCoords(ent) - tu) < 12.0 then
                blisko = true
                break
            end
        end
        if blisko then
            czekaj = 500
            local auta = GetGamePool('CVehicle')
            for _, ent in pairs(NB.encje) do
                if DoesEntityExist(ent) and #(GetEntityCoords(ent) - tu) < 12.0 then
                    for i = 1, #auta do
                        SetEntityNoCollisionEntity(ent, auta[i], true)
                    end
                end
            end
        end
        Wait(czekaj)
    end
end)

CreateThread(function()
    if Config.TargetNaModelu then
        local hashe = {}
        for i = 1, #(Config.Modele or {}) do
            if Config.Modele[i].model then
                hashe[#hashe + 1] = joaat(Config.Modele[i].model)
            end
        end
        if #hashe > 0 then
            exports.ox_target:addModel(hashe, {
                {
                    name = 'nb_printer_model',
                    icon = 'fas fa-print',
                    label = L('target_uzyj'),
                    distance = Config.DystansTarget or 2.0,
                    canInteract = function(entity)
                        return not NB.nasze[entity]
                    end,
                    onSelect = function(data)
                        local coords = GetEntityCoords(data.entity)
                        NB.aktywna = {
                            x = coords.x,
                            y = coords.y,
                            z = coords.z,
                            model = GetEntityModel(data.entity),
                        }
                        OtworzDrukarke()
                    end,
                },
            })
            NB.hasheModeli = hashe
        end
    end

    for i = 1, #(Config.Lokacje or {}) do
        local l = Config.Lokacje[i]
        if l.strefa and l.x and l.y and l.z then
            local id = exports.ox_target:addSphereZone({
                coords = vec3(l.x, l.y, l.z),
                radius = l.promien or 1.2,
                debug = Config.Debug == true,
                options = {
                    {
                        name = 'nb_printer_strefa_' .. i,
                        icon = 'fas fa-print',
                        label = L('target_uzyj'),
                        distance = Config.DystansTarget or 2.0,
                        onSelect = function()
                            NB.aktywna = { x = l.x, y = l.y, z = l.z }
                            OtworzDrukarke()
                        end,
                    },
                },
            })
            if id then NB.strefy[#NB.strefy + 1] = id end
        end
    end
end)

CreateThread(function()
    Wait(1500)
    local lista = lib.callback.await('nb_printer:proszeListe', false)
    if type(lista) == 'table' then NB.drukarki = lista end
    while true do
        NB.jestAdmin = lib.callback.await('nb_printer:czyAdmin', false) == true
        Wait(60000)
    end
end)

AddEventHandler('onResourceStop', function(resource)
    if resource ~= GetCurrentResourceName() then return end
    zamknijFocus()
    for id in pairs(NB.encje) do
        usunProp(id)
    end
    for i = 1, #NB.strefy do
        pcall(function()
            exports.ox_target:removeZone(NB.strefy[i])
        end)
    end
    if NB.hasheModeli then
        pcall(function()
            exports.ox_target:removeModel(NB.hasheModeli, { 'nb_printer_model' })
        end)
    end
end)
