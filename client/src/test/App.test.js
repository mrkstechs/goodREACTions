import App, { NavBar, Homepage, Lobby, Leaderboardpage, Questionpage } from '../App.jsx'
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { shallow, mount } from 'enzyme';
import { screen, render } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () =>{
    beforeEach(() =>{
        render(<App/>, { wrapper: Router } )
    });
})

let pathMap = {}
describe('routes', () =>{
    beforeAll(() =>{
        const component = shallow(<Router><Routes/></Router> )
        pathMap = component.find(Route).reduce((pathMap, route) =>{
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component
            return pathMap;
        }, {})
        console.log(pathMap)
    })

    test('Should show NavBar page for / route', () =>{
        expect(pathMap['/']).toBe(NavBar)
    })
    test('Should show Homepage page for / route', () =>{
        expect(pathMap['/']).toBe(Homepage)
    })
    test('Should show Lobby page for /lobby route', () =>{
        expect(pathMap['/lobby']).toBe(Lobby)
    })
    test('Should show leaderboard page for /leaderboard route', () =>{
        expect(pathMap['/leaderboard']).toBe(Leaderboardpage)
    })
    test('Should show Question page for /question route', () =>{
        expect(pathMap['/question']).toBe(Questionpage)
    })
    test('Should show Error message for other routes', () =>{
        // let element = document.createElement("h1")
        // element.textContent = "404"
        expect(pathMap['undefined']).toBe(undefined)
    })
    
})
