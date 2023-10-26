import { useEffect } from "react"
import { useRedux } from "./redux/hooks"

import {
    useNavigate
} from 'react-router-dom'

const OnlyVerified = () => {

    const navigate = useNavigate()

    const {isVerified} = useRedux()

    useEffect(() => {
        if (!isVerified()) {
            navigate('/')
        }
    }, [])

    return (
        <div style={{
            margin: 50
        }}>
            Only Verified
        </div>
    )
}

export default OnlyVerified