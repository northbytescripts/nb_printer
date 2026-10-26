
local function powiadom(klucz, typ)
    lib.notify({
        title = L('powiadomienie'),
        description = L(klucz),
        type = typ or 'inform',
    })
end

local function kierunekKamery(rot)
    local z = math.rad(rot.z)
    local x = math.rad(rot.x)
    local num = math.abs(math.cos(x))
    return vector3(-math.sin(z) * num, math.cos(z) * num, math.sin(x))
end

local function punktCelownika(ignoruj)
    local cam = GetGameplayCamCoord()
    local dir = kierunekKamery(GetGameplayCamRot(2))
    local zasieg = (Config.Admin and Config.Admin.zasieg) or 8.0
    local cel = cam + dir * zasieg
    local test = StartExpensiveSynchronousShapeTestLosProbe(
        cam.x, cam.y, cam.z,
        cel.x, cel.y, cel.z,
        1 + 16,
        ignoruj or PlayerPedId(),
        4
    )
    local _, trafienie, pos = GetShapeTestResult(test)
    if trafienie == 1 then return pos end

    local ped = PlayerPedId()
    local tu = GetEntityCoords(ped)
    local przod = GetEntityForwardVector(ped)
    return vector3(tu.x + przod.x * 1.5, tu.y + przod.y * 1.5, tu.z)
end

local function krokGdyTrzymany(kod, stan, coIle)
    if IsDisabledControlPressed(0, kod) then
        local teraz = GetGameTimer()
        if not stan[kod] or teraz - stan[kod] >= coIle then
            stan[kod] = teraz
            return true
        end
        return false
    end
    stan[kod] = nil
    return false
end

local function pageRaz(kod, stan)
    local ok, wcisniety = pcall(IsRawKeyDown, kod)
    local teraz = ok and wcisniety or false
    local klik = teraz and not stan[kod]
    if teraz and stan.czas and GetGameTimer() - stan.czas >= 90 then
        klik = true
    end
    if klik then stan.czas = GetGameTimer() end
    stan[kod] = teraz
    if not teraz then stan.czas = nil end
    return klik
end

local function posprzatajHologram()
    NB.stawia = false
    lib.hideTextUI()
    if NB.hologram and DoesEntityExist(NB.hologram) then
        DeleteEntity(NB.hologram)
    end
    NB.hologram = nil
end

function PostawHologram()
    if NB.stawia then return end
    local nazwa = NB.model or (Config.Modele[1] and Config.Modele[1].model)
    local hash = ZaladujModel(nazwa)
    if not hash then
        powiadom('model_zly', 'error')
        return
    end

    local ped = PlayerPedId()
    local tu = GetEntityCoords(ped)
    local obj = CreateObject(hash, tu.x, tu.y, tu.z, false, false, false)
    SetModelAsNoLongerNeeded(hash)
    if not obj or obj == 0 then
        powiadom('model_zly', 'error')
        return
    end

    SetEntityAlpha(obj, 160, false)
    SetEntityCollision(obj, false, false)
    FreezeEntityPosition(obj, true)
    NB.hologram = obj
    NB.stawia = true

    local heading = GetEntityHeading(ped)
    local wysokosc = 0.0
    local stanKlawiszy = {}
    local pageUp = {}
    local pageDown = {}
    local krok = (Config.Admin and Config.Admin.krokObrotu) or 15
    local krokZ = (Config.Admin and Config.Admin.krokWysokosci) or 0.05

    lib.showTextUI(table.concat({
        L('holo_scroll'),
        L('holo_wys'),
        L('holo_e'),
        L('holo_anuluj'),
    }, '\n'))

    CreateThread(function()
        while NB.stawia and DoesEntityExist(obj) do
            Wait(0)

            local blokuj = { 24, 25, 14, 15, 16, 17, 37, 38, 44, 140, 141, 142, 174, 175, 177, 194, 202, 241, 242 }
            for i = 1, #blokuj do
                DisableControlAction(0, blokuj[i], true)
            end

            if IsDisabledControlJustPressed(0, 241) or IsDisabledControlJustPressed(0, 15) or krokGdyTrzymany(174, stanKlawiszy, 120) then
                heading = (heading - krok) % 360.0
            end
            if IsDisabledControlJustPressed(0, 242) or IsDisabledControlJustPressed(0, 14) or krokGdyTrzymany(175, stanKlawiszy, 120) then
                heading = (heading + krok) % 360.0
            end

            local wyzej = pageRaz(0x21, pageUp) or IsDisabledControlJustPressed(0, 10)
            local nizej = pageRaz(0x22, pageDown) or IsDisabledControlJustPressed(0, 11)
            if wyzej then wysokosc = math.min(3.0, wysokosc + krokZ) end
            if nizej then wysokosc = math.max(-2.0, wysokosc - krokZ) end

            local hit = punktCelownika(obj)
            SetEntityCoordsNoOffset(obj, hit.x, hit.y, hit.z + wysokosc, false, false, false)
            SetEntityHeading(obj, heading)

            if IsDisabledControlJustPressed(0, 38) then
                local koncowe = GetEntityCoords(obj)
                local kat = GetEntityHeading(obj)
                posprzatajHologram()
                local wynik = lib.callback.await('nb_printer:postaw', false, {
                    model = nazwa,
                    x = koncowe.x,
                    y = koncowe.y,
                    z = koncowe.z,
                    heading = kat,
                })
                if wynik and wynik.ok then
                    powiadom('postawiono', 'success')
                else
                    powiadom((wynik and wynik.klucz) or 'blad_zapis', 'error')
                end
                return
            end

            if IsDisabledControlJustPressed(0, 177)
                or IsDisabledControlJustPressed(0, 194)
                or IsDisabledControlJustPressed(0, 202)
                or IsDisabledControlJustPressed(0, 25) then
                posprzatajHologram()
                powiadom('anulowano', 'inform')
                return
            end
        end

        posprzatajHologram()
    end)
