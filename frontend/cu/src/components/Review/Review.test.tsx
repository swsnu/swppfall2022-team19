import { fireEvent, render, screen } from "@testing-library/react";
import { UserType } from "../../store/slices/User";
import { ProductType } from "../../store/slices/product";
import { RateType } from "../../store/slices/rate";
import { RootState } from "../../store";
import { rootInitialState, renderWithProviders } from "../../test-utils/mock";
import Review from "./Review";


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

const preloadedState: RootState = rootInitialState
const liked = jest.fn();
const isOpen = jest.fn();



// branch coverage is so low.
describe("<Review>", ()=>{

    beforeEach(() => {
        jest.clearAllMocks();
        const { container } = renderWithProviders(<Review
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate}
            />)
    });

    it("should render without errors", async () => {

        render(<Review user={fakeUser} product={fakeProduct} rate={fakeRate} />);
        screen.getByText("2022-12-13")
        screen.getByText("username")
        screen.getByText("★★★★★")
        screen.getByText("rate_comment")
        //screen.getByText("rate_picture")
        
    })

    it('should handle click 사진보기', async () => {

        const togglePicture = screen.findByText('사진 보기')
        fireEvent.click(await togglePicture);
        expect(togglePicture).toBeCalledWith(false);
    });

    it('should handle click 좋아요', async () => {

        const likeClick = screen.findByText('🤍')
        fireEvent.click(await likeClick);
        expect(liked).toBeCalledWith(true);
    });

})