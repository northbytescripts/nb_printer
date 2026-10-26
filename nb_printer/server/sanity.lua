
Sanity = {}

local paleta = {}

local function odswiezPalete()
    paleta = {}
    for i = 1, #(Config.KoloryTekstu or {}) do
        local kolor = Config.KoloryTekstu[i].kolor
        if type(kolor) == 'string' then
            paleta[kolor:lower()] = true
        end
    end
end

function Sanity.Kolor(kolor)
    if type(kolor) ~= 'string' then return nil end
    local k = kolor:gsub('%s+', ''):lower()

    local r, g, b = k:match('^rgba?%((%d+),(%d+),(%d+)')
    if r then
        r, g, b = tonumber(r), tonumber(g), tonumber(b)
        if not r or not g or not b then return nil end
        if r > 255 or g > 255 or b > 255 then return nil end
        k = string.format('#%02x%02x%02x', r, g, b)
    end

    local hex = k:match('^#([0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f])$')
    if not hex then
        local krotki = k:match('^#([0-9a-f][0-9a-f][0-9a-f])$')
        if not krotki then return nil end
        hex = krotki:sub(1, 1) .. krotki:sub(1, 1)
            .. krotki:sub(2, 2) .. krotki:sub(2, 2)
            .. krotki:sub(3, 3) .. krotki:sub(3, 3)
    end

    k = '#' .. hex
    if not paleta[k] then return nil end
    return k
end

function Sanity.Escape(s)
    if type(s) ~= 'string' then return '' end
    s = s:gsub('&lt;', '\1'):gsub('&gt;', '\2'):gsub('&quot;', '\3'):gsub('&#39;', '\4'):gsub('&amp;', '&')
    s = s:gsub('&', '&amp;'):gsub('<', '&lt;'):gsub('>', '&gt;'):gsub('"', '&quot;')
    s = s:gsub('\1', '&lt;'):gsub('\2', '&gt;'):gsub('\3', '&quot;'):gsub('\4', '&#39;')
    return s
end

function Sanity.Tekst(html)
    if type(html) ~= 'string' then return '' end
    local t = html:gsub('<[^>]+>', ' ')
    t = t:gsub('&nbsp;', ' '):gsub('&amp;', '&'):gsub('&lt;', '<'):gsub('&gt;', '>'):gsub('&quot;', '"')
    t = t:gsub('%s+', ' '):gsub('^%s+', ''):gsub('%s+$', '')
    return t
end

local function dlugosc(s)
    return utf8.len(s) or #s
end

