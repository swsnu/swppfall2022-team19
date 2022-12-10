import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { RateType, updateRate } from "../../../store/slices/rate";
import AfterRateForm from "./AfterRateForm";
import { UserType } from "../../../store/slices/User";
import { ProductType } from "../../../store/slices/product";
import { RootState } from "../../../store";
import { rootInitialState, renderWithProviders } from "../../../test-utils/mock";
import client from "../../../store/api/client";
import axios from "axios";

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

const state1 = jest.fn();
const state2 = jest.fn();

const mockSetState = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useState: () => mockSetState,
}));

describe('<AfterRateForm />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        const { container } = renderWithProviders(<AfterRateForm
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate}
            question4={'fakeQuestion4'}
            question5={'fakeQuestion5'}
            updateState1={state1}
            updateState2={state2} />)
    });

    it('should handle click Edit', async () => {

        const onclickEditHandler = screen.findByText('수정 하기')
        fireEvent.click(await onclickEditHandler);
        expect(state2).toBeCalledWith(false);
    });

    it('should handle click delete', async () => {

        const onclickDeleteHandler = screen.findByText('삭제 하기')
        fireEvent.click(await onclickDeleteHandler);
        
    });

})