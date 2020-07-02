import React from 'react';
import { Form, FormGroup, ControlLabel, HelpBlock, Toggle } from 'rsuite';

const SuspendForm = ({ formValue = {}, formError = null, onChange }) => {
  formValue = formValue || {};

  return (
    <Form
      formValue={formValue}
      formError={formError}
      onChange={onChange}
      fluid
      autoComplete="off"
    >
      <FormGroup>
        <ControlLabel>Authorized</ControlLabel>
        <Toggle
          onChange={checked => onChange({
            ...formValue,
            authorized: checked,
            suspended: checked ? false : formValue.suspended
          })}
          checked={formValue.authorized}
        />
        <HelpBlock>
          Only authorized users can access private chatbot
        </HelpBlock>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Suspend</ControlLabel>
        <Toggle
          onChange={checked => onChange({
            ...formValue,
            suspended: checked,
            authorized: checked ? false : formValue.authorized
          })}
          checked={formValue.suspended}
        />
        <HelpBlock>
          Suspended user cannot access a public chatbot
        </HelpBlock>
      </FormGroup>
    </Form>
  );
};

export default SuspendForm;