import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ProductState } from "../../store/slices/product";
import { getMockProductStore } from "../../test-utils/mock_JH";
import MyPage from "./MyPage";
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
      averageScore: 5 },
      {    id: 2,
        name: "TEST2",
        mainCategory: undefined!,
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
const mockStore = getMockProductStore({ product: stubInitialState,
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

describe("<MyPage />", () => {
  let myPage: JSX.Element;
  beforeEach(() => {
    jest.clearAllMocks();
    myPage = (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<MyPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });



  it("should render MyPage", () => {
    const { container } = render(myPage);
    expect(container).toBeTruthy();
  });

  


});
