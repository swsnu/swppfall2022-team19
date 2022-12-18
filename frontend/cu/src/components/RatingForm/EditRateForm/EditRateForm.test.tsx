import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { RateType, updateRate } from "../../../store/slices/rate";
import EditRateForm from "./EditRateForm";
import { UserType } from "../../../store/slices/User";
import { ProductType } from "../../../store/slices/product";
import { RootState } from "../../../store";
import { rootInitialState } from "../../../test-utils/mock";
import client from "../../../store/api/client";
import { renderWithProviders } from "../../../test-utils/mock_JH";

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

const fakeFile = new File(['test'], 'test_picture.png', { type: 'image/png' })
global.URL.createObjectURL = jest.fn()

const preloadedState: RootState = rootInitialState

const state1 = jest.fn();
const state2 = jest.fn();

const mockSetState = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useState: () => mockSetState,
}));

describe('<EditRateForm />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        const { container } = renderWithProviders(<EditRateForm
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate}
            question4={'fakeQuestion4'}
            question5={'fakeQuestion5'}
            updateState1={state1}
            updateState2={state2} />)
    });

    it('should handle click Back', async () => {
        const onclickBackEditHandler = screen.findByText('수정 취소')
        fireEvent.click(await onclickBackEditHandler);
        expect(state2).toBeCalledWith(true);
    });

    it('should handle  save edit rate', async () => {
        const onclickSaveEditHandle = screen.findByText('수정 저장')
        expect(screen.getByTitle('q1')).toBeInTheDocument();
        expect(screen.getByTitle('q2')).toBeInTheDocument();
        expect(screen.getByTitle('q3')).toBeInTheDocument();
        expect(screen.getByTitle('q4')).toBeInTheDocument();
        expect(screen.getByTitle('q5')).toBeInTheDocument();
        fireEvent.click(await onclickSaveEditHandle);
        
        expect(mockSetState).toHaveBeenCalledTimes(0);

    })

    it('should handle delete picture', async () => {
        const deletePicture = screen.findByText('사진 삭제')
        fireEvent.click(await deletePicture);
        expect(mockSetState).toHaveBeenCalledTimes(0);
    })

    it('should handle input change', () =>{
        expect(screen.getByText('한줄평가')).toBeInTheDocument();
        expect(screen.getByText('사진')).toBeInTheDocument();
    })
})