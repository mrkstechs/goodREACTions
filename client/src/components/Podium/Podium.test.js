import { screen, render } from '@testing-library/react';
import Podium from '.'

describe('Podium', () =>{
    beforeEach(() =>{
        render(<Podium/>)
    })

    test('Podiums with different class names', () =>{
        const { container } = render(<Podium/>)
        const podium = container.getElementsByClassName('podium')
        const first = container.getElementsByClassName('first')
        const second = container.getElementsByClassName('second')
        const third = container.getElementsByClassName('third')

        expect(podium.length).toBe(1)
        expect(first.length).toBe(0)
        expect(second.length).toBe(0)
        expect(third.length).toBe(1)
    })

    test('Podim features name and position', () =>{
        const name = screen.getByRole('heading')
        expect(name).toBeInTheDocument()
    })
})
