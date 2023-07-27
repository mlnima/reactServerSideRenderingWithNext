'use client';
import styled from "styled-components";

const WidgetHeaderStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  max-height: 30px;
  margin: 8px 0;

  .widget-header-title {
    font-weight: initial;
    font-size: 20px;
  }

  .widget-header-redirect-link {
    font-weight: bold;
  }
`

export default WidgetHeaderStyles