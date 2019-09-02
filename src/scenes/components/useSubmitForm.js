import { useState } from 'react';

export default function useSubmitForm() {
  const [inputs, setInputs] = useState({});

  const handleSubmit = (e, action) => {
    e.preventDefault();
    action(inputs);
  };

  const handleChange = (e) => {
    e.persist();
    setInputs((data) => ({ ...data, [e.target.id]: e.target.value }));
  };

  return {
    handleChange,
    handleSubmit
  };
}
