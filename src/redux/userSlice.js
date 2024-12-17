import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "app",
    initialState:{
        open:false,
        user:null,
       
    },
    reducers:{
        setOpen:(state,action)=>{
            state.open=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        }
    }
});

export const { setOpen, setUser} = userSlice.actions;
export default userSlice.reducer;