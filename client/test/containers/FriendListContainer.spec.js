import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { storeFake } from '../fakeData/storeFake';
import FriendListContainer from '../../src/containers/FriendListContainer';
import FriendListMenu from '../../src/components/FriendListMenu';

describe('Testing FriendListContainer', () => {
    let Component;
    let FriendListComponent;

    beforeEach(() => {
        const store = storeFake({});

        const wrapper = mount(
            <Provider store={store}>
                <FriendListContainer />
            < /Provider>    
        );

        Component = wrapper.find(FriendListContainer);
        FriendListComponent = Component.find(FriendListMenu);
    })

    it('Render correctly', () => {
        expect(Component.length).toBeTruthy();
        expect(FriendListComponent.length).toBeTruthy();
    })
})