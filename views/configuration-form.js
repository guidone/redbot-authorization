import React, { useState, useRef, Fragment } from 'react';
import { Button, Form, FormControl, ButtonToolbar, FormGroup, ControlLabel, HelpBlock, Nav, Toggle } from 'rsuite';

import { Dictionary } from '../../../src/components';

const dictionarySchema = [
  {
    name: 'authorization.notAuthorized',
    description: 'Shown when the user is not authorized in a private chatbot'
  },
  {
    name: 'authorization.suspended',
    description: 'Shown when the user is suspeded in a public chatbot'
  }
];

const withChecked = Component => {
  return ({ value, ...props }) => (
    <Component
      checked={value}
      {...props}
    />
  );
};

export default ({
  value,
  onSubmit = () => { },
  disabled = false
}) => {
  const [formValue, setFormValue] = useState(value);
  const [formError, setFormError] = useState(null);
  const [tab, setTab] = useState('access');
  const form = useRef(null);

  return (
    <div>
      <Nav appearance="tabs" activeKey={tab} onSelect={setTab} style={{ marginBottom: '25px' }}>
        <Nav.Item eventKey="access">Access</Nav.Item>
        <Nav.Item eventKey="translations">Translations</Nav.Item>
      </Nav>
      <Form
        disabled={true}
        formValue={formValue}
        formError={formError}
        ref={form}
        checkTrigger="none"
        layout="vertical"
        fluid
        onChange={formValue => {
          setFormValue(formValue);
          setFormError(null);
        }}
        onCheck={errors => {
          setFormError(errors);
        }}
      >
        {tab === 'translations' && (
          <Fragment>
            <FormGroup>
              <FormControl
                name="translations"
                accepter={Dictionary}
                schema={dictionarySchema}
                disabled={disabled}
              />
            </FormGroup>
          </Fragment>
        )}
        {tab === 'access' && (
          <Fragment>
            <FormGroup>
              <ControlLabel>Private</ControlLabel>
              <FormControl
                name="private"
                accepter={withChecked(Toggle)}
                disabled={disabled}
              />
              <HelpBlock>
                In a private chatbot, only authorized user can access
              </HelpBlock>
            </FormGroup>
          </Fragment>
        )}
        <FormGroup style={{ marginTop: '40px' }}>
          <ButtonToolbar>
            <Button
              disabled={disabled}
              appearance="primary"
              onClick={() => {
                if (!form.current.check()) {
                  return;
                }
                onSubmit(formValue);
              }}>
              Save configuration
              </Button>
            <Button
              disabled={disabled}
              appearance="default"
              onClick={() => {
                if (confirm('Reset configuration?')) {
                  setFormValue(value);
                }
              }}
            >
              Reset
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </div>
  );
};