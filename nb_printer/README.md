<p align="center">
  <img src="images/banner.png" alt="nb_printer – Document Printer by Northbyte" width="100%">
</p>

<h1 align="center">nb_printer – Document Printer</h1>

<p align="center">
  A free print station for FiveM: create documents, copy them and print photos, all as real <code>ox_inventory</code> items.<br>
  Built for <b>Qbox</b>, with QBCore and ESX detected automatically.
</p>

<p align="center">
  <a href="https://discord.gg/cvBmHzVqEJ">Discord</a> ·
  <a href="VIDEO_LINK">Video preview</a> ·
  <a href="https://github.com/northbytescripts/nb_printer/releases">Download</a>
</p>

---

## What it does

A player walks up to a printer and uses ox_target to open a panel with three modes:

- **Create**: write a document from a template.
- **Copy**: duplicate a document you already carry.
- **Photo**: print an image from a URL.

Every result is an inventory item with metadata. Using it opens a read-only preview, so documents can be handed over, shown and copied in roleplay. The server checks every print (job access, distance, paper, limits and content), so the NUI is never trusted on its own.

## Screenshots

| Templates | Editor with live preview |
| --- | --- |
| ![Templates](images/templates.png) | ![Create](images/create.png) |
| **Copy from inventory** | **Photo print** |
| ![Copy](images/copy.png) | ![Photo](images/photo.png) |

## Features

**Create documents**
- Six templates out of the box: Plain (general document), LSPD, EMS, DOJ, LSC and FDR. Each one sets the header bar colour, icon and subtitle.
- Live preview: the sheet on the left updates as you type.
- Rich text: **bold**, *italic*, underline, a text colour palette and clear formatting. The server strips any other markup and any colour outside `Config.KoloryTekstu`.
- Optional signature using the character's name.
- Up to 5 images per document (`Config.Zdjecie.maxIlosc`) from a URL. Drag them on the sheet, resize them and rotate them.
- Each document gets a code such as `NB-2026-4821` (the prefix is configurable). The item is named after the document title.

**Copy documents**
- The Copy screen lists the `printed_document` items in your inventory, with search and filters by template.
- The server reads the original from your actual inventory slot. Players cannot copy a document they do not carry.
- 1–5 copies per run, with an optional **COPY** watermark. Copies keep the original code and get a copy suffix in the description.

**Print photos**
- Load an image from a URL, then crop it with drag and zoom.
- Four formats: Square, Landscape, Portrait and Polaroid. Polaroid adds a caption area.
- Optional caption (up to 32 characters by default), and up to 5 copies.

**Economy and abuse limits**
- Every sheet uses a `paper` item (`Config.Papier`; set it to `0` to turn this off).
- Rate limit: 5 prints per 300 seconds by default, plus a 3-second cooldown. Each copy and each photo counts as one print.
- Optional fee per document, copy or photo, paid from cash or bank (off by default).
- Inventory space is checked before anything is taken. If a print still fails to land in the inventory, its paper and fee are refunded.

**Admin placement**
- `/drukarkaadmin` (alias `/printeradmin`) opens an ox_lib menu with three options: place a printer, choose a model, or list printers (teleport to one or delete it).
- When placing, a hologram follows your crosshair. Scroll or the arrow keys rotate it, PageUp/PageDown change its height, **E** places it, and Backspace or right mouse cancels.
- Placed printers are stored in MySQL (`oxmysql`). If oxmysql is not running, they fall back to `printers.json`.
- Admins also get a **Remove printer** option on ox_target.
- Props spawn on the client only near players (80 m spawn / 100 m despawn by default).

**Targeting**
- ox_target on the printer models in `Config.Modele`, which also works on printers already placed on the map.
- On printers placed with the admin command.
- On fixed spots in `Config.Lokacje`, either as a spawned prop or as a target sphere only, for interiors that already have a printer.

