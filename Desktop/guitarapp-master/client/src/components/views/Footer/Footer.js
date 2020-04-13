import React from "react";

function Footer() {
  return (
    <div
      style={{
        height: "180px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
        background: "black",
      }}
    >
      <a href="https://www.deale-development.com/">
        {" "}
        <img
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: " 3px solid #ff3838",
            marginTop: "1rem",
          }}
          src="https://www.deale-development.com/img/DealeLogo.png"
          alt="ss"
        />
      </a>
      <p style={{ color: "white", padding: "1rem" }}> 2020 Deale Development</p>
    </div>
  );
}

export default Footer;
