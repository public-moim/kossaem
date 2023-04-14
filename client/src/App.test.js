import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthContextProvider } from './context/authContext';

test('renders learn react link', () => {
  render(<AuthContextProvider><App /></AuthContextProvider>);
  
});
