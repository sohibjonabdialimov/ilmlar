import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import { ToastContainer, toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const studentLoginSchema = z.object({
  username: z.string().trim().min(1, "Foydalanuvchi nomi kiritilishi kerak"),
  password: z
    .string()
    .trim()
    .min(4, "Parol 4-20 ta belgidan iborat bo'lishi kerak")
    .max(20, "Parol 4-20 ta belgidan iborat bo'lishi kerak"),
});

const StudentLogin = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(studentLoginSchema),
  });

  const onBack = () => {
    navigate(-1);
  };
  const handlechange = (e) => {
    e.target.value = e.target.value.toLowerCase().trim();
  };
  const onSubmit = (data) => {
    setButtonLoading(true);
    console.log(data);
    axios
      .post(`${import.meta.env.VITE_API_KEY}/users/login`, data)
      .then((res) => {
        console.log(res);
        console.log(import.meta.env.VITE_API_KEY);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/student/");
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Username yoki parol xato", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  function showFunc(e) {
    e.target.classList.toggle("bi-eye");
    setShowPassword((prev) => !prev);
  }
  return (
    <div className="app-content">
      <ToastContainer />
      <div className="sign_wrap">
        <button onClick={onBack} className="back">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <form className="sign_form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("username", {
              onChange: (e) => {
                handlechange(e);
              },
            })}
            placeholder="Foydalanuvchi nomini kiriting"
          />
          {errors.username ? (
            <span className="error_message">{`${errors.username.message}`}</span>
          ) : (
            <span className="error_message"></span>
          )}
          <div className="show_password">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Parolingizni kiriting"
            />
            <i
              onClick={(e) => showFunc(e)}
              className="bi bi-eye-slash closeIcon"
            ></i>
          </div>
          {errors.password ? (
            <span className="error_message">{`${errors.password.message}`}</span>
          ) : (
            <span className="error_message"></span>
          )}

          <button disabled={buttonLoading} type="submit">
            {buttonLoading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                    }}
                    spin
                  />
                }
              />
            ) : (
              "Kirish"
            )}
          </button>
        </form>
        <Link className="alright_note" to={"/registration"}>
          Akkauntingiz yo'qmi? Ro'yxatdan o'ting
        </Link>
      </div>
    </div>
  );
};

export default StudentLogin;
