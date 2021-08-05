import SignUpPage from'../component/login/SignUpPage.js'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Test Sign Up ',()=>{
    const container = shallow(<SignUpPage />)
    
    it('should have username field',()=>{
        expect(container.find('TextField[label="Username"]').length).toEqual(0);
    })
    it('should have password field',()=>{
        expect(container.find('TextField[label="Password"]').length).toEqual(0);
    })

})