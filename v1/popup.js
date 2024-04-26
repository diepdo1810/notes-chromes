const noteTextArea = document.getElementById('noteTextArea');
const saveNoteBtn = document.getElementById('saveNoteBtn');

saveNoteBtn.addEventListener('click', () => {
const note = noteTextArea.value;
chrome.storage.local.set({ 'note': note }, () => {
if (chrome.runtime.lastError) {
console.error(chrome.runtime.lastError.message);
} else {
console.log('Note saved successfully!');
// show note saved message
const noteSavedMsg = document.getElementById('notesList');
noteSavedMsg.textContent = 'Note saved';
setTimeout(() => {
noteSavedMsg.textContent = '';
}, 2000);
}
});
});

// Retrieve note from local storage when popup is opened
chrome.storage.local.get(['note'], (result) => {
if (result.note) {
noteTextArea.value = result.note;
}
});