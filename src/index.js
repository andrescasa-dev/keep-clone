class App {
  constructor(){
    this.notes = [];

    this.$form = document.querySelector('#form');
    this.$noteTitle = document.querySelector('#note-title');
    this.$noteText = document.querySelector('#note-text');
    this.$notes = document.querySelector('#notes');
    this.$placeHolder = document.querySelector('#placeholder');
    this.addEventListeners();
  }

  addEventListeners(){
    document.body.addEventListener('click', (event)=>{
      this.handleClickClose(event);
    })
    document.body.addEventListener('mousedown', (event)=>{
      this.handleClickForm(event);
    })
    
    this.$form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = this.$noteTitle.value.replace(/\s+/g, '');
      const text = this.$noteText.value.replace(/\s+/g, '')
      if(title || text ){
        this.addNote({title, text});
      } 
      console.log(this.notes);
    })
  }

  handleClickClose(event){
    const closeClicked = event.target.closest('#form-close-button');
    if(closeClicked) this.closeForm();
  }

  handleClickForm(event){
    const formClicked = event.target.closest('#form');
    formClicked ? this.openForm() : this.closeForm();
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
    this.$noteTitle.value = "";
    this.$noteText.value = "";
  }

  addNote(note){
    //left id, color
    const newNote = { 
      id: this.notes.length !== 0 ? this.notes[this.notes.length - 1].id++ : 1,
      color: 'white',
      ...note
    }
    this.notes.push(newNote);
    this.handlerPlaceHolder();
    this.displayLastNote();
    this.$noteTitle.value = "";
    this.$noteText.value = "";
  }

  handlerPlaceHolder(){
    const hasNotes = this.notes.length > 0;
    this.$placeHolder.style.display = hasNotes ? 'none' : 'flex';
  }

  displayLastNote(){
    const lastNote = this.notes[this.notes.length - 1];
    this.$notes.innerHTML += `
      <div class = "note" style="background-color: ${lastNote.color}">
        <div class = "note-title">${lastNote.title}</div>
        <div class = "note-text">${lastNote.text}</div>
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