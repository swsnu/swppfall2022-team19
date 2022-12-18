import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import React from "react";
import { ProductType } from "../../store/slices/product";
import { RateType } from "../../store/slices/rate";
import { UserType } from "../../store/slices/User";
import { renderWithProviders } from "../../test-utils/mock";
import ProductDetailPage from "./ProductDetailPage";
import {shallow} from "enzyme";

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

const fakeRate: RateType[] = [{
    id: 1,
    user_id: 1,
    username: 'username',
    product_id: 1,
    scores: '55555',
    comment: 'rate_comment',
    picture: 'rate_picture',
    likedCount: 3,
    created_at: 22 / 12 / 13,
}]

const mockSetState = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useState: () => mockSetState,
}));

const setCallRate1 = jest.fn();
const setCallRate2 = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");

describe("<ProductDetailPage />", () =>{
    
    it('should render Product detail page', () => {
        const { container } = renderWithProviders(<ProductDetailPage/>);
        expect(screen.getByTitle('productDetailPage')).toBeInTheDocument();
        expect(screen.getByTitle('ratingform')).toBeInTheDocument();
        expect(screen.getByTitle('scoresReviews')).toBeInTheDocument();
    });

    it('should have product details', () =>{
        const { container } = renderWithProviders(<ProductDetailPage/>);
        expect(screen.getByTitle('productName')).toBeInTheDocument();
        expect(screen.getByTitle('productImage')).toBeInTheDocument();
        expect(screen.getByTitle('productMainCategory')).toBeInTheDocument();
        expect(screen.getByTitle('productPrice')).toBeInTheDocument();
        expect(screen.getByTitle('productDetail')).toBeInTheDocument();
    
    })
})
