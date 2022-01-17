import React from 'react';
import {shallow} from 'enzyme';
import { expect } from 'chai';

import MyToolbar from '../../MainToolbar';
import {Toolbar} from "primereact/toolbar";

describe('Main Toolbar tests', function() {
    it('should have the correct elements', () => {
        const wrapper = shallow(<MyToolbar />);

        expect(wrapper.containsAllMatchingElements([
            <Toolbar />,
        ])).to.true;
    });
});
