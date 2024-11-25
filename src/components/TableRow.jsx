import { FaMinus, FaPlus } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

const TableRow = ({ data, handleRemoveItem, handleUpdateItem }) => {
  return (
    <tr>
      <td>
        <div className="product">
          <img src="https://picsum.photos/100/120" alt="" />
          <div className="info">
            <div className="name">{data.name}</div>
            <div className="category">{data.category}</div>
          </div>
        </div>
      </td>
      <td>R$ {data.price}</td>
      <td>
        <div className="qty">
          <button
            onClick={() => {
              handleUpdateItem(data, "decreased");
            }}
          >
            <FaMinus />
          </button>
          <span>{data.quantity}</span>
          <button
            onClick={() => {
              handleUpdateItem(data, "increase");
            }}
          >
            <FaPlus />
          </button>
        </div>
      </td>
      <td>R$ {data.price * data.quantity}</td>
      <td>
        <button
          className="remove"
          onClick={() => {
            handleRemoveItem(data);
          }}
        >
          <AiOutlineClose />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
