import React, { useState, useEffect } from "react";

function Home() {
  return (
    <div className="container">
      <h1>Welcome to Stock Dashboard App!</h1>
      <p className="text-center">
        Click on Login or Register to get started. If you don't have an account,
        please register or use our demo account with login:{" "}
        <b>demo@demo.com </b>
        and password: <b>demo</b>.
      </p>
    </div>
  );
}

export default Home;
