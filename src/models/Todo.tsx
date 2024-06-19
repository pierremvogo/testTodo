import Labels from "./Label";
import Person from "./Person";
import Priority from "./Priority";

 interface Todo {
    id: number,
    title: string,
    person: Person,
    startDate: Date,
    endDate: Date,
    priority: Priority,
    labels: Labels[],
    description: string,
    complited: boolean
}
export default Todo
