class Methods {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  addBook = (bookTitle, bookAuthor, bookId) => {
    const book = {
      title: bookTitle,
      author: bookAuthor,
      id: bookId,
    };
    this.books.push(book);
  };

  removeBook = (id) => {
    this.books.splice(this.books[id - 1], 1);
  };
}

const methods = new Methods();
methods.books = [];

const saveData = () => {
  localStorage.setItem('myBooks', JSON.stringify(methods.books));
};

const displayBooks = () => {
  const booksList = document.querySelector('.books');
  booksList.innerHTML = '';
  for (let i = 0; i < methods.books.length; i += 1) {
    const book = methods.books[i];
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    if ((i + 1) % 2 !== 0) {
      bookElement.classList.add('odd');
    }

    const h2 = document.createElement('h2');
    h2.classList.add('title');
    h2.textContent = `"${book.title}"  by ${book.author}`;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add(`remove-${book.id}`);
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      methods.removeBook(book.id);
      displayBooks();
    });

    bookElement.appendChild(h2);
    bookElement.appendChild(removeBtn);

    booksList.appendChild(bookElement);
  }
  saveData();
};

const getData = () => {
  const formData = JSON.parse(localStorage.getItem('myBooks'));
  if (formData == null) {
    methods.books = [];
  } else {
    methods.books = formData;
  }
};

window.onbeforeunload = () => {
  getData();
  displayBooks();
};

/* form functions */
const form = document.querySelector('form');
const author = form.querySelector('#author');
const title = form.querySelector('#title');

const addBtn = document.querySelector('#add-btn');
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitle = title.value;
  const bookAuthor = author.value;
  const bookId = Date.now();
  methods.addBook(bookTitle, bookAuthor, bookId);
  displayBooks();
  saveData();
});

getData();
displayBooks();

// Referrence to navbar
const list = document.querySelector('.list');
const add = document.querySelector('.add');
const contact = document.querySelector('.contact');
const wholeForm = document.querySelector('#form-container');
const books = document.querySelector('#books-container');
const body = document.querySelector('body');
const footer = document.querySelector('footer');
const contactContainer = document.querySelector('.contact-section');

const listActive = () => {
  list.classList.add('active-page');
  add.classList.remove('active-page');
  contact.classList.remove('active-page');
  if (document.body.contains(wholeForm)) { body.removeChild(wholeForm); }
  if (document.body.contains(contactContainer)) { body.removeChild(contactContainer); }
  books.classList.remove('contact-section');
  contactContainer.classList.remove('contact-section-active');
};
const formActive = () => {
  list.classList.remove('active-page');
  add.classList.add('active-page');
  contact.classList.remove('active-page');
  if (document.body.contains(books)) { books.classList.add('contact-section'); }
  if (document.body.contains(contactContainer)) { body.removeChild(contactContainer); }
  body.insertBefore(wholeForm, footer);
  contactContainer.classList.remove('contact-section-active');
};

const contactActive = () => {
  list.classList.remove('active-page');
  add.classList.remove('active-page');
  contact.classList.add('active-page');
  if (document.body.contains(books)) { body.removeChild(books); }
  if (document.body.contains(wholeForm)) { body.removeChild(wholeForm); }
  body.insertBefore(contactContainer, footer);
  contactContainer.classList.add('contact-section-active');
};

list.addEventListener('click', listActive);
add.addEventListener('click', formActive);
contact.addEventListener('click', contactActive);
window.onload = listActive();
