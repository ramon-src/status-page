import { mount } from 'vue-test-utils';
import Component from '../Hello';

describe('Hello', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Component);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

