import { render } from '@testing-library/react';
import MainJSApp from './App'
import ReactDOM from 'react-dom'

test('renders without crashing', () => {
  const div = document.createElement('div')
  render(<MainJSApp />, div)
  ReactDOM.unmountComponentAtNode(div)
})
