import { useRedux } from "./redux/hooks"

import {
    useNavigate
} from 'react-router-dom'

const OnlyVerified = () => {

    const navigte = useNavigate()

    const {isVerified} = useRedux()

    if (!isVerified()) {
        navigte('/')
    }

    return (
        <></>
    )
}

export default OnlyVerified