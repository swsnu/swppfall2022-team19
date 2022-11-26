import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ProductState } from "../../store/slices/product";
import { getMockProductStore } from "../../test-utils/mock_JH";
import Home from "./Home";
import { Props as ProductProps } from "../../components/ProductBlock/ProductBlock";


const stubInitialState: ProductState = {
  products: [
    {    id:1,
      name: "TEST1",
      mainCategory: "MainCategory",
      subCategory: "SubCategory", 
      imageUrl: "IMAGE1",
      details: "DETAIL INFO",
      price: 1000,
      newProduct: true,
      tags: ["test1", "test2"],
      averageScore: 5 },
      {    id: 2,
        name: "TEST2",
        mainCategory: "MainCategory",
        subCategory: "SubCategory", 
        imageUrl: "IMAGE2",
        details: "DETAIL INFO",
        price: 2000,
        newProduct: false,
        tags: ["test1", "test2"],
        averageScore: 5 },
    
  ],
  selectedProduct: null,
  tags: [],
  
};
const mockStore = getMockProductStore({ product: stubInitialState
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

describe("<Home />", () => {
  let home: JSX.Element;
  beforeEach(() => {
    jest.clearAllMocks();
    home = (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  it("should render Home", () => {
    const { container } = render(home);
    expect(container).toBeTruthy();
  });

  it("should render animated Title", () => {
    render(home);
    const products = screen.getAllByTitle("animatedTitle");
    expect(products).toHaveLength(2);
  });


  it("should handle clickLogo", () => {
    render(home);
    const logo = screen.getAllByTitle("logo")[1]
    fireEvent.click(logo!);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

});
