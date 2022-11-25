import { render, screen, fireEvent } from "@testing-library/react"
import HeartRating from "./HeartRating"



describe("<HeartRating />", () =>{
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render without errors", () =>{
        const {container} = render(<HeartRating 
            score={3}  
            updateScore={jest.fn()}
            />);
        const rating = container.getElementsByClassName("heart");
        expect(rating.length).toBe(5);  
    })

    it("should handle click", () =>{
        // const {container} = render(<HeartRating 
        //     score={3}  
        //     updateScore={jest.fn()}
        //     />);
        // const button = screen.getByTitle('heart');
        // fireEvent.click(button);
        // expect(button).toHaveAttribute('on');
        // const countRate = container.getElementsByClassName("on");
        // expect(countRate.length).toBe(3);



    })
})