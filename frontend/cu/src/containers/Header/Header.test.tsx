import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { getMockStore } from "../../test-utils/mock_JH";
import Header from "./Header";

const mockNavigate = jest.fn();

const mockStore = getMockStore();

jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
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
    const categories = screen.getByTitle("CategoryMenu");
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
    const logo = screen.getByAltText("homeLogo")
    fireEvent.click(logo!);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("should handle clickSearch", () => {
    render(header);
    const search = screen.getByAltText("SearchIcon")
    fireEvent.click(search!);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("should handle clickSignout", () => {
    render(header);
    const signout = screen.getByText("로그아웃")
    fireEvent.click(signout!);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });




});
