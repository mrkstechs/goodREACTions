import App, Routes from '../App.jsx'

import { shallow, mount } from 'enzyme';
import { screen, render } from '@testing-library/react';
import { Route } from 'react-router-dom';

describe('App', () =>{
    beforeEach(() =>{
        render(<App/>)
    });
})

let pathMap = {}
describe('routes', () =>{
    beforeAll(() =>{
        const component = shallow(<Routes/>)
        pathMap = component.find(Route).reduce((pathMap, route) =>{
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component
            return pathMap;
        }, {})
        console.log(pathMap)
    })

    test('Should show NavBar page for / router', () =>{
        expect(pathMap['/']).toBe(NavBar)
    })
})
