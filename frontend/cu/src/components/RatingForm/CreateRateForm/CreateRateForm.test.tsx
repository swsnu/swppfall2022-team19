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
        jest.spyOn(client, 'post').mockImplementation(() => {
            return Promise.resolve({ fakeRate })
        })

        const onclickSaveHandler = screen.findByText('등록 하기')

        // const inputs = container.getElementsByTagName('input')
        // fireEvent.change(inputs[0], { target: { value: String(fakeUser.id) } })
        // fireEvent.change(inputs[1], { target: { value: String(fakeProduct.id) } })
        // fireEvent.change(inputs[2], { target: { value: fakeRate.scores } })
        // fireEvent.change(inputs[3], { target: { value: fakeRate.comment } })
        // fireEvent.change(inputs[4], { target: { file: fakeFile } })
        
        fireEvent.click(await onclickSaveHandler);
        expect(state1).toBeCalledWith(true);
        expect(state2).toBeCalledWith(true);
    })

    it('should handle delete picture', async () => {

        const deletePicture = screen.findByText('사진 삭제')
        // fireEvent.click(await deletePicture);
    })
})