import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ActivityCard from '../ActivityCard.vue'; // Adjust the import path if necessary

describe('ActivityCard.vue', () => {
  it('renders activity data correctly', () => {
    const activities = [
      {
        log_id: 1,
        location: 'Idaho Falls',
        distance: 3.25,
        time: '12:00:00', // Set a fixed time for testing
        mode_of_transport: 'Mountain Bike'
      }
    ];

    const wrapper = mount(ActivityCard, {
      data() {
        return { activities };
      }
    });

    // Assertions to check that each activity property is rendered correctly
    expect(wrapper.find('p').text()).toContain(activities[0].location);
    expect(wrapper.findAll('p')[1].text()).toContain(activities[0].distance.toString());
    expect(wrapper.findAll('p')[2].text()).toContain(activities[0].mode_of_transport);
    expect(wrapper.findAll('p')[3].text()).toContain(activities[0].time);
  });
});