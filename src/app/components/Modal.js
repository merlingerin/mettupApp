import React, { Component } from 'react';
import { Modal, Button, Glyphicon } from 'react-bootstrap';

export default class MyModal extends Component {
    constructor(props) {
		super(props);
		this.state = {
			showModal: this.props.showModal,
        }
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal
        })
    }

    closeModal = () => {
		this.props.closeModal(false);
    }

    openModal = () => {
		this.props.openModal(true);        
    };
    
    handleConfirm() {
        this.props.confirmDelete();
		this.props.closeModal(false);        
    }
    
    render() {

        const confirmFooter = () => (
            <Modal.Footer>
                <Button onClick={this.handleConfirm}>Да</Button>            
                <Button onClick={this.closeModal}>Нет</Button>
            </Modal.Footer>
        );
        
        const alertFooter = () => (
            <Modal.Footer>
                <Button onClick={this.closeModal}>Закрыть</Button>
            </Modal.Footer>
        )

        return (
            <div>
            <Modal show={this.state.showModal}>
                <Modal.Header>
                <Modal.Title>{this.props.options.type === 'alert' ? 'Еще не определились?' : 'Удалить ответ?'}</Modal.Title>
                <Glyphicon onClick={this.closeModal} className="btn-modalClose" glyph="remove" />
                </Modal.Header>
                <Modal.Body>
                <p>
                    {this.props.options.type === 'alert' ? 'Пожалуйста, заоплните форму когда всё будет известно!' : `«Я, ${this.props.options.name} хочу отказаться от своего решения и удалить свой ответ»`}
                </p>
                </Modal.Body>
                { this.props.options.type === 'alert' ? alertFooter() : confirmFooter() }
            </Modal>
            </div>
        );
    };
  };
  