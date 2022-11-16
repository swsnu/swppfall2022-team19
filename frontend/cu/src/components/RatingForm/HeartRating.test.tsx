import { render, screen, fireEvent } from "@testing-library/react"
import HeartRating from "./HeartRating"


describe("<HeartRating />", () =>{
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render without errors", () =>{
        const {container} = render(<HeartRating 
            score={0}  
            updateScore={jest.fn()}
            />);
        const rating = container.getElementsByClassName("heart");
        expect(rating.length).toBe(5);  

    })
})