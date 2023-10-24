import Button from "./Button"

const Row = ({
    item,
    index,
    onUpdate,
    onRemove,
    onView
}) => {

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.age}</td>
            <td>
                <Button variant="warning" title="Detaya Git" onClick={onView} />
            </td>
            <td>
                <Button title="Güncelle" onClick={onUpdate} />
            </td>
            <td>
                <Button variant="danger" title="Sil" onClick={onRemove} />
            </td>
        </tr>
    )
}

export default Row