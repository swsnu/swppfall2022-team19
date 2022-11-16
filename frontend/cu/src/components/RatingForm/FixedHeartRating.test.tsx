import { render, screen } from "@testing-library/react"
import FixedHeartRating from "./FixedHeartRating"


describe("<HeartRating />", () =>{
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render without errors", () =>{
        const {container} = render(<FixedHeartRating 
            score={3}  
            />);
        const rating = container.getElementsByClassName("heart");
        expect(rating.length).toBe(5);  
        const clickedRating = container.getElementsByClassName("on");
        expect(clickedRating.length).toBe(3);

    })
})