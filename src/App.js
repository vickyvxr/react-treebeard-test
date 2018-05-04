import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {store} from './store/store';
import {Grid,Row,Col, Panel} from 'react-bootstrap';

import EnginesTreeComponent from './containers/enginesTreeComponent';

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
            <Panel bsStyle="info"  style={{"minHeight": 500}}>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Engine Detail </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                Lorem ipsum dolor sit amet consectetur adipiscing elit, euismod justo sollicitudin varius convallis congue, augue risus natoque egestas mattis commodo. Natoque suspendisse justo integer cum fames pharetra imperdiet, cubilia aliquam dictumst fermentum duis ullamcorper, diam taciti egestas at posuere erat. Massa congue orci netus semper egestas dapibus parturient, sem class mattis pellentesque morbi leo.

Torquent elementum rhoncus phasellus ut nec conubia turpis vivamus inceptos blandit euismod, convallis taciti netus tempor facilisi at facilisis justo cum libero odio, risus commodo auctor eleifend cubilia viverra tellus tincidunt litora condimentum. Dis ad suscipit gravida ac placerat sociosqu quam, odio nisi purus libero habitant sodales consequat at, integer inceptos sollicitudin leo vehicula viverra. Integer laoreet vestibulum ultrices sodales habitant sociis bibendum eget in eleifend, praesent gravida elementum etiam libero dignissim purus himenaeos viverra, habitasse nulla fermentum feugiat cubilia conubia mi senectus suscipit.
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </Provider>
    );
  }
}

export default App;
