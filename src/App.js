import './App.css';

import Button from './Button';

import { useState, useEffect } from 'react'

import {
  Form,
  Table
} from 'react-bootstrap'

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
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.age}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
      <div>
        <Form.Control placeholder='Ad' />
        <Form.Control placeholder='Soyad' />
        <Form.Control placeholder='Yaş' />
      </div>
    </div>
  );
}

export default App;
