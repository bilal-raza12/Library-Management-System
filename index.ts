#! /usr/bin/env node

import inquirer from "inquirer";

class Book{
    private title: string;
    private author: string;
    private Isbn : string;
    private isAvailable : boolean;
    constructor( title: string,author: string,Isbn : string){
        this.title = title;
        this.author = author;
        this.Isbn  = Isbn;
        this.isAvailable = true;

    }
    getTitle():string{
        return this.title;
    }
    getAuthor() : string {
        return this.author;
    }
    getIsbn():string{
        return this.Isbn

    }
    checkAvailability():boolean{
        return this.isAvailable;

    }
    borrowbook():void{
        if (this.isAvailable){
            this.isAvailable = false;
            console.log(`A book ${this.title} is  found`);
        }
        else{
            console.log(`A book ${this.title} is  not available`);


        }
    }
    returnbook() : void {
        this.isAvailable = true;
        console.log (`a book ${this.title} has been retruned`);
    }



}
class EBook extends Book{
    private filesize : number;
    constructor(title:string,author:string,Isbn:string,filesize:number){
        super(title,author,Isbn);
        this.filesize = filesize;
    }
    getfilesize ():number{
        return this.filesize;
    }
    borrowbook(): void {
        console.log(`Downloding ebook: ${this.getTitle()}`);
        super.borrowbook();
        
    }


}
class PrintedBook extends Book{
    private numberofpages : number;
    constructor(title: string,author: string,Isbn : string , numberofpages : number){
        super(title,author,Isbn);
        this.numberofpages = numberofpages;
    }
    getnumberofpages(){
        return this.numberofpages;
    }
    borrowbook(): void {
        console.log(`Borrowing printed Book: ${this.getTitle}`);
        super.borrowbook();
        
    }
}
class Member{
    private name: string;
    private memberId : number;
    constructor( name: string, memberId : number){
        this.name = name;
        this.memberId = memberId;
    }
    getname():string{
        return this.name;
    }
    getmemberId():number{
        return this.memberId;
    }
}

class Library{
    private books : Book[];
    private members : Member[];
    constructor(){
        this.books = [];
        this.members = [];
    }
    addbook(book : Book):void{
          this.books.push(book);
          console.log(`Book Titled ${book.getTitle()} has beeen added to the library`);
          
    }
    addmember(member : Member){
        this.members.push(member);
        console.log(`Member nameed ${member.getname()} has been added to the library`);
    }
    findbookbytitle(title:string): Book | undefined {
          return this.books.find(book => book.getTitle() === title)
    }
    borrowbook(title:string , memberId:number):void{
        const book = this.findbookbytitle(title)
            if (book){
                book.borrowbook();
                
            }
            else{
                console.log(`Book named ${title} is not found!`);
                
            }
        }
        returnbook(title:string):void{
          const book = this.findbookbytitle(title);
          if (book){
            book.returnbook();
          }
          else{
            console.log(`Book ${title} is not found in the libarary`);
            
          }
    }
}

async function main(){
    const library = new Library();
    while (true){
        const action =await inquirer.prompt({
            name: "action",
            type : "list",
            message : "What would you like to do?",
            choices:["Add Book" , 'Add Member' , "Borrow Book" , "Return Book" , "Exit"]
                
            
        });
        switch (action.action) {
             case "Add Book":
                const bookdetails = await inquirer.prompt([{
                    name : 'type',
                    type:'list',
                    message: 'Book type',
                    choices:['Ebook' , 'Printed Book'],

                },
              {
                name:'title',
                type:'input',
                message:'Title: ',
              },
            {
                name:'author',
                type:'input',
                message:'Author: ',
            },
        {
                name:'Isbn',
                type:'input',
                message:'ISBN: ',
        },
    ]);
    if(bookdetails.type === 'Ebook'){
        const {filesize} = await inquirer.prompt({
            name: 'filesize',
            type: 'input',
            message:'Filesize (in MB)',

         });
        const ebook = new EBook (bookdetails.title,bookdetails.author,bookdetails.Isbn,parseInt(filesize));
        library.addbook(ebook);
    }
    else{
        const {numberofpages} = await inquirer.prompt({
            name:'numberofpages',
            type:'input',
            message:'Number of pages: ',

        });
        const printedBook = new PrintedBook(bookdetails.title,bookdetails.author,bookdetails.Isbn,parseInt(numberofpages));
        library.addbook(printedBook);
    };
    break;

    case 'Add Member':
        const memberdetails = await inquirer.prompt([
            {
                name : 'name',
                type:'input',
                message:' Name: ',
                    
                },
                {
                    name:'Id',
                    type:'input',
                    message:'ID: ', 
                },
                
            
        ]);
        const member = new Member(memberdetails.name,parseInt(memberdetails.Id));
        library.addmember(member);
        break;
        
         case 'Borrow Book':
            const borrowdetails = await inquirer.prompt([
                {
                    name:'title',
                    type:'input',
                    message:'Book Title: ',

                },
                {
                    name:"memberId",
                    type:'input',
                    message:'Member Id: ',
                }
            ]);
            library.borrowbook(borrowdetails.title,parseInt(borrowdetails.memberId));
            break;
            case 'Return Book':
                const returndetails = await inquirer.prompt(
                    {
                        name:'title',
                        type:'input',
                        message:'Book Title: ',
    
                    },
                );
                library.returnbook(returndetails.title);
                break;

            case 'Exit':
                console.log("Exiting the library management System ");
                return;
                



            
        }
    }
}
main().catch(error =>
console.log(error));

