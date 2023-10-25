import { useSelector } from "react-redux"

export const useRedux = () => {

    const users = useSelector(state => state.user)

    const getUserByID = (_id) => {
        return users.find(item => item._id === _id)
    }

    return {
        users,
        getUserByID
    }
}