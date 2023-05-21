//import React from 'react';
//import { render, screen, fireEvent } from '@testing-library/react';
//import AppointmentReport from './AppointmentReport';

describe('AppointmentReport', () => {
  test('should render the button correctly', () => {
    render(<AppointmentReport data={[]} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('REPORT');
  });

  test('should call downloadPDF function on button click', () => {
    const mockData = [
            {
              ownerName: 'John Doe',
              ContactNumber:'0778951125',
              petName: 'Buddy',
              date: '2023-05-20',
              petAge:'2',
              reason: 'Checkup',
              petSpecies:'Dog',
              additionalNotes: 'checkup for tick fever',
              petGender: 'Male',
            },
            {
                ownerName: 'Olivia',
                ContactNumber:'0114569872',
                petName: 'Meri',
                date: '2023-05-30',
                petAge:'3',
                reason: 'Vaccination',
                petSpecies:'Cat',
                additionalNotes: 'vaccination for rebis',
                petGender: 'Male',
            },     
    ];
    const downloadPDFMock = jest.fn();
    const props = {
      data: mockData,
    };
    render(<AppointmentReport {...props} />);
  
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
  
    expect(downloadPDFMock).toHaveBeenCalled();
  });
});
