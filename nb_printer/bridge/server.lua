
Bridge = Bridge or {}

local ESX
local QB

local function framework()
    if GetResourceState('qbx_core') == 'started' then return 'qbx' end
    if GetResourceState('qb-core') == 'started' then return 'qb' end
    if GetResourceState('es_extended') == 'started' then return 'esx' end
    return 'standalone'
end

local function esx()
    if ESX then return ESX end
    ESX = exports.es_extended:getSharedObject()
    return ESX
end

local function qb()
    if QB then return QB end
    QB = exports['qb-core']:GetCoreObject()
    return QB
end

local function graczQb(src, fw)
    if fw == 'qbx' then
        local ok, player = pcall(function()
            return exports.qbx_core:GetPlayer(src)
        end)
        if ok then return player end
        return nil
    end
    local ok, player = pcall(function()
        return qb().Functions.GetPlayer(src)
    end)
    if ok then return player end
    return nil
end

local function sklej(imie, nazwisko)
    local calosc = ((imie or '') .. ' ' .. (nazwisko or '')):gsub('%s+', ' ')
    return calosc:gsub('^%s+', ''):gsub('%s+$', '')
end

function Bridge.Imie(src)
    local fw = framework()

    if fw == 'qbx' or fw == 'qb' then
        local player = graczQb(src, fw)
        local c = player and player.PlayerData and player.PlayerData.charinfo
        if c then
            local n = sklej(c.firstname, c.lastname)
            if n ~= '' then return n end
        end
    elseif fw == 'esx' then
        local player = esx().GetPlayerFromId(src)
        if player then
            if player.getName then
                local n = player.getName()
                if type(n) == 'string' and n ~= '' then return n end
            end
            if type(player.name) == 'string' and player.name ~= '' then
                return player.name
            end
        end
    end

    return GetPlayerName(src) or 'Nieznany'
end

function Bridge.Praca(src)
    local fw = framework()

    if fw == 'qbx' or fw == 'qb' then
        local player = graczQb(src, fw)
        local job = player and player.PlayerData and player.PlayerData.job
        return job and job.name or ''
    elseif fw == 'esx' then
        local player = esx().GetPlayerFromId(src)
        local job = player and player.job
        return job and job.name or ''
    end

    return ''
end

function Bridge.Stopien(src)
    local fw = framework()

    if fw == 'qbx' or fw == 'qb' then
        local player = graczQb(src, fw)
        local job = player and player.PlayerData and player.PlayerData.job
        local g = job and job.grade
        if type(g) == 'table' then return tonumber(g.level) or 0 end
        return tonumber(g) or 0
    elseif fw == 'esx' then
        local player = esx().GetPlayerFromId(src)
        local job = player and player.job
        if not job then return 0 end
        if type(job.grade) == 'table' then
            return tonumber(job.grade.grade or job.grade.level) or 0
        end
        return tonumber(job.grade) or 0
    end

    return 0
end

function Bridge.Identyfikator(src)
    local fw = framework()

    if fw == 'qbx' or fw == 'qb' then
        local player = graczQb(src, fw)
        local id = player and player.PlayerData and player.PlayerData.citizenid
        if type(id) == 'string' and id ~= '' then return id end
    elseif fw == 'esx' then
        local player = esx().GetPlayerFromId(src)
        if player and player.identifier and player.identifier ~= '' then
            return player.identifier
        end
    end

    local licencja = GetPlayerIdentifierByType(src, 'license')
    if licencja and licencja ~= '' then return licencja end
    return 'src:' .. tostring(src)
end

local function kontoEsx(konto)
    if konto == 'cash' or konto == 'money' then return 'money' end
    return konto or 'bank'
end

function Bridge.Pieniadze(src, konto)
    konto = konto or 'cash'
    local fw = framework()

    if fw == 'qbx' or fw == 'qb' then
        local player = graczQb(src, fw)
        if not player or not player.Functions or not player.Functions.GetMoney then return 0 end
        return player.Functions.GetMoney(konto) or 0
    elseif fw == 'esx' then
        local player = esx().GetPlayerFromId(src)
        if not player or not player.getAccount then return 0 end
        local acc = player.getAccount(kontoEsx(konto))
        return acc and acc.money or 0
    end

    return 0
end

function Bridge.ZabierzPieniadze(src, konto, kwota)
    kwota = math.floor(tonumber(kwota) or 0)
    if kwota <= 0 then return true end
    if Bridge.Pieniadze(src, konto) < kwota then return false end

    local fw = framework()
    if fw == 'qbx' or fw == 'qb' then
        local player = graczQb(src, fw)
        if not player then return false end
        return player.Functions.RemoveMoney(konto, kwota, 'nb_printer') ~= false
    elseif fw == 'esx' then
        local player = esx().GetPlayerFromId(src)
        if not player then return false end
        local kontoE = kontoEsx(konto)
        if player.removeAccountMoney then
            player.removeAccountMoney(kontoE, kwota, 'nb_printer')
            return true
        end
        if player.removeMoney and kontoE == 'money' then
            player.removeMoney(kwota)
            return true
        end
        return false
    end

    return false
end

function Bridge.OddajPieniadze(src, konto, kwota)
    kwota = math.floor(tonumber(kwota) or 0)
    if kwota <= 0 then return end

    local fw = framework()
    if fw == 'qbx' or fw == 'qb' then
        local player = graczQb(src, fw)
        if player then player.Functions.AddMoney(konto, kwota, 'nb_printer-zwrot') end
    elseif fw == 'esx' then
        local player = esx().GetPlayerFromId(src)
        if not player then return end
        local kontoE = kontoEsx(konto)
        if player.addAccountMoney then
            player.addAccountMoney(kontoE, kwota, 'nb_printer-zwrot')
        elseif player.addMoney and kontoE == 'money' then
            player.addMoney(kwota)
        end
    end
end

function Bridge.CzyAdmin(src)
    if src == 0 then return true end

    local ace = Config.Admin and Config.Admin.ace
    if type(ace) == 'string' and ace ~= '' and IsPlayerAceAllowed(src, ace) then
        return true
    end

    local fw = framework()

    if fw == 'qbx' then
        for i = 1, #(Config.Admin.grupy or {}) do
            local grupa = Config.Admin.grupy[i]
            local ok, ma = pcall(function()
                return exports.qbx_core:HasPermission(src, grupa)
            end)
            if ok and ma then return true end
        end
    elseif fw == 'qb' then
        for i = 1, #(Config.Admin.grupy or {}) do
            local ok, ma = pcall(function()
                return qb().Functions.HasPermission(src, Config.Admin.grupy[i])
            end)
            if ok and ma then return true end
        end
    elseif fw == 'esx' then
        local player = esx().GetPlayerFromId(src)
        local grupa = player and player.getGroup and player.getGroup() or ''
        for i = 1, #(Config.Admin.esx or {}) do
            if grupa == Config.Admin.esx[i] then return true end
        end
    end

    return false
end
