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
  const { transactionData, shopId } = action.payload;
  const shopTransaction = state.shopsTransaction.find(
    (st) => st.shopId === shopId
  );
  if (shopTransaction) {
    const { transactionData: transactionDataFromStore } = shopTransaction;
    transactionDataFromStore.totalDeposite = transactionData.totalDeposite;
    transactionDataFromStore.totalPurchase = transactionData.totalPurchase;
    transactionDataFromStore.transactions.push(transactionData.transaction);
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

export const selectTransactionByShopId = (shopId: number) => ({
  transaction,
}: RootState) => {
  const shopTransaction = transaction.shopsTransaction.find(
    (st) => st.shopId === shopId
  );
  return shopTransaction?.transactionData;
};

export default transactionSlice.reducer;
