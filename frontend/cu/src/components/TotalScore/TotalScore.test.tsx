import { render, screen } from "@testing-library/react";
import TotalScore from "./TotalScore";


describe("<TotalScore>", ()=>{
    it("should render without errors", () => {
        render(<TotalScore title={"맛은 만족스러운가요?"} score={1} />);
        expect(screen.getByText("맛은 만족스러운가요?")).toBeInTheDocument();
    })
})