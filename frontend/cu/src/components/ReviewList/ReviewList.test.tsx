import { fireEvent, screen } from '@testing-library/react';
import ReviewList from './ReviewList';
import { UserType } from "../../store/slices/User";
import { ProductType } from "../../store/slices/product";
import { RateType } from "../../store/slices/rate";
import { renderWithProviders } from "../../test-utils/mock";


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

const fakeRateList1: RateType[] = [
    {
        id: 1,
        user_id: 1,
        username: 'username',
        product_id: 1,
        scores: '55555',
        comment: 'rate_comment',
        picture: 'rate_picture',
        likedCount: 3,
        created_at: 22 / 12 / 13
    },
    {
        id: 2,
        user_id: 2,
        username: 'username2',
        product_id: 2,
        scores: '55555',
        comment: 'rate_comment2',
        picture: 'rate_picture2',
        likedCount: 2,
        created_at: 22 / 12 / 14
    },
]

const fakeRateList2_empty: RateType[] = [];

const mockSetState = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useState: () => mockSetState,
}));

describe('<ReviewList />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        });

    it('should render review list component without errors', async () => {
        const { container } = renderWithProviders(<ReviewList
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRateList1}
        />)
        const reviewElement = screen.getByTitle('spyReviewList');
        expect(reviewElement).toHaveTextContent('μννκΈ°( 1 )')
        expect(reviewElement).toHaveTextContent('μμ± λ μ§')
        expect(reviewElement).toHaveTextContent('μμ±μ') 
        expect(reviewElement).toHaveTextContent('νμ ') 
        expect(reviewElement).toHaveTextContent('νμ€ νκ°')
        expect(reviewElement).toHaveTextContent('μ’μμ')
    });

    it('should render no picture review list', async () => {
        const { container } = renderWithProviders(<ReviewList
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRateList2_empty}
        />)
        const reviewElement = screen.getByTitle('spyReviewList');
        expect(reviewElement).toHaveTextContent('μ²« λ¦¬λ·°λ₯Ό λ¨κ²¨μ£ΌμΈμ')
    });

    it('should handle likeButtonClick button', async () => {
        const { container } = renderWithProviders(<ReviewList
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRateList1}
        />)
        const likeButtonClick = screen.findByText('μΈκΈ°μ')
        fireEvent.click(await likeButtonClick);
    });

    it('should handle recentButtonClick', async () => {
        const { container } = renderWithProviders(<ReviewList
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRateList1}
        />)
        const recentButtonClick = screen.findByText('μ΅μ μ')
        fireEvent.click(await recentButtonClick);
    });

    it('should handle pictureButtonClick', async () => {
        const { container } = renderWithProviders(<ReviewList
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRateList1}
        />)
        const pictureButtonClick = screen.findByText('μ¬μ§λ¦¬λ·°')
        fireEvent.click(await pictureButtonClick);
    });


})
