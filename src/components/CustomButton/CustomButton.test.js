import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import CustomButton from "./CustomButton";
import '@testing-library/jest-dom';

describe('CustomButton ', () => {
    
    test('renders CustomButton with the give name', () => {
        render(<CustomButton name="Click Me"/>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
            
    });
    
    test('call clickEvent when clicked', () => {
       const clickEventMock = jest.fn();
       render(<CustomButton name="Click Me" clickEvent={clickEventMock}/>);
       fireEvent.click(screen.getByText('Click Me'));
       expect(clickEventMock).toHaveBeenCalled();
    });
    
    test('disables the button when isError is true', () => {
        render(<CustomButton name="Click me" isInvalidDate={true}/>);
        expect(screen.getByText("Click me")).toBeDisabled();
    })
    
    test("applies custom style if provided", () => {
        const customStyle = {backgroundColor: 'blue', color: 'white'};
        render(<CustomButton name="Click me" customStyle={{props: customStyle}}/>);
        expect(screen.getByText('Click me')).toHaveStyle(customStyle);
    })
    
    
})