import { ASCENDING, DESCENDING, ALPHABETIC, POPULATION} from "../constantes/Order"
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { sort } from "../store/actions"


export default function Order() {
    const [order, setOrder] = useState('');
    const [type, setType] = useState('');
    const dispatch = useDispatch();

    const onSelectOrderChange = (e) => {
        setOrder(e.target.value);
    }

    const onSelectTypeChange = (e) => {
        setType(e.target.value);
    }


    const handleClick = (e) => {
        let orderAndType = {order,type};
        dispatch(sort(orderAndType));
    }

    return (
        <div>
        <select defaultValue="" name="select" onChange={onSelectOrderChange}>
            <option value="" disabled hidden>Choose Order</option>
            <option  value={ASCENDING}>Ascending</option>
            <option value={DESCENDING}>Descending</option>
        </select>

        <select defaultValue="" name="select" onChange={onSelectTypeChange}>
            <option value="" disabled hidden>Choose Type</option>
            <option  value={ALPHABETIC}>Alphabetic</option>
            <option value={POPULATION}>Population</option>
        </select>

        <button onClick={handleClick}>ORDER</button>
        </div>
    )
}