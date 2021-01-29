export class Todo {
  id: number;
  text: string;
}

export interface TodoListSliceState {
  value: Todo[];
}

export class User {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Shop {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Distributor {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export class Transaction {
  id: number;
  amount: number;
  type: number;
  createdAt: Date;
  updatedAt: Date;
}

export class TransactionData {
  totalDeposite: number;
  totalPurchase: number;
  transactions: Transaction[];
}
