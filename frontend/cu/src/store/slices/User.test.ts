// src/store/slices/User.test.ts
import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { ThunkMiddleware } from "@reduxjs/toolkit";


import reducer, { UserState } from './User';
import { postUser, loginUser, signoutUser, getUsers, getRequestUser, putSurvey, getRequestUserAtLogin } from './User';
import client from '../api/client';

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
    const changedFakeUser1 = { id: 1, 'username': 'fakeUser1', 'password': '12345', 'gender': 1, 'age': 3, 'taste': 'C', 'question': 2, 'loginState': true };

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

    it("should handle putSurvey - null", async () => {
        jest.spyOn(client, "put").mockResolvedValue({
            data: null
        })
        await store.dispatch(
            putSurvey({ id: 1, 'gender': 1, 'age': 3, 'taste': 'C', 'question': 2 })
        );
        expect(store.getState().userState.selectedUser).toEqual(null);
    });

    it("should handle getUsers_no users(null)", async () => {
        // const client = axios.create.mockReturnThis();
        // client.get = jest.fn().mockResolvedValue({ data: null });
        jest.spyOn(client, "get").mockResolvedValue({
            data: null
        });
        await store.dispatch(getUsers());
        expect(store.getState().userState.users).toEqual([]);
    });

    it("should handle getUsers", async () => {
        jest.spyOn(client, "get").mockResolvedValue({ data: fakeUserList1 })

        // client.get = jest.fn().mockResolvedValue({ data: fakeUserList1 });
        await store.dispatch(getUsers());
        expect(store.getState().userState.users).toEqual(fakeUserList1);
    });

    it("should handle putSurvey - null", async () => {
        reducer(undefined, { type: "unknown" });
        jest.spyOn(client, "put").mockResolvedValue({
            data: changeSurvey1
        })
        await store.dispatch(
            putSurvey({ id: 1, 'gender': 1, 'age': 3, 'taste': 'C', 'question': 2 })
        );
        expect(store.getState().userState.selectedUser).toEqual(null);
    });




    it("should handle getRequestUser_null", async () => {
        jest.spyOn(client, "get").mockResolvedValue({
            data: null
        })
        await store.dispatch(getRequestUser());
        expect(store.getState().userState.selectedUser).toEqual(null);
    });
    xit("should handle getRequestUser_\'\'", async () => {
        jest.spyOn(client, "get").mockResolvedValue({
            data: ''
        })
        await store.dispatch(getRequestUser());
        global.window = Object.create(window);
        const url = "/login";
        Object.defineProperty(window, 'location', {
            value: {
                replace: url
            }
        });
        expect(window.location.replace).toEqual(url);
        expect(store.getState().userState.selectedUser).toEqual(null);
    });
    it("should handle getRequestUser_loggedIn", async () => {
        jest.spyOn(client, "get").mockResolvedValue({
            data: fakeUser1
        })
        await store.dispatch(getRequestUser());
        expect(store.getState().userState.selectedUser).toEqual(fakeUser1);
    });
    it("should handle getRequestUser_user", async () => {
        jest.spyOn(client, "get").mockResolvedValue({
            data: wrongUserInput
        })
        await store.dispatch(getRequestUser());
        expect(store.getState().userState.selectedUser).toEqual(null);
    });

    xit("should handle getRequestUserAtLogin_real user", async () => {
        jest.spyOn(client, "get").mockResolvedValue({
            data: fakeUserList1
        })
        await store.dispatch(getUsers());

        jest.spyOn(client, "get").mockResolvedValue({
            data: fakeUser1
        })
        await store.dispatch(getRequestUserAtLogin());
        global.window = Object.create(window);
        const url = "/home";
        Object.defineProperty(window, 'location', {
            value: {
                replace: url
                // href: url
            }
        });
        // expect(window.location.replace).toEqual(url);
        expect(store.getState().userState.selectedUser).toEqual(fakeUser1);
    });
    it("should handle getRequestUserAtLogin_undefined user", async () => {
        jest.spyOn(client, "get").mockResolvedValue({
            data: ''
        })
        // axios.get = jest.fn().mockResolvedValue({  });
        await store.dispatch(getRequestUserAtLogin());

        expect(store.getState().userState.selectedUser).toEqual(null);
    });



    it("should handle postUser(signUp)", async () => {
        jest.spyOn(client, "post").mockResolvedValue({
            data: fakeUser3
        });
        await store.dispatch(
            postUser({ 'username': 'fakeUser3', 'password': '12345', 'gender': 1, 'age': 3, 'taste': 'DE', 'question': 3 })
        );
        expect(store.getState().userState.users).toEqual(fakeUserList2);
    });
    it("should handle loginUser", async () => {
        jest.spyOn(client, "post").mockResolvedValue({
            data: fakeUser1_loggedIn
        })
        await store.dispatch(
            loginUser({ 'username': 'fakeUser1', 'password': '12345' })
        );
        expect(store.getState().userState.selectedUser).toEqual(fakeUser1_loggedIn);
        // expect(store.getState().todo.todos.find((v) => v.id === fakeTodo.id)?.done).toEqual(true);
    });
    it("should handle signoutUser", async () => {
        jest.spyOn(client, "get").mockResolvedValue({
            data: null
        });

        await store.dispatch(
            signoutUser()
        );
        expect(store.getState().userState.selectedUser).toEqual(null);
        // expect(store.getState().todo.todos.find((v) => v.id === fakeTodo.id)?.done).toEqual(true);
    });
    it("should handle fail loginUser", async () => {
        jest.spyOn(client, "post").mockResolvedValue({
            data: wrongUserInput
        });
        await store.dispatch(
            loginUser({ 'username': 'wrong', 'password': 'wrong' })
        );
        expect(store.getState().userState.selectedUser).toEqual(null);
        // expect(store.getState().todo.todos.find((v) => v.id === fakeTodo.id)?.done).toEqual(true);
    });


    it("should handle putSurvey - not null", async () => {
        jest.spyOn(client, "get").mockResolvedValue({
            data: fakeUser1
        })
        await store.dispatch(getRequestUser());

        jest.spyOn(client, "put").mockResolvedValue({
            data: changeSurvey1
        })
        await store.dispatch(
            putSurvey({ id: 1, 'gender': 1, 'age': 3, 'taste': 'C', 'question': 2 })
        );

        expect(store.getState().userState.selectedUser).toEqual(changedFakeUser1);
    });


}); // end describe
