import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Distributor, DistributorSliceState } from '../../models';
import { RootState } from '../store';

const initialState: DistributorSliceState = {
  value: [],
};

const addToDistributorListSlice: CaseReducer<
  DistributorSliceState,
  PayloadAction<Distributor>
> = (state, action) => {
  state.value.push(action.payload);
};

const populateDistributorListSlice: CaseReducer<
  DistributorSliceState,
  PayloadAction<Distributor[]>
> = (state, action) => {
  state.value = action.payload;
};

export const distributorSlice = createSlice({
  name: 'distributorSlice',
  initialState,
  reducers: {
    addToDistributorList: addToDistributorListSlice,
    populateDistributorList: populateDistributorListSlice,
  },
});

export const {
  addToDistributorList,
  populateDistributorList,
} = distributorSlice.actions;

export const selectDistributors = ({ distributor }: RootState) =>
  distributor.value;

export default distributorSlice.reducer;
