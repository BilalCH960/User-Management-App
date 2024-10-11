import { createSlice} from '@reduxjs/toolkit';


const initialState ={
    num: 0,
};


const revSlice = createSlice({
    name:'num',
    initialState,
    reducers:{
        increment(state){
            state.num = state.num + 1
        },
        decrement(state){
            state.num = state.num - 1
        },
    },
});




export const {increment,decrement } =revSlice.actions;
export default revSlice.reducer;