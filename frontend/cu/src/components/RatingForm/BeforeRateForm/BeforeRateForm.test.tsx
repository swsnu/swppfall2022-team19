import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import BeforeRateForm from "./BeforeRateForm";
import user from '@testing-library/user-event';
import { updateRate } from "../../../store/slices/rate";

describe('<BeforeRateForm >', () => {
    const updateState = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders form before rate', () => {
        render(
            <BeforeRateForm updateState2={updateState}/>);
        expect(screen.getByText('내 평가 남기러 가기')).toBeInTheDocument();
    });

    it('when clicks rating button, change rate State to true', () => {
        render( 
            <BeforeRateForm updateState2={updateState}/>
            );
        const button = screen.getByTitle('rate_button');
        fireEvent.click(button);
        //expect(button).toBeCalled();
    });

})
