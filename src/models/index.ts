export class Todo {
  id: number;
  text: string;
}

export interface TodoListSliceState {
  value: Todo[];
}

export interface DistributorSliceState {
  value: Distributor[];
}

export class DistrubutorShops {
  distributorId: number;
  shops: Shop[];
}

export interface ShopSliceState {
  distrubutorShops: DistrubutorShops[];
}

export class ShopTransaction {
  shopId: number;
  transactionData: TransactionData;
}

export interface TransactionSliceState {
  shopsTransaction: ShopTransaction[];
}

export class Audit {
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Audit {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  deletedAt: Date;
}

export class Shop extends Audit {
  id: number;
  name: string;
}

export class Distributor extends Audit {
  id: number;
  name: string;
}
export class Transaction extends Audit {
  id: number;
  amount: number;
  type: number;
}

export class NewTransaction extends Audit {
  totalDeposite: number;
  totalPurchase: number;
  transaction: Transaction;
}

export class TransactionData {
  totalDeposite: number;
  totalPurchase: number;
  transactions: Transaction[];
}

export class NewTransactionState {
  totalDeposite: number;
  totalPurchase: number;
}
