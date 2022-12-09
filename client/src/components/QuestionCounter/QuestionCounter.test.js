import { screen, render } from '@testing-library/react';
import QuestionCounter from '.'
import {BrowserRouter as Router} from 'react-router-dom';
import React from 'react'
import '@testing-library/jest-dom'


describe('Question Counter', () =>{
    beforeEach(() =>{
        render(<QuestionCounter/>)
    })

    test('div wraps spans', () =>{
        const { container } = render(<QuestionCounter/>)

        const div = container.getElementsByClassName('counter')

        expect(div.length).toBe(1)
    })

    test('span exists', () =>{
        const { container } = render(<QuestionCounter/>)

        const span = container.getElementsByClassName('current-round')

        expect(span.length).toBe(1)
    })
    test('span exists', () =>{
        const { container } = render(<QuestionCounter/>)

        const span = container.getElementsByClassName('slash')

        expect(span.length).toBe(1)
    })
    test('span exists', () =>{
        const { container } = render(<QuestionCounter/>)

        const span = container.getElementsByClassName('final-round')

        expect(span.length).toBe(1)
    })
})
