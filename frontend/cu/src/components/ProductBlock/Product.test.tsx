import { render, screen } from "@testing-library/react"
import ProductBlock from "./ProductBlock"


describe("<ProductBlock />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render productBlock without errors", () => {
        render(<ProductBlock
            product_id={1}
            name={"product1"}
            imageUrl={"image1"}
            details={"detail1"}
            price={3000}
            newProduct={false}
            averageScore={3.5}
            clickProduct={jest.fn()} 
            />);
        const productName = screen.getByText("product1");
        const productPrice = screen.getByTitle("price");
        const productScore = screen.getByTitle("score");
        expect(productName).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
        expect(productScore).toBeInTheDocument();
    });

})
