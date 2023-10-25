import Home from './Home';
import Detail from './Detail';
import NotFound from './NotFound';

import SignUp from './SignUp';

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

import store from './redux/store';

import {
  Provider
} from 'react-redux'

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/view/:_id' element={<Detail />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
