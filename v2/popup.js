document.addEventListener('DOMContentLoaded', function () {
  const newNoteInput = document.getElementById('newNote');
  const addNoteButton = document.getElementById('addNote');
  const notesList = document.getElementById('notesList');
  
  addNoteButton.addEventListener('click', function () {
  const newNoteText = newNoteInput.value.trim();
    if (newNoteText !== '') {
      addNoteToList(newNoteText);
      saveNotes();
      newNoteInput.value = '';
    }
  })

  function addNoteToList(noteText) {
    const noteItem = document.createElement('li');
    noteItem.innerText = noteText;
    notesList.appendChild(noteItem);
  }

  function saveNotes() {
    const notes = Array.from(document.querySelectorAll('#notesList li')).map(li => li.innerText);
    chrome.storage.sync.set({ notes: notes });
  }

  function loadNotes() {
    chrome.storage.sync.get('notes', function (data) {
      if (data.notes) {
        data.notes.forEach(noteText => addNoteToList(noteText));
      }
    });
  }

  loadNotes();
});