import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ProductState } from "../../store/slices/product";
import { getMockProductStore } from "../../test-utils/mock_JH";
import SearchResult from "./SearchResult";
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
      mainCategory: "Hello",
      subCategory: "subCategory", 
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
        mainCategory: "Hello",
        subCategory: "subCategory", 
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


describe("<SearchResult />", () => {
  let searchResult: JSX.Element;
  beforeEach(() => {
    jest.clearAllMocks();
    searchResult = (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<SearchResult />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  it("should render SearchResult", () => {
    const { container } = render(searchResult);
    expect(container).toBeTruthy();
  });

  it("should render products", () => {
    render(searchResult);
    const products = screen.getAllByTitle("spyProduct");
    expect(products).toHaveLength(2);
  });

  it("should render message", () => {
    render(searchResult);
    const products = screen.getAllByText("찾으시는 상품과 일치하는 상품이 없습니다. 이런 제품은 어떠신가요?");
    expect(products).toHaveLength(1);
  });

  it("should handle clickProduct", () => {
    render(searchResult);
    const products = screen.getAllByTitle("spyProduct")[0];
    const title = products.querySelector(".productInfoBlock");
    fireEvent.click(title!);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });


});
