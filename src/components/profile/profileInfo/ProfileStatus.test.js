import React from 'react'
import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe('ProfileStatus component', () => {
  //проверяем что статус из пропсов попадает в state
  test('status from props should be in the state', () => {
    //создаем новый статус в пропсах профиля
    const component = create(<ProfileStatus status="it-kamasutra.com" />)
    //instance - экземпляр компонента, с которым мы взаимодействуем
    const instance = component.getInstance()
    //проверяем что статус профиля в стейте такой же как передали в пропсах
    expect(instance.state.status).toBe('it-kamasutra.com')
  })
  //должен отображаться <span>
  test('after creation <span> should be displayed', () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />)
    const root = component.root
    //находим в компоненте span
    let span = root.findByType('span')
    //значение должно быть не null. т.е. если условие спана верно
    expect(span).not.toBeNull()
  })
  //инпут должен быть не найден. toThrow() - значит ошибка
  test("after creation <input> shouldn't be displayed", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />)
    const root = component.root
    expect(() => {
      let input = root.findByType('input')
    }).toThrow()
  })
  //должен содержать корректный статус
  test('after creation <span> should contains correct status', () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />)
    const root = component.root
    let span = root.findByType('span')
    expect(span.children[0]).toBe('it-kamasutra.com')
  })
  //должен появиться инпут вместо спана по клику на него, и его значение равно 'it-kamasutra.com'
  test('input should be displayed in editMode instead of span', () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />)
    const root = component.root
    let span = root.findByType('span')
    span.props.onDoubleClick()
    let input = root.findByType('input')
    expect(input.props.value).toBe('it-kamasutra.com')
  })
})
