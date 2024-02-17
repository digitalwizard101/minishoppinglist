import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheckCircle,
  faCircle,
  faMinus,
  faPlus,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [itemList, setItemList] = useState([
    { name: "Tomato", quantity: 10, unit: "kgs", isSelected: false },
    { name: "Potato", quantity: 6, unit: "kgs", isSelected: false },
    { name: "Cheese", quantity: 2, unit: "lbs", isSelected: false },
    { name: "Milk", quantity: 3, unit: "ltr", isSelected: false },
    { name: "Eggs", quantity: 12, unit: "N", isSelected: false },
  ]);

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [alert, setAlert] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handledNewItem = () => {
    let newItem = {
      name: input1,
      quantity: 1,
      unit: input2,
      isSelected: false,
    };

    if (input1 !== "" && input2 !== "") {
      let newItemList = [...itemList, newItem];
      setItemList(newItemList);
      setInput1("");
      setInput2("");
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };

  const itemIncrease = (index) => {
    if (itemList[index].isSelected === false) {
      itemList[index].quantity++;

      let newList = [...itemList];
      setItemList(newList);
    }
  };
  const itemDecrease = (index) => {
    if (itemList[index].isSelected === false && itemList[index].quantity > 0) {
      itemList[index].quantity--;

      let newList = [...itemList];
      setItemList(newList);
    }
  };

  const handleCompleted = (index) => {
    let newList = [...itemList];
    newList[index].isSelected = !newList[index].isSelected;
    setItemList(newList);
  };

  return (
    <div className="main-div">
      <div className="container App">
        <div className="row">
          <div className="col-12">

            <h1 style={{ fontFamily: "cursive", textAlign: "center" }}>
              My Shopping List
            </h1>
            {alert ? (
              <span class="alert alert-danger" role="alert">
                Item or Unit cannot be empty
              </span>
            ) : null}

            <div class="input-group input-group-lg mb-3">
              <input
                required
                type="text"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                class="form-control"
                placeholder="Enter Item"
              />

              <input
                required
                type="text"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                className="form-control  "
                placeholder="units"
                style={{ marginLeft: 10, width: 80, maxWidth: 80 }}
                maxLength={10}
              />
              <button
                onClick={() => handledNewItem()}
                className=" add-button btn btn-primary"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div>
              <div className="table">
                <ol>
                  {itemList.map((item, index) => {
                    return (
                      <tr>
                        <li key={index} className="mapped-list">
                          <div
                            onClick={() => {
                              handleCompleted(index);
                            }}
                          >
                            {item.isSelected ? (
                              <td>
                                <span className="selected-item">
                                  {item.name}
                                </span>
                              </td>
                            ) : (
                              <td>
                                <span>{item.name}</span>
                              </td>
                            )}
                          </div>

                          <td>

                            <>

                              <button
                                className="btn btn-primary"
                                onClick={() => itemIncrease(index)}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </>
                            <span>
                              {item.quantity} <sub>{item.unit} </sub>
                            </span>
                            <button
                              onClick={() => itemDecrease(index)}
                              className="btn btn-danger"
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                          </td>
                        </li>
                      </tr>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
