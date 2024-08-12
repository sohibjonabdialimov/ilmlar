import React, { useEffect, useRef, useState } from "react";
import prev from "../../imgs/prev.svg";
import sent from "../../imgs/sent.svg";
import "./style.css";
import axios from "axios";
import defaultimg from "../../imgs/user-1.png";

function deleteplatforma(url) {
  try {
    if (url?.includes("platforma")) {
      url = url.split("/");
      let res = "";
      for (let i = 2; i < url.length; i++) {
        res += "/" + url[i];
      }
      return res;
    } else {
      return url;
    }
  } catch (error) {
    console.log(error);
  }
}

function CommentsList({ modalDarslar, changeModalDars, commints }) {
  const izohref = useRef();
  const [Comments, setComments] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const [profile, setProfil] = useState({});
  const [cursId, setCursId] = useState(
    window.location.pathname.split("/").at(-1)
  );
  useEffect(() => {
    setComments(commints);
  }, [commints]);
  const handleClick = () => {
    changeModalDars(false);
  };
  function findCursById(cursList, cursId) {
    for (let i = 0; i < cursList?.length; i++) {
      if (cursList[i]?.cursId === cursId) {
        setIsInput(true);

        return 0;
      }
    }
    setIsInput(false);
    return 0;
  }
  function sendIzoh(e) {
    e.preventDefault();
    if (izohref.current.value.trim() !== "") {
      axios
        .post(
          `${import.meta.env.VITE_API_KEY}/courses/commint`,
          {
            cursId: cursId,
            text: izohref.current.value.trim(),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.Comments) {
            setComments(res.data.Comments);
          } else {
            alert("bu kursni sotib olmagansiz");
          }
        })
        .catch((error) => {
          console.log("Xatolik yuz berdi: ", error);
        })
        .finally(() => {
          izohref.current.value = "";
        });
    } else {
      izohref.current.value = "";
    }
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_KEY}/usersme`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        findCursById(res.data.mycurs, cursId);
        setProfil(res.data.mycurs);
      });
  }, []);
  useEffect(() => {
    setComments(commints);
    findCursById(profile, cursId);
    setCursId(window.location.pathname.split("/").at(-1));
  }, [window.location.pathname]);

  return (
    <div className="Nav commit">
      <div
        className={modalDarslar ? "mobile__header" : "d-none "}
        onClick={handleClick}
      >
        <div className="circle">
          <img src={prev} alt="prev" />
        </div>
        <h3>Darslar</h3>
      </div>
      <h2>Izohlar</h2>
      <div className="commints">
        {Comments?.map((commint) => {
          if (commint.username && commint.text && commint?.text != "")
            return (
              <div key={commint._id} className="d-block">
                <div className="comment_wrap">
                  {commint.userPath ? (
                    <img
                      width={"35px"}
                      src={
                        `${import.meta.env.VITE_API_KEY}` +
                        deleteplatforma(commint.userPath)
                      }
                      alt=""
                    />
                  ) : (
                    <img src={defaultimg} alt="" />
                  )}
                  <div className="comment_wrap_into">
                    <p>{commint.text}</p>
                    <p className="commint-username">{commint.username}</p>
                  </div>
                </div>
              </div>
            );
        })}
      </div>
      {isInput ? (
        <div className="writing_comment">
          <form
            action=""
            onSubmit={(e) => {
              sendIzoh(e);
            }}
          >
            <input ref={izohref} type="text" placeholder="Izoh yozing..." />
            <button type="submit">
              <img src={sent} alt="" />
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CommentsList;
