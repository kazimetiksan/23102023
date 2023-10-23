const Row = ({
    item,
    index
}) => {

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.age}</td>
        </tr>
    )
}

export default Row