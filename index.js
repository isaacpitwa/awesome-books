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
    (i+1)%2 !== 0 ?bookElement.classList.add('odd') :null;

    const h2 = document.createElement('h2');
    h2.classList.add('title');
    h2.textContent = `\"${book.title}\"  by ${book.author}` ;

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