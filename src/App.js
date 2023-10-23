import './App.css';

import Button from './Button';

import {useState, useEffect} from 'react' // hook

const App = () => {

  const userInfo = {
    firstName: "Kazım",
    lastName: "Etiksan",
    age: 33
  } // JSON Object

  const userList = [{
    firstName: "Kazım",
    lastName: "Etiksan",
    age: 33
  },{
    firstName: "Mert",
    lastName: "Şener",
    age: 32
  },{
    firstName: "Elif",
    lastName: "Yavuz",
    age: 43
  }]

  // let number = 10

  // const stateArray = useState(10)
  // const getter = stateArray[0]
  // const setter = stateArray[1]

  const [number, setNumber] = useState(10)

  useEffect(() => {
    console.log('number güncel', number)
  }, [number])

  useEffect(() => {
    console.log('constructor')
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          Merhaba {userInfo.firstName}
        </div>
        <div>
        {
          // userList.map((item, index) => {
          //   return (
          //     <div key={index}>{item.firstName} {item.lastName}</div>
          //   )
          // })
        }
        </div>
        <div>
          Number anlık değer: {number}
        </div>
        <div>
          <Button title="Arttır" onClick={() => {
            setNumber(number+1)
          }} />
          <Button title="Eksilt" onClick={() => {
            setNumber(number-1)
          }} />
        </div>
        {
          // userInfo.age > 40 ? (
          //   <div>Kullanıcı 40 yaşından büyük</div>
          // ) : (
          //   <div>Kullanıcı 40 yaşından küçük</div>
          // )
        }
      </header>
    </div>
  );
}

export default App;
