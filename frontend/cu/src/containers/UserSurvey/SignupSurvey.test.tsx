import { fireEvent, screen, waitFor, render } from "@testing-library/react";

import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { UserState } from "../../store/slices/User";
import { getMockUserStore } from "../../test-utils/mock_JH";
import SignupSurvey from "./SignupSurvey";
import * as userSlice from "../../store/slices/User";


const stubInitialState: UserState = {
  users: [
    {
        id: 1,
        username: "ID", 
        password: "Password",
        gender: 1,
        age: 1,
        taste: "A",
        question: 1,
        loginState: false,
    }

  ],
  selectedUser: null,
};
const mockStore = getMockUserStore({ user: stubInitialState
});

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("<SignupSurvey />", () => {
  let signupSurvey: JSX.Element;
  beforeEach(() => {
    jest.clearAllMocks();
    signupSurvey = (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<SignupSurvey />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  it("should render SignupSurvey", () => {
    const { container } = render(signupSurvey);
    expect(container).toBeTruthy();
  });
  

  it("should render not navigate to /login when failed submitted", async () => {
    render(signupSurvey);
    const mockPostUser = jest.spyOn(userSlice, "postUser");

    const titleInput = screen.getByLabelText("ID");
    const contentInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("제출하기");

    const questions = screen.getAllByRole('combobox', { name: "" });
    fireEvent.select(questions[0], "남성");
    fireEvent.select(questions[1], "~10대");
    fireEvent.select(questions[2], "간편식사" );
    fireEvent.select(questions[3], "맛");

    fireEvent.change(titleInput, { target: { value: "ID" } });
    fireEvent.change(contentInput, { target: { value: "Password" } });


    fireEvent.click(submitButton);

    expect(mockPostUser).toHaveBeenCalledWith({
        username: "ID", 
        password: "Password",
        gender: 0,
        age: 0,
        taste: "",
        question: 0,
      });
    });


  });

