import React from 'react';

function ValidationErrors({ error }) {
  // create an array of lis from validation errors
  const errors = error.errors.map((err, i) => <li key={i}>{err}</li>);

  return (
    <div className="validation--errors">
      <h3>{error.message}</h3>
      <ul>{errors}</ul>
    </div>
  );
}

export default ValidationErrors;
