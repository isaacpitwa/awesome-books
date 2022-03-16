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

// window.onload = getData();
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

// Creating Date object for date

// const date = new Date();

// const datePresenter = ()=>{
//   let month = date.getMonth.toString();
//   let exactDate = date.getDate();
//   let hour = date.getHours;
// }
// document.body.insertBefore(date, h1);
// setInterval(datePresenter, 1000);

// Referrence to navbar
const list = document.querySelector('.list');
const add = document.querySelector('.add');
const contact = document.querySelector('.contact');
const h1 = document.querySelector('h1');
const h2 = document.querySelector('#h2');
const wholeForm = document.querySelector('.add-book');
const body = document.querySelector('body');

const listActive = ()=>{
  body.removeChild(wholeForm);
  body.removeChild(h2);
}


list.addEventListener('click', listActive);


