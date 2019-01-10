import React from 'react'
import {mount, shallow} from 'enzyme'
import {Recent} from "../Recent"

test ('recent smoke', () => {
  const wrapper = mount(<Recent/>); // mount/render/shallow when applicable
  expect(wrapper.find('p b').text()).toEqual('Recent');
});

