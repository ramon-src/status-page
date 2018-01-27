import { shallow } from 'vue-test-utils';
import ServicePage from '@/components/Service';

const axios = {
  get: (url) => {
    if (url === '/') {
      return Promise.resolve({
        data: [
          { name: 'Ramon', status: 'true' },
          { name: 'Rodrigo', status: 'true' },
        ],
      });
    }
    return Promise.reject();
  },
};

describe('ServicePage', () => {
  let servicePage;

  beforeAll(() => {
    servicePage = shallow(ServicePage, {
      mocks: {
        axios,
      },
    });
  });

  it('should show the state from service', () => {
    expect(servicePage.find('.service__list-item-status').text()).toBe('true');
  });

  it('should show the name from service', () => {
    expect(servicePage.find('.service__list-item-name').text()).toBe('Ramon');
  });

  it('should service list has two services after request services', () => {
    const twoServices = [{ name: 'Ramon', status: 'true' }, { name: 'Rodrigo', status: 'true' }];
    servicePage.vm.$nextTick(() => {
      expect(servicePage.vm.services).toEqual(twoServices);
    });
  });

  it('should service list render two services items after request services', () => {
    servicePage.vm.$nextTick(() => {
      const items = servicePage.findAll('.service__list-item-name');
      expect(items.at(0).text()).toBe('Ramon');
      expect(items.at(1).text()).toBe('Rodrigo');
    });
  });
});
