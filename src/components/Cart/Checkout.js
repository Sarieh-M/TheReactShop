import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = props => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const isEmpty = value => {
        return (value + '').trim() !== '';
    }

    const isFive = value => {
        return (value + '').trim().length === 5;
    }

    const confirmHandler = event => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = isEmpty(enteredName);
        const enteredStreetIsValid = isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = isEmpty(enteredPostalCode);
        const enteredCityIsValid = isFive(enteredCity);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalCodeIsValid &&
            enteredCityIsValid;

        if (!formIsValid) {
            return;
        }
    }

    const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid
        }`;
    const streetControlClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid
        }`;
    const cityControlClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid
        }`;
    const postalCodeControlClasses = `${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid
        }`;

    return (
        <form className={classes.form2} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    ref={nameInputRef} />
                {!formInputValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input
                    type='text'
                    id='street'
                    ref={streetInputRef} />
                {!formInputValidity.street && <p>Please enter a valid street</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input
                    type='text'
                    id='postal'
                    ref={postalCodeInputRef} />
                {!formInputValidity.postalCode && <p>Please enter a valid postal code</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input
                    type='text'
                    id='city'
                    ref={cityInputRef} />
                {!formInputValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div>
                <button type='button' className={classes.submit} onClick={props.onCancel}>Cancel</button>
                <button >Confirm</button>
            </div>
        </form>
    );
};
export default Checkout;