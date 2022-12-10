import ReviewList from "./ReviewList";
import { fireEvent, render, screen } from "@testing-library/react";
import { RateType } from "../../store/slices/rate";
import { UserType } from "../../store/slices/User";
import { ProductType } from "../../store/slices/product";
import { RootState } from "../../store";
import { rootInitialState, renderWithProviders } from "../../test-utils/mock";

const fakeUser: UserType = {
    id: 1,
    username: 'username',
    password: 'password',
    gender: 2,
    age: 20,
    taste: 'taste',
    question: 3,
    loginState: true
}

const fakeProduct: ProductType = {
    id: 1,
    name: 'product_name',
    mainCategory: 'product_mainCategory',
    subCategory: 'product_subCategory',
    imageUrl: 'product_imageUrl',
    details: 'product_detail',
    price: 3000,
    newProduct: true,
    tags: ['tag1', 'tag2'],
    averageScore: 5.0,
    rateCount: 5,
}

const fakeRate: RateType = {
    id: 1,
    user_id: 1,
    username: 'username',
    product_id: 1,
    scores: '55555',
    comment: 'rate_comment',
    picture: 'rate_picture',
    likedCount: 3,
    created_at: 22 / 12 / 13,
}

describe("TotalScoreList", ()=>{
    const preloadedState: RootState = rootInitialState;
    const rates = jest.fn();
    
    let ratelist: RateType[] = [];
    ratelist.push(fakeRate);

    beforeEach(() => {
        jest.clearAllMocks();
        const { container } = renderWithProviders(<ReviewList
            user={fakeUser}
            product={fakeProduct}
            rate={ratelist}
            />)
    });

    it("ReviewList should render without errors", () => {
        render(<ReviewList user={fakeUser} product={fakeProduct} rate={ratelist}/>);
        expect(screen.getByText("상품후기(1)")).toBeInTheDocument();

    })

    it('should handle 인기순 ', async () => {

        const likeButtonClick = screen.findByText('인기순')
        fireEvent.click(await likeButtonClick);
        
        expect(rates).toBeCalledWith(ratelist);
    });

    it('should handle 최신순 ', async () => {

        const recentButtonClick = screen.findByText('최신순')
        fireEvent.click(await recentButtonClick);
        
        expect(rates).toBeCalledWith(ratelist);
    });

    it('should handle 사진리뷰 ', async () => {

        const pictureButtonClick = screen.findByText('사진리뷰')
        fireEvent.click(await pictureButtonClick);
        
        expect(rates).toBeCalledWith(ratelist);
    });
    
    
})