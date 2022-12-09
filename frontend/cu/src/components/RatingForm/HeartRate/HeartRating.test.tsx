import { render, screen, fireEvent } from "@testing-library/react"
import { updateRate } from "../../../store/slices/rate";
import HeartRating from "./HeartRating"
import React, { useState as useStateMock } from 'react'
import { mount } from 'enzyme'

const mockSetState = jest.fn();

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: () => ['', mockSetState]
}))

describe("<HeartRating />", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render without errors", () => {
        const { container } = render(<HeartRating
            score={3}
            updateScore={jest.fn()}
        />);
        const rating = container.getElementsByClassName("heart");
        expect(rating.length).toBe(5);
    })

    it("should handle heart click", () => {
        const updateScoreFunc = jest.fn();
        //jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        render(<HeartRating
            score={1}
            updateScore={updateScoreFunc}  
        />);  //updateScore가 바뀌었는지 확인해야함. 

        const button = screen.getAllByTitle('heart');  //이게 component이고 expect안에는 mock함수가 들어가야해서 아래 라인에 에러가 뜨는것. 
        fireEvent.click(button[0]);
        expect(updateScoreFunc).toBeCalledTimes(1);
        expect(mockSetState).toHaveBeenCalledWith(1);
    })

})