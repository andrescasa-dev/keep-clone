class App {
  constructor(){
    this.$form = document.querySelector('#form')
    this.addEventListeners();
  }

  addEventListeners(){
    document.body.addEventListener('click', (event)=>{
      this.handleClickForm(event);
    })
  }

  handleClickForm(event){
    const formClicked = event.target.closest('#form');
    formClicked ? this.openForm(formClicked) : this.closeForm(formClicked);
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
  }
}

new App();  