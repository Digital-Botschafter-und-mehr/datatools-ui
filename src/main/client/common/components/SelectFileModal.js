import React from 'react'
import { Modal, Button, FormControl, Glyphicon } from 'react-bootstrap'
import ReactDOM from 'react-dom'

export default class SelectFileModal extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  close () {
    this.setState({
      showModal: false
    })
  }

  open (props) {
    this.setState({
      showModal: true,
      title: props.title,
      body: props.body,
      onConfirm: props.onConfirm
    })
  }

  ok () {
    this.close()
    if(this.state.onConfirm) {
      this.state.onConfirm(ReactDOM.findDOMNode(this.refs.fileInput).files)
    }
  }

  render () {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{this.state.body}</p>
          <FormControl ref='fileInput' type='file' />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => this.ok()}>OK</Button>
          <Button onClick={() => this.close()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
