import { Button } from '@chakra-ui/react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import images from '../asset/image/images.js';
import Home from '../component/home/Home.js';

configure({ adapter: new Adapter() });

describe('Home test ', () => {
    const container = shallow(<Home />)

    it('should set title',()=>{
        expect(container.find(Helmet).props().title).toBe('DeliV')
    })

    it('should have landing image',()=>{
        expect(container.find(`Box[bgImage='${images.landing}']`)).toBeDefined()
    })
})
