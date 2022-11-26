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
        //user.click(screen.getByRole('button', { name: 'rate_button' }));
        // fireEvent.click(screen.getByRole('button', { name: 'rate_button' }));
        //const onClickRateHandler = jest.fn();
        // const rate = '내 평가 남기러 가기';
        // const {container} = render( 
        //     <BeforeRateForm updateState2={updateState}/>
        //     );

        // const rate_button = container.getElementsByClassName('rate_button');
        // expect(rate_button).toBeInTheDocument();
        // expect(rate_button).toBeCalled();

        render( 
            <BeforeRateForm updateState2={updateState}/>
            );
        const rate_button = screen.getByTestId('rate_button');
        fireEvent.click(rate_button);
        expect(rate_button).toBeInTheDocument();
        expect(rate_button).toBeCalled();

        //     expect(updateState).toBeCalledTimes(1);
        // expect(updateState.mockReturnValue(true));
        // expect(updateState).toHaveBeenCalled();
    });

})
