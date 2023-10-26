import { useSelector } from "react-redux"

export const useRedux = () => {

    const users = useSelector(state => state.user.list)
    const profile = useSelector(state => state.user.profile)
    const xauth = useSelector(state => state.user.xauth)

    const getUserByID = (_id) => {
        return users.find(item => item._id === _id)
    }

    const isSignedIn = () => xauth !== undefined

    const isVerified = () => profile?.isVerified

    return {
        users,
        getUserByID,
        profile,
        xauth,
        isSignedIn,
        isVerified
    }
}