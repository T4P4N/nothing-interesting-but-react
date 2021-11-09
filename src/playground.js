// Obj destructuring

const todos = {
  title: 'Test',
  body: 'lorem ipsum dolor situn',
  author: 'Tapan',
};

// without obj destructuring

let title = todos.title;
let body = todos.body;
let author = todos.author;

console.log(title + ' ' + body + 'By ' + author);

// with obj destructuring

const { title, body, author } = todos;
console.log(title + ' ' + body + 'By ' + author);
