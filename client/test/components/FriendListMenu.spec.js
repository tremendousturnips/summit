jest.dontMock('../../src/components/FriendListMenu');
import React from 'react';
import ReactDOM from 'react-dom';

//TestUtils = require('react-dom/test-utils');

import FriendListMenu from '../../src/components/FriendListMenu';

describe('FriendListMenu UI Component', function() {

    let Component;

    beforeEach(function() {
        Component = shallow (<FriendListMenu />);    
    });

    it('Component FriendListMenu should exists', () => {
        //var friendListMenu = TestUtils.renderIntoDocument(<FriendListMenu />);
        //expect(TestUtils.isCompositeComponent(friendListMenu)).toBeTruthy();
        expect(Component.length).toBeTruthy();
    });

    it('Correct child components exists within the FriendList Menu', function () {
        expect(Component.find('label').text()).toBe('Friend List');
        expect(Component.find('<FriendListItem />')).toBeTruthy();
        expect(Component.find('<FriendAddButton />')).toBeTruthy();
    });
});