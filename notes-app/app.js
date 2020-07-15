const validator = require('validator')
const yargs = require('yargs')
const chalk = require('chalk')
const {addNote, removeNote, listNotes, readNote} = require('./notes')

yargs.version('25.0')
// add, remove, read, list
yargs.command({
    command: 'add',
    describe: 'Creating the note',
    builder: {
        title: {
            describe: 'title for the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Deleting the note',
    builder: {
        title: {
            describe: 'title for the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        // console.log('this should delete note')
        removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    describe: 'Reads the single note',
    builder: {
        title: {
            describe: 'title for the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        readNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Lists all the notes',
    handler() {
        listNotes()
    }
})



// console.log(yargs.argv)
yargs.parse()