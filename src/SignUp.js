import {
    Form
} from 'react-bootstrap'

import { useState } from 'react'

import Button from './Button'

import { signUp } from './redux/dispatch'

const SignUp = () => {

    const templateInfo = {
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        password: ""
    }

    const [userInfo, setUserInfo] = useState(templateInfo)

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
            <Form.Control placeholder='Email' value={userInfo.email} onChange={(e) => {

                setInput('email', e.target.value)
            }} />
            <Form.Control placeholder='Şifre' value={userInfo.password} onChange={(e) => {

                setInput('password', e.target.value)
            }} />
            <Form.Control placeholder='Ad' value={userInfo.firstName} onChange={(e) => {

                setInput('firstName', e.target.value)
            }} />
            <Form.Control placeholder='Soyad' value={userInfo.lastName} onChange={(e) => {

                setInput('lastName', e.target.value)
            }} />
            <Form.Control placeholder='Yaş' value={userInfo.age} onChange={(e) => {

                setInput('age', e.target.value)
            }} />
             <Button variant='primary' title="Kaydet" onClick={() => {
                
                console.log('signup', userInfo)

                signUp({
                    callback: () => {

                    },
                    userInfo
                })
             }} />
        </div>
    )
}

export default SignUp