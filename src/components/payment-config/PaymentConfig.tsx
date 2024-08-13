import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./paymentConfig.style.css";
import Button from "../button/Button";

type PaymentConfigProps = {
  toggleModal?: () => void;
};

export default function PaymentConfig({ toggleModal }: PaymentConfigProps) {
  return (
    <div className="payment-config__modal">
      <div className="payment-config__modal-header">
        <h4>Set Payment Rates</h4>
        <FontAwesomeIcon
          icon={faXmark}
          size="1x"
          className="close-btn"
          onClick={toggleModal}
        />
      </div>
      <div className="members-rate__container">
        <div className="form-control">
          <label>senior members</label>
          <input type="text" />
        </div>
        <div className="form-control">
          <label>non-senior members</label>
          <input type="text" />
        </div>
      </div>
      <div className="form-control">
        <label>snack rate per session</label>
        <input type="text" />
      </div>
      <div className="form-control">
        <label>tax</label>
        <input type="text" />
      </div>
      <div
        className="btn__row
      "
      >
        <Button btnTitle="save" backgroundColor="#2a9134" color="#fff" />
        <Button btnTitle="reset" backgroundColor="#c1121f" color="#fff" />
      </div>
    </div>
  );
}
