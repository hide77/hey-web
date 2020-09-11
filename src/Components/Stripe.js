import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { TouchableOpacity } from "hey-components";
import PropTypes from "prop-types";
import { STRIPE_PUBLIC_KEY } from "hey-mocks";
class StripeModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      label,
      onToken,
      description,
      panelLabel,
      amount,
      image,
      email,
      currency
    } = this.props;
    const publishableKey = STRIPE_PUBLIC_KEY;

    return (
      <StripeCheckout
        label={label} //Component button text
        name={name} //Modal Header
        email={email}
        description={description}
        panelLabel={panelLabel} //Submit button in modal
        amount={amount} //Amount in cents $9.99
        token={onToken}
        stripeKey={publishableKey}
        image={image}
        currency={currency}
        billingAddress={false}
      >
        <TouchableOpacity customStyle={"danger"}>{label}</TouchableOpacity>
      </StripeCheckout>
    );
  }
}

StripeModal.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onToken: PropTypes.func,
  description: PropTypes.string,
  panelLabel: PropTypes.string,
  amount: PropTypes.number,
  image: PropTypes.string,
  email: PropTypes.string,
  currency: PropTypes.string,
  authToken: PropTypes.string
};

export default StripeModal;
