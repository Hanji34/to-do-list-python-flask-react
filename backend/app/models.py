from app import db


class BaseModel:
    """Base for all models, providing save, delete and from_dict methods."""

    def __commit(self):
        """Commits the current db.session, does rollback on failure."""
        from sqlalchemy.exc import IntegrityError

        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()

    def delete(self):
        """Deletes this model from the db (through db.session)"""
        db.session.delete(self)
        self.__commit()

    def save(self):
        """Adds this model to the db (through db.session)"""
        db.session.add(self)
        self.__commit()
        return self

    @classmethod
    def from_dict(cls, model_dict):
        return cls(**model_dict).save()

class Todo(db.Model, BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(256))
    done = db.Column(db.Boolean)

    def __init__(self, description, done=False):
        self.description = description
        self.done = done

    def __repr__(self):
        return '<Todo id:{}, description:{}, status:{}>'.format(self.id, self.description, self.done)

    def update_todo(self):
        self.done = not self.done
        self.save()
        return "Task updated"

    def create_todo(self):
        self.save()
        return "Task created"
    
    def delete_todo(self):
        self.delete()
        return "Task deleted"

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "done": self.done
        }

    def update_description_todo(self):
        self.description = self.description
        self.save()
        return "Task updated"