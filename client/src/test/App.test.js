// import App from '../App.jsx'
// import Enzyme from 'enzyme';
// import Adapter from '@cfaester/enzyme-adapter-react-18';
// import { shallow, mount } from 'enzyme';
// import { screen, render } from '@testing-library/react';
// import { Route, Routes } from 'react-router-dom';

// Enzyme.configure({ adapter: new Adapter() });

// describe('App', () =>{
//     beforeEach(() =>{
//         render(<App/>)
//     });
// })

// let pathMap = {}
// describe('routes', () =>{
//     beforeAll(() =>{
//         const component = shallow(<Routes/>)
//         pathMap = component.find(Route).reduce((pathMap, route) =>{
//             const routeProps = route.props();
//             pathMap[routeProps.path] = routeProps.component
//             return pathMap;
//         }, {})
//         console.log(pathMap)
//     })

//     test('Should show NavBar page for / router', () =>{
//         expect(pathMap['/']).toBe(NavBar)
//     })
// })
