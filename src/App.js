import './App.css';

import Button from './Button';

import { useState, useEffect } from 'react'

import {
  Form,
  Table
} from 'react-bootstrap'

import Row from './Row';

const App = () => {

  const userList = [{
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
  }]

  const templateInfo = {
    firstName: "",
    lastName: "",
    age: ""
  }

  const [userInfo, setUserInfo] = useState(templateInfo)

  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])

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

          const firstName = e.target.value
          setUserInfo({
            ...userInfo,
            firstName
          })

        }} />
        <Form.Control placeholder='Soyad' value={userInfo.lastName} onChange={(e) => {

          const lastName = e.target.value
          setUserInfo({
            ...userInfo,
            lastName
          })

        }} />
        <Form.Control placeholder='Yaş' value={userInfo.age} onChange={(e) => {

          const age = e.target.value
          setUserInfo({
            ...userInfo,
            age
          })

        }} />
      </div>
    </div>
  );
}

export default App;
