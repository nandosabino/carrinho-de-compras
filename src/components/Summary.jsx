import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const Summary = ({ total, coupon, setCoupon, discount, applyCoupon }) => {
  const [showCouponInput, setShowCouponInput] = useState(false);

  const finalTotal = total - discount;

  return (
    <>
      <div className="box">
        <header>Resumo da Compra</header>
        <div className="info">
          <div>
            <span>Sub-total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div>
            <span>Frete</span>
            <span>Gratuito</span>
          </div>
          <div>
            {!showCouponInput ? (
              <button onClick={() => setShowCouponInput(true)}>
                Adicionar cupom de desconto
                <FaArrowRight />
              </button>
            ) : (
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Digite o cupom"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  style={{
                    flex: 1,
                    padding: "5px",
                    border: discount > 0 ? "1px solid green" : "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <button
                  onClick={applyCoupon}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: discount > 0 ? "green" : "initial",
                    color: discount > 0 ? "white" : "initial",
                  }}
                >
                  Aplicar
                </button>
              </div>
            )}
          </div>
        </div>
        <footer>
          <span>Total</span>
          <span>R$ {finalTotal.toFixed(2)}</span>
        </footer>
      </div>
      <button
        onClick={() => alert("Compra finalizada!")}
        disabled={total === 0}
        style={{
          backgroundColor: total === 0 ? "#ccc" : "initial",
          cursor: total === 0 ? "not-allowed" : "pointer",
        }}
      >
        Finalizar Compra
      </button>
    </>
  );
};

export default Summary;
