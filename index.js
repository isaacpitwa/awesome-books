class Books {
  constructor(books = []) {
    this.list = books;
  }
}

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class Methods {
  addBook = (book) => {
    books.list.push(book);
  };
  removeBook = (id) => {
    books.list.splice(books.list[id-1], 1);
  };
}

const saveData = () => {
  localStorage.setItem('myBooks', JSON.stringify(books.list));
};

const displayBooks = () => {
  console.log("display");
  const booksList = document.querySelector('.books');
  booksList.innerHTML = '';
  for (let i = 0; i < books.list.length; i += 1) {
    const book = books.list[i];
    console.log(book);
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
      console.log("the id of the book is:")
      console.log(book.id)
      methods.removeBook(book.id);
      displayBooks();
    });

    bookElement.appendChild(h2);
    bookElement.appendChild(h3);
    bookElement.appendChild(removeBtn);

    booksList.appendChild(bookElement);

    const hr = document.createElement('hr');
    booksList.appendChild(hr);
  }
  saveData();
};

const getData = () => {
  const formData = JSON.parse(localStorage.getItem('myBooks'));
  if (formData == null) {
    books.list = [];
  } else {
    books.list = formData;
  }
};

// window.onload = getData();
window.onbeforeunload = () => {
  getData();
  displayBooks();
};

const addBtn = document.querySelector('#add-btn');
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitle = title.value;
  const bookAuthor = author.value;
  const bookId = books.list.length + 1;
  const newBook = new Book(bookTitle, bookAuthor, bookId);
  methods.addBook(newBook);
  displayBooks();
  saveData();
});

let books = new Books();
let methods = new Methods();
/* form functions */
const form = document.querySelector('form');
const author = form.querySelector('#author');
const title = form.querySelector('#title');
getData();
displayBooks();