import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import CSSTransition from "react-transition-group/CSSTransition";

import "./Modal.css";
import Button from "../Button/Button";

const animationTiming = {
  enter: 400,
  exit: 1000,
};

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={animationTiming}
        // classNames="fade-slide"
        classNames={{
          enter: "",
          enterActive: "ModalOpen",
          exit: "",
          exitActive: "ModalClosed",
          apear: "",
          apearActive: "",
        }}
      >
        <div className="Modal">
          {props.children}
          <Button clicked={props.modalClosed}>CLOSE</Button>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default React.memo(Modal);
