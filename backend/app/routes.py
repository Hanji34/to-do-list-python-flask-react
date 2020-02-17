from app import app

@app.route('/todo')
def list_todo():
    return "To-do-list"