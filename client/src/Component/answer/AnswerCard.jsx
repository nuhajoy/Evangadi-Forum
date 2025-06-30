import React from "react";
import style from "./answer.module.css";
import { IoPersonCircleSharp } from "react-icons/io5";

function AnswerCard({ data }) {
  return (
    <div className={style.main_card_container}>
      <div className={style.card_container}>
        <div className={style.title_info}>
          <div className={style.personal_info}>
            <div>
              <IoPersonCircleSharp size={100} />
            </div>
            <div>{data.user_name}</div>
          </div>
          <div>
            <p>{data.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerCard;
