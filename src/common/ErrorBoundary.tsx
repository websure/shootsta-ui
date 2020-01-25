/* 
  React error boundary
*/
import React, { Component } from "react";
import { Modal, Message } from "semantic-ui-react";
interface IProps {
  [key: string]: any;
}
interface IState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Modal
          open={true}
          centered
          data-testid="errorBoundaryModal"
          closeOnDimmerClick={false}
        >
          <Modal.Content style={{ textAlign: "center" }}>
            <Message compact error color="red">
              Error in loading application.
            </Message>
          </Modal.Content>
        </Modal>
      );
    }
    return this.props.children;
  }
}
