import React, { Component } from 'react';
import { connect } from 'react-redux';
import operations from 'redux/phonebook-operations';
import phonebookSelectors from 'redux/phonebook-selectors';
import styles from './PhonebookForm.module.css';
import { ThreeDots } from 'react-loader-spinner';

class PhonebookForm extends Component {
  state = {
    name: '',
    number: '',
  };

  componentDidMount() {
    this.props.addfetchContacts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.state !== prevProps.state) {
      this.props.addfetchContacts();
    }
  }

  nameChange = event => {
    this.setState({ name: event.currentTarget.value });
  };

  numberChange = event => {
    this.setState({ number: event.currentTarget.value });
  };

  formSubmit = event => {
    event.preventDefault();
    if (
      this.props.contacts.find(
        contact =>
          contact.name.toLowerCase() === this.state.name.toLowerCase() ||
          contact.number === this.state.number
      )
    ) {
      return alert(
        'Error! A contact with the same name/number already exists!'
      );
    }
    this.props.addContact(this.state.name, this.state.number);
    this.formReset();
  };

  formReset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <>
        <div className={styles.loading}>
          {this.props.isLoadingContacts && (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="skyblue"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          )}
        </div>
        <p className={styles.title}>Add new contact</p>
        <form className={styles.phonebookForm} onSubmit={this.formSubmit}>
          <div className={styles.border}>
            <label className={styles.label}>
              <input
                type="text"
                className={styles.input}
                name="name"
                value={this.state.name}
                placeholder="Enter Name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={this.nameChange}
              />
            </label>
            <label className={styles.label}>
              <input
                type="tel"
                className={styles.input}
                name="number"
                value={this.state.number}
                placeholder="Enter Number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={this.numberChange}
              />
            </label>
            <button type="submit" className={styles.button}>
              Add contact
            </button>
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: phonebookSelectors.getAllContacts(state),
  isLoadingContacts: phonebookSelectors.getLoadingContacts(state),
});

const mapDispatchToProps = dispatch => ({
  addfetchContacts: () => dispatch(operations.fetchAllContacts()),
  addContact: (name, number) => dispatch(operations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonebookForm);
