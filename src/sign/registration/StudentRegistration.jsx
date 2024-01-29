import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const studentRegistrSchema = z
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
const StudentRegistration = () => {
  const [verifycode, setverifycode] = useState(false);
  const [email, setemail] = useState("");
  const formRef = useRef();
  const emailcodeRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(studentRegistrSchema),
  });

  const onBack = () => {
    navigate(-1);
  };
  const handlechange = (e) => {
    e.target.value = e.target.value.toLowerCase().trim();
  };
  const onSubmit = (data) => {
    data.fullname = `${data.name} ${data.surname}`;
    setemail(data.email);
    delete data.resetPassword;
    delete data.name;
    delete data.surname;
    console.log(data);
    axios
      .post("https://api.ilmlar.com/users/register/", data)
      .then((response) => {
        console.log(response);
        setverifycode(true);
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
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // const onHandler = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("username", usernameRef.current.value);
  //   formData.append("password", passwordRef.current.value);
  //   formData.append("email", emailRef.current.value);
  //   formData.append(
  //     "fullname",
  //     `${nameRef.current.value} ${surnameRef.current.value}`
  //   );
  //   setemail(emailRef.current.value);
  //   console.log(formData);
  //   axios
  //     .post("https://api.ilmlar.com/users/register/", formData)
  //     .then((response) => {
  //       toast.info(
  //         `${emailRef.current.value} ga kod yuborildi. Tasdiqlash kodni kiriting`,
  //         {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         }
  //       );
  //       setverifycode(true);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  const onverify = (e) => {
    e.preventDefault();
    ({
      email: email,
      code: emailcodeRef.current.value,
    });
    axios
      .post("https://api.ilmlar.com/users/register/verify", {
        email: email,
        code: emailcodeRef.current.value,
      })
      .then((res) => {
        if (res.data._id) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.info("Kod xato kiritildi.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
          <form
            ref={formRef}
            className="registr_form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="registr_title">
              O'quvchi sifatida ro'yxatdan o'tish
            </h3>
            <input type="text" placeholder="Ism" {...register("name")} />
            {errors.name ? (
              <span className="error_message_2">{`${errors.name.message}`}</span>
            ) : (
              <span className="error_message_2"></span>
            )}
            <input
              {...register("surname")}
              type="text"
              placeholder="Familiya"
            />
            {errors.surname ? (
              <span className="error_message_2">{`${errors.surname.message}`}</span>
            ) : (
              <span className="error_message_2"></span>
            )}
            <input
              onChange={handlechange}
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
            <input
              ref={emailRef}
              type="email"
              {...register("email")}
              placeholder="Email"
            />
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
                {...register("resetPassword")}
                type={showPasswordRepeat ? "text" : "password"}
                placeholder="Parolingizni yana kiriting"
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
              className={`${verifycode ? "d-none" : ""} verify_form`}
              type="submit"
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
        <Link className="alright_note" to={"/login"}>
          Akkauntingiz bormi?
        </Link>
      </div>
    </div>
  );
};

export default StudentRegistration;
