// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}
UI.prototype.addBookToList = (book) => {
  const list = document.getElementById('book-list');

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>
  `;

  list.appendChild(row);
}

UI.prototype.showAlert = (message, className) => {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  if (!document.querySelector('.alert')) {
    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2000);
  }
}

UI.prototype.deleteBook = (target) => {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

UI.prototype.clearFields = () => {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listener for adding a book
document.getElementById('book-form').addEventListener('submit', (event) => {
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate input
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields.', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);
    ui.showAlert('Book added!', 'success');
  
    // Clear fields
    ui.clearFields();
  }

  event.preventDefault();
});

// Event Listener for delete a book
document.getElementById('book-list').addEventListener('click', (event) => {
  const ui = new UI();
  ui.deleteBook(event.target);
  ui.showAlert('Book removed!', 'success');

  event.preventDefault();
});