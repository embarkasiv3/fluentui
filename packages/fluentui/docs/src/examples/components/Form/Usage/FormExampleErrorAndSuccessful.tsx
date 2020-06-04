import * as React from 'react';
import { Form, Button, Input } from '@fluentui/react-northstar';
import { PresenceAvailableIcon } from '@fluentui/react-icons-northstar';

const FormExampleErrorAndSatisfactory = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <Form.Field>
      <Form.Label htmlFor="firstname" id="first-name-label">
        First Name*
      </Form.Label>
      <Input error name="first-name" aria-labelledby="first-name-label message-id" id="firstname-with-error" />
      <Form.Message id="message-id" error>
        Error Message
      </Form.Message>
    </Form.Field>
    <Form.Field
      label="Last name"
      name="LastName"
      id="last-name-shorthand-with-error"
      errorMessage={'ERROR'}
      required={true}
    />
    <Form.Field>
      <Form.Label htmlFor="email">E-mail*</Form.Label>
      <Input successIndicator={<PresenceAvailableIcon />} required name="email-field" id="email-field" />
    </Form.Field>
    <Form.Field control={{ as: Button, content: 'Submit' }} />
  </Form>
);

export default FormExampleErrorAndSatisfactory;
