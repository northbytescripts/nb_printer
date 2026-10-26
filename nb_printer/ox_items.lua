
return {
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
}
