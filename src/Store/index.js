
import { configureStore, createSlice } from '@reduxjs/toolkit';

const inititalExpenseState = { expenses: [] }
const expenseSlice = createSlice({
    name: "expense",
    initialState: inititalExpenseState,
    reducers: {
        setExpenses(state,action) {
            state.expenses=action.payload;
        }
    }
})

const inititalAuthState = {
    login: false,
    token: localStorage.getItem("token"),
    isLoggedIn: localStorage.getItem("token") !==null,
    profileInfo:{ myName: "", myUrl: "" }
}
const authSlice = createSlice({
    name: "authentication",
    initialState: inititalAuthState,
    reducers: {
        loginTrue(state) {
            state.login = true;
        },
        loginFalse(state) {
            state.login = false;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setIsloggedIn(state,action){
            state.isLoggedIn=action.payload;
        },
        setProfileInfo(state,action){
            state.profileInfo=action.payload;
        }
    }
})

const store = configureStore({
    reducer: { expense: expenseSlice.reducer, authentication: authSlice.reducer }
});

export default store;
export const expenseActions = expenseSlice.actions;
export const authActions = authSlice.actions;