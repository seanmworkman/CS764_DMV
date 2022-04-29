import React, { Component } from 'react';
import OnlineServices from './views/OnlineServices.js';

//Creating font awesome lib to be used across the app
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrashAlt, faShareSquare, faEllipsisV, faFolderOpen} from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faTrashAlt, faShareSquare, faEllipsisV, faFolderOpen);


class App extends Component {
  

  render() {
    return (
      <div > 
        <OnlineServices />
      </div>
    );
  }
}

export default App;
