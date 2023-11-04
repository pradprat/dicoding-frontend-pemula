document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    onAddBook();
  });
  const searchForm = document.getElementById("searchBook");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    onSearchBook();
  });
  render();
});

const onAddBook = () => {
  const title = getValue("inputBookTitle");
  const author = getValue("inputBookAuthor");
  const year = getValue("inputBookYear");
  const isComplete = getCheckedValue("inputBookIsComplete");
  const id = Date.now();

  const book = {
    title,
    author,
    year: Number(year),
    isComplete,
    id,
  };
  console.log(book);
  saveBook(book);
  render();
};
const getValue = (id) => {
  return document.getElementById(id).value;
};
const getCheckedValue = (id) => {
  return document.getElementById(id).checked;
};
const saveBook = (book) => {
  const books = getBooks();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
};
const getBooks = () => {
  return JSON.parse(localStorage.getItem("books")) || [];
};
const renderUnreadBooks = (search = "") => {
  const books = getBooks();
  const unreadBooks = books.filter((book) => !book.isComplete);
  const unreadBookList = document.getElementById("incompleteBookshelfList");
  unreadBookList.innerHTML = "";
  unreadBooks
    .filter((book) => book.title.includes(search))
    .forEach((book) => {
      const bookItem = createUnreadBookItem(book);
      unreadBookList.innerHTML += bookItem;
    });
};
const renderReadBooks = (search = "") => {
  const books = getBooks();
  const readBooks = books.filter((book) => book.isComplete);
  const readBookList = document.getElementById("completeBookshelfList");
  readBookList.innerHTML = "";
  readBooks
    .filter((book) => book.title.includes(search))
    .forEach((book) => {
      const bookItem = createReadBookItem(book);
      readBookList.innerHTML += bookItem;
    });
};
const render = () => {
  renderUnreadBooks();
  renderReadBooks();
};
const onAddBookToRead = (id) => {
  const books = getBooks();
  const book = books.find((book) => book.id == id);
  if (!book) return;
  const index = books.indexOf(book);
  books[index].isComplete = true;
  localStorage.setItem("books", JSON.stringify(books));
  render();
};
const onAddBookToUnread = (id) => {
  const books = getBooks();
  const book = books.find((book) => book.id == id);
  if (!book) return;
  const index = books.indexOf(book);
  books[index].isComplete = false;
  localStorage.setItem("books", JSON.stringify(books));
  render();
};
const onRemoveBook = (id) => {
  removeBook(id);
  render();
};
const removeBook = (id) => {
  const books = getBooks();
  const filteredBooks = books.filter((book) => book.id != id);
  localStorage.setItem("books", JSON.stringify(filteredBooks));
};

const createUnreadBookItem = (book) => {
  return `
  <article class="book_item">
    <h3>${book.title}</h3>
    <p>Penulis: ${book.author}</p>
    <p>Tahun: ${book.year}</p>

    <div class="action">
      <button onclick="onAddBookToRead(${book.id})" class="green" data-id=${book.id}>Selesai di Baca</button>
      <button onclick="onRemoveBook(${book.id})" class="red" data-id=${book.id}>Hapus buku</button>
    </div>
  </article>
  `;
};

const createReadBookItem = (book) => {
  return `
  <article class="book_item">
    <h3>${book.title}</h3>
    <p>Penulis: ${book.author}</p>
    <p>Tahun: ${book.year}</p>

    <div class="action">
      <button onclick="onAddBookToUnread(${book.id})" class="green" data-id=${book.id}>Belum selesai di Baca</button>
      <button onclick="onRemoveBook(${book.id})" class="red" data-id=${book.id}>Hapus buku</button>
    </div>
  </article>
  `;
};

const onSearchBook = () => {
  const keyword = getValue("searchBookTitle");
  renderUnreadBooks(keyword);
  renderReadBooks(keyword);
};
