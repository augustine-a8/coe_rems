import { useState } from "react";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

import IconButton from "../icon-button/IconButton";
import "./header.style.css";
import PaymentConfig from "../payment-config/PaymentConfig";
import Avatar from "../avatar/Avatar";

export default function Header() {
  const [showPaymentConfigModal, setShowPaymentConfigModal] =
    useState<boolean>(false);

  const togglePaymentConfigModal = () => {
    setShowPaymentConfigModal((prev) => !prev);
  };
  return (
    <div className="header__container">
      <div>
        <h3>Remunerations</h3>
      </div>
      <div>
        {/* <IconButton btnTitle="filter exams" icon={faFilter} iconSize="xs" /> */}
        {/* <IconButton
          btnTitle="payment config"
          icon={faWallet}
          iconSize="xs"
          onClick={togglePaymentConfigModal}
        /> */}
        <div className="header__avatar-section">
          <div className="header__avatar-info">
            <h4>Exams Officer</h4>
            <p>Admin</p>
          </div>
          <div className="header__avatar">
            <Avatar name="exams officer" />
          </div>
        </div>
      </div>
      {showPaymentConfigModal ? (
        <PaymentConfig toggleModal={togglePaymentConfigModal} />
      ) : undefined}
    </div>
  );
}
