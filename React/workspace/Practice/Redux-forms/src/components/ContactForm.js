import React from 'react';
import { Field, reduxForm } from 'redux-form';

class ContactForm extends React.Component {

  submit(values) {
    console.log(`form submitted with following value --> ${JSON.stringify(values)}`);
  }

  renderInputField(field) {
    console.log(`fields ----> ${JSON.stringify(field)}`);
    const { meta: { touched, error } } = field;

    return (
      <div>
      <label>{field.label}</label>
      <input
      {...field.input}
      placeholder="First Name"
      type="text"
      />

      <div className="text-help">
      {touched ? error : ''}
      </div>
      </div>
    );
  }
  render() {
   console.log('reduxForm helper passes following props to our component');
   console.log(this.props);
   const { handleSubmit, pristine, reset, submitting, dirty } = this.props;
    //because we used reduxForm helper

    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
            <Field
              name="firstName"
              component={this.renderInputField}
              label="First Name"
              randomField="Something sent radomly"
            />

            <Field
              name="lastName"
              component={this.renderInputField}
              label="Last Name"
            />

        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }

}

const validate = (values) => {
console.log(`validating - ${values.firstName}`);
const errors = {};
if (!values.firstName) {
  errors.firstName = 'Please enter first Name';
}

 if (!values.lastName) {
   errors.lastName = 'Please enter last Name';
 }

 return errors;
};

export default reduxForm({
  validate,
  form: 'simple' // a unique identifier for this form
})(ContactForm);
