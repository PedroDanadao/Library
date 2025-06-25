const table_element = document.querySelector("table") as HTMLTableElement;
const table_body_element = document.querySelector("tbody") as HTMLTableSectionElement;

const add_book_button = document.querySelector(".add_book_button") as HTMLButtonElement;
const book_title_input = document.querySelector("#title_input") as HTMLInputElement;
const author_input = document.querySelector("#author_input") as HTMLInputElement;
const pages_input = document.querySelector("#number_of_pages") as HTMLInputElement;
const read_before_cb = document.querySelector("#read_before") as HTMLInputElement;

const new_book_button = document.querySelector(".new_book_button") as HTMLButtonElement;
const new_book_form = document.querySelector(".book_form") as HTMLFormElement;


function Book(title: string, author: string, pages: number, read_before: boolean) {
    // this will prevent the error of trying to create the object by calling it like
    //  a function(without the 'new' at the beginning)
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read_before = read_before;
}

Book.prototype.info = function() {
    const read_string = this.read_before ? "already read" : "not read yet";
    
    const info_string = `${this.title} by ${this.author}, ${this.pages} pages, ${read_string}`;
    return info_string;
}

const my_library: typeof Book[] = [];


function add_book_to_library(title: string, author: string, pages: number, read_before: boolean) {
    // take params, create a book then store it in the array
    const new_book = new Book(title, author, pages, read_before);

    my_library.push(new_book);

    add_book_to_table(new_book);
}

const ids_to_elements = {};

function add_book_to_table(book: typeof Book) {
    const new_row = table_body_element.insertRow();

    const remove_cell = new_row.insertCell(0);
    const remove_button = document.createElement("button");
    remove_button.textContent = "X";
    remove_cell.appendChild(remove_button);
    
    const title_cell = new_row.insertCell(1);
    title_cell.textContent = book.title;
    const author_cell = new_row.insertCell(2);
    author_cell.textContent = book.author;
    const pages_cell = new_row.insertCell(3);
    pages_cell.textContent = book.pages;
    const already_read_cell = new_row.insertCell(4);
    const read_before_checkbox = document.createElement("input");
    read_before_checkbox.type = "checkbox";
    read_before_checkbox.checked = book.read_before;
    already_read_cell.appendChild(read_before_checkbox);
    
    let random_id = String( Math.floor(Math.random() * 1000000) );
    while(Object.keys(ids_to_elements).includes(random_id)) {
        random_id = String( Math.floor(Math.random() * 1000000) );
    }
    
    remove_button.id = `button_${random_id}`;
    read_before_checkbox.id = `checkbox_${random_id}`;

    remove_button.addEventListener("click", remove_book_from_library);
    read_before_checkbox.addEventListener("change", change_read_before);

    ids_to_elements[random_id] = [new_row, book];
}


function remove_book_from_library(m_event: MouseEvent) {
    const remove_button = m_event.target as HTMLButtonElement;
    const remove_button_id = remove_button.id as String;
    const random_id = remove_button_id.split("_")[1];

    const row_to_remove = ids_to_elements[random_id][0] as HTMLTableRowElement;
    row_to_remove.remove();
    delete ids_to_elements[random_id];
}


function change_read_before(change_event: HashChangeEvent) {
    const checkbox = change_event.target as HTMLInputElement;
    const checkbox_id = checkbox.id as String;
    const random_id = checkbox_id.split("_")[1];

    const book_to_change = ids_to_elements[random_id][1] as Book;
    book_to_change.read_before = checkbox.checked;
}


function display_books() {
    for (let book of my_library) {
        let info_string = book.info();

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


function add_book_from_form(m_event: MouseEvent) {
    /**
     * Check the form inputs to see if they are empty and check if the book data in the form does not correspond
     * to a book that is already in the library array. If both conditions are true then add the book from the 
     * form into the library using add_book_to_library
     */
    const book_title = book_title_input.value;
    const author = author_input.value;
    const pages = pages_input.value;
    const read_before = read_before_cb.checked;

    let check_string = '';
    
    if (! book_title) check_string += "\nBook Title";
    if (! author) check_string += "\nAuthor";
    if (! pages) check_string += "\nPages";
    
    if (check_string != '') {
        let alert_string = "You need to fill the following fields before adding a new book:";
        alert_string += check_string;
        alert(alert_string);

        return;
    }

    for (let book of my_library) {
        if (book.title == book_title &&
            book.author == author &&
            book.pages == pages) {
                alert("Book already in the library");
                return;
        }
    }

    add_book_to_library(book_title, author, Number(pages), read_before);

    book_title_input.value = '';
    author_input.value = '';
    pages_input.value = '';
    read_before_cb.checked = false;
}

add_book_button.addEventListener("click", add_book_from_form);

function toggle_form_visibility() {
    if (new_book_button.textContent == "New Book") {
        new_book_form.className = "book_form";
        new_book_button.textContent = "Hide Book Form";
    }
    else {
        new_book_form.className = "book_form hidden_form";
        new_book_button.textContent = "New Book";
    }
}

new_book_button.addEventListener("click", toggle_form_visibility);

/**
 * I need to add a check in the inputs of the form when the user confirms to add a book. If any of the inputs
 * is empty, then and alert is raised with a list of the fields he needs to fill. Also, check if the new book
 * has the same data of any of the books in the my_library var.
 * 
 * Add new table items to the shelf table when the user adds a valid book.
 * 
 * Add an option to remove books from the table.
 */
