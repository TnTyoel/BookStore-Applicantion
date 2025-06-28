document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
});

const form = 
document.getElementById('book-form');
const list = 
document.getElementById('book-list');
const search = 
document.getElementById('search');

form.addEventListener('submint', function(e) {
    e.preventDefault();

    const title = 
    document.getElementById('title').value.trim();

    const author = 
    document.getElementById('author').value.trim();

    const price = 
    document.getElementById('price').value.trim();

    const category = 
    document.getElementById('category').value;

    if (title && author && price && category) {
        const book = {title, author, price, category};
        addBook(book);
        saveBook(book);
        form.reset();
    }
    });


function addBook(book) {
    const li = 
    document.createElement('li')
    li.setAttribute('data-title', book.title.toLowerCase());
    li.setAttribute('data-author', book.author.toLowerCase());
    li.setAttribute('data-category', book.category.toLowerCase());

    li.innerHTML = `
    <div>
    <strong>${book.title}</strong> by ${book.author}<br/>
    Category: <em>${book.category}</em> - $${book.price}
    </div>
    <button class = "delete-btn">Delete</button>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        deleteBook(book);
    });

    list.appendChild(li);
}

function saveBook(book) {
    let books = 
    JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function displayBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.forEach(addBook);
}

//Live search

search.addEventListener('input', function () {
    const keyword = 
    this.value.toLowerCase();
    const items = 
    list.querySelectorAll('li');

    items.forEach(item => {
        const title = 
        item.getAttribute('data-title');
        const author = 
        item.getAttribute('data-author');
        const category = 
        item.getAttribute('data-category');

        if (
            title.includes(keyword) ||
            author.includes(keyword) ||
            category.includes(keyword)
        ) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

function deleteBook(bookToDelete) {
    let books = 
    JSON.parse(localStorage.getItem('books')) || [];
    books = books.filter(book => 
        book.title !== bookToDelete.title ||
        book.author !== bookToDelete.author ||
        book.price !== bookToDelete.price ||
        book.category !== bookToDelete.category
    );
    localStorage.setItem('books', JSON.stringify(books));
}