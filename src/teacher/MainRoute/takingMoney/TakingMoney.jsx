import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import CurrencyFormat from "react-currency-format";
function TakingMoney() {
  const navigate = useNavigate();
  const inputCardRef = useRef();
  const [card, setCard] = useState();
  const onBack = () => {
    navigate(-1);
  };

  const onHandleClick = (e) => {
    e.preventDefault();
    navigate("/hisoblar/pulyichish/ok");
  };
  const handleCardNumberChange = () => {
    const cardValue = inputCardRef.current.value
      .replace(/\D/g, "")
      .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
      console.log(cardValue);
      
    inputCardRef.current.value = !cardValue[2]
      ? cardValue[1]
      : `${cardValue[1]} ${cardValue[2]}${`${
          cardValue[3] ? ` ${cardValue[3]}` : ""
        }`}${`${cardValue[4] ? ` ${cardValue[4]}` : ""}`}`;
    const numbers = inputCardRef.current.value.replace(/(\D)/g, "");
    setCard(numbers);
  };

  useEffect(() => {
    handleCardNumberChange();
  }, [card]);

 
  return (
    <div className="app-content">
      <div className="global_wrap">
        <div className={styles.hisob_wrap}>
          <button onClick={onBack} className={styles.back}>
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <form
            onSubmit={(e) => onHandleClick(e)}
            className={styles.hisob_form}
          >
            <div className={styles.input_wrap}>
              <label htmlFor="amount">Pul miqdori</label>
              <div className={styles.input_div}>
              <CurrencyFormat thousandSeparator={true} placeholder={"Summa, UZS"} suffix={' UZS'} />
              </div>
            </div>
            <div className={styles.input_wrap}>
              <div className={styles.label_wrap}>
                <label>Karta raqami</label>
                <label>Humo / UzCard </label>
              </div>

              <div className={styles.input_div}>
                <input
                  type="text"
                  placeholder="xxxx   xxxx   xxxx   xxxx"
                  ref={inputCardRef}
                  onChange={handleCardNumberChange}
                />
              </div>
            </div>
            <div className={styles.input_wrap}>
              <label htmlFor="amount">
                Parol ( sahifangizga kirish paroli )
              </label>
              <div className={styles.input_div}>
                <input type="text" />
              </div>
            </div>
            <button type="submit">Pulni yechib olish</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TakingMoney;
