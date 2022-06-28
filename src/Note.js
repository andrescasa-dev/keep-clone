export default class Note{
  constructor(title, text, lastId){
    Object.assign(this, {title, text, id: ++lastId})
    this.color = 'white';
  }

  getInnerHtml(){
    return `
    <div id="note" class ="note" data-id=${this.id} style="background-color: ${this.color}">
    <div class ="note-title">${this.title}</div>
    <div class ="note-text">${this.text}</div>
    <div class="toolbar-container">
      <div class="toolbar">
        <img id="toolbar-color" class="toolbar-color" src="https://cdn-icons-png.flaticon.com/512/565/565789.png">
        <img id="delete-note" class="toolbar-delete" src="https://cdn-icons-png.flaticon.com/512/3096/3096687.png">
      </div>
    </div>
  </div>`
  }
}