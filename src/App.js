import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setContacts } from "./redux/action/contact";
import { sortBy, map } from "lodash";
import { Table } from "semantic-ui-react";

import db from "./db.json";

function App() {
  const dispatch = useDispatch();
  const { contacts } = useSelector(({ contacts }) => {
    return {
      contacts: contacts.contacts,
    };
  });

  const [state, setState] = React.useState({
    column: null,
    data: contacts,
    direction: null,
  });

  const handleSort = (clickedColumn) => {
    const { column, data, direction } = state;

    if (column !== clickedColumn) {
      setState({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
        direction: "ascending",
      });
      return;
    }

    setState({
      ...state,
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };

  React.useEffect(() => {
    fetch(
      "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
    )
      .then((res) => res.json())
      .then((json) => dispatch(setContacts(json)));
  }, []);

  const { column, data, direction } = state;

  return (
    <div className="App">
      <Table sortable celled fixed color="black" inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "id" ? direction : null}
              onClick={handleSort.bind(null, "id")}
            >
              id
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "firstName" ? direction : null}
              onClick={handleSort.bind(null, "firstName")}
            >
              firstName
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "lastName" ? direction : null}
              onClick={handleSort.bind(null, "lastName")}
            >
              lastName
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "email" ? direction : null}
              onClick={handleSort.bind(null, "email")}
            >
              email
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "phone" ? direction : null}
              onClick={handleSort.bind(null, "phone")}
            >
              phone
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(data, ({ id, firstName, lastName, email, phone }) => (
            <Table.Row key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{firstName}</Table.Cell>
              <Table.Cell>{lastName}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{phone}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default App;
