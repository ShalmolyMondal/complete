import React from "react";
import { BlueColor1 } from "../../styling/styled-components/color-themes_old";

export default function StyledModal(props) {
  const { id, body, footer } = props;

  return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div
          className="modal-content"
          align="center"
          style={{
            backgroundColor: "transparent",
            border: "0"
          }}
        >
          {/* body */}
          <div
            className="modal-body"
            style={{
              backgroundColor: `${BlueColor1}`,
              borderRadius: "20px 20px 0 0"
            }}
          >
            {body}
          </div>

          {/* footer */}
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "0 0 20px 20px",
              backgroundColor: "rgba(255,255,255,0.7)"
            }}
          >
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
