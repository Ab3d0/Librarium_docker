const bookForm = document.getElementById('bookForm');
const booksContainer = document.getElementById('booksContainer');
const searchInput = document.getElementById('searchInput');

let books = [];

function renderBooks() {
  booksContainer.innerHTML = '';
  const search = searchInput.value.toLowerCase();

  books
    .filter(book =>
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search)
    )
    .forEach((book, index) => {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book';

      bookDiv.innerHTML = `
        <img src="${book.cover}" alt="Couverture">
        <h3>${book.title}</h3>
        <p><strong>Auteur:</strong> ${book.author}</p>
        <p><strong>Date:</strong> ${book.date}</p>
        <p>${book.summary}</p>
        <button onclick="editBook(${index})">Modifier</button>
        <button onclick="deleteBook(${index})">Supprimer</button>
      `;

      booksContainer.appendChild(bookDiv);
    });
}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newBook = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    date: document.getElementById('date').value,
    summary: document.getElementById('summary').value,
    cover: document.getElementById('cover').value
  };

  books.push(newBook);
  bookForm.reset();
  renderBooks();
});

function deleteBook(index) {
  books.splice(index, 1);
  renderBooks();
}

function editBook(index) {
  const book = books[index];

  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('date').value = book.date;
  document.getElementById('summary').value = book.summary;
  document.getElementById('cover').value = book.cover;

  books.splice(index, 1); // Supprime pour remplacer ensuite
  renderBooks();
}

searchInput.addEventListener('input', renderBooks);
