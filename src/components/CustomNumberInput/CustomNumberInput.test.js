import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomNumberInput from './CustomNumberInput';
import '@testing-library/jest-dom';

describe('CustomNumberInput Component', () => {
    
    test('renders CustomNumberInput with the given label', () => {
        render(<CustomNumberInput label="Vacation Days" maxValue={28} />);
        expect(document.getElementById("custom-number-input")).toBeInTheDocument();
    });

   
    test('sets the initial value based on newValue prop', () => {
        render(<CustomNumberInput label="Vacation Days" newValue={5} maxValue={28} />);
        const input = document.getElementById("custom-number-input");
        expect(input).toHaveValue('5'); 
    });

  
    test('calls showAlert and sets isInvalidDate for invalid newValue', () => {
        const showAlert = jest.fn();
        const setIsInvalidDate = jest.fn();
        render(<CustomNumberInput label="Vacation Days" newValue={30} maxValue={28} setIsInvalidDate={setIsInvalidDate} showAlert={showAlert} />);

        expect(showAlert).toHaveBeenCalledWith("Error: Invalid vacation days", 'error');
    });
    
    test('restricts value to min boundaries', () => {
        render(<CustomNumberInput label="Vacation Days" maxValue={28} />);
        const input = document.getElementById("custom-number-input");
        
        fireEvent.change(input, { target: { value: '-5' } });
        expect(input).toHaveValue('1'); 
        
    });

  
    test('accepts value on Enter key press', () => {
        const handleChange = jest.fn();
        render(<CustomNumberInput label="Vacation Days" onChange={handleChange} maxValue={28} />);

        const input = document.getElementById("custom-number-input");
        
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter'  , target: { value: '15' } });
        expect(input).toHaveValue('15'); 
    });
});