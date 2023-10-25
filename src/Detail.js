import {
    useParams
} from 'react-router-dom'

import { useRedux } from './redux/hooks'

const Detail = () => {

    const {_id} = useParams()

    const {getUserByID} = useRedux()

    // const selectedUser = useSelector((state) => {

    //     return state.user.find((item) => {

    //         return item._id === _id
    //     })
    // })

    // const selectedUser = useSelector(state => state.user.find(item => item._id === _id))

    const selectedUser = getUserByID(_id)

    return (
        <div style={{
            margin: 50
        }}>Merhaba {selectedUser.firstName}</div>
    )
}

export default Detail