import Note from "./Note.js";

class App {
  constructor(){
    this.$form = document.querySelector('#form');
    this.$input_noteTitle = document.querySelector('#note-title');
    this.$input_noteText = document.querySelector('#note-text');
    this.$notes = document.querySelector('#notes');
    this.$placeHolder = document.querySelector('#placeholder');
    
    this.$modal = document.querySelector('#modal');
    this.$modal_inputTitle = document.querySelector('#modal-title');
    this.$modal_inputText = document.querySelector('#modal-text');

    this.$color_toolTip = document.querySelector('#color-tooltip');

    this.addEventListeners();
    this.notes = JSON.parse(localStorage.getItem('notes')).map(note =>{
      const {title, text, id, color} = note;
      return new Note(title, text, id, color)
    }) || [];

    this.displayNotes();
    
  }

  addEventListeners(){
    document.body.addEventListener('click', (event)=>{
      const noteClicked = event.target.closest('#note');
      
      if(event.target.matches('#form-close-button')){
        this.closeForm();
      }

      if(event.target.matches('#delete-note')){
        this.deleteNote(event)
      }
      else if(noteClicked){
        this.openModal(noteClicked);
      }

      if(event.target.matches('#modal-close-button')){
        this.closeModal();
      }

      this.changeColor(event);

    })

    document.body.addEventListener('mousedown', (event)=>{
      this.openFormHandler(event);
    })

    this.$form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addNote();
    })

    document.body.addEventListener('mouseover', (event)=>{
      this.openColorToolTip(event);
    })
  }

  deleteNote(event){
    const $note = event.target.closest('#note');
    const {noteId} = $note.dataset;
    if(event.target.matches('#delete-note')){
      const indexToDelete = this.notes.findIndex(note => note.id == noteId)
      const [noteToDelete] = this.notes.splice(indexToDelete, 1);
      this.removeNote(noteToDelete)
    }
  }

  changeColor(event){
    const $btn_color = event.target.closest(".color-option")
    if($btn_color){
      const {noteId} = this.$color_toolTip.dataset
      const {color} = $btn_color.dataset;
      const note = this.notes.find(note => note.id == noteId)
      note.color = color;
      this.displayNoteModified(note);
    }
  }

  openColorToolTip(event){
    const hoverIcon = event.target.matches('#toolbar-color');
    const hoverToolTip = event.target.closest('#color-tooltip');
    const $note = event.target.closest('#note')
    if(hoverIcon || hoverToolTip){
      this.$color_toolTip.classList.add('flex');
      if(hoverIcon){
        const clientCords = event.target.getBoundingClientRect();
        const horizontal = clientCords.left + window.scrollX;
        const vertical = clientCords.top + window.scrollY;
        this.$color_toolTip.style = `--horizontal: ${horizontal}px; --vertical: ${vertical}px`;
        this.$color_toolTip.classList.add('flex');
        this.$color_toolTip.dataset.noteId = $note.dataset.noteId;
      }
    }
    else{
      this.$color_toolTip.classList.remove('flex');
    }
  }

  openModal($note){
    const noteId = $note.dataset.noteId;
    const note = this.notes.find( note => note.id == noteId);
    this.$modal.dataset.noteId = noteId;
    this.$modal_inputTitle.value = note.title;
    this.$modal_inputText.value = note.text;
    this.modalHandler();
  };

  closeModal(){
    const {noteId} = this.$modal.dataset;
    const note = this.notes.find( note => note.id == noteId);
    note.title = this.$modal_inputTitle.value;
    note.text = this.$modal_inputText.value;
    this.modalHandler();
    this.displayNoteModified(note);
  }

  modalHandler(){
    this.$modal.classList.toggle('open-modal');
  }



  openFormHandler(event){
    const formClicked = event.target.closest('#form');
    
    if(formClicked)
      this.openForm();
    else{
      this.addNote();
      this.closeForm();
    } 
    
  }

  openForm(){
    this.$form.classList.add('form-open');
    const $title = this.$form.querySelector('#note-title');
    const $buttons = this.$form.querySelector('#form-buttons');
    $title.style.display = 'block';
    $buttons.style.display = 'block';
  }

  closeForm(){
    this.$form.classList.remove('form-open');
    const $title = this.$form.querySelector('#note-title');
    const $buttons = this.$form.querySelector('#form-buttons');
    $title.style.display = 'none';
    $buttons.style.display = 'none';
    this.$input_noteTitle.value = "";
    this.$input_noteText.value = "";
  }

  handlerPlaceHolder(){
    const hasNotes = this.notes.length > 0;
    this.$placeHolder.style.display = hasNotes ? 'none' : 'flex';
  }

  addNote(){
    const title = this.$input_noteTitle.value;
    const text = this.$input_noteText.value;
    const lastId = this.notes.length > 0 ? this.notes[this.notes.length - 1].id : 0;
    if(title.replace(/\s+/g, '') || text.replace(/\s+/g, '')){
      const newNote = new Note(title, text, lastId)
      this.notes.push(newNote);
      this.handlerPlaceHolder();
      this.displayLastNote();
      this.$input_noteTitle.value = "";
      this.$input_noteText.value = "";
    }
  }

  displayNoteModified(noteToDisplay){
    debugger;
    const $noteModify = document.querySelector(`#note[data-note-id="${noteToDisplay.id}"]`)
    $noteModify.outerHTML = noteToDisplay.getInnerHtml();
    window.localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  displayLastNote(){
    const lastNote = this.notes[this.notes.length - 1];
    this.$notes.innerHTML += lastNote.getInnerHtml();
    window.localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  removeNote(noteToRemove){
    const $noteModify = document.querySelector(`[data-note-id="${noteToRemove.id}"]`)
    $noteModify.outerHTML='';
    window.localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  displayNotes(){
    const notesHTML = this.notes.map(note => note.getInnerHtml()).join('');
    this.$notes.innerHTML = notesHTML;
  }
}

new App();  