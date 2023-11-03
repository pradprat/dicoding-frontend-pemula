document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("test");
    onAddBook();
  });
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
  books.forEach((book) => {
    const bookItem = createBookItem(book);
    unreadBookList.innerHTML += bookItem;
  });
};
const renderReadBooks = () => {
  const books = getReadBooks();
  const readBookList = document.getElementById("completeBookshelfList");
  books.forEach((book) => {
    const bookItem = createBookItem(book);
    readBookList.innerHTML += bookItem;
  });
};
const render = () => {
  renderUnreadBooks();
  renderReadBooks();
};

const createBookItem = (book) => {
  return `
  <article class="book_item">
    <h3>${book.title}</h3>
    <p>Penulis: ${book.author}</p>
    <p>Tahun: ${book.year}</p>

    <div class="action">
      <button class="green">Belum selesai di Baca</button>
      <button class="red">Hapus buku</button>
    </div>
  </article>
  `;
};
