const express = require('express');
const cors = require('cors');

const { v4: uuidv4, v4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers

  const user = users.find((user) => user.username == username)

  if(!user)
    return response.status(400).json({ ERROR: "username not found!"})

  request.user = user

  return next();
}

app.post('/users', (request, response) => {
  const { username, name } = request.body;

  NewUser = { 
      id: v4(),
      name: name, 
      username: username, 
      todos: []
    }

    users.push(NewUser)

    response.status(201).json(NewUser)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request

  todos = user.todos

  return response.status(200).json(todos)
  
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const {title, deadline} = request.body

  const { user } = request

  NewTodos = { 
      id: v4(), 
      title: title,
      done: false, 
      deadline: new Date(deadline), 
      created_at: new Date()
  }

  user.todos.push(NewTodos)

  return response.status(201).json(NewTodos)
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body
  const { user } = request
  const { id } = request.params

  const todoExists = users.map((user, index) => user.todos[index].id === id)

  if(!todoExists){
    return response.status(404).json({ERROR: "Todo not found!"})
  }

  newTodos = { 
    id: v4(), 
    title: title,
    done: false, 
    deadline: new Date(deadline), 
    created_at: new Date()
  }

  user.map((user,index) => {
    user.todos[index].id === id ?
      user.todos[index] = newTodos :
      user.todos[index]
  })

  return response.status(200).json(newTodos)
  
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;