import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import BeforeRateForm from "./BeforeRateForm";
import user from '@testing-library/user-event';
import { updateRate } from "../../../store/slices/rate";

describe('<BeforeRateForm >', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(<BeforeRateForm updateState2={jest.fn()} />);
    });

    it('renders form before rate', () => {
        expect(screen.getByText('내 평가 남기러 가기')).toBeInTheDocument();
    });

    it('when clicks rating button, change rate State to true', (done) => {
        const updateState = jest.fn();
        user.click(screen.getByRole('button', { name: 'rate_button' }));
        expect(updateState).toHaveBeenCalledWith(false);
        done();
    });

})
