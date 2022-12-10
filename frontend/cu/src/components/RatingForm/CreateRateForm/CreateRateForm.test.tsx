import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import user from '@testing-library/user-event';
import { RateType, updateRate } from "../../../store/slices/rate";
import CreateRateForm from "./CreateRateForm";
import { UserType } from "../../../store/slices/User";
import { ProductType } from "../../../store/slices/product";
import { RootState } from "../../../store";
import { rootInitialState, renderWithProviders } from "../../../test-utils/mock";
import client from "../../../store/api/client";
import { configureStore } from "@reduxjs/toolkit";
import HeartRating from "../HeartRate/HeartRating";

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

describe('<CreateRateForm />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        const { container } = renderWithProviders(<CreateRateForm
            user={fakeUser}
            product={fakeProduct}
            question4={'fakeQuestion4'}
            question5={'fakeQuestion5'}
            updateState1={state1}
            updateState2={state2} />)
    });

    it('should handle click Back', async () => {

        const onclickBackToRateHandler = screen.findByText('취소 하기')
        fireEvent.click(await onclickBackToRateHandler);
        expect(state2).toBeCalledWith(false);
    });

    it('should handle post rate', async () => {

        const onclickSaveHandler = screen.findByText('등록 하기')
        
        fireEvent.click(await onclickSaveHandler);
        expect(state1).toBeCalledTimes(0);
        expect(state2).toBeCalledTimes(0);
        expect(mockSetState).toHaveBeenCalledTimes(0);
    })

    it('should handle delete picture', async () => {

        const deletePicture = screen.findByText('사진 삭제')
        fireEvent.click(await deletePicture);
        expect(mockSetState).toHaveBeenCalledTimes(0);
    })

    it("should render heartRating without errors", async () => {
        const { container } = render(<HeartRating
            score={3}
            updateScore={jest.fn()}
        />);
        const rating = container.getElementsByClassName("heart");
        expect(rating.length).toBe(5);


        const question1 = screen.findByText('맛이 만족스럽나요?')
        fireEvent.click(await question1);
        expect(mockSetState).toHaveBeenCalledTimes(0);


    })
})