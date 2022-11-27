import { render, screen, fireEvent } from "@testing-library/react"
import HeartRating from "./HeartRating"



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
        render(<HeartRating
            score={1}
            updateScore={jest.fn()}
        />);
        
        //const heart = screen.getByTitle('heart');
        // const [first, second, third, fourth, fifth] = screen.getAllByTitle('heart');
        // fireEvent.click(first);
        // fireEvent.click(second);
        // expect(first).toBeCalled();
        // expect(second).toBeCalled();


    })

})