end

local function menuModeli()
    local opcje = {}
    for i = 1, #(Config.Modele or {}) do
        local m = Config.Modele[i]
        opcje[#opcje + 1] = {
            title = m.etykieta or m.model,
            description = m.model,
            icon = (NB.model == m.model) and 'check' or 'print',
            onSelect = function()
                NB.model = m.model
                OtworzMenuAdmina()
            end,
        }
    end
    lib.registerContext({
        id = 'nb_printer_modele',
        title = L('menu_model'),
        menu = 'nb_printer_admin',
        options = opcje,
    })
    lib.showContext('nb_printer_modele')
end

local function menuListy()
    local lista = lib.callback.await('nb_printer:proszeListe', false)
    if type(lista) == 'table' then NB.drukarki = lista end

    if not NB.drukarki or #NB.drukarki == 0 then
        powiadom('brak_drukarek', 'inform')
        return
    end

    local opcje = {}
    for i = 1, #NB.drukarki do
        local d = NB.drukarki[i]
        local id = tonumber(d.id)
        local x, y, z = tonumber(d.x) or 0.0, tonumber(d.y) or 0.0, tonumber(d.z) or 0.0
        opcje[#opcje + 1] = {
            title = ('#%s  %s'):format(id or '?', d.model or ''),
            description = ('%.1f, %.1f, %.1f'):format(x, y, z),
            icon = 'print',
            onSelect = function()
                lib.registerContext({
                    id = 'nb_printer_jedna',
                    title = '#' .. tostring(id),
                    menu = 'nb_printer_lista',
                    options = {
                        {
                            title = L('teleport'),
                            icon = 'location-dot',
                            onSelect = function()
                                SetEntityCoords(PlayerPedId(), x, y, z + 1.0, false, false, false, false)
                            end,
                        },
                        {
                            title = L('target_usun'),
                            icon = 'trash',
                            onSelect = function()
                                local odp = lib.alertDialog({
                                    header = L('usun_pytanie'),
                                    centered = true,
                                    cancel = true,
                                    labels = { confirm = L('potwierdz'), cancel = L('anuluj') },
                                })
                                if odp ~= 'confirm' then return end
                                local ok = lib.callback.await('nb_printer:usun', false, id)
                                if ok then
                                    powiadom('usunieto', 'success')
                                else
                                    powiadom('brak_uprawnien', 'error')
                                end
                            end,
                        },
                    },
                })
                lib.showContext('nb_printer_jedna')
            end,
        }
    end

    lib.registerContext({
        id = 'nb_printer_lista',
        title = L('menu_lista'),
        menu = 'nb_printer_admin',
        options = opcje,
    })
    lib.showContext('nb_printer_lista')
end

function OtworzMenuAdmina()
    lib.registerContext({
        id = 'nb_printer_admin',
        title = L('menu_admin'),
        options = {
            {
                title = L('menu_postaw'),
                description = NB.model or '',
                icon = 'plus',
                onSelect = function()
                    PostawHologram()
                end,
            },
            {
                title = L('menu_model'),
                description = L('menu_model_opis'),
                icon = 'cubes',
                onSelect = function()
                    menuModeli()
                end,
            },
            {
                title = L('menu_lista'),
                icon = 'list',
                onSelect = function()
                    menuListy()
                end,
            },
        },
    })
    lib.showContext('nb_printer_admin')
end

-- /drukarkaadmin (nazwa z wytycznych) i stara nazwa /printeradmin robią to samo.
-- Uprawnienia i tak sprawdza serwer przy każdej akcji.
local function komendaAdmina()
    local admin = lib.callback.await('nb_printer:czyAdmin', false)
    NB.jestAdmin = admin == true
    if not NB.jestAdmin then
        powiadom('brak_uprawnien', 'error')
        return
    end
    OtworzMenuAdmina()
end

RegisterCommand('drukarkaadmin', komendaAdmina, false)
RegisterCommand('printeradmin', komendaAdmina, false)

CreateThread(function()
    Wait(1000)
    TriggerEvent('chat:addSuggestion', '/drukarkaadmin', L('cmd_opis'))
    TriggerEvent('chat:addSuggestion', '/printeradmin', L('cmd_opis'))
end)

AddEventHandler('onResourceStop', function(resource)
    if resource ~= GetCurrentResourceName() then return end
    posprzatajHologram()
end)
