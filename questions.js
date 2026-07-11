/* =========================================================
   LUMINA CLAN — QUESTION DATABASE
   20 Languages / Tools × 12 Questions each = 240 Questions
   Format: { q: question text, code: optional snippet,
             options: [4 strings], correct: index of correct option }
   ========================================================= */

const QUESTIONS_DB = {

  java: {
    name: "Java", icon: "☕", difficulty: "Intermediate", color: "#f89820",
    questions: [
      { q:"Which keyword is used to inherit a class in Java?", options:["extends","implements","inherits","super"], correct:0 },
      { q:"What is the default value of a boolean instance variable?", options:["true","false","0","null"], correct:1 },
      { q:"Which collection does NOT allow duplicate elements?", options:["ArrayList","LinkedList","HashSet","Vector"], correct:2 },
      { q:"What does the JVM stand for?", options:["Java Virtual Machine","Java Variable Method","Java Verified Module","Java Visual Manager"], correct:0 },
      { q:"What will this code print?", code:"int x = 5;\nSystem.out.println(x++ + ++x);", options:["10","11","12","9"], correct:1 },
      { q:"Which keyword prevents a class from being subclassed?", options:["static","final","private","abstract"], correct:1 },
      { q:"Which of these is used for exception handling?", options:["try-catch","if-else","switch-case","for-loop"], correct:0 },
      { q:"What is the size of an int in Java?", options:["16 bit","32 bit","64 bit","8 bit"], correct:1 },
      { q:"Which method is the entry point of a Java program?", options:["start()","run()","main()","init()"], correct:2 },
      { q:"What is method overriding?", options:["Same method name, different class, same signature","Multiple methods, same name, different params","Making a method private","Calling a method twice"], correct:0 },
      { q:"Which interface must be implemented to make a class Runnable?", options:["Runnable","Threadable","Executable","Callable"], correct:0 },
      { q:"What does 'static' mean for a class member?", options:["It belongs to the instance","It belongs to the class, not instances","It cannot change","It is private"], correct:1 }
    ]
  },

  python: {
    name: "Python", icon: "🐍", difficulty: "Beginner", color: "#3776ab",
    questions: [
      { q:"Which symbol is used for comments in Python?", options:["//","#","--","<!-- -->"], correct:1 },
      { q:"What is the output of this code?", code:"print(2 ** 3)", options:["6","8","9","5"], correct:1 },
      { q:"Which data type is immutable in Python?", options:["list","dict","set","tuple"], correct:3 },
      { q:"What does 'len()' do?", options:["Returns type of object","Returns length of object","Returns last item","Rounds a number"], correct:1 },
      { q:"How do you define a function in Python?", options:["function myFunc():","def myFunc():","func myFunc():","define myFunc():"], correct:1 },
      { q:"What is the output?", code:"x = [1,2,3]\nprint(x[-1])", options:["1","2","3","Error"], correct:2 },
      { q:"Which keyword creates a lambda function?", options:["func","lambda","def","anon"], correct:1 },
      { q:"What does 'pip' manage?", options:["Python interpreters","Python packages","Python variables","Python threads"], correct:1 },
      { q:"Which loop guarantees at least one execution?", options:["for","while","do-while","Python has none of these"], correct:3 },
      { q:"What is a list comprehension used for?", options:["Deleting lists","Creating lists concisely","Sorting dictionaries","Handling exceptions"], correct:1 },
      { q:"What does 'self' refer to in a class method?", options:["The class itself","The parent class","The current instance","A static variable"], correct:2 },
      { q:"Which exception is raised for division by zero?", options:["ValueError","ZeroDivisionError","TypeError","ArithmeticException"], correct:1 }
    ]
  },

  javascript: {
    name: "JavaScript", icon: "🟨", difficulty: "Beginner", color: "#f0db4f",
    questions: [
      { q:"Which keyword declares a block-scoped variable?", options:["var","let","global","static"], correct:1 },
      { q:"What does '===' check?", options:["Value only","Type only","Value and type","Reference only"], correct:2 },
      { q:"What is the output?", code:"console.log(typeof NaN);", options:["'NaN'","'number'","'undefined'","'object'"], correct:1 },
      { q:"Which method converts JSON text to an object?", options:["JSON.parse()","JSON.stringify()","JSON.toObject()","JSON.decode()"], correct:0 },
      { q:"What is a closure?", options:["A loop that never ends","A function with access to its outer scope","A syntax error","A type of array"], correct:1 },
      { q:"What does 'Array.map()' return?", options:["The same array","A new array","A number","undefined"], correct:1 },
      { q:"What is the output?", code:"console.log([] + []);", options:["'[object Object]'","''","NaN","undefined"], correct:1 },
      { q:"Which of these creates a Promise?", options:["new Promise()","Promise.create()","async Promise()","Promise.new()"], correct:0 },
      { q:"What does 'this' refer to in an arrow function?", options:["The global object always","The enclosing lexical scope","A new object","undefined always"], correct:1 },
      { q:"Which method adds an item to the end of an array?", options:["push()","pop()","shift()","unshift()"], correct:0 },
      { q:"What is event bubbling?", options:["Events firing from parent to child","Events firing from child to parent","Duplicated event handlers","Async event queuing"], correct:1 },
      { q:"What does 'await' require to be used inside?", options:["A regular function","An async function","A loop","A class"], correct:1 }
    ]
  },

  html: {
    name: "HTML", icon: "🧱", difficulty: "Beginner", color: "#e34f26",
    questions: [
      { q:"Which tag defines the largest heading?", options:["<h6>","<h1>","<head>","<heading>"], correct:1 },
      { q:"Which attribute specifies an image's alternate text?", options:["title","src","alt","desc"], correct:2 },
      { q:"Which tag is used to create a hyperlink?", options:["<link>","<a>","<href>","<url>"], correct:1 },
      { q:"What does semantic HTML mean?", options:["Using only <div> tags","Tags that describe their meaning","HTML with CSS inline","HTML with no attributes"], correct:1 },
      { q:"Which element is used for the largest block of navigation links?", options:["<nav>","<section>","<menu>","<links>"], correct:0 },
      { q:"Which doctype declares HTML5?", options:["<!DOCTYPE html5>","<!DOCTYPE HTML PUBLIC>","<!DOCTYPE html>","<html5>"], correct:2 },
      { q:"Which tag embeds a video file?", options:["<media>","<video>","<embed>","<movie>"], correct:1 },
      { q:"What does the 'form' attribute 'method=\"post\"' do?", options:["Displays data in URL","Sends data in request body","Deletes data","Caches the page"], correct:1 },
      { q:"Which tag defines an unordered list?", options:["<ol>","<list>","<ul>","<li>"], correct:2 },
      { q:"What is the correct way to comment in HTML?", options:["// comment","# comment","<!-- comment -->","/* comment */"], correct:2 },
      { q:"Which input type validates an email format?", options:["type='text'","type='email'","type='mail'","type='validate'"], correct:1 },
      { q:"Which tag is used to define table row data?", options:["<tr>","<td>","<th>","<row>"], correct:1 }
    ]
  },

  css: {
    name: "CSS", icon: "🎨", difficulty: "Beginner", color: "#264de4",
    questions: [
      { q:"Which property changes text color?", options:["font-color","text-color","color","fg-color"], correct:2 },
      { q:"Which selector targets an element with id 'main'?", options:[".main",",main","#main","*main"], correct:2 },
      { q:"What does 'flex-direction: column' do?", options:["Stacks items horizontally","Stacks items vertically","Hides overflow","Wraps items"], correct:1 },
      { q:"Which unit is relative to the root element's font size?", options:["em","px","rem","vh"], correct:2 },
      { q:"What does 'box-sizing: border-box' include in width?", options:["Content only","Content + padding","Content + padding + border","Margin only"], correct:2 },
      { q:"Which property creates space outside an element's border?", options:["padding","margin","gap","spacing"], correct:1 },
      { q:"What is the correct CSS Grid property to define columns?", options:["grid-columns","grid-template-columns","column-count","display-columns"], correct:1 },
      { q:"Which pseudo-class targets the first child element?", options:[":first","::first","::before",":first-child"], correct:3 },
      { q:"What does 'z-index' control?", options:["Element width","Stack order along z-axis","Font weight","Element opacity"], correct:1 },
      { q:"Which value makes an element invisible but keeps its space?", options:["display:none","visibility:hidden","opacity:1","position:absolute"], correct:1 },
      { q:"Which media query targets screens up to 600px?", options:["@media (min-width: 600px)","@media (max-width: 600px)","@media screen(600px)","@media (width: 600px)"], correct:1 },
      { q:"What does 'position: sticky' do?", options:["Always fixed to viewport","Toggles between relative and fixed on scroll","Removes from normal flow permanently","Same as absolute"], correct:1 }
    ]
  },

  c: {
    name: "C", icon: "🔧", difficulty: "Intermediate", color: "#a8b9cc",
    questions: [
      { q:"Which function is used to allocate memory dynamically?", options:["alloc()","malloc()","new()","memset()"], correct:1 },
      { q:"What is the output?", code:"int x = 5;\nint *p = &x;\nprintf(\"%d\", *p);", options:["Address of x","5","Error","0"], correct:1 },
      { q:"Which header file is needed for printf()?", options:["<stdlib.h>","<string.h>","<stdio.h>","<conio.h>"], correct:2 },
      { q:"What does 'sizeof(int)' typically return on most systems?", options:["2","4","8","1"], correct:1 },
      { q:"Which operator is used to access a struct member via a pointer?", options:[".",":","->","::"], correct:2 },
      { q:"What is a segmentation fault caused by?", options:["Syntax error","Invalid memory access","Compiler warning","Missing semicolon"], correct:1 },
      { q:"Which keyword defines a constant in C?", options:["final","const","let","readonly"], correct:1 },
      { q:"What does 'free()' do?", options:["Allocates memory","Deallocates memory","Clears a variable","Ends the program"], correct:1 },
      { q:"Which loop checks its condition after executing the body?", options:["for","while","do-while","if"], correct:2 },
      { q:"What is the return type of main() typically?", options:["void","int","char","float"], correct:1 },
      { q:"Which symbol denotes a preprocessor directive?", options:["@","$","#","&"], correct:2 },
      { q:"What does 'NULL' represent for a pointer?", options:["Zero value integer","A pointer pointing to nothing","An uninitialized string","A memory leak"], correct:1 }
    ]
  },

  cpp: {
    name: "C++", icon: "➕", difficulty: "Intermediate", color: "#00599c",
    questions: [
      { q:"Which keyword is used to define a class?", options:["struct","object","class","type"], correct:2 },
      { q:"What does 'cout' do?", options:["Reads input","Outputs to console","Declares a variable","Ends the program"], correct:1 },
      { q:"Which feature allows a function to have multiple definitions?", options:["Inheritance","Polymorphism","Overloading","Encapsulation"], correct:2 },
      { q:"What does the '::' operator do?", options:["Pointer dereference","Scope resolution","Bitwise OR","Comment"], correct:1 },
      { q:"Which keyword prevents a member function from modifying the object?", options:["static","const","final","volatile"], correct:1 },
      { q:"What is a destructor used for?", options:["Creating objects","Cleaning up resources when object is destroyed","Copying objects","Comparing objects"], correct:1 },
      { q:"Which STL container stores unique sorted elements?", options:["vector","list","set","map"], correct:2 },
      { q:"What does 'virtual' enable in a base class function?", options:["Faster execution","Runtime polymorphism","Static binding","Memory safety"], correct:1 },
      { q:"Which operator is overloaded to enable object printing with cout?", options:["+","<<",">>","="], correct:1 },
      { q:"What is RAII in C++?", options:["A design pattern for resource management tied to object lifetime","A sorting algorithm","A memory leak type","A template specialization"], correct:0 },
      { q:"Which smart pointer allows shared ownership?", options:["unique_ptr","shared_ptr","auto_ptr","weak_only_ptr"], correct:1 },
      { q:"What does 'new' do in C++?", options:["Declares a variable","Allocates memory on the heap","Deletes an object","Starts a thread"], correct:1 }
    ]
  },

  sql: {
    name: "SQL", icon: "🗄", difficulty: "Beginner", color: "#e38c00",
    questions: [
      { q:"Which statement retrieves data from a table?", options:["GET","FETCH","SELECT","SHOW"], correct:2 },
      { q:"Which clause filters rows before grouping?", options:["HAVING","WHERE","GROUP BY","ORDER BY"], correct:1 },
      { q:"Which clause filters groups after GROUP BY?", options:["WHERE","HAVING","FILTER","LIMIT"], correct:1 },
      { q:"Which JOIN returns only matching rows from both tables?", options:["LEFT JOIN","RIGHT JOIN","INNER JOIN","FULL JOIN"], correct:2 },
      { q:"Which command removes a table entirely, including structure?", options:["DELETE","TRUNCATE","DROP","REMOVE"], correct:2 },
      { q:"What does a PRIMARY KEY guarantee?", options:["Nullable values","Unique, non-null identification","Fastest queries","Sorted rows"], correct:1 },
      { q:"Which keyword removes duplicate rows in a result set?", options:["UNIQUE","DISTINCT","ONLY","FILTER"], correct:1 },
      { q:"What is a FOREIGN KEY used for?", options:["Encrypting data","Linking rows to a key in another table","Speeding up SELECT","Removing duplicates"], correct:1 },
      { q:"Which function counts rows in a result set?", options:["SUM()","COUNT()","TOTAL()","ROWS()"], correct:1 },
      { q:"What does 'ORDER BY col DESC' do?", options:["Sorts ascending","Sorts descending","Groups rows","Filters rows"], correct:1 },
      { q:"Which SQL type of command is 'INSERT'?", options:["DDL","DML","DCL","TCL"], correct:1 },
      { q:"What does an index primarily improve?", options:["Data integrity","Query read performance","Storage compression","Data encryption"], correct:1 }
    ]
  },

  git: {
    name: "Git", icon: "🌿", difficulty: "Beginner", color: "#f05033",
    questions: [
      { q:"Which command initializes a new Git repository?", options:["git start","git init","git new","git create"], correct:1 },
      { q:"Which command stages changes for commit?", options:["git commit","git add","git push","git stage"], correct:1 },
      { q:"Which command creates a new branch?", options:["git branch <name>","git checkout <name>","git new <name>","git switch-new <name>"], correct:0 },
      { q:"Which command uploads local commits to a remote repository?", options:["git pull","git fetch","git push","git merge"], correct:2 },
      { q:"What does 'git clone' do?", options:["Deletes a repository","Copies a remote repository locally","Merges two branches","Reverts a commit"], correct:1 },
      { q:"Which command shows the commit history?", options:["git history","git log","git show","git track"], correct:1 },
      { q:"What does 'git merge' do?", options:["Deletes a branch","Combines changes from one branch into another","Renames a branch","Downloads updates"], correct:1 },
      { q:"Which command discards uncommitted local changes to a file?", options:["git reset --hard","git checkout -- <file>","git clean","git revert"], correct:1 },
      { q:"What is a 'merge conflict'?", options:["A network error","Overlapping changes Git cannot auto-resolve","A missing commit","A broken remote link"], correct:1 },
      { q:"Which command downloads changes without merging them?", options:["git fetch","git pull","git push","git sync"], correct:0 },
      { q:"What does '.gitignore' do?", options:["Deletes files","Lists files Git should not track","Ignores commit messages","Hides branches"], correct:1 },
      { q:"Which command undoes the last commit but keeps changes staged?", options:["git reset --soft HEAD~1","git revert HEAD","git clean -f","git rebase -i"], correct:0 }
    ]
  },

  linux: {
    name: "Linux", icon: "🐧", difficulty: "Intermediate", color: "#fcc624",
    questions: [
      { q:"Which command lists files in a directory?", options:["ls","dir","list","show"], correct:0 },
      { q:"Which command changes file permissions?", options:["chperm","chmod","permit","access"], correct:1 },
      { q:"What does 'grep' do?", options:["Compresses files","Searches text using patterns","Copies files","Deletes directories"], correct:1 },
      { q:"Which command shows current running processes?", options:["ps","proc","tasks","jobs"], correct:0 },
      { q:"What does 'sudo' allow a user to do?", options:["Switch users only","Execute a command with elevated privileges","Schedule a job","Compress a file"], correct:1 },
      { q:"Which command displays the current working directory?", options:["cwd","pwd","dir","path"], correct:1 },
      { q:"Which symbol redirects output, overwriting the target file?", options:["|",">>",">","<"], correct:2 },
      { q:"What does 'chmod 755' grant to the owner?", options:["Read only","Read, write, execute","Write only","No permissions"], correct:1 },
      { q:"Which command copies files?", options:["cp","mv","copy","dup"], correct:0 },
      { q:"What does the '|' symbol do in a shell command?", options:["Ends a command","Pipes output of one command to another","Comments a line","Runs command in background"], correct:1 },
      { q:"Which command shows disk usage of files/directories?", options:["du","df","disk","space"], correct:0 },
      { q:"Which command kills a process by its PID?", options:["stop","kill","end","terminate"], correct:1 }
    ]
  },

  typescript: {
    name: "TypeScript", icon: "🔷", difficulty: "Intermediate", color: "#3178c6",
    questions: [
      { q:"What is TypeScript primarily known for adding to JavaScript?", options:["A new runtime","Static typing","A rendering engine","A database layer"], correct:1 },
      { q:"Which keyword defines a custom type shape for objects?", options:["type or interface","class only","struct","object"], correct:0 },
      { q:"What does the '?' after a property name mean?", options:["Required property","Optional property","Deprecated property","Readonly property"], correct:1 },
      { q:"Which type represents any value with no specific type checks?", options:["unknown","any","void","never"], correct:1 },
      { q:"What does 'never' represent as a return type?", options:["A function that returns undefined","A function that never returns (throws or loops forever)","A void function","An async function"], correct:1 },
      { q:"How do you define a generic function?", options:["function foo<T>(x: T): T","function foo(x: generic): generic","function<T> foo(x): T","generic function foo(x: T)"], correct:0 },
      { q:"What does 'readonly' do to a property?", options:["Makes it optional","Prevents reassignment after initialization","Makes it private","Removes it from type checking"], correct:1 },
      { q:"Which file extension is used for TypeScript files?", options:[".js",".jsx",".ts",".tjs"], correct:2 },
      { q:"What is a union type written as?", options:["string & number","string | number","string + number","string, number"], correct:1 },
      { q:"Which compiler command transpiles TypeScript to JavaScript?", options:["tsc","tsbuild","tscompile","ts-run"], correct:0 },
      { q:"What does 'enum' define?", options:["A set of named constants","A class","A generic type","A tuple"], correct:0 },
      { q:"What is a tuple in TypeScript?", options:["An array of unknown length","A fixed-length array with known types per position","A key-value map","A function type"], correct:1 }
    ]
  },

  php: {
    name: "PHP", icon: "🐘", difficulty: "Beginner", color: "#777bb4",
    questions: [
      { q:"Which symbol precedes a variable name in PHP?", options:["#","$","@","&"], correct:1 },
      { q:"Which operator checks value and type equality?", options:["==","=","===","<>"], correct:2 },
      { q:"How do you start a PHP code block?", options:["<php>","<?php","<script php>","<%php%>"], correct:1 },
      { q:"Which function outputs text to the browser?", options:["print()","write()","output()","display()"], correct:0 },
      { q:"Which superglobal holds form data sent via POST?", options:["$_GET","$_POST","$_FORM","$_REQUEST_POST"], correct:1 },
      { q:"What does 'include' do if the file is missing?", options:["Fatal error, stops script","Warning, script continues","Nothing happens","Throws exception always"], correct:1 },
      { q:"Which function connects PHP to a MySQL database (procedural)?", options:["mysqli_connect()","mysql_link()","db_connect()","connect_mysql()"], correct:0 },
      { q:"What does '=>' represent in an array?", options:["Comparison","Key-value association","Function pointer","Concatenation"], correct:1 },
      { q:"Which function checks if a variable is set and not null?", options:["exists()","isset()","is_null()","defined()"], correct:1 },
      { q:"What does the '.' operator do in PHP?", options:["Access object property","Concatenate strings","Multiply numbers","Comment"], correct:1 },
      { q:"Which keyword defines a namespace?", options:["namespace","package","module","using"], correct:0 },
      { q:"What is the correct way to define a function?", options:["function myFunc() {}","def myFunc() {}","func myFunc() {}","fn myFunc() {}"], correct:0 }
    ]
  },

  ruby: {
    name: "Ruby", icon: "💎", difficulty: "Beginner", color: "#cc342d",
    questions: [
      { q:"Which keyword defines a method in Ruby?", options:["func","def","method","define"], correct:1 },
      { q:"How do you end a block in Ruby (non-brace style)?", options:["endblock","}","end","stop"], correct:2 },
      { q:"What does '.each' do on an array?", options:["Returns the array length","Iterates over each element","Sorts the array","Removes duplicates"], correct:1 },
      { q:"Which symbol denotes a Ruby symbol literal?", options:["#name","$name",":name","@name"], correct:2 },
      { q:"What does 'attr_accessor' generate?", options:["Only a getter","Only a setter","Both getter and setter methods","A constant"], correct:2 },
      { q:"Which is the correct way to create a hash?", options:["{ key: 'value' }","[key: 'value']","(key: 'value')","<key: 'value'>"], correct:0 },
      { q:"What does 'nil' represent in Ruby?", options:["Zero","Empty string","Absence of a value","False"], correct:2 },
      { q:"Which keyword handles exceptions in Ruby?", options:["catch","rescue","except","handle"], correct:1 },
      { q:"What does '<<' do when used with an array?", options:["Removes last element","Appends an element","Compares arrays","Sorts descending"], correct:1 },
      { q:"What is a Ruby 'module' primarily used for?", options:["Creating instances","Namespacing and mixins","Database access","Compiling code"], correct:1 },
      { q:"Which method converts a string to an integer?", options:["to_s","to_i","to_int()","parseInt()"], correct:1 },
      { q:"What does 'require' do in Ruby?", options:["Defines a class","Loads an external file/library","Deletes a variable","Starts a loop"], correct:1 }
    ]
  },

  go: {
    name: "Go", icon: "🐹", difficulty: "Intermediate", color: "#00add8",
    questions: [
      { q:"Which keyword declares a variable in Go?", options:["var","let","dim","def"], correct:0 },
      { q:"What does ':=' do in Go?", options:["Comparison","Short variable declaration and assignment","Pointer dereference","Struct definition"], correct:1 },
      { q:"Which keyword starts a goroutine?", options:["async","go","thread","spawn"], correct:1 },
      { q:"What is used for communication between goroutines?", options:["Channels","Sockets only","Global variables only","Locks only"], correct:0 },
      { q:"Which function is the entry point of a Go program?", options:["start()","main()","init()","run()"], correct:1 },
      { q:"How does Go handle errors idiomatically?", options:["try-catch blocks","Returning error values","Exceptions","Panic for all errors"], correct:1 },
      { q:"What does 'defer' do?", options:["Runs code immediately","Delays execution until surrounding function returns","Declares a constant","Starts a goroutine"], correct:1 },
      { q:"Which keyword defines a struct in Go?", options:["class","struct","type ... struct","object"], correct:2 },
      { q:"What is Go's package for formatted I/O?", options:["io","fmt","format","stdio"], correct:1 },
      { q:"Does Go support classical class-based inheritance?", options:["Yes, fully","No, it uses composition and interfaces","Only for structs","Only with generics"], correct:1 },
      { q:"Which command runs a Go file directly?", options:["go build","go run","go exec","go start"], correct:1 },
      { q:"What does an empty interface{} accept in Go?", options:["Only structs","Only strings","Any type","No values"], correct:2 }
    ]
  },

  rust: {
    name: "Rust", icon: "🦀", difficulty: "Advanced", color: "#dea584",
    questions: [
      { q:"What does Rust use to manage memory without a garbage collector?", options:["Reference counting always","Ownership and borrowing","Manual malloc/free","A JIT compiler"], correct:1 },
      { q:"Which keyword declares an immutable variable by default?", options:["var","let","const","def"], correct:1 },
      { q:"How do you make a variable mutable in Rust?", options:["let mut x","mutable x","var x","x = mutable"], correct:0 },
      { q:"What happens when a value's owner goes out of scope?", options:["Nothing","It is automatically dropped/freed","It becomes global","It throws an error"], correct:1 },
      { q:"What does borrowing with '&' allow?", options:["Taking ownership permanently","Referencing a value without taking ownership","Copying a value always","Deleting a value"], correct:1 },
      { q:"Which type represents a value that might be absent?", options:["Option<T>","Maybe<T>","Nullable<T>","Optional<T>"], correct:0 },
      { q:"What does 'Result<T, E>' represent?", options:["A pair of two values","Success (Ok) or failure (Err)","A generic array","A tuple type"], correct:1 },
      { q:"Which macro prints to the console with a newline?", options:["print!","echo!","println!","write!"], correct:2 },
      { q:"What ensures Rust code is memory-safe at compile time?", options:["The garbage collector","The borrow checker","Runtime checks only","Manual review"], correct:1 },
      { q:"How are traits similar to in other languages?", options:["Classes","Interfaces","Structs","Enums"], correct:1 },
      { q:"What keyword defines an enum in Rust?", options:["enum","type","variant","union"], correct:0 },
      { q:"Which tool is Rust's package manager and build tool?", options:["rustpkg","cargo","rustup only","crate-cli"], correct:1 }
    ]
  },

  kotlin: {
    name: "Kotlin", icon: "🎯", difficulty: "Intermediate", color: "#7f52ff",
    questions: [
      { q:"Which keyword declares a read-only variable?", options:["var","val","let","const"], correct:1 },
      { q:"What does the '?' after a type mean in Kotlin?", options:["Optional parameter","The type is nullable","Deprecated type","Generic type"], correct:1 },
      { q:"Which platform is Kotlin most commonly associated with?", options:["iOS native only","Android development","Embedded systems only","Web only"], correct:1 },
      { q:"What is a data class primarily used for?", options:["Networking","Holding data with auto-generated equals/hashCode/toString","Threading","UI rendering"], correct:1 },
      { q:"Which operator safely calls a method on a nullable object?", options:["!!","?.","::",".."], correct:1 },
      { q:"What does 'when' in Kotlin replace from other languages?", options:["for loop","switch statement","try-catch","while loop"], correct:1 },
      { q:"How do you define a function in Kotlin?", options:["function foo()","func foo()","fun foo()","def foo()"], correct:2 },
      { q:"What does the Elvis operator '?:' do?", options:["Throws an exception","Provides a default value if the left side is null","Declares a class","Casts a type"], correct:1 },
      { q:"Is Kotlin fully interoperable with Java?", options:["No, not at all","Yes, it runs on the JVM and interoperates with Java","Only for Android apps","Only one-way (Java to Kotlin)"], correct:1 },
      { q:"Which keyword creates a singleton object?", options:["singleton","object","static class","instance"], correct:1 },
      { q:"What does '!!' do to a nullable variable?", options:["Makes it nullable","Asserts non-null, throws if null","Converts to string","Declares mutability"], correct:1 },
      { q:"Which construct is used for extension functions?", options:["class Extension","fun ClassName.functionName()","extend fun functionName()","override fun"], correct:1 }
    ]
  },

  swift: {
    name: "Swift", icon: "🦅", difficulty: "Intermediate", color: "#fa7343",
    questions: [
      { q:"Which keyword declares a constant in Swift?", options:["var","let","const","final"], correct:1 },
      { q:"What does an Optional in Swift represent?", options:["A required value","A value that might be nil","A constant array","A closure"], correct:1 },
      { q:"How do you safely unwrap an optional?", options:["Force unwrap only","if let / guard let","Cast with as!","Ignore it"], correct:1 },
      { q:"Which keyword defines a value type in Swift?", options:["class","struct","interface","protocol"], correct:1 },
      { q:"What is a 'protocol' in Swift similar to?", options:["A class","An interface","A struct","A tuple"], correct:1 },
      { q:"Which framework is used to build iOS user interfaces declaratively?", options:["UIKit only","SwiftUI","CoreData","Combine"], correct:1 },
      { q:"What does 'guard let' do if the condition fails?", options:["Continues execution","Exits the current scope early","Crashes always","Loops again"], correct:1 },
      { q:"Which keyword marks a function that can throw an error?", options:["throws","error","raise","fails"], correct:0 },
      { q:"What is a closure in Swift?", options:["A self-contained block of functionality","A type of class","A protocol extension","A memory leak"], correct:0 },
      { q:"Which collection type maintains key-value pairs?", options:["Array","Set","Dictionary","Tuple"], correct:2 },
      { q:"What does '??' do in Swift?", options:["Force unwrap","Nil-coalescing, provides default value","Comment","Bitwise operator"], correct:1 },
      { q:"Which keyword is used to inherit from a class?", options:["extends",": SuperclassName","implements","inherits"], correct:1 }
    ]
  },

  r: {
    name: "R", icon: "📊", difficulty: "Intermediate", color: "#276dc3",
    questions: [
      { q:"Which operator is traditionally used for assignment in R?", options:["=","<-","::","->>"], correct:1 },
      { q:"What is a vector in R?", options:["A 2D matrix only","A basic sequence of elements of the same type","A function type","A file format"], correct:1 },
      { q:"Which function reads a CSV file in base R?", options:["read.csv()","load.csv()","import.csv()","get.csv()"], correct:0 },
      { q:"What does 'NA' represent in R?", options:["Zero","Missing value","Negative number","String literal"], correct:1 },
      { q:"Which function returns the structure of an object?", options:["str()","struct()","type()","class.info()"], correct:0 },
      { q:"What package is widely used for data visualization in R?", options:["numpy","ggplot2","matplotlib","seaborn"], correct:1 },
      { q:"Which function applies a function over a list/vector?", options:["sapply()","loop()","runAll()","apply.each()"], correct:0 },
      { q:"What does 'data.frame' represent?", options:["A single number","A table-like structure with rows and columns","A plotting canvas","A regression model"], correct:1 },
      { q:"Which symbol comments a line in R?", options:["//","#","--","'"], correct:1 },
      { q:"What does 'summary()' typically show for a numeric vector?", options:["Only the mean","Min, max, quartiles, mean","The variable's type only","Nothing, it errors"], correct:1 },
      { q:"Which package manager is commonly used to install R packages?", options:["install.packages()","pip install","npm install","apt-get"], correct:0 },
      { q:"What does 'factor()' create in R?", options:["A numeric sequence","A categorical variable","A matrix","A string vector"], correct:1 }
    ]
  },

  bash: {
    name: "Bash", icon: "💻", difficulty: "Intermediate", color: "#4eaa25",
    questions: [
      { q:"Which line at the top of a script specifies the interpreter?", options:["#!/bin/bash","#!bash","##bash","!bash"], correct:0 },
      { q:"How do you declare a variable in Bash?", options:["var x = 5","x = 5","x=5","let x := 5"], correct:2 },
      { q:"Which symbol accesses a variable's value?", options:["&x","$x","#x","%x"], correct:1 },
      { q:"What does '$@' represent in a script?", options:["The script's name","All positional arguments","The exit code","The current directory"], correct:1 },
      { q:"Which construct checks a condition in Bash?", options:["if [ condition ]; then ... fi","if (condition) { }","when condition:","check(condition)"], correct:0 },
      { q:"What does '$?' hold after running a command?", options:["The command's output","The exit status of the last command","The current user","The script's PID"], correct:1 },
      { q:"Which loop iterates over a list of items?", options:["for item in list; do ... done","foreach item","loop item in list","repeat item"], correct:0 },
      { q:"What does 'chmod +x script.sh' do?", options:["Deletes the script","Makes the script executable","Renames the script","Compresses the script"], correct:1 },
      { q:"Which command reads user input into a variable?", options:["input var","read var","get var","scan var"], correct:1 },
      { q:"What does '&&' do between two commands?", options:["Runs second command regardless","Runs second command only if first succeeds","Runs both in parallel","Pipes output"], correct:1 },
      { q:"Which command exports a variable to child processes?", options:["export VAR=value","set VAR=value","global VAR=value","public VAR=value"], correct:0 },
      { q:"What does 'set -e' do in a script?", options:["Enables debugging","Exits immediately if a command fails","Suppresses all output","Enables strict variable checking"], correct:1 }
    ]
  },

  docker: {
    name: "Docker", icon: "🐳", difficulty: "Intermediate", color: "#2496ed",
    questions: [
      { q:"Which file defines how a Docker image is built?", options:["docker-compose.yml","Dockerfile","image.config","build.docker"], correct:1 },
      { q:"Which command builds an image from a Dockerfile?", options:["docker build","docker create","docker compile","docker make"], correct:0 },
      { q:"What is the difference between an image and a container?", options:["No difference","An image is a blueprint; a container is a running instance","A container is a blueprint; an image is running","Images run only on Linux"], correct:1 },
      { q:"Which command lists running containers?", options:["docker list","docker ps","docker show","docker containers"], correct:1 },
      { q:"What does 'docker-compose' help manage?", options:["Single container images","Multi-container applications","Only networking","Only volumes"], correct:1 },
      { q:"Which instruction in a Dockerfile sets the base image?", options:["BASE","FROM","IMAGE","START"], correct:1 },
      { q:"What does a Docker volume provide?", options:["Faster CPU","Persistent data storage outside the container lifecycle","Network isolation","Image compression"], correct:1 },
      { q:"Which command stops a running container?", options:["docker stop <id>","docker end <id>","docker halt <id>","docker kill-only <id>"], correct:0 },
      { q:"What does 'EXPOSE' do in a Dockerfile?", options:["Opens a port on the host firewall","Documents which port the container listens on","Deletes a port","Encrypts traffic"], correct:1 },
      { q:"Which command removes an unused image?", options:["docker rmi <image>","docker delete <image>","docker clean <image>","docker erase <image>"], correct:0 },
      { q:"What is a Docker registry?", options:["A local config file","A storage/distribution service for images (e.g. Docker Hub)","A container runtime","A networking driver"], correct:1 },
      { q:"Which instruction runs a command when the container starts?", options:["RUN","CMD","EXEC","START"], correct:1 }
    ]
  }

};

