import React from "react";
import { useSelector } from "react-redux";
import { sortBy, map } from "lodash";
import { Table } from "semantic-ui-react";

export default function TableContact({onSelected}) {
  const [ activeRow, setActiveRow ] = React.useState('')
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

  function onRow(e){
    onSelected(
      state.data.filter(item => item.phone === e.target.id)
    )
    setActiveRow(e.target.id)
  }

  React.useEffect(() => {
    setState({ ...state, data: contacts });
  }, [contacts]);

  const { column, data, direction } = state;
  return (
    <div>
      <Table sortable celled selectable fixed color="black">
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
          {data &&
            map(data, ({ id, firstName, lastName, email, phone }, i) => (
              <Table.Row key={i} active={activeRow === phone ? true : false} onClick={onRow} >
                <Table.Cell id={phone} >{id}</Table.Cell>
                <Table.Cell id={phone}>{firstName}</Table.Cell>
                <Table.Cell id={phone}>{lastName}</Table.Cell>
                <Table.Cell id={phone}>{email}</Table.Cell>
                <Table.Cell id={phone}>{phone}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}
