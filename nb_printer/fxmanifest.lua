
fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'nb_printer'
author 'Northbyte'
description 'Print station: documents, copies and photos (Qbox / QBCore / ESX)'
version '1.0.0'

shared_scripts {
    '@ox_lib/init.lua',
    'config.lua',
    'bridge/shared.lua',
}

client_scripts {
    'bridge/client.lua',
    'client/main.lua',
    'client/admin.lua',
}

server_scripts {
    'bridge/server.lua',
    'server/sanity.lua',
    'server/drukarki.lua',
    'server/main.lua',
}

ui_page 'web/index.html'

files {
    'web/index.html',
    'web/style.css',
    'web/script.js',
    'locales/pl.json',
    'locales/en.json',
}

dependencies {
    'ox_lib',
    'ox_inventory',
    'ox_target',
}
