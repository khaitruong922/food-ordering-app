import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import images from '../asset/image/images.js';
import MainAppBar from '../component/shared/MainAppBar';

configure({ adapter: new Adapter() });

describe('MainAppBar Test ', () => {
    const container = shallow(<MainAppBar />)

    it('should have link to home',()=>{
        expect(container.find(`Link[to='/']`)).toBeDefined()
    })
})
