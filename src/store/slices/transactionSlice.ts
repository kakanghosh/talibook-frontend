import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  NewTransaction,
  NewTransactionState,
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

const deleteTransactionHistoryInShopSlice: CaseReducer<
  TransactionSliceState,
  PayloadAction<{
    shopId: number;
    transactionId: number;
    newTransactionState: NewTransactionState;
  }>
> = (state, action) => {
  const {
    shopId,
    transactionId,
    newTransactionState: { totalPurchase, totalDeposite },
  } = action.payload;
  const shopTransaction = state.shopsTransaction.find(
    (st) => st.shopId === shopId
  );
  if (shopTransaction) {
    const { transactions } = shopTransaction.transactionData;
    shopTransaction.transactionData.transactions = transactions.filter(
      (trans) => trans.id !== transactionId
    );
    shopTransaction.transactionData.totalPurchase = totalPurchase;
    shopTransaction.transactionData.totalDeposite = totalDeposite;
  }
};

const populateTransactionOfShopSlice: CaseReducer<
  TransactionSliceState,
  PayloadAction<ShopTransaction>
> = (state, action) => {
  const shopTransData = state.shopsTransaction.find(
    (shopTrans) => shopTrans.shopId === action.payload.shopId
  );
  if (shopTransData) {
    shopTransData.transactionData = action.payload.transactionData;
  } else {
    state.shopsTransaction.push(action.payload);
  }
};

export const transactionSlice = createSlice({
  name: 'transactionSlice',
  initialState,
  reducers: {
    populateTransactionOfShop: populateTransactionOfShopSlice,
    updateTransactionHistoryInShop: updateTransactionHistoryInShopSlice,
    deleteTransactionHistoryInShop: deleteTransactionHistoryInShopSlice,
  },
});

export const {
  populateTransactionOfShop,
  updateTransactionHistoryInShop,
  deleteTransactionHistoryInShop,
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
