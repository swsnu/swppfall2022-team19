import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ProductState } from "../../store/slices/product";
import { getMockProductStore } from "../../test-utils/mock_JH";
import Category from "./Category";
import { Props as ProductProps } from "../../components/ProductBlock/ProductBlock";

jest.mock("../../components/ProductBlock/ProductBlock", () => (props: ProductProps) => (
  <div title="spyProduct">
    <div className="productInfoBlock" onClick={props.clickProduct} >
                    <div className="productImageBox">
                      </div>
                    <img className="productImage" src={props.imageUrl} alt="Product"/>
                    </div>
                    <div className="productTextBlock">
                        <p className="productName">{props.name}</p>
                        <span className="productPrice">{props.price}원</span>
                        {props.details !== "null" &&
                            <span className='productDetail'>설명:{props.details}</span>
                        }
                        <span className='productAverageScore'>평균점수: {props.averageScore}</span>
                    </div>
                </div>
));

const stubInitialState: ProductState = {
  products: [
    {    id:1,
      name: "TEST1",
      mainCategory: undefined!,
      subCategory: "SubCategory", 
      imageUrl: "IMAGE1",
      details: "DETAIL INFO",
      price: 1000,
      newProduct: true,
      tags: ["test1", "test2"],
      averageScore: 5,
      rateCount: 0,
    },
      {    id: 2,
        name: "TEST2",
        mainCategory: undefined!,
        subCategory: "SubCategory", 
        imageUrl: "IMAGE2",
        details: "DETAIL INFO",
        price: 2000,
        newProduct: false,
        tags: ["test1", "test2"],
        averageScore: 5,
        rateCount: 0,
      },
    
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

const mockSetState = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useState: () => mockSetState,
}));

describe("<Category />", () => {
  let category: JSX.Element;
  beforeEach(() => {
    jest.clearAllMocks();
    category = (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Category />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  it("should render Category", () => {
    const { container } = render(category);
    expect(container).toBeTruthy();
  });


  it("should render sorting buttons", () => {
    render(category);
    const buttons = document.querySelectorAll('button');
    expect(buttons).toHaveLength(5);

    for (let index = 0; index < 5; index++) {
      fireEvent.click(buttons[index]!);
    }
    expect(mockSetState).toHaveBeenCalledTimes(0);

  });

  it("should render products", () => {
    render(category);
    const products = screen.getAllByTitle("productBlocks");
    expect(products).toHaveLength(1);
  });

  it("should handle clickProduct", () => {
    render(category);
    const products = screen.getAllByTitle("productBlocks")[0];
    const title = products.querySelector(".productInfoBlock");
    fireEvent.click(title!);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });


});
