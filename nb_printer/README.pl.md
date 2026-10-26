# nb_printer

Stacja wydruku Northbyte do FiveM. Gracz podchodzi do drukarki (ox_target), składa dokument, kopię albo zdjęcie, a przedmiot ląduje w ox_inventory. Wygląd panelu jest ten sam co w `podglad.html`.

Działa na **Qbox** (`qbx_core`). QBCore i ESX łapie sam, po starcie tych resource’ów.

## Zależności

- [ox_lib](https://github.com/overextended/ox_lib)
- [ox_inventory](https://github.com/overextended/ox_inventory)
- [ox_target](https://github.com/overextended/ox_target)
- [oxmysql](https://github.com/overextended/oxmysql) — tylko gdy `Config.Zapis = 'oxmysql'`. Bez niego drukarki admina lecą do `printers.json`.
- OneSync (serwer musi znać pozycję gracza).

Kolejność w `server.cfg`:

```cfg
ensure oxmysql
ensure ox_lib
ensure qbx_core
ensure ox_inventory
ensure ox_target
ensure nb_printer
```

Na QBCore zamiast `qbx_core` daj `qb-core`. Na ESX daj `es_extended`.

## Instalacja

1. Wgraj folder `nb_printer` do `resources`.
2. Dopisz trzy przedmioty z `ox_items.lua` do `ox_inventory/data/items.lua`.
3. Daj papier graczom (sklep, crafting, `/giveitem`). Bez przedmiotu `paper` wydruku nie będzie.
4. Uprawnienie admina w `server.cfg`:

```cfg
add_ace group.admin nb_printer.admin allow
add_ace group.god nb_printer.admin allow
```

5. `ensure nb_printer` i restart `ox_inventory` (żeby wczytał nowe przedmioty).

Tabelę `nb_printers` skrypt zakłada sam. Plik `nb_printer.sql` jest na ręczny import.

## Jak gracze tego używają

- Oko na drukarce z listy modeli albo na propie postawionym komendą: **Użyj drukarki**.
- **Stwórz** — tytuł, treść, podpis, zdjęcia z linku. Serwer robi przedmiot `printed_document`. Nazwa na slocie to tytuł. Opis ma kod, np. `NB-2026-4821`.
- **Kopiuj** — kopie dokumentu, który naprawdę leży w ekwipunku. Ten sam kod, w opisie dopisek `KOPIA`.
- **Zdjęcie** — odbitka `printed_photo`. Nazwa to podpis albo „Zdjęcie”.
- Kliknięcie wydruku w ekwipunku otwiera podgląd tylko do odczytu.
- Każdy arkusz (dokument, kopia, zdjęcie) zjada papier. Domyślnie też obowiązuje limit **5 wydruków na 5 minut**.

## Komenda admina

`/drukarkaadmin` (działa też stara nazwa `/printeradmin`)

Menu ox_lib:

- **Postaw drukarkę** — hologram jedzie za celownikiem. Scroll albo strzałki obracają, PageUp / PageDown zmieniają wysokość, E stawia, Backspace albo prawy przycisk myszy anuluje.
- **Wybierz model** — prop z `Config.Modele`.
- **Lista drukarek** — teleport albo usunięcie.

To samo usuwanie jest na ox_target (**Usuń drukarkę**), widoczne tylko dla admina. Prop powstaje u gracza, gdy podejdzie bliżej niż `Config.DystansSpawnu`, i znika dalej niż `Config.DystansDespawnu`.

Admin to ace `nb_printer.admin` albo grupa z `Config.Admin` (`admin` / `god` na Qbox i QB, `admin` / `superadmin` na ESX).

## Config

Wszystko siedzi w `config.lua`.

| Ustawienie | Po co |
| --- | --- |
| `Config.Jezyk` | `pl` albo `en`. Teksty są w `locales/`. |
| `Config.Wyglad` | Kolory, logo, nazwa „Northbyte”, podtytuł, zaokrąglenia. Domyślne wartości nie zmieniają wyglądu podglądu. |
| `Config.Szablony` | Karty dokumentów. `jobs = { 'police' }` zostawia szablon tylko tej pracy. `nil` = każdy. |
| `Config.Tryby` | Wyłączenie karty Stwórz, Kopiuj albo Zdjęcie (`wlaczony = false`). |
| `Config.Papier` | Przedmiot i ile sztuk schodzi na jeden wydruk. |
| `Config.Limit` | Ile wydruków w oknie sekund. Kopia i zdjęcie liczą się osobno. |
| `Config.Koszt` | Opcjonalna opłata (`wlaczone = true`). Na ESX `cash` to konto `money`. |
| `Config.Domeny` | Hosty zdjęć (imgur, fivemanage, discord). Innych serwer nie przyjmie. base64 jest wyłączony. |
| `Config.Modele` | Propy pod target i pod hologram. |
| `Config.Lokacje` | Stałe miejsca: prop albo sama strefa `strefa = true`. |
| `Config.Zapis` | `oxmysql` albo `json`. |
| `Config.TylkoZnaneLokalizacje` | `true` = działają tylko drukarki z komendy i z `Config.Lokacje`. Bezpieczniejsze. `false` pozwala użyć drukarki już stojącej na mapie (serwer nie widzi tego propa, tylko współrzędne). |

Po zmianie configu: `ensure nb_printer`.

## Pliki

| Plik | Rola |
| --- | --- |
| `fxmanifest.lua` | Lista plików dla FiveM. |
| `config.lua` | Ustawienia serwera. |
| `locales/pl.json`, `en.json` | Teksty Lua i NUI. |
| `bridge/` | Imię, praca, pieniądze, admin. Sam wykrywa Qbox, QBCore albo ESX. |
| `client/main.lua` | Target, NUI, przedmioty, spawnowanie propów. |
| `client/admin.lua` | `/printeradmin` i hologram. |
| `server/sanity.lua` | Czyszczenie HTML i adresów zdjęć. |
| `server/drukarki.lua` | Zapis i lista postawionych drukarek. |
| `server/main.lua` | Wydruk, kopia, zdjęcie, limit, papier. |
| `web/` | Interfejs (HTML, CSS, JS). |
| `ox_items.lua` | Gotowe wpisy do ox_inventory. Manifest tego nie ładuje. |
| `nb_printer.sql` | Tabela `nb_printers`. |
| `printers.json` | Zapasowy zapis, gdy nie ma bazy. |