/* Rank thresholds based on accuracy percentage */
const RANKS = [
  { min: 0,  max: 20,  name: "WOOD RANK",       icon:"🪵", color:"#a67c4e" },
  { min: 21, max: 40,  name: "STONE RANK",      icon:"🪨", color:"#8a8a8a" },
  { min: 41, max: 60,  name: "IRON RANK",       icon:"⚙",  color:"#d8d8d8" },
  { min: 61, max: 80,  name: "GOLD RANK",       icon:"🥇", color:"#ffd633" },
  { min: 81, max: 90,  name: "DIAMOND RANK",    icon:"💎", color:"#4ce8ff" },
  { min: 91, max: 100, name: "NETHERITE MASTER",icon:"🔥", color:"#4a4448" }
];

/* Achievement definitions */
const ACHIEVEMENTS = [
  { id:"first_quiz",   icon:"🎮", name:"First Quiz",        check: s => s.gamesPlayed >= 1 },
  { id:"perfect_score", icon:"💯", name:"Perfect Score",     check: s => s.hadPerfectGame },
  { id:"quiz_master",  icon:"👑", name:"Quiz Master",        check: s => s.gamesPlayed >= 10 },
  { id:"java_expert",  icon:"☕", name:"Java Expert",        check: s => (s.langStats.java?.best || 0) >= 90 },
  { id:"python_expert",icon:"🐍", name:"Python Expert",      check: s => (s.langStats.python?.best || 0) >= 90 },
  { id:"js_expert",    icon:"🟨", name:"JavaScript Expert",  check: s => (s.langStats.javascript?.best || 0) >= 90 },
  { id:"html_hero",    icon:"🧱", name:"HTML Hero",          check: s => (s.langStats.html?.best || 0) >= 90 },
  { id:"css_wizard",   icon:"🎨", name:"CSS Wizard",         check: s => (s.langStats.css?.best || 0) >= 90 },
  { id:"sql_master",   icon:"🗄", name:"SQL Master",         check: s => (s.langStats.sql?.best || 0) >= 90 },
  { id:"git_commander",icon:"🌿", name:"Git Commander",      check: s => (s.langStats.git?.best || 0) >= 90 },
  { id:"linux_warrior",icon:"🐧", name:"Linux Warrior",      check: s => (s.langStats.linux?.best || 0) >= 90 },
  { id:"programming_legend", icon:"🏆", name:"Programming Legend", check: s => s.totalXP >= 2000 }
];
