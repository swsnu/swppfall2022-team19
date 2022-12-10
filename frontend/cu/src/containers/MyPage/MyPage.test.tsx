import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ProductState } from "../../store/slices/product";
import MyPage from "./MyPage";
import { Props as ProductProps } from "../../components/ProductBlock/ProductBlock";
import { UserState } from "../../store/slices/User";
import { RateState } from "../../store/slices/rate";
import { getMockStore } from "../../test-utils/mock_MJ";

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

const productInitialState: ProductState = {
  products: [
    {    id:1,
      name: "TEST1",
      mainCategory: undefined!,
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
        mainCategory: undefined!,
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

const userInitialState: UserState = {
    users: [
        {
            id: 1, 
            username: "User1", 
            password: "P1", 
            gender: 1,
            age: 1,
            taste: "taste",
            question: 1,
            loginState: true,

        }, {
            id: 2,
            username: "User2",
            password: "P2",
            gender: 1,
            age: 1,
            taste: "taste",
            question: 1,
            loginState: true,
        }
    ],
    selectedUser: {
        id: 1, 
        username: "User1", 
        password: "P1", 
        gender: 1,
        age: 1,
        taste: "taste",
        question: 1,
        loginState: true,
    },
}

const rateInitialState: RateState = {
    rates: [
        {
            id: 1,
            user_id: 1,
            username: "User1",
            product_id: 1,
            scores: "55555",
            comment: "",
            picture: "",
            likedCount: 1,
            created_at: 1,
        },
    ],
    selectedRates: [        {
        id: 1,
        user_id: 1,
        username: "User1",
        product_id: 1,
        scores: "55555",
        comment: "",
        picture: "",
        likedCount: 1,
        created_at: 1,
    },],
    selectedRate:         {
        id: 1,
        user_id: 1,
        username: "User1",
        product_id: 1,
        scores: "55555",
        comment: "",
        picture: "",
        likedCount: 1,
        created_at: 1,
    },
    likedRates: [
        {
            id: 1,
            user_id: 1,
            username: "User1",
            product_id: 1,
            scores: "55555",
            comment: "",
            picture: "",
            likedCount: 1,
            created_at: 1,
        },
    ],
}

const mockStore = getMockStore({ 
    product: productInitialState,
    user: userInitialState,
    rate: rateInitialState,
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

  it("should render products", () => {
    render(myPage);
    const products = screen.getAllByTitle("spyProduct");
    expect(products).toHaveLength(2);
  });

  it("should render comments", async () => {
    render(myPage);
    const comment = screen.getAllByTitle("Comments");
    expect(comment).toHaveLength(1);

    
    const onclickCommentHandler = screen.findByTitle('Comment')
    fireEvent.click(await onclickCommentHandler!);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });


  it("should handle clickProduct", () => {
    render(myPage);
    const products = screen.getAllByTitle("spyProduct")[0];
    const title = products.querySelector(".productInfoBlock");
    fireEvent.click(title!);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });


});
