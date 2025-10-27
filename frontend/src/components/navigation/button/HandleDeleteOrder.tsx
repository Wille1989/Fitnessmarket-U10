import { useOrder } from "../../../hooks/useOrder"

type HandlDeleteOrderProps = {
    id: string
}

function HandleDeleteOrder({id}: HandlDeleteOrderProps ) {
    const { deleteOrder } = useOrder();

    const HandleDeleteOrder = async() => {

        await deleteOrder(id);

    }

    return (
        <button onClick={HandleDeleteOrder}>Radera bort</button>
    )
}

export default HandleDeleteOrder;