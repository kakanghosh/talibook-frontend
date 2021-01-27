export class Todo {
  id: number;
  text: string;
}

export interface TodoListSliceState {
  value: Todo[];
}
