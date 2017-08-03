jest.dontMock('../../src/components/FriendList');
import React from 'react';
import ReactDOM from 'react-dom';

//TestUtils = require('react-dom/test-utils');

import FriendList from '../../src/components/FriendList';

describe('FriendList UI Component', function() {

    let Component;

    beforeEach(function() {
        Component = shallow (<FriendList />);    
    });

    it('Component FriendList should exists', () => {
        //var FriendList = TestUtils.renderIntoDocument(<FriendList />);
        //expect(TestUtils.isCompositeComponent(FriendList)).toBeTruthy();
        expect(Component.length).toBeTruthy();
    });

    it('Correct child components exists within the FriendList Menu', function () {
        expect(Component.find('label').text()).toBe('Friend List');
        expect(Component.find('<FriendListItem />')).toBeTruthy();
        expect(Component.find('<FriendAddButton />')).toBeTruthy();
    });
});