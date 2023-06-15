
import { configureStore, createSlice } from '@reduxjs/toolkit';

const inititalExpenseState = { expenses: [],totalExpense:0 }
const expenseSlice = createSlice({
    name: "expense",
    initialState: inititalExpenseState,
    reducers: {
        setExpenses(state,action) {
            state.expenses=action.payload;
        },
        setTotalExpense(state,action) {
            state.expenses=action.payload;
        }
    }
})
const inititalThemeState = { mode:false ,showTheme:false}
const themeSlice = createSlice({
    name: "theme",
    initialState: inititalThemeState,
    reducers: {
        setMode(state) {
            state.mode=!state.mode;
        },
        setShow(state) {
            state.showTheme=true;
        }
    }
})

const inititalAuthState = {
    login: false,
    token: localStorage.getItem("token"),
    isLoggedIn: localStorage.getItem("token"),
    profileInfo:{ myName: "", myUrl: "" },
    user:localStorage.getItem("user")
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
        },
        setuser(state,action){
            state.user=action.payload;
        }
    }
})

const store = configureStore({
    reducer: { expense: expenseSlice.reducer, authentication: authSlice.reducer, theme: themeSlice.reducer }
});

export default store;
export const expenseActions = expenseSlice.actions;
export const authActions = authSlice.actions;
export const themeActions = themeSlice.actions;