import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WinnerMsg from './WinnerMsg'
import * as reactRedux from 'react-redux'
import { ludoAction } from '../../store'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}))

describe('test WinnerMsg', () => {
  let mockTurnChange2, mockRemovePlayer, mockResetGame
  const closeMsg = jest.fn()

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {
      jest.fn()
    })
    mockTurnChange2 = jest
      .spyOn(ludoAction, 'turnChange2')
      .mockImplementation(() => jest.fn())
    mockRemovePlayer = jest
      .spyOn(ludoAction, 'removePlayer')
      .mockImplementation(() => jest.fn())
    mockResetGame = jest
      .spyOn(ludoAction, 'resetGame')
      .mockImplementation(() => jest.fn())
  })
  const useDispatchMock = reactRedux.useDispatch

  afterEach(() => {
    useDispatchMock.mockClear()
  })

  test('show msg when it trigger', () => {
    const { container } = render(<WinnerMsg color="red" show={true} />)
    const msgBoard = screen.getByText('Player')
    expect(container.getElementsByClassName('red').length).toBe(1)
    expect(msgBoard).toBeInTheDocument()
  })
  test('show the color of the specific prop passed on', () => {
    const { container, rerender } = render(
      <WinnerMsg color="red" show={true} />
    )
    expect(container.getElementsByClassName('red').length).toBe(1)
    expect(container.getElementsByClassName('yellow').length).toBe(0)
    rerender(<WinnerMsg color="yellow" show={true} />)
    expect(container.getElementsByClassName('red').length).toBe(0)
    expect(container.getElementsByClassName('yellow').length).toBe(1)
  })
  test('does not show msg when not trigger', () => {
    render(<WinnerMsg color="red" show={false} />)
    const msgBoard = screen.queryByText('Player')
    expect(msgBoard).not.toBeInTheDocument()
  })

  test('one button to reset and one to continue', () => {
    render(<WinnerMsg color="red" show={true} />)
    const buttonElement = screen.getAllByRole('button')
    expect(buttonElement.length).toBe(2)
  })

  test('clicking continue will trigger function', () => {
    render(<WinnerMsg color="red" show={true} closeMsg={closeMsg} />)
    const buttonElement = screen.getByText('Continue')
    userEvent.click(buttonElement)
    expect(mockTurnChange2).toHaveBeenCalled()
    expect(mockRemovePlayer).toHaveBeenCalled()
  })
  test("clicking 'New game' will trigger function", () => {
    render(<WinnerMsg color="red" show={true} closeMsg={closeMsg} />)
    const buttonElement = screen.getByText('New game')
    userEvent.click(buttonElement)
    expect(mockResetGame).toHaveBeenCalled()
  })
})
