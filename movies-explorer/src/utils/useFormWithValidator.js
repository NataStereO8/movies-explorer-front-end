import { useState } from 'react';

function useFormWithValidation() {
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest('form').checkValidity());

        target.setCustomValidity('');
    }

    return {
        errors, isValid, handleChange
    };
}
export default useFormWithValidation;