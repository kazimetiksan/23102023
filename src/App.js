import './App.css';

import Button from './Button';

const App = () => {

  const userInfo = {
    firstName: "Kazım",
    lastName: "Etiksan"
  }

  const someMethod = () => {

  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          Merhaba {userInfo.firstName}
        </div>
        <Button title="Hello" /> {/* JSX - Prop */}
      </header>
    </div>
  );
}

export default App;
