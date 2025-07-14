const bookForm = document.getElementById('bookForm');
const booksContainer = document.getElementById('booksContainer');
const searchInput = document.getElementById('searchInput');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const dateInput   = document.getElementById('date');
const summaryInput= document.getElementById('summary');
const coverInput  = document.getElementById('cover');

let books = [];

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

function loadBooks() {
  books = JSON.parse(localStorage.getItem('books')) || [];
}

function renderBooks() {
  booksContainer.innerHTML = '';
  const search = searchInput.value.toLowerCase();

  console.log('Liste des livres :', books);

  books
    .filter(book =>
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search)
    )
    .forEach(book => {
      const index = books.indexOf(book);

      const bookDiv = document.createElement('div');
      bookDiv.className = 'book';

      bookDiv.innerHTML = `
        <img src="${book.cover}" alt="Couverture">
        <h3>${book.title}</h3>
        <p><strong>Auteur:</strong> ${book.author}</p>
        <p><strong>Date:</strong> ${book.date}</p>
        <p>${book.summary}</p>
        <button class="edit-btn"   data-index="${index}">Modifier</button>
        <button class="delete-btn" data-index="${index}">Supprimer</button>
      `;

      booksContainer.appendChild(bookDiv);
    });
}

function addBook(e) {
  e.preventDefault();

  const newBook = {
    title:   titleInput.value,
    author:  authorInput.value,
    date:    dateInput.value,
    summary: summaryInput.value,
    cover:   coverInput.value
  };

  books.push(newBook);
  saveBooks();

  bookForm.reset();
  renderBooks();
}

function deleteBook(index) {
  books.splice(index, 1);
  saveBooks();
  renderBooks();
}

function editBook(index) {
  const book = books[index];

  titleInput.value   = book.title;
  authorInput.value  = book.author;
  dateInput.value    = book.date;
  summaryInput.value = book.summary;
  coverInput.value   = book.cover;

  books.splice(index, 1);         
  saveBooks();
  renderBooks();
}

booksContainer.addEventListener('click', e => {
  const index = e.target.dataset.index;
  if (index === undefined) return;

  if (e.target.classList.contains('delete-btn')) {
    deleteBook(Number(index));
  } else if (e.target.classList.contains('edit-btn')) {
    editBook(Number(index));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  loadBooks();
  renderBooks();
});

bookForm.addEventListener('submit', addBook);
searchInput.addEventListener('input', renderBooks);
