const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const newNote = {
        title,
        body
    }
    const duplicatedNote = notes.find(note => note.title === title)
    debugger
    if (!duplicatedNote) {
        notes.push(newNote)
        saveNotes(notes)
        console.log(chalk.bgGreen(`new note ha been added to notes file`))
    } else {
        console.log(`note title is taken`)
    }
}

const saveNotes = (notes) => {
    const notesString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesString)
}

const loadNotes = () => {
    try {
        const notes = JSON.parse(fs.readFileSync('notes.json').toString())
        return notes
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const reducedNotes = notes.filter(note => note.title !== title)
    if (notes.length > reducedNotes.length) {
        saveNotes(reducedNotes)
        console.log(chalk.bgGreen(`the note with title: ${title} is deleted`))
    } else {
        console.log(chalk.bgRed(`there is no note wit that title: ${title}`))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgCyan('Your notes: '))
    notes.forEach(note => console.log(chalk.underline(note.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteForReading = notes.find(note => note.title === title)
    if (noteForReading) {
        console.log(chalk.bgGreen(noteForReading.title))
        console.log(noteForReading.body)
    } else {
        console.log(chalk.bgRed(`note with title: ${title} is not found`))
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}