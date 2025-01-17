import { expect, test } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import WipMessage from './WipMessage.vue';

test('initial state shows no message', () => {
  const wrapper = mount(WipMessage);

  expect(wrapper.text()).toContain('This is WIP');
  expect(wrapper.text()).toContain('Learn more');
  expect(wrapper.text()).not.toContain('Work in Progress')
});

test('correctly shows list when clicked', async () => {
    const wrapper = mount(WipMessage);
    wrapper.get('a').trigger('click');

    await nextTick();
    
    expect(wrapper.text()).toContain('This is WIP');
    expect(wrapper.text()).not.toContain('Learn more');
    expect(wrapper.text()).toContain('Work in Progress')
  });