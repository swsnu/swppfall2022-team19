import { fireEvent, render, screen } from '@testing-library/react'
import { getMockStore } from '../../test-utils/mock_MJ'
import { Provider } from 'react-redux'
import SignupSurvey from './SignupSurvey'
import { MemoryRouter, Route, Routes } from "react-router";
import { iteratorSymbol } from 'immer/dist/internal'

//  60.97 |       30 |      30 |    62.5 | 82-85,103-152

const mockNavigate = jest.fn()
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

const mockStore = getMockStore({
    user: { users: [], selectedUser: null },
    product: { products: [], selectedProduct: null, tags: [] },
    rate: { rates: [], selectedRates: [], selectedRate: null, likedRates: [] },
});

describe('<SignupSurvey />', () => {
    let signupSurvey: JSX.Element;
    beforeEach(() => {
        jest.clearAllMocks()
        signupSurvey = (
            <Provider store={mockStore}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/signup" element={<SignupSurvey />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )
    });
    it("should render SignupSurvey without errors", () => {
        const { container } = render(<SignupSurvey />);
        // screen.getByText("ID");
        // screen.getByText("Password");
        expect(container).toBeTruthy();
    });
    it("should check id and password input", () => {
        const newID = screen.getByPlaceholderText('아이디');
        const newPassword = screen.getByPlaceholderText('비밀번호');
        fireEvent.change(newID, { target: { value: 'test1' } })
        fireEvent.change(newPassword, { target: { value: 'test1' } })
        expect(newID).toHaveValue('test1');
        expect(newPassword).toHaveValue('test1');
    });

    it("should handle submit", () => {
        render(<SignupSurvey />);
        const submitButton = screen.getByText("제출하기");
        fireEvent.click(submitButton);
        expect(mockNavigate).toBeCalled();
    });

})