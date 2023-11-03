document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("test");
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
  const read = getCheckedValue("inputBookIsComplete");
  const id = Date.now();

  const book = {
    title,
    author,
    year,
    read,
    id,
  };
  if (read) {
    saveReadBook(book);
  } else {
    saveUnreadBook(book);
  }
  render();
};
const getValue = (id) => {
  return document.getElementById(id).value;
};
const getCheckedValue = (id) => {
  return document.getElementById(id).checked;
};
const saveUnreadBook = (book) => {
  const books = getUnreadBooks();
  books.push(book);
  localStorage.setItem("unread_books", JSON.stringify(books));
};
const saveReadBook = (book) => {
  const books = getReadBooks();
  books.push(book);
  localStorage.setItem("read_books", JSON.stringify(books));
};
const getUnreadBooks = () => {
  return JSON.parse(localStorage.getItem("unread_books")) || [];
};
const getReadBooks = () => {
  return JSON.parse(localStorage.getItem("read_books")) || [];
};
const renderUnreadBooks = () => {
  const books = getUnreadBooks();
  const unreadBookList = document.getElementById("incompleteBookshelfList");
  unreadBookList.innerHTML = "";
  books.forEach((book) => {
    const bookItem = createUnreadBookItem(book);
    unreadBookList.innerHTML += bookItem;
  });
};
const renderReadBooks = () => {
  const books = getReadBooks();
  const readBookList = document.getElementById("completeBookshelfList");
  readBookList.innerHTML = "";
  books.forEach((book) => {
    const bookItem = createReadBookItem(book);
    readBookList.innerHTML += bookItem;
  });
};
const render = () => {
  renderUnreadBooks();
  renderReadBooks();
};
const onAddBookToRead = (id) => {
  const books = getUnreadBooks();
  const book = books.filter((book) => book.id == id)[0];
  saveReadBook(book);
  removeUnreadBook(id);
  render();
};
const onRemoveBook = (id) => {
  removeUnreadBook(id);
  removeReadBook(id);
  render();
};
const removeUnreadBook = (id) => {
  const books = getUnreadBooks();
  const filteredBooks = books.filter((book) => book.id != id);
  localStorage.setItem("unread_books", JSON.stringify(filteredBooks));
  render();
};
const removeReadBook = (id) => {
  const books = getReadBooks();
  const filteredBooks = books.filter((book) => book.id != id);
  localStorage.setItem("read_books", JSON.stringify(filteredBooks));
  render();
};
const onAddBookToUnread = (id) => {
  const books = getReadBooks();
  const book = books.filter((book) => book.id == id)[0];
  saveUnreadBook(book);
  removeReadBook(id);
  render();
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
      <button onclick="removeReadBook(${book.id})" class="red" data-id=${book.id}>Hapus buku</button>
    </div>
  </article>
  `;
};

const onSearchBook = () => {
  const keyword = getValue("searchBookTitle");
  const books = getUnreadBooks();
  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(keyword.toLowerCase());
  });
  const unreadBookList = document.getElementById("incompleteBookshelfList");
  unreadBookList.innerHTML = "";
  filteredBooks.forEach((book) => {
    const bookItem = createUnreadBookItem(book);
    unreadBookList.innerHTML += bookItem;
  });
};