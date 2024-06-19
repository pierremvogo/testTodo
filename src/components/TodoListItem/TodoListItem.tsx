import React from "react";
import Person from "../../models/Person";
import Todo from "../../models/Todo";

interface Props {
    todo: Todo,
    person: Person
}
export const TodoListItem: React.FC<Props> = ({todo}) => {
  return(  
        <li>
            <label
                style={{ textDecoration: todo.complited ? 'line-through' : undefined }}
            >
                <input type="checkbox" checked={todo.complited} /> {todo.title}
            </label>
        </li>
      )
}