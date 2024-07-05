#! /usr/bin/env node
import inquirer from "inquirer";
class Book {
    title;
    author;
    Isbn;
    isAvailable;
    constructor(title, author, Isbn) {
        this.title = title;
        this.author = author;
        this.Isbn = Isbn;
        this.isAvailable = true;
    }
    getTitle() {
        return this.title;
    }
    getAuthor() {
        return this.author;
    }
    getIsbn() {
        return this.Isbn;
    }
    checkAvailability() {
        return this.isAvailable;
    }
    borrowbook() {
        if (this.isAvailable) {
            this.isAvailable = false;
            console.log(`A book ${this.title} is  found`);
        }
        else {
            console.log(`A book ${this.title} is  not available`);
        }
    }
    returnbook() {
        this.isAvailable = true;
        console.log(`a book ${this.title} has been retruned`);
    }
}
class EBook extends Book {
    filesize;
    constructor(title, author, Isbn, filesize) {
        super(title, author, Isbn);
        this.filesize = filesize;
    }
    getfilesize() {
        return this.filesize;
    }
    borrowbook() {
        console.log(`Downloding ebook: ${this.getTitle()}`);
        super.borrowbook();
    }
}
class PrintedBook extends Book {
    numberofpages;
    constructor(title, author, Isbn, numberofpages) {
        super(title, author, Isbn);
        this.numberofpages = numberofpages;
    }
    getnumberofpages() {
        return this.numberofpages;
    }
    borrowbook() {
        console.log(`Borrowing printed Book: ${this.getTitle}`);
        super.borrowbook();
    }
}
class Member {
    name;
    memberId;
    constructor(name, memberId) {
        this.name = name;
        this.memberId = memberId;
    }
    getname() {
        return this.name;
    }
    getmemberId() {
        return this.memberId;
    }
}
class Library {
    books;
    members;
    constructor() {
        this.books = [];
        this.members = [];
    }
    addbook(book) {
        this.books.push(book);
        console.log(`Book Titled ${book.getTitle()} has beeen added to the library`);
    }
    addmember(member) {
        this.members.push(member);
        console.log(`Member nameed ${member.getname()} has been added to the library`);
    }
    findbookbytitle(title) {
        return this.books.find(book => book.getTitle() === title);
    }
    borrowbook(title, memberId) {
        const book = this.findbookbytitle(title);
        if (book) {
            book.borrowbook();
        }
        else {
            console.log(`Book named ${title} is not found!`);
        }
    }
    returnbook(title) {
        const book = this.findbookbytitle(title);
        if (book) {
            book.returnbook();
        }
        else {
            console.log(`Book ${title} is not found in the libarary`);
        }
    }
}
async function main() {
    const library = new Library();
    while (true) {
        const action = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Book", 'Add Member', "Borrow Book", "Return Book", "Exit"]
        });
        switch (action.action) {
            case "Add Book":
                const bookdetails = await inquirer.prompt([{
                        name: 'type',
                        type: 'list',
                        message: 'Book type',
                        choices: ['Ebook', 'Printed Book'],
                    },
                    {
                        name: 'title',
                        type: 'input',
                        message: 'Title: ',
                    },
                    {
                        name: 'author',
                        type: 'input',
                        message: 'Author: ',
                    },
                    {
                        name: 'Isbn',
                        type: 'input',
                        message: 'ISBN: ',
                    },
                ]);
                if (bookdetails.type === 'Ebook') {
                    const { filesize } = await inquirer.prompt({
                        name: 'filesize',
                        type: 'input',
                        message: 'Filesize (in MB)',
                    });
                    const ebook = new EBook(bookdetails.title, bookdetails.author, bookdetails.Isbn, parseInt(filesize));
                    library.addbook(ebook);
                }
                else {
                    const { numberofpages } = await inquirer.prompt({
                        name: 'numberofpages',
                        type: 'input',
                        message: 'Number of pages: ',
                    });
                    const printedBook = new PrintedBook(bookdetails.title, bookdetails.author, bookdetails.Isbn, parseInt(numberofpages));
                    library.addbook(printedBook);
                }
                ;
                break;
            case 'Add Member':
                const memberdetails = await inquirer.prompt([
                    {
                        name: 'name',
                        type: 'input',
                        message: ' Name: ',
                    },
                    {
                        name: 'Id',
                        type: 'input',
                        message: 'ID: ',
                    },
                ]);
                const member = new Member(memberdetails.name, parseInt(memberdetails.Id));
                library.addmember(member);
                break;
            case 'Borrow Book':
                const borrowdetails = await inquirer.prompt([
                    {
                        name: 'title',
                        type: 'input',
                        message: 'Book Title: ',
                    },
                    {
                        name: "memberId",
                        type: 'input',
                        message: 'Member Id: ',
                    }
                ]);
                library.borrowbook(borrowdetails.title, parseInt(borrowdetails.memberId));
                break;
            case 'Return Book':
                const returndetails = await inquirer.prompt({
                    name: 'title',
                    type: 'input',
                    message: 'Book Title: ',
                });
                library.returnbook(returndetails.title);
                break;
            case 'Exit':
                console.log("Exiting the library management System ");
                return;
        }
    }
}
main().catch(error => console.log(error));
