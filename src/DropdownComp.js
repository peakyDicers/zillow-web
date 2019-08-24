import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

export default class DropdownComp extends React.Component{
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Natural Disasters
  </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Tornados</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Hurricanes</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Floods</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Wildfires</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Earthquakes</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Drought</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}