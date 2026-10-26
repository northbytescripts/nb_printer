
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

local function sklej(imie, nazwisko)
    local calosc = ((imie or '') .. ' ' .. (nazwisko or '')):gsub('%s+', ' ')
    calosc = calosc:gsub('^%s+', ''):gsub('%s+$', '')
    if calosc == '' then return nil end
    return calosc
end

function Bridge.Imie()
    local fw = framework()

    if fw == 'qbx' then
        local dane = exports.qbx_core:GetPlayerData()
        local c = dane and dane.charinfo
        if c then return sklej(c.firstname, c.lastname) end
    elseif fw == 'qb' then
        local dane = qb().Functions.GetPlayerData()
        local c = dane and dane.charinfo
        if c then return sklej(c.firstname, c.lastname) end
    elseif fw == 'esx' then
        local dane = esx().GetPlayerData()
        if dane then
            if dane.firstName or dane.lastName then
                return sklej(dane.firstName, dane.lastName)
            end
            if type(dane.name) == 'string' and dane.name ~= '' then
                return dane.name
            end
        end
    end

    return GetPlayerName(PlayerId()) or ''
end

function Bridge.Praca()
    local fw = framework()

    if fw == 'qbx' then
        local dane = exports.qbx_core:GetPlayerData()
        return dane and dane.job and dane.job.name or ''
    elseif fw == 'qb' then
        local dane = qb().Functions.GetPlayerData()
        return dane and dane.job and dane.job.name or ''
    elseif fw == 'esx' then
        local dane = esx().GetPlayerData()
        return dane and dane.job and dane.job.name or ''
    end

    return ''
end
