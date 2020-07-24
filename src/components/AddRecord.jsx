import React from "react";
import { Form, Input, Button } from "semantic-ui-react";

export default function AddRecord({ onAddRecord }) {
  const [isAddRecord, setIsAddRecord] = React.useState(true);
  const [condidate, setCondidate] = React.useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  function checkCondidate() {
    let count = 0;
    for (let key in condidate) {
      if (condidate[key]) {
        count++;
      }
    }
    count === 5 ? setIsAddRecord(false) : setIsAddRecord(true);
  }

  function handleChange(e) {
    if (e.target.value) {
      checkCondidate();
      setCondidate({
        ...condidate,
        [e.target.name]: e.target.value,
      });
    }
  }

  function handleSubmit(e) {
    onAddRecord(condidate);
    e.preventDefault();
  }
  const { id, firstName, lastName, email, phone } = condidate;
  return (
    <div className="wrap">
      <Form inverted>
        <Form.Field required widths="equal">
          <label>id</label>
          <Input
            placeholder="id"
            name="id"
            value={id}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field required widths="equal">
          <label>firstName</label>
          <Input
            placeholder="firstName"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field required>
          <label>lastName</label>
          <Input
            placeholder="lastName"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field required>
          <label>email</label>
          <Input
            placeholder="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field required>
          <label>phone</label>
          <Input
            placeholder="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit" disabled={isAddRecord} onClick={handleSubmit}>
          Добавить
        </Button>
      </Form>
    </div>
  );
}
