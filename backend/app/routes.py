from flask import jsonify, request, abort, url_for
from app import db, app
from app.models import Todo

@app.route("/todo", methods = ["GET"])
def list_todo():
    everytodo = []
    for t in Todo.query.all():
        everytodo.append(t.to_dict())
    
    return jsonify(
        {
            "ToDo": everytodo
        }
    )

@app.route("/todo", methods = ["POST"])
def create_todo():
    requested_todo = request.get_json()
    todo = Todo(requested_todo["description"], requested_todo["done"])
    todo.create_todo()
    print(todo)
    return jsonify(todo.to_dict())

@app.route("/todo/<int:todoid>", methods = ["GET"])
def get_todo(todoid):
    todo = Todo.query.get(todoid)
    return jsonify(todo.to_dict())

@app.route("/todo/<int:todoid>", methods = ["DELETE"])
def delete_todo(todoid):
    todo = Todo.query.get(todoid)
    todo.delete_todo()
    return jsonify("To-do deletado com sucesso")

@app.route("/todo/<int:todoid>/finish", methods = ["POST"])
def update_todo(todoid):
    todo = Todo.query.get(todoid)
    todo.update_todo()
    return jsonify(todo.to_dict())

@app.route("/todo/<int:todoid>/<descriptiontodo>", methods = ["POST"])
def update_description_todo(todoid, descriptiontodo):
    todo = Todo.query.get(todoid)
    todo.description = descriptiontodo
    todo.update_description_todo()
    return jsonify(todo.to_dict())