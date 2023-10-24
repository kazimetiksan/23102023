import './App.css';

import Button from './Button';

import { useState, useEffect } from 'react'

import {
  Form,
  Table,
  Spinner
} from 'react-bootstrap'

import Row from './Row';
import Modal from './Modal';

import {
  commonFunction
} from './functions'

import axios from 'axios';

const App = () => {

  const [userList, setUserList] = useState([])

  const templateInfo = {
    firstName: "",
    lastName: "",
    age: ""
  }

  const loadData = () => {

    const url = 'https://reactpm.azurewebsites.net/api/users'

    // load start
    setLoading(true)

    axios.get(url)
      .then((response) => {

        console.log('response', response.data)

        setUserList(response.data)

        // load end
        setLoading(false)

        // başarılı cevap
      })
      .catch((error) => {

        console.log('error', error)

        // başarısız cevap
      })
  }

  const [userInfo, setUserInfo] = useState(templateInfo)

  const [updateIndex, setUpdateIndex] = useState(-1)
  const [removeIndex, setRemoveIndex] = useState(-1)

  const [modalOn, setModalOn] = useState(false)

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    // console.log(userInfo)
  }, [userInfo])

  useEffect(() => {
    loadData()
  }, [])

  const setInput = (key, value) => {

    setUserInfo({
      ...userInfo,
      [key]: value
    })
  }

  const rowUpdate = (index) => {

    commonFunction(index)

    setUserInfo(userList[index])
    setUpdateIndex(index)

    console.log(`${index} sıralı satır güncellenecek`)
  }

  const hideModal = () => {

    setModalOn(false)
    setRemoveIndex(-1)
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
                    }}
                    onRemove={() => {

                      setModalOn(true)
                      setRemoveIndex(index)
                    }}
                  />
                )
              })
            }
          </tbody>
        </Table>
      </div>
      {
        isLoading && (
          <div>
            <Spinner animation="border" variant="primary" />
          </div>
        )
      }
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
        <Button disabled={isLoading} variant='primary' title={updateIndex === -1 ? "Ekle" : "Güncelle"} onClick={() => {

          // updateIndex kontrol

          setLoading(true)

          if (updateIndex === -1) {

            const url = 'https://reactpm.azurewebsites.net/api/user'
            axios.post(url, userInfo)
              .then((response) => {

                const newUser = response.data
                console.log('new user added', newUser)

                setUserList([
                  ...userList,
                  response.data
                ])

                setLoading(false)
              })
              .catch((error) => {

                console.log('new user NOT added', error)
              })

          } else {

            // GÜNCELLE

            const url = `https://reactpm.azurewebsites.net/api/user/${userList[updateIndex]?._id}`
            axios.patch(url, userInfo)
              .then((response) => {

                console.log('user updated', response.data)

                // state güncelleme

                const newList = userList.map((item) => {

                  // updateIndex sırasında eleman değişikliği

                  if (item._id === response.data._id) {
                    return response.data
                  }

                  return item
                })

                setUserList(newList)
                setLoading(false)

                setUserInfo(templateInfo)
                setUpdateIndex(-1)
              })
              .catch((error) => {

                console.log('update error', error)
              })
          }


        }} />
      </div>
      <Modal
        title="Uyarı"
        body={`${userList[removeIndex]?.firstName} silinecektir, emin misiniz ?`}
        show={modalOn}
        handleConfirm={() => {

          const url = `https://reactpm.azurewebsites.net/api/user/${userList[removeIndex]?._id}`

          axios.delete(url)
            .then((response) => {

              if (response.status === 200) {

                const newList = userList.filter((listItem) => listItem._id !== userList[removeIndex]?._id)
                setUserList(newList)
              }
            })
            .catch((error) => {

            })

          hideModal()

        }}
        handleClose={hideModal}
      />
    </div>
  );
}

export default App;
