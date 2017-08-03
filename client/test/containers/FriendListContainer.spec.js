import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { storeFake } from '../fakeData/storeFake';
import FriendListContainer from '../../src/containers/FriendListContainer';
import FriendList from '../../src/components/FriendList';

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
        FriendListComponent = Component.find(FriendList);
    })

    it('Render correctly', () => {
        expect(Component.length).toBeTruthy();
        expect(FriendListComponent.length).toBeTruthy();
    })
})