function Sanity.Html(html)
    if type(html) ~= 'string' then html = '' end
    if #html > (Config.MaksHtml or 8000) * 4 then return nil end

    html = html:gsub('%z', '')
    html = html:gsub('<!%-%-.-%-%->', '')
    html = html:gsub('<%s*[sS][cC][rR][iI][pP][tT]%s*.-</%s*[sS][cC][rR][iI][pP][tT]%s*>', '')
    html = html:gsub('<%s*[sS][tT][yY][lL][eE]%s*.-</%s*[sS][tT][yY][lL][eE]%s*>', '')

    local out = {}
    local stos = {}
    local i = 1
    local n = #html

    local function dopisz(s)
        out[#out + 1] = s
    end

    local mapa = {
        b = 'b', strong = 'b',
        i = 'i', em = 'i',
        u = 'u',
        div = 'div', p = 'div',
        span = 'span', font = 'span',
    }

    while i <= n do
        local lt = html:find('<', i, true)
        if not lt then
            dopisz(Sanity.Escape(html:sub(i)))
            break
        end
        if lt > i then
            dopisz(Sanity.Escape(html:sub(i, lt - 1)))
        end

        local gt = html:find('>', lt + 1, true)
        if not gt then
            dopisz(Sanity.Escape(html:sub(lt)))
            break
        end

        local wnetrze = html:sub(lt + 1, gt - 1)
        local zamkniecie = wnetrze:match('^%s*/%s*([%w]+)')

        if zamkniecie then
            local oczekiwany = mapa[zamkniecie:lower()]
            if oczekiwany then
                while stos[#stos] == 'plain' do
                    table.remove(stos)
                end
                if stos[#stos] == oczekiwany then
                    table.remove(stos)
                    dopisz('</' .. oczekiwany .. '>')
                end
            end
        else
            local surowa = wnetrze:match('^%s*([%w]+)')
            local nazwa = surowa and surowa:lower() or ''
            if nazwa == 'br' then
                dopisz('<br>')
            elseif nazwa == 'b' or nazwa == 'strong' then
                dopisz('<b>')
                stos[#stos + 1] = 'b'
            elseif nazwa == 'i' or nazwa == 'em' then
                dopisz('<i>')
                stos[#stos + 1] = 'i'
            elseif nazwa == 'u' then
                dopisz('<u>')
                stos[#stos + 1] = 'u'
            elseif nazwa == 'div' or nazwa == 'p' then
                dopisz('<div>')
                stos[#stos + 1] = 'div'
            elseif nazwa == 'span' or nazwa == 'font' then
                local kolor
                if nazwa == 'font' then
                    kolor = wnetrze:match('[cC][oO][lL][oO][rR]%s*=%s*"([^"]+)"')
                        or wnetrze:match("[cC][oO][lL][oO][rR]%s*=%s*'([^']+)'")
                        or wnetrze:match('[cC][oO][lL][oO][rR]%s*=%s*(#[0-9a-fA-F]+)')
                else
                    local style = wnetrze:match('[sS][tT][yY][lL][eE]%s*=%s*"([^"]*)"')
                        or wnetrze:match("[sS][tT][yY][lL][eE]%s*=%s*'([^']*)'")
                    if style then
                        kolor = style:match('[cC][oO][lL][oO][rR]%s*:%s*([^;]+)')
                    end
                end
                local ok = Sanity.Kolor(kolor)
                if ok then
                    dopisz('<span style="color:' .. ok .. '">')
                    stos[#stos + 1] = 'span'
                else
                    stos[#stos + 1] = 'plain'
                end
            end
        end

        i = gt + 1
    end

    for j = #stos, 1, -1 do
        if stos[j] ~= 'plain' then
            dopisz('</' .. stos[j] .. '>')
        end
    end

    local wynik = table.concat(out)
    if #wynik > (Config.MaksHtml or 8000) then return nil end
    if dlugosc(Sanity.Tekst(wynik)) > (Config.MaksZnakow or 1200) then return nil end
    return wynik
end

function Sanity.Tytul(s)
    if type(s) ~= 'string' then return nil end
    s = s:gsub('<[^>]*>', ''):gsub('%c', ' '):gsub('%s+', ' ')
    s = s:gsub('^%s+', ''):gsub('%s+$', '')
    local ile = dlugosc(s)
    if ile < 1 or ile > (Config.MaksTytul or 60) then return nil end
    return s
end

function Sanity.Podpis(s, max)
    s = type(s) == 'string' and s or ''
    s = s:gsub('<[^>]*>', ''):gsub('%c', ' '):gsub('%s+', ' ')
    s = s:gsub('^%s+', ''):gsub('%s+$', '')
    if dlugosc(s) > max then return nil end
    return s
end

function Sanity.Utnij(s, max)
    s = type(s) == 'string' and s or ''
    s = s:gsub('<[^>]*>', ''):gsub('%c', ' ')
    local ile = utf8.len(s)
    if not ile then return '' end
    if ile <= max then return s end
    local koniec = utf8.offset(s, max + 1)
    if not koniec then return s end
    return s:sub(1, koniec - 1)
end

function Sanity.Liczba(v, min, max, dom)
    local n = tonumber(v)
    if not n or n ~= n or n == math.huge or n == -math.huge then return dom end
    if n < min then return min end
    if n > max then return max end
    return n
end

local function rozszerzeniePasuje(ext)
    ext = ext:lower()
    local dozwolone = {}
    for i = 1, #(Config.Rozszerzenia or {}) do
        dozwolone[Config.Rozszerzenia[i]:lower()] = true
    end
    if dozwolone[ext] then return true end
    if (ext == 'jpg' or ext == 'jpeg') and (dozwolone.jpg or dozwolone.jpeg) then
        return true
    end
    return false
end

local function hostPasuje(host)
    host = host:lower()
    for i = 1, #(Config.Domeny or {}) do
        local d = tostring(Config.Domeny[i]):lower():gsub('^%*%.', '')
        if host == d or host:sub(-#d - 1) == '.' .. d then
            return true
        end
    end
    return false
end

function Sanity.Url(url)
    if type(url) ~= 'string' then return nil end
    url = url:gsub('^%s+', ''):gsub('%s+$', '')
    url = url:gsub('^["\'<]+', ''):gsub('["\'>]+$', '')
    if #url == 0 or #url > (Config.MaksUrl or 2000) then return nil end
    if url:find('["\'\\<>%s]') then return nil end

    local host, reszta = url:match('^https?://([^/%?#]+)([^%s]*)$')
    if not host or reszta == nil then return nil end
    host = host:lower():gsub(':%d+$', '')
    if not hostPasuje(host) then return nil end

    local sciezka = reszta:match('^[^%?#]*') or ''
    local ext = sciezka:match('%.([%w]+)$')
    if ext and not rozszerzeniePasuje(ext) then return nil end
    return url
end

function Sanity.Zdjecia(lista)
    if lista == nil then return {} end
    if type(lista) ~= 'table' then return nil end

    local max = (Config.Zdjecie and Config.Zdjecie.maxIlosc) or 5
    if #lista > max then return nil end

    local minW = (Config.Zdjecie and Config.Zdjecie.minSzerokosc) or 70
    local maxW = (Config.Zdjecie and Config.Zdjecie.maxSzerokosc) or 520
    local domW = (Config.Zdjecie and Config.Zdjecie.szerokosc) or 190
    local wynik = {}

    for i = 1, #lista do
        local z = lista[i]
        if type(z) ~= 'table' then return nil end
        local src = Sanity.Url(z.src)
        if not src then return nil end
        wynik[#wynik + 1] = {
            src = src,
            x = Sanity.Liczba(z.x, -300, 860, 34),
            y = Sanity.Liczba(z.y, -300, 1400, 26),
            w = Sanity.Liczba(z.w, minW, maxW, domW),
            rot = Sanity.Liczba(z.rot, -180, 180, 0),
        }
    end

    return wynik
end

function Sanity.Kadr(c, maxZoom)
    c = type(c) == 'table' and c or {}
    return {
        x = Sanity.Liczba(c.x, 0, 1, 0.5),
        y = Sanity.Liczba(c.y, 0, 1, 0.5),
        zoom = Sanity.Liczba(c.zoom, 1, maxZoom or 4, 1),
    }
end

local function hashBezZnaku(n)
    n = tonumber(n)
    if not n then return nil end
    if n < 0 then n = n + 4294967296 end
    return n
end

function Sanity.Model(model)
    if model == nil then return nil end
    for i = 1, #(Config.Modele or {}) do
        local nazwa = Config.Modele[i].model
        if type(nazwa) == 'string' then
            if model == nazwa then return nazwa end
            local podany = tonumber(model)
            if podany and hashBezZnaku(joaat(nazwa)) == hashBezZnaku(podany) then
                return nazwa
            end
        end
    end
    return nil
end

odswiezPalete()
