import LoginPage from '../component/login/LoginPage.js'
import * as login from '../component/login/LoginPage.js'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';
import { Button } from '@material-ui/core';

configure({ adapter: new Adapter() });

describe('Test Login ', () => {
    const container = shallow(<LoginPage />)
    const onFormSubmit = jest.fn()
    const button = shallow(<Button onClick={onFormSubmit}></Button>)
    //test the textfield
    it('should have username field', () => {
        expect(container.find('TextField[label="Username"]').length).toEqual(0);
    })
    it('should have password field', () => {
        expect(container.find('TextField[label="Password"]').length).toEqual(0);
    })
    //test the Link
    it('includes link to Sign Up page', () => {
        expect(container.find('Link[id="link2"]').props().to).toBe('/signup');
    });
    it('includes link to reset password', () => {
        expect(container.find('Link[id="link1"]').props().to).toBe('#');
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
