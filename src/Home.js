import {
    useState,
    useEffect
} from 'react'

import axios from 'axios'

import {
    Table,
    Spinner,
    Form,
    Modal
} from 'react-bootstrap'

import Row from './Row'
import Button from './Button'

import {
    useNavigate
} from 'react-router-dom'

import {
    getAll,
    addNew,
    updateUser
} from './redux/dispatch' // DISPATCH

import { useRedux } from './redux/hooks' // SELECTOR

const Home = () => {

    const navigate = useNavigate()

    // LOCAL STATE
    // const [userList, setUserList] = useState([])

    // REDUX STATE
    // const userList = useSelector(state => state.user)

    // REDUX HOOK
    const { users: userList } = useRedux()

    const templateInfo = {
        firstName: "",
        lastName: "",
        age: ""
    }

    const loadData = () => {

        setLoading(true)

        getAll({
            callback: () => {
                setLoading(false)
            }
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
                                        onView={() => {

                                            console.log(`http://localhost:3000/view/${item._id} detay açılacak`)

                                            const targetURL = `/view/${item._id}`
                                            navigate(targetURL)
                                        }}
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

                    setLoading(true)

                    if (updateIndex === -1) {

                        // EKLE

                        addNew({
                            callback: () => {
                                setLoading(false)
                                setUserInfo(templateInfo)
                            },
                            userInfo
                        })


                    } else {

                        // GÜNCELLE

                        updateUser({
                            callback: () => {
                                setLoading(false)
                                setUserInfo(templateInfo)
                            },
                            userInfo,
                            _id: userList[updateIndex]?._id
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
                                // setUserList(newList)
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

export default Home