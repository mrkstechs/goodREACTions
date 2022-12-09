import { screen, render } from '@testing-library/react';
import Logo from '.'
import React from 'react'
import '@testing-library/jest-dom'

describe('Logo', () =>{
    beforeEach(() =>{
      render(<Logo/>)
    })

    test('image of logo exists', ()=>{
        const img = screen.getByAltText("Welcome to Quizzic")
        expect(img).toBeInTheDocument()
    })

    test('Logo contains div', () =>{
        const {container} = render(<Logo/>)
        const div = container.getElementsByClassName('logo')
        expect(div.length).toBe(1)
    })
})
