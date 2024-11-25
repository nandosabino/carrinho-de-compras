import "./styles.scss";

import PageHeader from "./components/PageHeader";
import PageTitle from "./components/PageTitle";
import Summary from "./components/Summary";
import TableRow from "./components/TableRow";
import { useEffect, useState } from "react";

import { api } from "./provider";

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const coupons = {
    DESCONTO10: 10,
    DESCONTO20: 20,
    DESCONTO30: 30,
    DESCONTO40: 40,
    DESCONTO50: 50,
  };

  const productObject = {
    name: "produto",
    category: "categoria",
    price: randomNumber(90, 1200),
    quantity: 1,
  };

  const fetchData = () => {
    api.get("/cart").then((response) => setCart(response.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = () => {
    api.post("/cart", productObject).then((response) => {
      setCart([...cart, response.data.produto]);
    });
  };

  const handleRemoveItem = (item) => {
    if (!item.id) {
      console.error("Item sem ID:", item);
      return;
    }

    api.delete(`/cart/${item.id}`).then(() => fetchData());
  };

  const handleUpdateItem = (item, action) => {
    if (!item.id) {
      console.error("Item sem ID", item);
      return;
    }
  
    let newQuantity = item.quantity;
    if (action === "decreased" && newQuantity > 1) {
      newQuantity -= 1;
    } else if (action === "increase") {
      newQuantity += 1;
    }
  
    const updatedItem = { ...item, quantity: newQuantity };
  
    api.put(`/cart/${item.id}`, updatedItem).then(() => fetchData());
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const applyCoupon = () => {
    if (coupons[coupon]) {
      const discountValue = (getTotal() * coupons[coupon]) / 100;
      setDiscount(discountValue);
    } else {
      setDiscount(0);
    }
  };

  const cartTotal = getTotal();

  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={"Seu carrinho"} />
        <div className="content">
          <section>
            <button
              onClick={handleAddItem}
              style={{ padding: "5px 18px", marginBottom: "15px" }}
            >
              add to cart
            </button>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <TableRow
                    key={item.id}
                    data={item}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItem={handleUpdateItem}
                  />
                ))}
                {cart.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      <b>Carrinho de compras vazio.</b>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
          <aside>
            <Summary
              total={cartTotal}
              coupon={coupon}
              setCoupon={setCoupon}
              discount={discount}
              applyCoupon={applyCoupon}
            />
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
