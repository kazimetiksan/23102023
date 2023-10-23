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

  const [updateIndex, setUpdateIndex] = useState(-1)

  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])

  const setInput = (key, value) => {

    setUserInfo({
      ...userInfo,
      [key]: value
    })
  }

  const rowUpdate = (index) => {

      setUserInfo(userList[index])
      setUpdateIndex(index)

      console.log(`${index} sıralı satır güncellenecek`)
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
                    onUpdate={() => {

                      rowUpdate(index)

                      // setUserInfo(userList[index])
                      // setUpdateIndex(index)

                      // console.log(`${index} sıralı satır güncellenecek`)
                    }}
                    onRemove={() => {

                      // index sıralı satır silinecek
                      console.log(`${index} sıralı satır silinecek`)

                      const newList = userList.filter((listItem, listIndex) => listIndex !== index)

                      setUserList(newList)
                    }}
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
        <Button variant='primary' title={updateIndex === -1 ? "Ekle" : "Güncelle"} onClick={() => {

          // updateIndex kontrol

          if (updateIndex === -1) {

            // EKLE
            setUserList([
              ...userList,
              userInfo
            ])
  
            setUserInfo(templateInfo)
          } else {

            // GÜNCELLE

            const newList = userList.map((item, index) => {

              // updateIndex sırasında eleman değişikliği

              if (updateIndex === index) {
                return userInfo
              }

              return item
            })

            setUserList(newList)
  
            setUserInfo(templateInfo)

            setUpdateIndex(-1)
          }


        }} />
      </div>
    </div>
  );
}

export default App;
