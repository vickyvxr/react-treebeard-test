import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {store} from './store/store';
import {Grid,Row,Col} from 'react-bootstrap';

import EnginesTreeComponent from './containers/enginesTreeComponent';
import EngineDetailContainer from './containers/engineDetailContainer';
class App extends Component {
  render() {
    return (
      <Provider  store={store}>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={4}>
              <EnginesTreeComponent />
            </Col>
            <Col xs={12} md={8}>
              <EngineDetailContainer/>
            </Col>
          </Row>
        </Grid>
      </Provider>
    );
  }
}

export default App;
