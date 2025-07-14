const bookForm = document.getElementById('bookForm');
const booksContainer = document.getElementById('booksContainer');
const searchInput = document.getElementById('searchInput');

let books = [];

function renderBooks() {
  booksContainer.innerHTML = '';
  const search = searchInput.value.toLowerCase();

   console.log("Liste des livres :", books);

  books
    .filter(book =>
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search)
    )
    .forEach((book, index) => {
      const realIndex = books.indexOf(book); 
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book';

      bookDiv.innerHTML = `
        <img src="${book.cover}" alt="Couverture">
        <h3>${book.title}</h3>
        <p><strong>Auteur:</strong> ${book.author}</p>
        <p><strong>Date:</strong> ${book.date}</p>
        <p>${book.summary}</p>
        <button class="edit-btn" onclick="editBook(${index})">Modifier</button>
        <button class="delete-btn" onclick="deleteBook(${index})">Supprimer</button>
      `;

      booksContainer.appendChild(bookDiv);
    });
}

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}



document.addEventListener('DOMContentLoaded', () => {
  books = JSON.parse(localStorage.getItem('books')) || [];
  renderBooks();
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newBook = {
    title: title.value,
    author: author.value,
    date: date.value,
    summary: summary.value,
    cover: cover.value
  };

  books.push(newBook);
  saveBooks();          
  bookForm.reset();
  renderBooks();
});

function deleteBook(index) {
  books.splice(index, 1);
  saveBooks();         
  renderBooks();
}

function editBook(index) {
  const book = books[index];

  // pré‑remplit le formulaire
  title.value   = book.title;
  author.value  = book.author;
  date.value    = book.date;
  summary.value = book.summary;
  cover.value   = book.cover;

  books.splice(index, 1);  
  saveBooks();             
  renderBooks();
}



function deleteBook(index) {
  books.splice(index, 1);
  saveBooks(); 
  renderBooks();
}

function editBook(index) {
  const book = books[index];

  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('date').value = book.date;
  document.getElementById('summary').value = book.summary;
  document.getElementById('cover').value = book.cover;

  books.splice(index, 1);
  renderBooks();
}

searchInput.addEventListener('input', renderBooks);
