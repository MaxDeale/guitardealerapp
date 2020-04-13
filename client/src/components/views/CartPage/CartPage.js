import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import { Result, Empty } from "antd";
import Axios from "axios";
import Paypal from "../../utils/Paypal";
function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);
  //useffect hook sets initial cart items, if the user has items in the cart, the items are added to the cartitems array
  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart));
      }
    }
  }, [props.user.userData]);
  //useffect hook to calculate the total amount using the users cart info
  useEffect(() => {
    if (props.user.cartDetail && props.user.cartDetail.length > 0) {
      calculateTotal(props.user.cartDetail);
    }
  }, [props.user.cartDetail]);

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };

  //function to remove from cart, takes in product id , uses redux to send axios request , and calls setting functions from state
  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then(() => {
      Axios.get("/api/users/userCartInfo").then((response) => {
        if (response.data.success) {
          if (response.data.cartDetail.length <= 0) {
            setShowTotal(false);
          } else {
            calculateTotal(response.data.cartDetail);
          }
        } else {
          alert("Failed to get cart info");
        }
      });
    });
  };
  //function for a successful transaction, takes in necessary data and sends post request to succuessful purchase route
  const transactionSuccess = (data) => {
    let variables = {
      cartDetail: props.user.cartDetail,
      paymentData: data,
    };

    Axios.post("/api/users/successBuy", variables).then((response) => {
      if (response.data.success) {
        setShowSuccess(true);
        setShowTotal(false);

        dispatch(
          onSuccessBuy({
            cart: response.data.cart,
            cartDetail: response.data.cartDetail,
          })
        );
      } else {
        alert("There was an error making the purchase");
      }
    });
  };

  const transactionError = () => {
    console.log(
      "There was an error with paypal, your transaction could not be completed"
    );
  };

  const transactionCanceled = () => {
    console.log("Transaction Canceled");
  };
  //using components to show the specific items in the cart using props
  return (
    <div style={{ width: "85%", margin: "8rem auto" }}>
      <h1 style={{ fontFamily: "pacifico", fontSize: "3rem" }}>Cart:</h1>
      <div>
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />

        {ShowTotal ? (
          <div style={{ marginTop: "3rem" }}>
            <h2>Total amount: ${Total} </h2>
          </div>
        ) : ShowSuccess ? (
          <Result status="success" title="Successfully Purchased Items" />
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <br />
            <Empty description={false} />
            <p>No Items In the Cart</p>
          </div>
        )}
      </div>

      {/* Paypal Button */}

      {ShowTotal && (
        <Paypal
          toPay={Total}
          onSuccess={transactionSuccess}
          transactionError={transactionError}
          transactionCanceled={transactionCanceled}
        />
      )}
    </div>
  );
}

export default CartPage;
