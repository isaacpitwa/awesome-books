/* eslint-disable no-unused-vars */
let books = [];

generateId = () => {
  let id = Math.ceil(Math.random() * 100000000000);
  while (books.indexOf(id) !== -1) {
    id = Math.ceil(Math.random() * 100000000000);
  }
  return id;
};

const addBook = (title, author) => {
  const awesomeBook = {
    title,
    author,
    id: generateId(),
  };
  books.push(awesomeBook);
};

const removeBook = (id) => {
  books = books.filter((book) => book.id !== id);
};

const showBooks = () => {
  books.forEach((book) => {
    console.log(`${book.title} by ${book.author}`);
  });
};

const saveData = () => {
  localStorage.setItem('myBooks', JSON.stringify(books));
};

const displayBooks = () => {
  const booksList = document.querySelector('.books');
  booksList.innerHTML = '';

  books.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    const h2 = document.createElement('h2');
    h2.classList.add('title');
    h2.textContent = book.title;

    const h3 = document.createElement('h3');
    h3.classList.add('author');
    h3.textContent = book.author;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add(`remove-${book.id}`);
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeBook(book.id);
      displayBooks();
    });

    bookElement.appendChild(h2);
    bookElement.appendChild(h3);
    bookElement.appendChild(removeBtn);

    booksList.appendChild(bookElement);

    const hr = document.createElement('hr');
    booksList.appendChild(hr);
  });
  saveData();
};

/* form functions */
const form = document.querySelector('form');
const author = form.querySelector('#author');
const title = form.querySelector('#title');

const getData = () => {
  const formData = JSON.parse(localStorage.getItem('myBooks'));
  if (formData == null) {
    books = [];
  } else {
    books = formData;
  }
};

window.onload = getData();
window.onbeforeunload = function () {
  getData();
  displayBooks();
};

const addBtn = document.querySelector('#add-btn');
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitle = title.value;
  const bookAuthor = author.value;
  addBook(bookTitle, bookAuthor);
  displayBooks();
  saveData();
});

getData();
displayBooks();