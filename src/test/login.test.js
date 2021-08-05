import LoginPage from '../component/login/LoginPage.js'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Test Login ',()=>{
    const container = shallow(<LoginPage />)
    
    it('should have username field',()=>{
        expect(container.find('TextField[label="Username"]').length).toEqual(0);
    })
    it('should have password field',()=>{
        expect(container.find('TextField[label="Password"]').length).toEqual(0);
    })

})
