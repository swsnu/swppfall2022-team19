import TotalScoreList from "./TotalScoreList";
import DonutScore from "./DonutScore";
import { render, screen } from "@testing-library/react";
import { RateType } from "../../store/slices/rate";
import { UserType } from "../../store/slices/User";
import { ProductType } from "../../store/slices/product";
import { renderWithProviders } from "../../test-utils/mock";

const fakeUser: UserType = {
    id: 1,
    username: 'username',
    password: 'password',
    gender: 2,
    age: 20,
    taste: 'taste',
    question: 3,
    loginState: true
}

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

describe("TotalScoreList", ()=>{
    
    let rates: RateType[] = [];
    rates.push(fakeRate); // filteredRates
    let scoreCnt1 = [0, 0, 0, 0, 0, 0];

    beforeEach(() => {
        jest.clearAllMocks();
        const { container } = renderWithProviders(<TotalScoreList
            user={fakeUser}
            product={fakeProduct}
            rate={rates}
            />)
    });

    it("totalScoreList should render without errors", () => {
        render(<TotalScoreList user={fakeUser} product={fakeProduct} rate={rates}/>);
        expect(screen.getByText("전체 평점 및 항목별 평점")).toBeInTheDocument();
    })

    it("donutScore should render without errors", () => {
        render(<DonutScore scoreCnt={scoreCnt1} legendCheck={false} />)
    })

    /*
    let emptyrates: RateType[] = [];
    it("shold show defaults", () => {
        render(
        <div className='not_yet_rated'>
            {emptyrates.length === 0 && <div> 아직 평가되지 않은 제품입니다 </div>}
        </div>
        )
        expect(screen.getByText("아직 평가되지 않은 제품입니다")).toBeInTheDocument();
    })*/


    })
    