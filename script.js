let myLibrary = [];



function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read)
  myLibrary.push(book);
}


//Adding few books to the library
// addBookToLibrary("les enfants de minuit", 'Salman Rushdie', 400, false)
// addBookToLibrary("Le livre des sables", "J.L. Borges", 200, true)
// addBookToLibrary("heurs et malheur du trou du cul", "Quevedo", 140, true)

// addBookToLibrary("les enfants de minuit", 'Salman Rushdie', 400, false)
// addBookToLibrary("Le livre des sables", "J.L. Borges", 200, true)
// addBookToLibrary("heurs et malheur du trou du cul", "Quevedo", 140, true)

// addBookToLibrary("les enfants de minuit", 'Salman Rushdie', 400, false)
// addBookToLibrary("Le livre des sables", "J.L. Borges", 200, true)
// addBookToLibrary("heurs et malheur du trou du cul", "Quevedo", 140, true)

function displayBooks(){
    const cards = document.querySelector(".cards")
    cards.innerHTML = '';
    for(book of myLibrary){
        const card = createCardFromBook(book)
        cards.appendChild(card)
    }
    if(document.querySelector('p.pages').textContent){
        document.querySelector('p.pages').textContent = `${document.querySelector('p.pages').textContent} Pages`
     }
}

function createCardFromBook(book){
    const card = document.createElement("div")
    card.classList.add("card")
    for(key in book){
        if(key === 'read') continue;
        const p = document.createElement("p")
        p.classList.add(key)
        p.textContent = book[key]
        card.appendChild(p)
    }
    //Adding a read button to the card
    const readBtn = document.createElement("button")
    readBtn.classList.add("removeBtn")
    readBtn.textContent = "Read"
    readBtn.addEventListener("click", readIt)
        card.appendChild(readBtn)

    //Card bgc
    card.style.border = `2px solid ${changeBgcIfRead(book)}`

    //Adding a delete button to the card
    const removeBtn = document.createElement("button")
        removeBtn.classList.add("removeBtn")
        removeBtn.textContent = "Delete"
        removeBtn.addEventListener("click", deleteBook)
        card.appendChild(removeBtn)

    //Card style
    card.style.padding = "12px";
    return card

    
}

function changeBgcIfRead(book){
    if(book.read) return 'green'
    return 'red'
}



/*** Adding Event Listeners to the buttons ***/
const newBookBtn = document.querySelector(".new") 
newBookBtn.addEventListener("click", displayForm)

const btnSubmit = document.querySelector("form button")
btnSubmit.addEventListener("click", newBook)

function displayForm(event){
    const form = document.querySelector(".form")
    form.style.height = "min-content";
}

function deleteBook(event){

    const card =  event.target.parentNode
    const title = card.firstChild.textContent;
    myLibrary.splice(getBookIndex(title),1) 
    card.remove()
}

function getBookIndex(title){
    for(let i = 0; i < myLibrary.length; i++){
        if(myLibrary[i].title === title) return i 
    }
    return -1
}

function newBook(event){
    const bookInfo = []
    const inputs = document.querySelectorAll("form input");
    if(bookAlreadyExists([...inputs][0].value)){
        alert('Already exists')
        resetForm()
        return
    }
    [...inputs].forEach(element => {
        bookInfo.push(element.value)
    });
    addBookToLibrary(...bookInfo)
    resetForm()
    displayBooks()
}

function resetForm(){
    document.querySelector("form").reset();
    document.querySelector(".form").style.height = "0px";
}



function readIt(event){
    const title = event.target.parentNode.firstChild.textContent
    for(book of myLibrary){
        if(book.title === title){
            book.read = !(book.read )
            displayBooks();
            return
        }
    } 
}

function bookAlreadyExists(title){
    for(book of myLibrary){
        if(book.title.toLowerCase() === title.toLowerCase()) return true;
    }
    return false;

}

displayBooks()





