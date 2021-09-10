import { Button } from '@chakra-ui/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow,configure } from 'enzyme';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SignUpPage from '../component/login/SignUpPage.js';

configure({ adapter: new Adapter() });

describe('SignUpPage test ', () => {
    const container = shallow(<SignUpPage />);
    
    it('should set title',()=>{
        expect(container.find(Helmet).props().title).toBe('Sign Up')
    })

    it('should have username field', () => {
        expect(container.find('FormControl[id="username"]').length).toEqual(1);
    })
    it('should have address field', () => {
        expect(container.find('FormControl[id="address"]').length).toEqual(1);
    })
    it('should have phone number field', () => {
        expect(container.find('FormControl[id="phoneNumber"]').length).toEqual(1);
    })
    it('should have password field', () => {
        expect(container.find('FormControl[id="password"]').length).toEqual(1);
    })
    it('should have confirm password field', () => {
        expect(container.find('FormControl[id="confirmPassword"]').length).toEqual(1);
    })
    //test the Link
    it('includes link to Login page', () => {
        expect(container.find(Link).props().to).toBe('/login');
    });
    //test the submit button
    it('includes button to submit form', () => {
        expect(container.find(Button).props().type).toBe("submit");
    });

})