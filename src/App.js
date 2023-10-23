import './App.css';

import Button from './Button';

import { useState, useEffect } from 'react'

import {
  Form,
  Table
} from 'react-bootstrap'

import Row from './Row';

const App = () => {

  const [userList, setUserList] = useState([{
    firstName: "Kazım",
    lastName: "Etiksan",
    age: 33
  }, {
    firstName: "Mert",
    lastName: "Şener",
    age: 32
  }, {
    firstName: "Elif",
    lastName: "Yavuz",
    age: 43
  }])

  const templateInfo = {
    firstName: "",
    lastName: "",
    age: ""
  }

  const [userInfo, setUserInfo] = useState(templateInfo)

  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])

  const setInput = (key, value) => {

    setUserInfo({
      ...userInfo,
      [key]: value
    })
  }

  return (
    <div style={{
      margin: 50
    }}>
      <div>
        <Table>
          <thead>
            <th>#</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Yaş</th>
          </thead>
          <tbody>
            {
              userList.map((item, index) => {
                return (
                  <Row
                    key={index}
                    item={item}
                    index={index}
                  />
                )
              })
            }
          </tbody>
        </Table>
      </div>
      <div>
        <Form.Control placeholder='Ad' value={userInfo.firstName} onChange={(e) => {

          setInput('firstName', e.target.value)
          
          // const firstName = e.target.value
          // setUserInfo({
          //   ...userInfo,
          //   firstName
          // })

        }} />
        <Form.Control placeholder='Soyad' value={userInfo.lastName} onChange={(e) => {

          setInput('lastName', e.target.value)
        }} />
        <Form.Control placeholder='Yaş' value={userInfo.age} onChange={(e) => {

          setInput('age', e.target.value)
        }} />
        <Button title="Ekle" onClick={() => {

          setUserList([
            ...userList,
            userInfo
          ])

          setUserInfo(templateInfo)

        }} />
      </div>
    </div>
  );
}

export default App;
