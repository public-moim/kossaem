import { fireEvent, render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event'

test('renders Landing Page component correctly', async ()=> {
    const user= userEvent.setup()

    //render component
    const {container}=render(<Router history={history}><LandingPage/></Router>)
    expect(container).toMatchSnapshot();

    
})


