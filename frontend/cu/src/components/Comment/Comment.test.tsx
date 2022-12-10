import CommentBlock from "./CommentBlock";
import { render, screen } from "@testing-library/react";
import { ProductType } from "../../store/slices/product";
import { RateType } from "../../store/slices/rate";
import ProductBlock from "../ProductBlock/ProductBlock";
import { renderWithProviders } from "../../test-utils/mock";

const fakeProduct: ProductType = {
    id: 1,
    name: 'product_name',
    mainCategory: 'product_mainCategory',
    subCategory: 'product_subCategory',
    imageUrl: 'product_imageUrl',
    details: 'product_detail',
    price: 3000,
    newProduct: true,
    tags: ['tag1', 'tag2'],
    averageScore: 5.0,
    rateCount: 5,
}

const fakeRate: RateType = {
    id: 1,
    user_id: 1,
    username: 'username',
    product_id: 1,
    scores: '55555',
    comment: 'rate_comment',
    picture: 'rate_picture',
    likedCount: 3,
    created_at: 22 / 12 / 13,
}

describe("CommentBlock", ()=>{

    beforeEach(() => {
        jest.clearAllMocks();
        const { container } = renderWithProviders(<CommentBlock
            comment={fakeRate.comment}
            productBlock={fakeProduct}
            />)
    });

    fit("should render without errors", () => {
        render(<CommentBlock comment={fakeRate.comment}productBlock={fakeProduct} />);
    })  
    
})