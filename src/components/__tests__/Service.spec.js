import { shallow } from 'vue-test-utils';
import Vue from 'vue';
import ServicePage from '@/components/Service';

const axios = {
  get: (url) => {
    if (url === '/') {
      return Promise.resolve({
        data: [
          { name: 'Ramon', status: true },
          { name: 'Rodrigo', status: true },
        ],
      });
    }
    return Promise.reject();
  },
};

const axiosWithStatusFalse = {
  get: (url) => {
    if (url === '/') {
      return Promise.resolve({
        data: [
          { name: 'Ramon', status: false },
          { name: 'Rodrigo', status: true },
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
    const twoServices = [{ name: 'Ramon', status: true }, { name: 'Rodrigo', status: true }];
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

  it('should show red background when some service status is false', () => {
    const servicePageWithStatusFalse = shallow(ServicePage, {
      mocks: {
        axios: axiosWithStatusFalse,
      },
    });
    const serviceStatusContainer = servicePageWithStatusFalse.find('.service');
    expect(serviceStatusContainer.classes()).toContain('is-danger');
  });

  it('should show Some service is not available :( when some service status is false', () => {
    const servicePageWithStatusFalse2 = shallow(ServicePage, {
      mocks: {
        axios: axiosWithStatusFalse,
      },
    });
    const serviceStatusContainer = servicePageWithStatusFalse2.find('.service .service__message');
    expect(serviceStatusContainer.text()).toBe('Some service is not available :(');
  });

  it('should show green background when all services status is true', () => {
    const servicePageMounted = shallow(ServicePage, {
      mocks: {
        axios,
      },
    });
    jest.runAllTicks();
    servicePageMounted.update();
    expect(servicePageMounted.vm.classes.pageBackground).toBe('is-success');
  });
});
