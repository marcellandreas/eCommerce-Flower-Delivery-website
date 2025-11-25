import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const usePopUp = () => {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleOpenPopUp = useCallback(() => {
    setShowPopUp(true);
  }, []);

  const handleClosePopUp = useCallback(() => {
    setShowPopUp(false);
  }, []);

  const handleTogglePopUp = useCallback(() => {
    setShowPopUp((prev) => !prev);
  }, []);

  return {
    showPopUp,
    handleOpenPopUp,
    handleClosePopUp,
    handleTogglePopUp,
  };
};

/**
 * Custom hook for back navigation
 * @returns {Function} - Function to navigate back
 */
export const useBackMenu = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return handleBack;
};

/**
 * Custom hook for form handling
 * @param {Object} initialValues - Initial form values
 * @returns {Object} - Form state and handlers
 */
export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }, [errors]);

  const handleReset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleReset,
    setFieldValue,
    setFieldError,
    setIsSubmitting,
  };
};

/**
 * Custom hook for local storage
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value
 * @returns {Array} - [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

export default usePopUp;