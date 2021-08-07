import SignUpPage, { onFormSubmit } from '../component/login/SignUpPage.js'
import React from 'react';
import { Button } from '@material-ui/core';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Sign Up ', () => {
    const container = shallow(<SignUpPage />);
    const onFormSubmit = jest.fn()
    const button = shallow(<Button onClick={onFormSubmit}></Button>)
    it('should have all textfield', () => {
        expect(container.find('TextField[label="Username"]').length).toEqual(0);
        expect(container.find('TextField[label="Password"]').length).toEqual(0);
        expect(container.find('TextField[label="Name"]').length).toEqual(0);
        expect(container.find('TextField[label="PhoneNumber"]').length).toEqual(0);
        expect(container.find('TextField[label="Address"]').length).toEqual(0);
        expect(container.find('TextField[label="ConfirmPassword"]').length).toEqual(0);
    })
    //test the Link
    it('includes link to Login page', () => {
        expect(container.find('Link').props().to).toBe('/login');
    });
    //test the submit button
    it('includes button to submit form', () => {
        expect(container.find(Button).props().type).toBe("submit");
    });
    //test the function call
    it('call the function when click the button', () => {
        button.simulate("click")
        expect(onFormSubmit).toHaveBeenCalled();
    });

})