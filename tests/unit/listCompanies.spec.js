import { shallowMount, mount } from '@vue/test-utils'
import ListCompanies from '@/components/ListCompanies.vue'

describe('ListCompanies.vue', () => {
  it('renders welcome message', () => {
    const wrapper = shallowMount(ListCompanies)
    expect(wrapper.find('h1').text()).toMatch('Bienvenido a la gestión de compañías')
  })

  it('renders company list initial', () => {
    const wrapper = shallowMount(ListCompanies)
    const tableItems = wrapper.find('td').length
    if (tableItems == 0){
      expect(wrapper.find('#empty-list').text()).toMatch('- No hay compañías-')
    }else{
      expect(wrapper.find('#empty-list').text()).toMatch('')
    }
  })

  it('list companies', () => {
    let wrapper = mount(ListCompanies,
      {propsData:{
        companiesInitial: [{"id":"1","name":"Compa\u00f1\u00eda 1","cif":"CF123123","address":"C\/Falsa 123"},{"id":"2","name":"Otra Compa\u00f1\u00eda","cif":"CL98989","address":"Av. Universidad 2B 3A"}]
      }
    })
    expect(wrapper.find('table tr td').text()).toMatch('Compañía 1')
    expect(wrapper.findAll('table tr td').length).toBe(6)
  })

  it('list companies', () => {
    let wrapper = mount(ListCompanies,
      {propsData:{
        companiesInitial: [{"id":"1","name":"Compa\u00f1\u00eda 1","cif":"CF123123","address":"C\/Falsa 123"},{"id":"2","name":"Otra Compa\u00f1\u00eda","cif":"CL98989","address":"Av. Universidad 2B 3A"}]
      }
    })
    expect(wrapper.find('table tr td').text()).toMatch('Compañía 1')
    expect(wrapper.findAll('table tr td').length).toBe(6)
  })
})
