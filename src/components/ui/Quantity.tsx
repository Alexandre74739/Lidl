import { useState } from "react";

function Quantity() {
    const [quantity, setQuantity] = useState(0);

    const addProduct = () => {
        setQuantity(quantity + 1);
    };

    const lessProduct = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }
    
    return (
        <div className="quantity">
            <button className="quantity--btn" onClick={lessProduct}>-</button>
            <span className="quantity--value">{quantity}</span>
            <button className="quantity--btn" onClick={addProduct}>+</button>
        </div>
    );
}

export default Quantity;