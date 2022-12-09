import { screen, render } from '@testing-library/react';
import Clock from '.'
import React from 'react'
import '@testing-library/jest-dom'

describe('Clock', () =>{
    beforeEach(() =>{
        render(<Clock/>)
    })

    test('div wrapped clock component', () =>{
        const { container } = render(<Clock/>)
        const div = container.getElementsByClassName('clock')

        expect(div.length).toBe(1)
    })
})
