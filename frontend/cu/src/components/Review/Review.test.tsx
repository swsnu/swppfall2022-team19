import { fireEvent, screen } from '@testing-library/react';
import Review from './Review';
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

const fakeRate1: RateType = {
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
const fakeRate2: RateType = {
    id: 1,
    user_id: 1,
    username: 'username',
    product_id: 1,
    scores: '44444',
    comment: 'rate_comment',
    picture: 'rate_picture',
    likedCount: 3,
    created_at: 22 / 12 / 13,
}
const fakeRate3: RateType = {
    id: 1,
    user_id: 1,
    username: 'username',
    product_id: 1,
    scores: '33333',
    comment: 'rate_comment',
    picture: 'rate_picture',
    likedCount: 3,
    created_at: 22 / 12 / 13,
}
const fakeRate4: RateType = {
    id: 1,
    user_id: 1,
    username: 'username',
    product_id: 1,
    scores: '22222',
    comment: 'rate_comment',
    picture: 'rate_picture',
    likedCount: 3,
    created_at: 22 / 12 / 13,
}
const fakeRate5: RateType = {
    id: 1,
    user_id: 1,
    username: 'username',
    product_id: 1,
    scores: '11111',
    comment: 'rate_comment',
    picture: 'rate_picture',
    likedCount: 3,
    created_at: 22 / 12 / 13,
}
const fakeRate6: RateType = {
    id: 1,
    user_id: 1,
    username: 'username',
    product_id: 1,
    scores: '00000',
    comment: 'rate_comment',
    picture: 'rate_picture',
    likedCount: 3,
    created_at: 22 / 12 / 13,
}

const mockSetState = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useState: () => mockSetState,
}));

describe('<Review />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        });

    it('should render review2 component', async () => {
        const { container } = renderWithProviders(<Review
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate2}
        />)
        const reviewElement = screen.getByTitle('spyReview');
        expect(reviewElement).toHaveTextContent('★★★★☆');
    });

    it('should render review3 component', async () => {
        const { container } = renderWithProviders(<Review
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate3}
        />)
        const reviewElement = screen.getByTitle('spyReview');
        expect(reviewElement).toHaveTextContent('★★★☆☆');
    });

    it('should render review4 component', async () => {
        const { container } = renderWithProviders(<Review
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate4}
        />)
        const reviewElement = screen.getByTitle('spyReview');
        expect(reviewElement).toHaveTextContent('★★☆☆☆');
    });

    it('should render review5 component', async () => {
        const { container } = renderWithProviders(<Review
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate5}
        />)
        const reviewElement = screen.getByTitle('spyReview');
        expect(reviewElement).toHaveTextContent('★☆☆☆☆');
    });

    it('should render review6 component', async () => {
        const { container } = renderWithProviders(<Review
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate6}
        />)
        const reviewElement = screen.getByTitle('spyReview');
        expect(reviewElement).toHaveTextContent('☆☆☆☆☆');
    });

    it('should render review1 component', async () => {
        const { container } = renderWithProviders(<Review
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate1}
        />)
        const reviewElement = screen.getByTitle('spyReview');
        expect(reviewElement).toHaveTextContent('0.14102564102564102')
        expect(reviewElement).toHaveTextContent('username')
        expect(reviewElement).toHaveTextContent('★★★★★') 
        expect(reviewElement).toHaveTextContent('rate_comment') 
        expect(reviewElement).toHaveTextContent('사진 보기')
        expect(reviewElement).toHaveTextContent('3')
        expect(reviewElement).toHaveTextContent('🤍')
    });

    it('should handle heart button', async () => {
        const { container } = renderWithProviders(<Review
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate1}
        />)
        const likeClick = screen.findByText('🤍')
        fireEvent.click(await likeClick);
        const reviewElement = screen.getByTitle('spyReview');
        expect(reviewElement).toHaveTextContent('❤️')

        const likeoffClick = screen.findByText('❤️')
        fireEvent.click(await likeoffClick);
    });

    it('should handle picture toggle button', async () => {
        const { container } = renderWithProviders(<Review
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate1}
        />)
        const togglePicture = screen.findByText('사진 보기')
        fireEvent.click(await togglePicture);
    });

})