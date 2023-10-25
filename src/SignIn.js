import {
    Form
} from 'react-bootstrap'

import { useState } from 'react'

import Button from './Button'

import { signIn } from './redux/dispatch'

import {
    useNavigate
} from 'react-router-dom'

const SignIn = () => {

    const navigate = useNavigate()

    const templateInfo = {
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
             <Button variant='primary' title="Giriş Yap" onClick={() => {
                
                signIn({
                    callback: (isDone) => {
                        // navigate home

                        if (isDone) {
                            navigate("/")
                        }
                    },
                    userInfo
                })
             }} />
        </div>
    )
}

export default SignIn