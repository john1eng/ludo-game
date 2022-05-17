import { render } from '@testing-library/react'
import Overlay from './Overlay'

describe('test Overlay Component', () => {
  test('render OverLay', () => {
    const { container } = render(<Overlay />)
    expect(container.getElementsByClassName('overlay').length).toBe(1)
  })
})
