import { screen, render } from '@testing-library/react';
import Answer from '.'
import React from 'react'
import '@testing-library/jest-dom'

describe('Answer', ()=>{
    beforeEach(() =>{
        render(<Answer/>)
    })

    test('Answer wrapped in div', () =>{
        const { container } = render(<Answer/>)
        const div = container.getElementsByClassName('answer-tile')

        expect(div.length).toBe(1)
    })

    test('correct div exists on condition', () =>{
        const { container } = render(<Answer/>)
        const div = container.getElementsByClassName('correct')

        expect(div.length).toBe(0)
    })

    test('incorrect div exists on condition', () =>{
        const { container } = render(<Answer/>)
        const div = container.getElementsByClassName('incorrect')

        expect(div.length).toBe(0)
    })
})
