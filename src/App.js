import React from "react";
import { useDispatch } from "react-redux";
import { setContacts, addContacts } from "./redux/action/contact";
import { Grid } from "semantic-ui-react";

import Table from "./components/Table";
import AddRecord from "./components/AddRecord";
import InfoCard from "./components/InfoCard"

function App() {
  const dispatch = useDispatch();

  const [ selectContact , setSelectContact ] = React.useState(null)

  React.useEffect(() => {
    fetch(
      "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
    )
      .then((res) => res.json())
      .then((json) => dispatch(setContacts(json)));
  }, []);

  function onAddRecord(value){
    dispatch(addContacts(value))
  }

  function onSelectedContact(user){
    setSelectContact(user)
  }

  return (
    <div className="App">
      <Grid columns={3}>
        <Grid.Column width="3">
          <AddRecord onAddRecord={onAddRecord}/>
          {selectContact && <InfoCard {...selectContact[0]}/>}
        </Grid.Column>
        <Grid.Column width="10">
          <Table onSelected={onSelectedContact}/>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
