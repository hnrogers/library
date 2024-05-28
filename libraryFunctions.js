var myLibrary = [];
var currentBookList = "";
var toChange = [];
var currentUnread = 0;

function book(title, author, fiction) {     // book object
    this.title = title;
    this.author = author;
    this.fiction = fiction;
    this.seen = false;

    this.markUnread = function () {
        this.seen = false;
    }

    this.markRead = function () {
        this.seen = true;
    }
}

function home() {   // home page
    document.getElementById("bookForm").style.display = "none";
    document.getElementById("viewer").innerHTML = "";
    document.getElementById("allBooks").style.display = "none";
    document.getElementById("selectAll").checked = false;
}

function collection() {     // updated
    document.getElementById("bookForm").style.display = "none";
    document.getElementById("allBooks").style.display = "block";
    
    if (myLibrary.length == 0) {
        document.getElementById("viewer").innerHTML = "The library is empty!!";
    }

    else {
        
        document.getElementById("testTable").style.display = "block";
        
    }
}

function deleteBooks() {    // updated
    let everyBook = document.getElementsByClassName("selectBook");
    let decra = 0;

    for (let i = 0; i < everyBook.length; i++) {  // get selected books in toChange
        if (everyBook[i].checked === true && toChange.length === 0) {
            toChange.push(i);   
        }

        else if (everyBook[i].checked === true) {
            decra -= 1;
            toChange.push(i + decra);   
        }

        else {
            continue;
        }
    }

    if (toChange.length < 1) {
        return "Empty"
    }

    for (let i = 0; i < toChange.length; i++) {
        if (myLibrary[toChange[i]].seen === false)
            {
                currentUnread -= 1;
            }
        myLibrary.splice(toChange[i], 1);
        document.getElementById("tt").deleteRow(toChange[i] + 1);
    }

    decra = 0;
    everyBook = [];
    toChange = [];
    collection();
    countUnread();
    document.getElementById("selectAll").checked = false;
}

function unreadBooks() {    // updated 
    let everyBook = document.getElementsByClassName("selectBook");

    for (let i = 0; i < everyBook.length; i++) {  // get selected books in toChange

        if (everyBook[i].checked === true) {
            toChange.push(i);   
            everyBook[i].checked = false;
        }

        else {
            continue;
        }
    }

    if (toChange.length < 1) {
        return "Empty"
    }

    for (let i = 0; i < toChange.length; i++) {
        myLibrary[toChange[i]].markUnread();
        currentUnread += 1;
        console.log(myLibrary[toChange[i]]);
        document.getElementById("tt").rows[toChange[i] + 1].cells[0].style.fontWeight = "bold";
        document.getElementById("tt").rows[toChange[i] + 1].cells[1].style.fontWeight = "bold";
        document.getElementById("tt").rows[toChange[i] + 1].cells[2].style.fontWeight = "bold";
    }

    document.getElementById("unreadNotif").innerHTML = "(new!)"

    everyBook = [];
    toChange = [];
    document.getElementById("selectAll").checked = false;
    collection();
}

function readBooks() {  // updated 
    let everyBook = document.getElementsByClassName("selectBook");

    for (let i = 0; i < everyBook.length; i++) {  // get selected books in toChange

        if (everyBook[i].checked === true) {
            toChange.push(i);   
            everyBook[i].checked = false;
        }

        else {
            continue;
        }
    }

    if (toChange.length < 1) {
        return "Empty"
    }

    for (let i = 0; i < toChange.length; i++) {
        myLibrary[toChange[i]].markRead();
        currentUnread -= 1;
        console.log(myLibrary[toChange[i]]);
        document.getElementById("tt").rows[toChange[i] + 1].cells[0].style.fontWeight = "normal";
        document.getElementById("tt").rows[toChange[i] + 1].cells[1].style.fontWeight = "normal";
        document.getElementById("tt").rows[toChange[i] + 1].cells[2].style.fontWeight = "normal";
    }

    everyBook = [];
    toChange = [];
    document.getElementById("selectAll").checked = false;
    collection();
    countUnread();
}

function newBookForm() {    // updated
    document.getElementById("bookForm").style.display = "block";
}

function selectAll() {      // select / deselct -- updated
    let everyBook = document.getElementsByClassName("selectBook");    
    
    if (document.getElementById("selectAll").checked === true) {
        for (let i = 0; i < everyBook.length; i++) {
            everyBook[i].checked = true;
        }
    }
    
    if (document.getElementById("selectAll").checked === false) {
        for (let i = 0; i < everyBook.length; i++) {
            everyBook[i].checked = false;
        }
    } 
}

function countUnread() {       // updated 
    if (currentUnread > 0) {
        document.getElementById("unreadNotif").innerHTML = "(new!)";
    }

    else {
        document.getElementById("unreadNotif").innerHTML = "";
    }
}

document.getElementById("addBook").addEventListener("click", () => {    // updated! 
    const t = document.getElementById("addTitle").value;
    const a = document.getElementById("addAuthor").value;
    const f = document.getElementById("addGenre").checked;


    if (t === "" || a === "") {
        console.log("Missing required information");
    }

    else {
        const newBook = new book(t, a, f);
        myLibrary.push(newBook);
        document.getElementById("unreadNotif").innerHTML = "(new!)";
        currentUnread += 1;

        let row = document.createElement("tr");
        
        let col1 = document.createElement("td");
        col1.innerText = t;
        col1.style.fontWeight = "bold";
        row.appendChild(col1);

        let col2 = document.createElement("td");
        col2.innerText = a;
        col2.style.fontWeight = "bold";
        row.appendChild(col2);


        let col3 = document.createElement("td");
        col3.innerText = f;
        col3.style.fontWeight = "bold";
        row.appendChild(col3);


        let col4 = document.createElement("td");
        col4.innerHTML = `<input type="checkbox" class="selectBook" id="${myLibrary.length - 1}">`;
        row.appendChild(col4);

        document.getElementById("tt").appendChild(row);

        // clear values
        document.getElementById("addTitle").value = "";
        document.getElementById("addAuthor").value = "";
        document.getElementById("addGenre").checked = false; 

        if (document.getElementById("allBooks").style.display == "block") {
            collection();
            newBookForm();
        }
    }
});

document.getElementById("closeForm").addEventListener("click", () => {  // updated! 
    document.getElementById("addTitle").value = "";
    document.getElementById("addAuthor").value = "";
    document.getElementById("addGenre").checked = false;

    document.getElementById("bookForm").style.display = "none";
});

document.getElementById("home").addEventListener("click", home);

document.getElementById("newBookForm").addEventListener("click", newBookForm);

document.getElementById("displayCollection").addEventListener("click", collection);

document.getElementById("deleteBooks").addEventListener("click", deleteBooks);

document.getElementById("unreadBooks").addEventListener("click", unreadBooks);

document.getElementById("readBooks").addEventListener("click", readBooks);

document.getElementById("selectAll").addEventListener("change", selectAll);