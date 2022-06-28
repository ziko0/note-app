let showNoteBtn = document.querySelector('.add-note-btn');
let editNoteContainer = document.querySelector('.edit-note');
let note_title_input = document.querySelector('.note-title-input');
let note_desc_input = document.querySelector('.note-box');
let noteBox = document.querySelector('.note-box');
let closeIcon = document.querySelector('.fa-arrow-left');

let month = ['January', 'February', 'March', 'Aprile', 'May', 'June', 'Jul', 'August', 'September', 'October', 'November', 'December'];

// getting local storage notes
const allNotes = JSON.parse(localStorage.getItem('allNotes') || '[]');
let isUpdate = false, updateId;

note_title_input.addEventListener('keyup', function(e){
    this.style.height = '45px';
    let height = e.target.scrollHeight;
    note_title_input.style.height = `$(height)px`;
});

closeIcon.addEventListener('click', () =>{
    editNoteContainer.style.left = '-100%';
});

showNoteBtn.addEventListener('click', () => {
    editNoteContainer.style.left = '50%';
    note_title_input.value = '';
    note_desc_input.value = '';
});


// functions

function showNotes() {
    let NoteAdd = '';
    document.querySelectorAll('.note').forEach(note => note.remove());
    allNotes.forEach((note, index) => {
        let fillDesc = note.description.replaceAll('\n', '<br />');
        NoteAdd += ` <div class='note'> 
        <h3 class='note-title'>${note.title}</h3>
        <p class='note-body'>${note.description}</p>
        <hr>
        <p class='date'>${note.date}</p>
        <i onclick='showMenu(this)' class='fa-solid fa-ellipsis'></i>
            <div class='settings'>
                <div class='menu'>
                    <span class='edit-btn' onclick='editNote(${index}, '${note.title}', '${fillDesc}')'>
                        <i class='fa-solid fa-pen'></i> Edit
                    </span>
                    <span class='delete-btn' onclick='deleteNote(${indes})'>
                        <i class='fa-solid fa-trash'></i> Delete
                    </span>
                </div>
            </div>
        </div> 
        `;
    });

    noteBox.innerHTML = NoteAdd || `
    <span><i class='fa-solid fa-note-sticky'></i></span>
    <span class='no-notes-message'>No notes Here yet</span>`;
}

showNotes();


// delte function

function deleteNote(Noteid){
    allNotes.splice(Noteid, 1); //delet note from arry
    localStorage.setItem('allNotes', JSON.stringify(allNotes));
    showNotes();
};

function editNote(Noteid, title, fillDesc){
    let desc = fillDesc.replaceAll('<br/>', '\r\n');
    updateId = Noteid;
    isUpdate = true;
    showNoteBtn.click();
    note_title_input.value = title;
    note_desc_input.value = desc;
};

closeIcon.addEventListener('click', e => {
    e.preventDefault();
    let noteTitle = note_title_input.value; // note inpput value
    let noteDesc = note_desc_input.value; //note description value

    if(noteTitle || noteDesc){
        let date = new Date();
        month = months[date.getMonth()],
        day = date.getDate();
        year = date.getFullYear();

        // all note info
        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }

        if(!isUpdate){
            allNotes.push[noteInfo]; //push note info
        }else {
            isUpdate = false;
            allNotes[updateId] = noteInfo;
        }

        // SAVING to local storage
        localStorage.setItem('allNotes', JSON.stringify(allNotes));
        showNotes();
    }
});