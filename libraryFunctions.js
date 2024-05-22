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

function collection() {     // full collection page
    document.getElementById("bookForm").style.display = "none";
    document.getElementById("allBooks").style.display = "block";
    
    if (myLibrary.length == 0) {
        document.getElementById("viewer").innerHTML = "The library is empty!!";
    }

    else {
        currentBookList = "";
        
        for (let i = 0; i < myLibrary.length; i++) {    
            console.log(myLibrary[i].title);
            
            if (myLibrary[i].seen === false) {
                currentBookList += "<strong>";
            }

            currentBookList += `${myLibrary[i].title} &emsp; 
                                ${myLibrary[i].author} &emsp; 
                                ${myLibrary[i].fiction} &emsp;
                                <input type="checkbox" class="selectBook" id=${i}> &emsp;` 
            
            if (myLibrary[i].seen === false) {
                currentBookList += "</strong><br>";
            }

            else {
                currentBookList += "<br>";
            }
        }
            document.getElementById("viewer").innerHTML = currentBookList;
    }
}

function deleteBooks() {
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
                currentUnread -= 1; //////// chek this
            }
        myLibrary.splice(toChange[i], 1);
    }

    decra = 0;
    everyBook = [];
    toChange = [];
    collection();
    countUnread();
    document.getElementById("selectAll").checked = false;
}

function unreadBooks() {
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
        console.log(myLibrary[toChange[i]])
    }

    document.getElementById("unreadNotif").innerHTML = "(new!)"

    everyBook = [];
    toChange = [];
    document.getElementById("selectAll").checked = false;
    collection();
}

function readBooks() {
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
        console.log(myLibrary[toChange[i]])
    }

    everyBook = [];
    toChange = [];
    document.getElementById("selectAll").checked = false;
    collection();
    countUnread();
}

function newBookForm() {
    document.getElementById("bookForm").style.display = "block";
}

function selectAll() {      // select / deselct
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

function countUnread() {
    if (currentUnread > 0) {
        document.getElementById("unreadNotif").innerHTML = "(new!)";
    }

    else {
        document.getElementById("unreadNotif").innerHTML = "";
    }
}

document.getElementById("addBook").addEventListener("click", () => {    // anonymous function
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

document.getElementById("closeForm").addEventListener("click", () => {  // anonymous function
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