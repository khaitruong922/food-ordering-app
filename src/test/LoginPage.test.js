import { Button } from '@chakra-ui/react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import LoginPage from '../component/login/LoginPage.js';

configure({ adapter: new Adapter() });

describe('LoginPage Test ', () => {
    const container = shallow(<LoginPage />)
    it('should set title',()=>{
        expect(container.find(Helmet).props().title).toBe('Login')
    })
    it('should have username field', () => {
        expect(container.find('FormControl[id="username"]').length).toEqual(1);
    })
    it('should have password field', () => {
        expect(container.find('FormControl[id="password"]').length).toEqual(1);
    })
    //test the Link
    it('includes link to Sign Up page', () => {
        expect(container.find(Link).props().to).toBe('/signup');
    });
    //test the submit button
    it('includes button to submit form', () => {
        expect(container.find(Button).props().type).toBe("submit");
    });
})
