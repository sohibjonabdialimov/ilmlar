import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const teacherRegistrSchema = z
  .object({
    name: z.string().trim().min(1, "Ism kiritilishi kerak"),
    surname: z.string().trim().min(1, "Familiya kiritilishi kerak"),
    username: z.string().trim().min(1, "Foydalanuvchi nomi kiritilishi kerak"),
    email: z.string().email("Emailni to'g'ri kiriting"),
    password: z
      .string()
      .trim()
      .min(4, "Parol 4-20 ta belgidan iborat bo'lishi kerak")
      .max(20, "Parol 4-20 ta belgidan iborat bo'lishi kerak"),
    resetPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.resetPassword, {
    message: "Parollar bir xil bo'lishi kerak",
    path: ["resetPassword"],
  });
const TeacherRegistration = () => {
  const [verifycode, setverifycode] = useState(false);
  const [email, setemail] = useState("");
  const emailcodeRef = useRef();
  const emailRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(teacherRegistrSchema),
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const handlechange = (e) => {
    e.target.value = e.target.value.toLowerCase().trim();
  };
  const onBack = () => {
    navigate(-1);
  };

  const onSubmit = (data) => {
    data.fullname = `${data.name} ${data.surname}`;
    setemail(data.email);
    delete data.resetPassword;
    delete data.name;
    delete data.surname;

    axios
      .post("https://api.ilmlar.com/teacher/register/", data)
      .then((response) => {
        toast.info(
          `${data.email} ga kod yuborildi. Tasdiqlash kodini kiriting`,
          {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setverifycode(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onverify = (e) => {
    e.preventDefault();
    axios
      .post("https://api.ilmlar.com/teacher/register/verify", {
        email: email,
        code: emailcodeRef.current.value,
      })
      .then((res) => {
        if (res.data._id) {
          navigate("/teacherlogin");
        }else{
          toast.error(
            "Kod xato kiritildi",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      }).catch((error) => {
        console.log(error);
      });
  };
  function showFunc(e) {
    e.target.classList.toggle("bi-eye");
    setShowPassword((prev) => !prev);
  }
  function showFuncRepeat(e) {
    e.target.classList.toggle("bi-eye");
    setShowPasswordRepeat((prev) => !prev);
  }
  return (
    <div className="app-content">
      <div className="sign_wrap">
        <ToastContainer />

        <button onClick={onBack} className="back">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <div className="registration_wrapper">
          <form className="registr_form" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="registr_title">
              O'qituvchi sifatida ro'yxatdan o'tish
            </h3>
            <input {...register("name")} type="text" placeholder="Ism" />
            {errors.name ? (
              <span className="error_message_2">{`${errors.name.message}`}</span>
            ) : (
              <span className="error_message_2"></span>
            )}
            <input type="text" placeholder="Familiya" {...register("surname")} />
            {errors.surname ? (
              <span className="error_message_2">{`${errors.surname.message}`}</span>
            ) : (
              <span className="error_message_2"></span>
            )}
            <input
              type="text"
              placeholder="Foydalanuvchi nomi"
              {...register("username", {
                onChange: (e) => {handlechange(e)},
              })}
            />
             {errors.username ? (
              <span className="error_message_2">{`${errors.username.message}`}</span>
            ) : (
              <span className="error_message_2"></span>
            )}
            <input ref={emailRef} type="email" placeholder="Email" {...register("email")} />
            {errors.email ? (
              <span className="error_message_2">{`${errors.email.message}`}</span>
            ) : (
              <span className="error_message_2"></span>
            )}
            <div className="show_password_registr">
              <input
              {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Parol"
              />
              <i
                onClick={(e) => showFunc(e)}
                className="bi bi-eye-slash closeIcon"
              ></i>
            </div>
            {errors.password ? (
              <span className="error_message_2">{`${errors.password.message}`}</span>
            ) : (
              <span className="error_message_2"></span>
            )}
            <div className="show_password_registr">
              <input
                type={showPasswordRepeat ? "text" : "password"}
                placeholder="Parolingizni yana kiriting"
                {...register("resetPassword")}
              />
              <i
                onClick={(e) => showFuncRepeat(e)}
                className="bi bi-eye-slash closeIcon"
              ></i>
            </div>
            {errors.resetPassword ? (
              <span className="error_message_2">{`${errors.resetPassword.message}`}</span>
            ) : (
              <span className="error_message_2"></span>
            )}
            <button
              type="submit"
              className={`${verifycode ? "d-none" : ""} verify_form`}
            >
              Davom etish
            </button>
          </form>
          <form
            action=""
            className={`${
              verifycode ? "activecode" : "noactivecode"
            } verify_form`}
            onSubmit={(e) => onverify(e)}
          >
            <input
              ref={emailcodeRef}
              type="number"
              placeholder="Emailga yuborilgan kodni kiriting"
              required
            />
            <button type="submit">Ro'yxatdan o'tish</button>
          </form>
        </div>
        <Link className="alright_note" to={"/teacherlogin"}>
          Akkauntingiz bormi?
        </Link>
      </div>
    </div>
  );
};

export default TeacherRegistration;
