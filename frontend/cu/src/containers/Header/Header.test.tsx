import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { getMockProductStore } from "../../test-utils/mock_JH";
import Header from "./Header";

const mockNavigate = jest.fn();

const mockStore = getMockProductStore();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("<Header />", () => {
  let header: JSX.Element;
  beforeEach(() => {
    jest.clearAllMocks();
    header = (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Header />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  it("should render Header", () => {
    const { container } = render(header);
    expect(container).toBeTruthy();
  });

  it("should render CategoryName", () => {
    render(header);
    const categories = screen.getAllByTitle("CategoryMenu");
    expect(categories).toHaveLength(5);
  });

  it("should handle clickCategory", () => {
    render(header);
    const categories = screen.getAllByTitle("CategoryMenu")
    
    for (let i = 0; i < 5; i++) {
        fireEvent.click(categories[i]!);
      }
    
    expect(mockNavigate).toHaveBeenCalledTimes(5);
    
  });



  it("should handle clickLogo", () => {
    render(header);
    const logo = screen.getByTitle("logo")
    fireEvent.click(logo!);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });



  it("should handle clickSignout", () => {
    render(header);
    const signout = screen.getByTitle("signoutButton")
    fireEvent.click(signout!);
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });
});
