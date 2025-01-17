import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';

test('initial snapshot', () => {
  const wrapper = mount(App);
  expect(wrapper.html()).toMatchSnapshot();
});