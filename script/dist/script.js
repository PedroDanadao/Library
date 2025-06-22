var table_element = document.querySelector("table");
var table_body_element = document.querySelector("tbody");
function Book(title, author, pages, read_before) {
    var _newTarget = this && this instanceof Book ? this.constructor : void 0;
    // this will prevent the error of trying to create the object by calling it like
    //  a function(without the 'new' at the beginning)
    if (!_newTarget) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read_before = read_before;
}
Book.prototype.info = function () {
    var read_string = this.read_before ? "already read" : "not read yet";
    var info_string = this.title + " by " + this.author + ", " + this.pages + " pages, " + read_string;
    return info_string;
};
var my_library = [];
function add_book_to_library(title, author, pages, read_before) {
    // take params, create a book then store it in the array
    var new_book = new Book(title, author, pages, read_before);
    my_library.push(new_book);
    add_book_to_table(new_book);
}
function add_book_to_table(book) {
    var new_row = table_body_element.insertRow();
    var title_cell = new_row.insertCell(0);
    title_cell.textContent = book.title;
    var author_cell = new_row.insertCell(1);
    author_cell.textContent = book.author;
    var pages_cell = new_row.insertCell(2);
    pages_cell.textContent = book.pages;
    var already_read_cell = new_row.insertCell(3);
    var read_before_checkbox = document.createElement("input");
    read_before_checkbox.type = "checkbox";
    already_read_cell.appendChild(read_before_checkbox);
}
function display_books() {
    for (var _i = 0, my_library_1 = my_library; _i < my_library_1.length; _i++) {
        var book = my_library_1[_i];
        var info_string = book.info();
        console.log(info_string);
        console.log("\n");
    }
}
add_book_to_library("The Last Echo of the Sunstone", "Elara Vance", 582, true);
add_book_to_library("Chronoscape Anomaly", "Kaelen Rostova", 321, false);
add_book_to_library("The Silent Canary Sings", "Marcus Thorne", 288, true);
add_book_to_library("Whispers in the Void", "Julian Cross", 198, false);
add_book_to_library("Journey to the Coral Spire", "Alistair Finch", 345, false);
add_book_to_library("The Gilded Cage of Florence", "Isabella Rossi", 412, true);
add_book_to_library("What the Salt Marshes Keep", "H.P. Abernathy", 274, false);
add_book_to_library("The Clockwork Apprentice", "Seraphina Quill", 376, true);
add_book_to_library("Principles of Aetherial Mechanics", "Dr. Aris Thorne", 734, false);
add_book_to_library("An Ordinary Tuesday in Pomegranate", "Clara Mae Brooks", 240, false);
/**
 * I need to add a check in the inputs of the form when the user confirms to add a book. If any of the inputs
 * is empty, then and alert is raised with a list of the fields he needs to fill. Also, check if the new book
 * has the same data of any of the books in the my_library var.
 *
 * Add new table items to the shelf table when the user adds a valid book.
 *
 * Add an option to remove books from the table.
 */
