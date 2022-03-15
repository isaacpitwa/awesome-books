let books = [];

const addBook = (title, author) => {
  const awesomeBook = {
    title: title,
    author: author,
    id: books.length + 1
  }
  books.push(awesomeBook);
};

const removeBook = (id) => {
  books = books.filter((book) => book.id !== id);
};

const showBooks = () => {
  for (const book of books) {
    console.log(`${book.title} by ${book.author}`);
  }
};

const displayBooks = () => {
  const booksList = document.querySelector('.books');
  booksList.innerHTML = '';
  for (let book of books) {
    let bookElement = document.createElement('div');
    bookElement.classList.add('book');

    let h2 = document.createElement('h2');
    h2.classList.add('title');
    h2.textContent = book.title;

    let h3 = document.createElement('h3');
    h3.classList.add('author');
    h3.textContent = book.author;

    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-' + book.id);
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeBook(book.id);
      displayBooks();
    });

    bookElement.appendChild(h2);
    bookElement.appendChild(h3);
    bookElement.appendChild(removeBtn);

    booksList.appendChild(bookElement);

    let hr = document.createElement('hr');
    booksList.appendChild(hr);
  }
  saveData();
};

/* form functions */
const form = document.querySelector('form');
const author = form.querySelector('#author');
const title = form.querySelector('#title');

const saveData = () => {
  localStorage.setItem("myBooks", JSON.stringify(books));
};

const getData = () => {
  const formData = JSON.parse(localStorage.getItem("myBooks"));
  if (formData == null) {
    books = [];
  } else {
    books = formData;
  }
};

window.onload = getData();
window.onbeforeunload = function() {
  getData();
  displayBooks();
}

const addBtn = document.querySelector('#add-btn');
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  bookTitle = title.value;
  bookAuthor = author.value;
  addBook(bookTitle, bookAuthor);
  displayBooks();
  saveData();
});

getData();
displayBooks();