**Configuration**
- English and Polish locales (`locales/en.json`, `locales/pl.json`).
- Panel colours, corner radius, brand name, subtitle and logo (or no logo).
- Templates: name, colour, icon, light or dark header, and job/grade restrictions. Modes can also be turned off or job-restricted.
- Text palette, image domain whitelist, allowed file extensions, size limits, photo formats, item names, document code prefix and description format.
- Optional map blip and print sound.

**Server-side security**
- Template and mode job checks are repeated on the server for printing and for copying.
- The server checks distance to the printer. Admin place and delete actions check permission.
- Title, content and HTML length limits are enforced on the server (`Config.MaksTytul`, `MaksZnakow`, `MaksHtml`, `MaksUrl`).
- The HTML is cleaned against a whitelist of tags and palette colours.
- Image URLs must use an allowed domain (imgur, fivemanage and Discord CDN by default) and extension. base64 images are rejected.
- Images are fetched through the server with a per-player rate limit, a size cap and a file-type check.

## Dependencies

- [ox_lib](https://github.com/overextended/ox_lib)
- [ox_inventory](https://github.com/overextended/ox_inventory)
- [ox_target](https://github.com/overextended/ox_target)
- [oxmysql](https://github.com/overextended/oxmysql): only needed with `Config.Zapis = 'oxmysql'` (the default). Without it, placed printers are saved to `printers.json`.
- One of these frameworks: `qbx_core`, `qb-core` or `es_extended`
- OneSync, because the server needs player positions

## Installation

1. Download the latest release and put the `nb_printer` folder in your `resources` directory.
2. Set the start order in `server.cfg`:

   ```cfg
   ensure oxmysql
   ensure ox_lib
   ensure qbx_core        # or qb-core / es_extended
   ensure ox_inventory
   ensure ox_target
   ensure nb_printer
   ```

3. **Database.** The script creates the `nb_printers` table on start when oxmysql is running. To create it yourself, import `nb_printer.sql`:

   ```sql
   CREATE TABLE IF NOT EXISTS `nb_printers` (
       `id` INT NOT NULL AUTO_INCREMENT,
       `model` VARCHAR(64) NOT NULL,
       `x` DOUBLE NOT NULL,
       `y` DOUBLE NOT NULL,
       `z` DOUBLE NOT NULL,
       `heading` DOUBLE NOT NULL DEFAULT 0,
       PRIMARY KEY (`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
   ```

4. **Items.** Add these to `ox_inventory/data/items.lua` (the same code is in `ox_items.lua`):

   ```lua
   ['paper'] = {
       label = 'Sheet of paper',
       weight = 5,
       stack = true,
       close = false,
       description = 'A blank sheet for the printer.',
   },

   ['printed_document'] = {
       label = 'Document',
       weight = 10,
       stack = false,
       close = true,
       consume = 0,
       description = 'A printed document.',
       client = {
           export = 'nb_printer.uzyjDokument',
       },
   },

   ['printed_photo'] = {
       label = 'Photo',
       weight = 10,
       stack = false,
       close = true,
       consume = 0,
       description = 'A printed photo.',
       client = {
           export = 'nb_printer.uzyjZdjecie',
       },
   },
   ```

5. **Admin permission.** Add this to `server.cfg`:

   ```cfg
   add_ace group.admin nb_printer.admin allow
   ```

   The framework groups in `Config.Admin` also work: `admin`/`god` on Qbox and QBCore, `admin`/`superadmin` on ESX.

6. **Paper.** Make `paper` available to players through a shop, crafting or `/giveitem`. With the default config, nothing prints without paper.
7. Restart `ox_inventory` so it loads the new items, then `ensure nb_printer`.

> **Recommended:** if you only use printers placed with `/drukarkaadmin` or listed in `Config.Lokacje`, set `Config.TylkoZnaneLokalizacje = true`.
> With the default `false`, players can also use printers that are already on the map. For those, the server has to trust the coordinates the client sends, so a cheater could print from anywhere. Paper and the rate limit still apply.

## Configuration overview

Everything is in `config.lua`. Most keys have Polish names, and each one has an English comment. Run `ensure nb_printer` after changes.

| Setting | What it controls |
| --- | --- |
| `Config.Jezyk` | UI language: `'en'` or `'pl'` |
| `Config.Wyglad` | Accent colours, background, corner radius, brand name, subtitle, logo |
| `Config.Szablony` | Document templates: name, subtitle, colour, icon, light header, `jobs` restrictions |
| `Config.Tryby` | Menu modes (Create / Copy / Photo): enable, colour, icon, `jobs` |
| `Config.Papier` | Paper item name and sheets used per print |
| `Config.Limit` / `Config.Cooldown` | Rate limit window and minimum gap between prints |
| `Config.Koszt` | Optional fee (`cash` / `bank`) per document, copy or photo |
| `Config.MaksTytul`, `MaksZnakow`, `MaksHtml`, `MaksUrl` | Content limits enforced by the server |
| `Config.KoloryTekstu` | Text colour palette for the editor |
| `Config.Zdjecie` | Images on a document: maximum count, default/min/max width |
| `Config.Kopiuj` | Maximum copies per run, watermark default |
| `Config.DrukZdjec` | Photo print: maximum copies, caption length, zoom, formats |
| `Config.Domeny` / `Config.Rozszerzenia` | Allowed image hosts and file extensions |
| `Config.Modele` | Printer props used for targeting and the admin hologram |
| `Config.Lokacje` | Fixed printers (spawned prop or target zone only) |
| `Config.TargetNaModelu` / `Config.TylkoZnaneLokalizacje` | Target map printers / allow only known locations |
| `Config.Zapis` | `'oxmysql'` or `'json'` storage for placed printers |
| `Config.Admin` | Admin ace, framework groups, placement range, rotation and height steps |
| `Config.Przedmioty`, `Config.Kod`, `Config.Opis` | Item names, document code prefix, item description format |
| `Config.Blip`, `Config.Dzwiek` | Optional map blip and print sound |

**Job restriction examples** (on Qbox/QB, the grade is `job.grade.level`; on ESX it is `job.grade`):

```lua
jobs = nil                       -- everyone, including players with no job
jobs = { police = 3 }            -- police, grade 3 and up
jobs = { doj = 3, lawyer = 3 }   -- several jobs, each with its own minimum grade
jobs = { 'police' }              -- job name only, any grade
```

The default LSPD, EMS, DOJ, LSC and FDR templates require grade 3 or higher in their jobs. Change these to match your server.

## Commands

| Command | Who | What |
| --- | --- | --- |
| `/drukarkaadmin` | Admins (ace `nb_printer.admin` or a group in `Config.Admin`) | Opens the printer placement menu |
| `/printeradmin` | Same | Alias of the above |

Players do not use commands. They interact through ox_target (**Use printer**) and by using printed items in the inventory.

## Framework support

| Framework | Status |
| --- | --- |
| Qbox (`qbx_core`) | Native, the primary target |
| QBCore (`qb-core`) | Supported through the built-in bridge (auto-detected) |
| ESX (`es_extended`) | Supported through the built-in bridge (auto-detected). `cash` uses the `money` account |

The bridge (`bridge/`) handles the character name, job and grade, money and admin checks. Inventory and targeting always go through ox_inventory and ox_target.

## Support

Questions, bug reports and suggestions are welcome on Discord: **https://discord.gg/cvBmHzVqEJ**.
You can also open an issue on GitHub. Include your framework, your ox_* versions and any F8 or server console errors.

## License

> **TODO (choose before publishing):** pick one of these options and replace this block:
> - **GPL-3.0**: open source. Others can modify and redistribute it, but derivatives must stay open under the same license.
> - **Custom "free, no resale" terms**, for example: *"Free to use and modify on your own server. Do not sell, re-upload or redistribute this resource, or modified versions of it, without permission from Northbyte. Keep the credits."* This is not an OSI open-source license, so do not call it "open source".

## Credits

Made by **Northbyte**: [github.com/northbytescripts](https://github.com/northbytescripts) · [Discord](https://discord.gg/cvBmHzVqEJ)
Built on [overextended](https://github.com/overextended)'s ox_lib, ox_inventory, ox_target and oxmysql.
