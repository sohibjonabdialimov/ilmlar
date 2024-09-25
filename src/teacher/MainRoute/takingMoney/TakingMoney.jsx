import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import CurrencyFormat from "react-currency-format";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

function TakingMoney() {
  const navigate = useNavigate();
  const inputCardRef = useRef();
  const pniflref = useRef();
  const [card, setCard] = useState();

  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .transform((value) => value.replace(/\s+/g, "")) // Probellarni olib tashlaymiz
      .min(16, "Karta raqami kamida 16 ta raqamdan iborat bo'lishi kerak")
      .max(16, "Karta raqami 16 ta raqamdan oshmasligi kerak")
      .required("Field is required"),
      pinfl: Yup.string()
      .min(14, "pinfl kamida 14 ta raqamdan iborat bo'lishi kerak")
      .max(14, "pinfl 14 ta raqamdan oshmasligi kerak")
      .required("Field is required"),
    amount: Yup.number()
      .min(1000, "Minimal miqdor 1000 UZS bo'lishi kerak")
      .required("Field is required"),
  });

  const initialValues = {
    cardNumber: "",
    pinfl: "",
    amount: 0,
  };

  const onBack = () => {
    navigate(-1);
  };

  const handleCardNumberChange = (e, setFieldValue) => {
    const cardValue = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);

    const formattedCardNumber = !cardValue[2]
      ? cardValue[1]
      : `${cardValue[1]} ${cardValue[2]}${`${cardValue[3] ? ` ${cardValue[3]}` : ""}`}${`${cardValue[4] ? ` ${cardValue[4]}` : ""}`}`;

    setFieldValue("cardNumber", formattedCardNumber);
    setCard(formattedCardNumber);
  };

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      cardNumber: values.cardNumber.replace(/\s+/g, ""), // bo'shliqlarni olib tashlaymiz
    };
  
    console.log(formattedValues);
  
    await axios
      .post(
        `${import.meta.env.VITE_API_KEY}/cridettotecher/`,
        formattedValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("payment is success");
          navigate("/hisoblar/pulyichish/ok");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="app-content">
      <div className="global_wrap">
        <div className={styles.hisob_wrap}>
          <button onClick={onBack} className={styles.back}>
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue }) => (
              <Form className={styles.hisob_form}>
                <div className={styles.input_wrap}>
                  <label htmlFor="amount">Pul miqdori</label>
                  <div className={styles.input_div}>
                    <CurrencyFormat
                      thousandSeparator={true}
                      placeholder="Summa, UZS"
                      suffix=" UZS"
                      value={values.amount}
                      onValueChange={(val) => {
                        setFieldValue("amount", val.floatValue || 0); // Convert to number
                      }}
                    />
                    <ErrorMessage
                      name="amount"
                      component="div"
                      className={styles.error}
                    />
                  </div>
                </div>

                <div className={styles.input_wrap}>
                  <div className={styles.label_wrap}>
                    <label>Karta raqami</label>
                    <label>Humo / UzCard</label>
                  </div>

                  <div className={styles.input_div}>
                    <input
                      name="cardNumber"
                      type="text"
                      placeholder="xxxx   xxxx   xxxx   xxxx"

                      value={values.cardNumber}
                      onChange={(e) => handleCardNumberChange(e, setFieldValue)}
                      ref={inputCardRef}
                    />
                    <ErrorMessage
                      name="cardNumber"
                      component="div"
                      className={styles.error}
                    />
                  </div>
                </div>

                <div className={styles.input_wrap}>
                  <div className={styles.label_wrap}>
                    <label>PNIFL</label>
                  </div>

                  <div className={styles.input_div}>
                    <Field
                      name="pinfl"
                      placeholder="xxxxxxxxxxxxxx"
                      type="text"
                      ref={pniflref}
                    />
                    <ErrorMessage
                      name="pinfl"
                      component="div"
                      className={styles.error}
                    />
                  </div>
                </div>

                <button type="submit">Pulni yechib olish</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default TakingMoney;
