// src/store/slices/User.test.ts
import { AnyAction, configureStore, EnhancedStore, isAsyncThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "@reduxjs/toolkit";
import reducer, { UserState } from './User';
import { postUser, loginUser, signoutUser, getUsers, getRequestUser, putSurvey } from './User';

jest.mock("axios");

describe("User reducer", () => {
    let store: EnhancedStore<{ userState: UserState }, AnyAction, [ThunkMiddleware<{ userState: UserState }, AnyAction, undefined>]>;
    const fakeUser1 = { id: 1, 'username': 'fakeUser1', 'password': '12345', 'gender': 1, 'age': 1, 'taste': 'AB', 'question': 1, 'loginState': false };
    const fakeUser1_loggedIn = { id: 1, 'username': 'fakeUser1', 'password': '12345', 'gender': 1, 'age': 1, 'taste': 'AB', 'question': 1, 'loginState': true };
    const fakeUser2 = { id: 2, 'username': 'fakeUser2', 'password': '12345', 'gender': 2, 'age': 2, 'taste': 'ABC', 'question': 2, 'loginState': true };
    const fakeUser3 = { id: 3, 'username': 'fakeUser3', 'password': '12345', 'gender': 1, 'age': 3, 'taste': 'DE', 'question': 3, 'loginState': false };
    const wrongUserInput = { 'username': 'wrong', 'password': 'wrong' };
    const fakeUserList1 = [fakeUser1, fakeUser2];
    const fakeUserList2 = [fakeUser1, fakeUser2, fakeUser3];
    const changeSurvey1 = { id: 1, 'gender': 1, 'age': 3, 'taste': 'C', 'question': 2 };
    const changedFakeUser1 = { id: 1, 'username': 'fakeUser1', 'password': '12345', 'gender': 1, 'age': 3, 'taste': 'C', 'question': 2, 'loginState': false };

    beforeAll(() => {
        store = configureStore(
            { reducer: { userState: reducer } }
        );
    });


    it("should handle initial State", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
            users: [],
            selectedUser: null,
        });
    });

    it("should handle getUsers_no users(null)", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: null });
        await store.dispatch(getUsers());
        expect(store.getState().userState.users).toEqual([]);
    });
    it("should handle getUsers", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeUserList1 });
        await store.dispatch(getUsers());
        expect(store.getState().userState.users).toEqual(fakeUserList1);
    });


    it("should handle getRequestUser_null", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: null });
        await store.dispatch(getRequestUser());
        expect(store.getState().userState.selectedUser).toEqual(null);
    });
    it("should handle getRequestUser_loggedIn", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeUser1 });
        await store.dispatch(getRequestUser());
        expect(store.getState().userState.selectedUser).toEqual(fakeUser1);
    });
    it("should handle getRequestUser_undefined user", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: wrongUserInput });
        await store.dispatch(getRequestUser());
        expect(store.getState().userState.selectedUser).toEqual(null);
    });

    it("should handle postUser(signUp)", async () => {
        jest.spyOn(axios, "post").mockResolvedValue({
            data: fakeUser3
        });
        await store.dispatch(
            postUser({ 'username': 'fakeUser3', 'password': '12345', 'gender': 1, 'age': 3, 'taste': 'DE', 'question': 3 })
        );
        expect(store.getState().userState.users).toEqual(fakeUserList2);
    });
    it("should handle loginUser", async () => {
        jest.spyOn(axios, "post").mockResolvedValue({
            data: fakeUser1_loggedIn
        })
        await store.dispatch(
            loginUser({ 'username': 'fakeUser1', 'password': '12345' })
        );
        expect(store.getState().userState.selectedUser).toEqual(fakeUser1_loggedIn);
        // expect(store.getState().todo.todos.find((v) => v.id === fakeTodo.id)?.done).toEqual(true);
    });
    it("should handle signoutUser", async () => {
        jest.spyOn(axios, "get").mockResolvedValue({
            data: null
        })
        await store.dispatch(
            signoutUser()
        );
        expect(store.getState().userState.selectedUser).toEqual(null);
        // expect(store.getState().todo.todos.find((v) => v.id === fakeTodo.id)?.done).toEqual(true);
    });
    it("should handle fail loginUser", async () => {
        jest.spyOn(axios, "post").mockResolvedValue({
            data: wrongUserInput
        })
        await store.dispatch(
            loginUser({ 'username': 'wrong', 'password': 'wrong' })
        );
        expect(store.getState().userState.selectedUser).toEqual(null);
        // expect(store.getState().todo.todos.find((v) => v.id === fakeTodo.id)?.done).toEqual(true);
    });
    it("should handle postUser addcase error", async () => {
        const mockConsoleError = jest.fn();
        console.error = mockConsoleError;
        jest.spyOn(axios, "post").mockRejectedValue({
            response: { data: { title: ["error"] } },
        });
        await store.dispatch(postUser({ 'username': 'fakeUser1', 'password': '12345', 'gender': 1, 'age': 1, 'taste': 'AB', 'question': 1 }));
        expect(mockConsoleError).toBeCalled();
    });
    it("should handle putSurvey - null", async () => {
        jest.spyOn(axios, "put").mockResolvedValue({
            data: changeSurvey1
        })
        await store.dispatch(
            putSurvey({ id: 1, 'gender': 1, 'age': 3, 'taste': 'C', 'question': 2 })
        );
        expect(store.getState().userState.users).toEqual(changedFakeUser1);
    });
    it("should handle putSurvey - not null", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeUser1 });
        await store.dispatch(getRequestUser());

        jest.spyOn(axios, "put").mockResolvedValue({
            data: changeSurvey1
        })
        await store.dispatch(
            putSurvey({ id: 1, 'gender': 1, 'age': 3, 'taste': 'C', 'question': 2 })
        );
        expect(store.getState().userState.users).toEqual(changedFakeUser1);
    });

}); // end describe
