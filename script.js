//1. Array to hold all the books in the library
const myLibrary = [];
console.log("Skeleton script loaded successfully."); 

//2. The book contructor function
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; //Bolean: true or false
}

// 3. Book Prototype Method to toggle read status
// Putting this on the prototype means all Book instances share *one* copy of this function, saving memory!
Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
}

// 4. Function to create a book and add it to the library array
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// Manually adding some books to the library for testing purposes
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);


// 5. DOM Elements
const libraryContainer = document.getElementById("library-container");
const newBookBtn = document.getElementById("new-book-btn");
const bookDialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");
const cancelBtn = document.getElementById("cancel-btn");


// 6. Function that loops through the array and displays each book on the page
function displayBooks() {
    // Clear the container first so we don't duplicate cards when re-rendering
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book) => {
        // Create the card element
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        
        // Associate the DOM element with the unique book ID using a data attribute
        bookCard.setAttribute("data-id", book.id);

        // Fill the card content
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? "Read" : "Not read yet"}</p>
            <div class="card-actions">
                <button class="toggle-read-btn">Toggle Read</button>
                <button class="remove-btn">Delete</button>
            </div>
        `;

        // Attach event listener for the Remove button
        const removeBtn = bookCard.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
            removeBook(book.id);
        });

        // Attach event listener for the Toggle Read button
        const toggleReadBtn = bookCard.querySelector(".toggle-read-btn");
        toggleReadBtn.addEventListener("click", () => {
            book.toggleReadStatus(); // Call our prototype method!
            displayBooks();          // Refresh the display to show the updated status
        });

        // Append the card to our main container on the page
        libraryContainer.appendChild(bookCard);
    });
}


// 7. Function to remove a book from the array by its unique id
function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1); // Remove 1 item from the array at that index
        displayBooks();             // Refresh display
    }
}


// 8. Event Listeners for the Modal Form & Form Submission
newBookBtn.addEventListener("click", () => {
    bookDialog.showModal(); // Opens the <dialog> element built into HTML
});

cancelBtn.addEventListener("click", () => {
    bookDialog.close();
    bookForm.reset();
});

bookForm.addEventListener("submit", (event) => {
    // Prevent the default browser behavior of trying to send data to a server and refreshing the page
    event.preventDefault();

    // Grab values from form inputs
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    // Add to library array
    addBookToLibrary(title, author, pages, read);

    // Refresh display, close dialog, and reset form inputs
    displayBooks();
    bookDialog.close();
    bookForm.reset();
});


// Initial render when the page loads
displayBooks();