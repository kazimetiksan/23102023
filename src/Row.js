import Button from "./Button"

const Row = ({
    item,
    index,
    onUpdate
}) => {

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.age}</td>
            <td>
                <Button title="Güncelle" onClick={onUpdate} />
            </td>
        </tr>
    )
}

export default Row