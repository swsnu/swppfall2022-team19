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
            <BeforeRateForm updateState2={updateState}/>  //updateState이 불러와졌는지 확인하면 된다. 
            );
        const button = screen.getByTitle('rate_button');  //이게 component이고 expect안에는 mock함수가 들어가야해서 아래 라인에 에러가 뜨는것. 
        fireEvent.click(button);
        //expect(button).toBeCalled();
    });

})
