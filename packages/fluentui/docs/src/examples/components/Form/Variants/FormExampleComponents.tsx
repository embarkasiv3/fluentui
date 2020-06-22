import * as React from 'react';
import { Form } from '@fluentui/react-northstar';

const items = [
  {
    name: 'pizza',
    key: 'Capricciosa',
    label: 'Capricciosa',
    value: 'capricciosa',
  },
  {
    name: 'pizza',
    key: 'Prosciutto',
    label: 'Prosciutto',
    value: 'prosciutto',
    disabled: true,
  },
  {
    name: 'pizza',
    key: 'Pepperoni',
    label: 'Pepperoni',
    value: 'pepperoni',
  },
];

const FormExampleComponents = () => (
  <Form>
    <Form.Input label="First name" name="firstName" id="first-name-inline" required />
    <Form.Dropdown label="City" id="cities-id" items={['prague', 'new york']} />
    <Form.RadioGroup label="Pizza" vertical defaultCheckedValue="prosciutto" items={items} />
    <Form.Slider />
    <Form.Checkbox label="I agree to the Terms and Conditions" id="conditions-inline" />
    <Form.Button content="Submit" />
  </Form>
);

export default FormExampleComponents;
