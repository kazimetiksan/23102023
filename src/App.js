import Home from './Home';
import Detail from './Detail';
import NotFound from './NotFound';

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/view/:_id' element={<Detail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
