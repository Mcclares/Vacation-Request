import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RequestForm from './RequestForm';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import {AlertProvider} from "../../hooks/useAlert";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import postRequest from "../../api/postRequest";
import * as api from '../../api/postRequest';

describe('RequestForm Component', () => {


    test('renders RequestForm with required fields', () => {
        render(
            <AlertProvider>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<RequestForm />} />
                    </Routes>
                </MemoryRouter>
            </AlertProvider>
        );
        expect(screen.getByLabelText('Start date')).toBeInTheDocument();
        expect(screen.getByLabelText('Vacation days')).toBeInTheDocument();
        expect(screen.getByLabelText('End date')).toBeInTheDocument();
        expect(screen.getByLabelText('Comment')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });

  
    test('sets initial values for start date, vacation days, and end date', () => {
        render(
            <AlertProvider>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<RequestForm />} />
                    </Routes>
                </MemoryRouter>
            </AlertProvider>
        );

        const startDateInput = screen.getByLabelText('Start date');
        const vacationDaysInput = screen.getByLabelText('Vacation days');
        const endDateInput = screen.getByLabelText('End date');

        expect(startDateInput).toHaveValue(dayjs().format('DD/MM/YY')); 
        expect(vacationDaysInput).toHaveValue('1'); 
        expect(endDateInput).toHaveValue(dayjs().format('DD/MM/YY')); 
    });
    
    test('does not allow vacation days to exceed the minimum limit', () => {
        render(
            <AlertProvider>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<RequestForm />} />
                    </Routes>
                </MemoryRouter>
            </AlertProvider>
        );

        const vacationDaysInput = screen.getByLabelText('Vacation days');
        fireEvent.change(vacationDaysInput, { target: { value: '-5' } });

        expect(vacationDaysInput).toHaveValue('1'); 
    });
    
    

    test('allows user to input a comment', () => {
        render(
            <AlertProvider>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<RequestForm />} />
                    </Routes>
                </MemoryRouter>
            </AlertProvider>
        );
        
        const commentInput = screen.getByLabelText('Comment');
        fireEvent.change(commentInput, { target: { value: 'This is a test comment' } });

        expect(commentInput).toHaveValue('This is a test comment'); 
    });
    
});