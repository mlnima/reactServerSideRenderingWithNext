import React, {FC, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Style = styled.main`
  h1 {
    text-align: center;
  }

  .quick-access {
    width: 100%;

    .quick-access-items {
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .btn {
        padding: 15px 30px;
      }

    }

  }
`
interface PropTypes {

}

const Dashboard: FC<PropTypes> = (props) => {

    return (
        <Style>
            <h1>Dashboard</h1>
            <h2>Your IP is: {0}</h2>
            <h2>Environment : {process.env.NODE_ENV}</h2>
        </Style>
    )
};
export default Dashboard