import Button from "./Button"

import { useParams } from "react-router-dom"

import axios from "axios"
import { useEffect, useState } from "react"

const Verify = () => {

    const {token} = useParams()

    const [isVerified, setVerified] = useState(false)

    const checkVerification = () => {

        const url = '/api/checkVerification'
        axios.get(url, {
            headers: {
                xauth: token
            }
        })
        .then((response) => {

            console.log('response', response)

            setVerified(response.status === 200)
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
            <div>
            {
                isVerified ? (
                    <p>Already Verified</p>
                ) : (
                    <p>Start Verification</p>
                )
            }
            </div>
            <div>
                {
                    !isVerified && (
                        <Button variant="success" title="Verify Me" onClick={() => {
                            console.log('token', token)
        
                            const url = '/api/verify'
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
                        }} />
                    )
                }
            </div>
        </div>
    )
}

export default Verify