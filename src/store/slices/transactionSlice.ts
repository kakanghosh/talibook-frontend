import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  NewTransaction,
  ShopTransaction,
  TransactionSliceState,
} from '../../models';
import { RootState } from '../store';

const initialState: TransactionSliceState = {
  shopsTransaction: [],
};

const updateTransactionHistoryInShopSlice: CaseReducer<
  TransactionSliceState,
  PayloadAction<{ shopId: number; transactionData: NewTransaction }>
> = (state, action) => {
  const { payload } = action;
  const shopTransaction = state.shopsTransaction.find(
    (st) => st.shopId === payload.shopId
  );
  if (shopTransaction) {
    shopTransaction.transactionData.totalDeposite =
      payload.transactionData.totalDeposite;
    shopTransaction.transactionData.totalPurchase =
      payload.transactionData.totalPurchase;
    shopTransaction.transactionData.transactions.push(
      payload.transactionData.transaction
    );
  }
};

const populateTransactionOfShopSlice: CaseReducer<
  TransactionSliceState,
  PayloadAction<ShopTransaction>
> = (state, action) => {
  state.shopsTransaction.push(action.payload);
};

export const transactionSlice = createSlice({
  name: 'transactionSlice',
  initialState,
  reducers: {
    populateTransactionOfShop: populateTransactionOfShopSlice,
    updateTransactionHistoryInShop: updateTransactionHistoryInShopSlice,
  },
});

export const {
  populateTransactionOfShop,
  updateTransactionHistoryInShop,
} = transactionSlice.actions;

export const selectTransaction = ({ transaction }: RootState) =>
  transaction.shopsTransaction;

export default transactionSlice.reducer;
