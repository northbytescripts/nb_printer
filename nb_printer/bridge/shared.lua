
Slownik = {}

local function wczytaj(kod)
    local surowe = LoadResourceFile(GetCurrentResourceName(), ('locales/%s.json'):format(kod))
    if not surowe or surowe == '' then return nil end
    local ok, dane = pcall(json.decode, surowe)
    if ok and type(dane) == 'table' then return dane end
    return nil
end

Slownik = wczytaj(Config.Jezyk or 'en') or wczytaj('en') or {}

function L(klucz, ...)
    local tekst = Slownik[klucz]
    if type(tekst) ~= 'string' then
        tekst = tostring(klucz)
    end

    local args = { ... }
    if #args == 0 then return tekst end

    local i = 0
    return (tekst:gsub('%%s', function()
        i = i + 1
        if args[i] == nil then return '' end
        return tostring(args[i])
    end))
end
