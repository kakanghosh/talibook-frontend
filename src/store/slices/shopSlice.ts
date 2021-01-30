import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DistrubutorShops, Shop, ShopSliceState } from '../../models';
import { RootState } from '../store';

const initialState: ShopSliceState = {
  distrubutorShops: [],
};

const addShopInDistributorSlice: CaseReducer<
  ShopSliceState,
  PayloadAction<{ distributorId: number; shop: Shop }>
> = (state, action) => {
  const { payload } = action;
  const distributor = state.distrubutorShops.find(
    (ds) => ds.distributorId == payload.distributorId
  );
  if (distributor) {
    distributor.shops.push(payload.shop);
  }
};

const populateShopsInDistributorSlice: CaseReducer<
  ShopSliceState,
  PayloadAction<DistrubutorShops>
> = (state, action) => {
  state.distrubutorShops.push(action.payload);
};

export const shopSlice = createSlice({
  name: 'shopSlice',
  initialState,
  reducers: {
    addShopInDistributor: addShopInDistributorSlice,
    populateShopsInDistributor: populateShopsInDistributorSlice,
  },
});

export const {
  populateShopsInDistributor,
  addShopInDistributor,
} = shopSlice.actions;

export const selectShopsbyDistributorId = (distributorId: number) => ({
  shop,
}: RootState) => {
  const ds = shop.distrubutorShops.find(
    (ds) => ds.distributorId == distributorId
  );
  return ds?.shops;
};

export default shopSlice.reducer;
