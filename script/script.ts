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
    remove_button.className = "remove_button";
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
        new_book_button.className = "new_book_button hide_book_button";
        new_book_button.textContent = "Hide Book Form";
    }
    else {
        new_book_form.className = "book_form hidden_form";
        new_book_button.className = "new_book_button";
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



add_book_to_library("The Quantum Tapestry", "Elias Vance", 451, false);
add_book_to_library("Echoes of a Forgotten Star", "Anya Sharma", 312, true);
add_book_to_library("The Alchemist of Prague", "Corbin Blackwood", 589, false);
add_book_to_library("Where the River Meets the Void", "Genevieve Reed", 278, true);
add_book_to_library("Steel and Shadow", "Rhys Moreau", 720, false);
add_book_to_library("The Last Gardener of Mars", "Fiona Chen", 345, false);
add_book_to_library("A Symphony of Glass", "Leo Sterling", 410, true);
add_book_to_library("The Cipher in the Sand", "Zara Al-Jamil", 333, false);
add_book_to_library("Beneath a Neon Sun", "Jax O'Connell", 295, true);
add_book_to_library("The Golem's Lament", "Isaac Feldman", 488, false);
add_book_to_library("Whispers on the Solar Wind", "Kenji Tanaka", 215, false);
add_book_to_library("The Salt-Stained Ledger", "Eleonora Costa", 380, true);
add_book_to_library("Chronicles of the Sky-Sailors", "Silas Croft", 640, false);
add_book_to_library("The Amber Secret", "Isolde Petrov", 267, false);
add_book_to_library("Midnight at the Blackwood Inn", "Clara Bellwether", 305, true);
add_book_to_library("A Study in Emerald and Ash", "Arthur Finch", 421, false);
add_book_to_library("The Architect's Folly", "Helena Schmidt", 513, true);
add_book_to_library("How to Weave Starlight", "Luna Evergreen", 198, false);
add_book_to_library("The Iron Empire", "Magnus Stone", 850, false);
add_book_to_library("Reflections in a Broken Mirror", "Victor Noir", 256, true);
add_book_to_library("The Dragon of Old Seville", "Sofia Reyes", 388, false);
add_book_to_library("Path of the Silent Monk", "Li Wei", 220, true);
add_book_to_library("Cybernetic Serenade", "Nova Nexus", 310, false);
add_book_to_library("The Forgotten Dialect of Trees", "Orion Forrester", 490, false);
add_book_to_library("A King's Ransom, a Pauper's Debt", "Gideon Hale", 530, true);
add_book_to_library("The Oracle of Dust", "Samira Khan", 365, false);
add_book_to_library("When the City Sleeps", "Marcus Slade", 280, true);
add_book_to_library("The Last Tea Shop in Kyoto", "Yuki Ishikawa", 240, false);
add_book_to_library("Memory of a Sunken World", "Nadia Volkov", 475, true);
add_book_to_library("The Cartographer's Blade", "Evelyn Reed", 415, false);
add_book_to_library("Gravity's Embrace", "Dr. Aris Thorne", 680, false);
add_book_to_library("The Boy Who Collected Shadows", "Thomas Pike", 325, true);
add_book_to_library("A Whisper of Treason", "Lady Annelise", 440, false);
add_book_to_library("The Somnambulist's Guide to the Galaxy", "Zilpha Quark", 180, false);
add_book_to_library("Rust and Ruin", "Caleb Cross", 555, true);
add_book_to_library("The Crimson Cobblestones", "Julien Dubois", 399, false);
add_book_to_library("Theory of Abstract Beings", "Penelope Ives", 610, false);
add_book_to_library("The Lighthouse at the Edge of Time", "Eleanor Vance", 370, true);
add_book_to_library("Steelheart's Rebellion", "Kaelen Rostova", 710, false);
add_book_to_library("An Ordinary Thursday", "Agnes Little", 212, true);
add_book_to_library("The Serpent's Tooth", "Dante Verona", 460, false);
add_book_to_library("Echoes in the Static", "Maya Lincoln", 315, false);
add_book_to_library("The Glassblower's Daughter", "Seraphina Quill", 390, true);
add_book_to_library("Where the Wild Roses Grow", "Elara Meadow", 270, false);
add_book_to_library("The Sunken City of Y'ha-nthlei", "H.P. Abernathy", 480, false);
add_book_to_library("A Pact of Blood and Silver", "Valerius Nightshade", 525, true);
add_book_to_library("The Mechanist's Ghost", "Ada Lovelace Jr.", 340, false);
add_book_to_library("Songs of the Deep", "Marina Cortez", 290, true);
add_book_to_library("The Final Broadcast", "Felix Monroe", 260, false);
add_book_to_library("Heir to a Fallen Kingdom", "Gareth Strongbow", 620, false);
add_book_to_library("The Color of Lies", "Veronica Slate", 350, true);
add_book_to_library("Nomad of the Star-Wastes", "Joric Kincaid", 430, false);
add_book_to_library("The Jade Elephant", "Lin Yao", 300, true);
add_book_to_library("A Portrait of the Artist as a Young Machine", "Unit 734", 500, false);
add_book_to_library("The Quiet Man of Dublin", "Sean O'Malley", 285, true);
add_book_to_library("Secrets of the Sundered Isles", "Talia Windrider", 495, false);
add_book_to_library("The Last Spell", "Meryl Grey", 360, true);
add_book_to_library("Quantum Entanglement for Dummies", "Dr. Evelyn Reed", 250, false);
add_book_to_library("The Baker of Whisperwind Alley", "Poppy Greenbottle", 225, false);
add_book_to_library("City of Endless Night", "Damien Darkwood", 540, true);
add_book_to_library("The Starfarer's Codex", "Captain Eva Rostova", 780, false);
add_book_to_library("A Blade in the Twilight", "Kaelen Cross", 470, false);
add_book_to_library("The Girl Who Tasted Silence", "Eliza Thorn", 335, true);
add_book_to_library("Recollections of a Time Traveler", "James Chronos", 405, false);
add_book_to_library("The Bronze Heart", "Cassia Flint", 310, true);
add_book_to_library("Waltz of the Automatons", "Victor Frankenstein III", 450, false);
add_book_to_library("Beneath the Salt and Sky", "Mara Oceanus", 295, false);
add_book_to_library("The Emperor's New Groovebox", "DJ Jazzy J", 150, true);
add_book_to_library("A Shadow in the Ember", "Silas Kane", 580, false);
add_book_to_library("The Golden Ratio of the Heart", "Florence Fibonacci", 314, true);
add_book_to_library("Zero-Point Renegade", "Blaze Ryder", 385, false);
add_book_to_library("The Obsidian Labyrinth", "Xylia of Crete", 666, false);
add_book_to_library("Whiskey and Gunpowder", "Jedediah Stone", 245, true);
add_book_to_library("The Secret Life of Fungi", "Dr. Myron Childs", 420, false);
add_book_to_library("The Last Question... Again", "Isaac Asimov II", 120, true);
add_book_to_library("Memoirs of a Clockwork Bird", "Aria Song", 280, false);
add_book_to_library("The Crimson Script", "Elias Thorne", 515, true);
add_book_to_library("Daughter of the Northern Wastes", "Freya Icewind", 435, false);
add_book_to_library("How the Stars Fell", "Orion Nebula", 395, false);
add_book_to_library("The Tinker's Gambit", "Finnian Cogsworth", 375, true);
add_book_to_library("A Requiem for Mars", "Adelaide C. Clarke", 505, false);
add_book_to_library("The Silken Thread", "Penelope Weathers", 320, true);
add_book_to_library("The Rogue Planet", "Xander Cruz", 445, false);
add_book_to_library("Echoes of Old Earth", "Gaia Sterling", 410, true);
add_book_to_library("The Binary Sunset", "Luke S.", 275, false);
add_book_to_library("The Alchemist's Heir", "Sofia Rossi", 465, true);
add_book_to_library("Void-Dancer", "Nyx Ryder", 330, false);
add_book_to_library("The Gilded Serpent", "Isadora Finch", 490, true);
add_book_to_library("A City Built on Bones", "Cassius Black", 600, false);
add_book_to_library("The Star-Woven Shawl", "Elara Vance", 355, false);
add_book_to_library("Chronoscape Drifters", "Kaelen Rostova", 520, true);
add_book_to_library("The Silent Orchid", "Marcus Thorne", 299, false);
add_book_to_library("Journey to the Ashen Peak", "Alistair Finch", 478, true);
add_book_to_library("What the Deep Ones Dream", "H.P. Abernathy", 382, false);
add_book_to_library("The Clockwork Nightingale", "Seraphina Quill", 401, true);
add_book_to_library("Principles of Psionic Warfare", "Cmdr. Ivanova", 750, false);
add_book_to_library("An Unexpected Tuesday in Pomegranate", "Clara Mae Brooks", 244, true);
