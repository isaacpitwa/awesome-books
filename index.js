let books = [];

const addBook = (title, author) => {
  books.push({ title, author });
};

const removeBook = (title) => {
  books = books.filter((book) => book.title !== title);
};

const showBooks = () => {
  for (const book of books) {
    console.log(`${book.title} by ${book.author}`);
  }
};

const displayBooks = () => {
  const booksList = document.querySelector('.books');
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
    removeBtn.classList.add('remove');
    removeBtn.textContent = 'Remove';

    bookElement.appendChild(h2);
    bookElement.appendChild(h3);
    bookElement.appendChild(removeBtn);

    booksList.appendChild(bookElement);

    let hr = document.createElement('hr');
    booksList.appendChild(hr);
  }
};

/* form functions */

const addNew = () => {
  const form = document.querySelector('form');
  const author = form.querySelector('#author').value;
  const title = form.querySelector('#title').value;

  addBook(title, author);
  displayBooks();
};

// addBook("The Lord of the Rings", "J.R.R. Tolkien");
// addBook("The Hobbit", "J.R.R. Tolkien");
// addBook("The Catcher in the Rye", "J.D. Salinger");
// removeBook("The Hobbit");
// showBooks();

window.onload = displayBooks();
const addBtn = document.querySelector('#add-btn');
addBtn.onclick = addNew;