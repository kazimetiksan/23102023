import Button from "./Button"

import { useParams } from "react-router-dom"

import axios from "axios"
import { useEffect } from "react"

const Verify = () => {

    const {token} = useParams()

    const checkVerification = () => {

        const url = '/api/checkVerification'
        axios.get(url, {
            headers: {
                xauth: token
            }
        })
        .then((response) => {

            console.log('response', response)
        })
        .catch((error) => {
            console.log('error', error)
        })
    }

    useEffect(() => {
        checkVerification()
    }, [])

    return (
        <div style={{
            margin: 50
        }}>
            <div>Start Verification</div>
            <div>
                <Button variant="success" title="Verify Me" onClick={() => {
                    console.log('token', token)
                }} />
            </div>
        </div>
    )
}

export default Verify