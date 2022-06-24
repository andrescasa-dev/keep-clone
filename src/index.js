class App {
  constructor(){
    this.$form = document.querySelector('#form');
    this.$input_noteTitle = document.querySelector('#note-title');
    this.$input_noteText = document.querySelector('#note-text');
    this.$notes = document.querySelector('#notes');
    this.$placeHolder = document.querySelector('#placeholder');
    this.$modal = document.querySelector('#modal');
    this.$editingNote;

    this.addEventListeners();

    this.notes = [];
  }
  addEventListeners(){
    document.body.addEventListener('click', (event)=>{
      if(event.target.matches('#form-close-button')){
        this.closeForm();
      }

      if(event.target.closest('#modal-close-button')){
        this.editNote(this.$editingNote);
        this.modalHandler();
      }

      if(event.target.closest('#note')){
        console.log("joasdfa")
        this.$editingNote = event.target.closest('#note')
        this.modalHandler();
      }
    })

    document.body.addEventListener('mousedown', (event)=>{
      this.openFormHandler(event);
    })
    
    this.$form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addNote();
    })
  }

  modalHandler(){
    this.$modal.classList.toggle('open-modal');
  }
  /* ------------------------------------ tal vez en vez de pasar la nota uso solamente el id ----------------------------------- */
  editNote(note){
    const title = this.$modal.querySelector('#modal-title').value.replace(/\s+/g, '');
    const text = this.$modal.querySelector('#modal-text').value.replace(/\s+/g, '');
    if(title || text){
      note.title = title;
      note.text = text;
      this.displayNoteModified(note);
    };
    this.$input_modalTitle.value = "";
    this.$input_modalText.value = "";

    /* ------------------------------------ estoy casi seguro
     de que submit note y add note se tienen que unir, tengo que crear
      una funcion que me edite una nota existente ----------------------------------- */
  }

  addNote(){
    const title = this.$input_noteTitle.value.replace(/\s+/g, '');
    const text = this.$input_noteText.value.replace(/\s+/g, '');
    if(title || text){
      const newNote = { 
        id: this.notes.length !== 0 ? this.notes[this.notes.length - 1].id++ : 1,
        color: 'white',
        title,
        text
      }
      this.notes.push(newNote);
      this.handlerPlaceHolder();
      this.displayLastNote();
      this.$input_noteTitle.value = "";
      this.$input_noteText.value = "";
    }
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

  displayNoteModified(noteToDisplay){
    const $noteModify = document.querySelector(`[data-id="${noteToDisplay.id}"]`)
    $noteModify.innerHTML = `
    <div class ="note-title">${noteToDisplay.title}</div>
    <div class ="note-text">${noteToDisplay.text}</div>
    <div class="toolbar-container">
      <div class="toolbar">
        <img class="toolbar-color" src="https://icon.now.sh/palette">
        <img class="toolbar-delete" src="https://icon.now.sh/delete">
      </div>
    </div>`
  }

  displayLastNote(){
    const lastNote = this.notes[this.notes.length - 1];
    this.$notes.innerHTML += `
      <div id="note" class ="note" data-id=${lastNote.id} style="background-color: ${lastNote.color}">
        <div class ="note-title">${lastNote.title}</div>
        <div class ="note-text">${lastNote.text}</div>
        <div class="toolbar-container">
          <div class="toolbar">
            <img class="toolbar-color" src="https://icon.now.sh/palette">
            <img class="toolbar-delete" src="https://icon.now.sh/delete">
          </div>
        </div>
      </div>
    ` 
  }
}

new App();  