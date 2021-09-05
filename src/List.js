import React from "react";
import { FaEdit } from "react-icons/fa";
import "./index.css";

const List = ({ items, editItem }) => {
  return (
    <div className="product-list">
      {items.map((item) => {
        const { id, item1, item3, item4, item5, item6, item7, myDate } = item;

        return (
          <article className="product-item" key={id}>
            <div className="item">{item1}</div>
            <div className="item">{item3}</div>
            <div className="item">{item4}</div>
            <div className="item">{item5}</div>
            <div className="item">{item6}</div>
            <div className="item">{item7}</div>
            <div className="itemDate">{myDate}</div>

            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
