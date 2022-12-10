import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { ProductType } from "../../store/slices/product";
import { RateType } from "../../store/slices/rate";
import { UserType } from "../../store/slices/User";
import { renderWithProviders, rootInitialState } from "../../test-utils/mock";
import RatingLayout from "./RatingLayout";
import { renderHook, act } from "@testing-library/react-hooks";
import BeforeRateForm from "./BeforeRateForm/BeforeRateForm";
import CreateRateForm from "./CreateRateForm/CreateRateForm";
import EditRateForm from "./EditRateForm/EditRateForm";
import AfterRateForm from "./AfterRateForm/AfterRateForm";
import { RootState } from "../../store";

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

const fakeRateType: RateType[] = [
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
]

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


const parentstate1 = jest.fn();
const parentstate2 = jest.fn();
const preloadedState: RootState = rootInitialState

const mockSetState = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useState: () => mockSetState,
}));

describe('<RatingLayout />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        const { container } = renderWithProviders(<RatingLayout
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRateType}
            recallRateState1={parentstate1}
            recallRateState2={parentstate2} />)
    });

    it('should render BeforeRateForm when state1=false state2=false', () => {
        render(
            <BeforeRateForm updateState2={jest.fn()} />);
            expect(mockSetState).toHaveBeenCalledTimes(0);
    });

    it('should render CreateRateForm when state1=false state2=true', async () => {
        renderWithProviders(<CreateRateForm
            user={fakeUser}
            product={fakeProduct}
            question4={'fakeQuestion4'}
            question5={'fakeQuestion5'}
            updateState1={parentstate1}
            updateState2={parentstate2} />)

        expect(parentstate1).toBeCalledTimes(0);
        expect(parentstate2).toBeCalledTimes(0);
        expect(mockSetState).toHaveBeenCalledTimes(0);

    });

    it('should render EditRateForm when state1=true state2=false', async () => {

        renderWithProviders(<EditRateForm
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate}
            question4={'fakeQuestion4'}
            question5={'fakeQuestion5'}
            updateState1={parentstate1}
            updateState2={parentstate2} />)

        expect(parentstate2).toBeCalledTimes(0);
        expect(mockSetState).toHaveBeenCalledTimes(0);

    });

    it('should render AfterRateForm when state1=true state2=true', async () => {
        renderWithProviders(<AfterRateForm
            user={fakeUser}
            product={fakeProduct}
            rate={fakeRate}
            question4={'fakeQuestion4'}
            question5={'fakeQuestion5'}
            updateState1={jest.fn()}
            updateState2={jest.fn()} />)

            expect(mockSetState).toHaveBeenCalledTimes(0);

    });
})
