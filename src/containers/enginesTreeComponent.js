import React, { Component } from 'react';
import GenericWFTree from './../components/genericWfTree';
import {Panel} from 'react-bootstrap';
import { fetchEngineNodes }  from '../actions/engines';
import { connect } from 'react-redux';

const translateTypeToIcon= (type)=>{
    switch(type){
       case "CATEGORY": return "fa fa-folder ";
       case "TEMPLATE": return "fa fa-list-alt ";
       case "INSTANCE" : return "fa fa-file";
       default: return "fa fa-folder";
    }
}

class EnginesTreeComponent extends Component {
    render() {
        return (
            <Panel bsStyle="info" style={{"minHeight": 500}}>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Engines</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <GenericWFTree title="Engines" rootNodes={this.props.rootNodes} 
                        nodes={this.props.treeNodes} 
                        onLoadNode = {this.props.onLoadNode}
                        iconsTranslator={translateTypeToIcon}/>
                </Panel.Body>
            </Panel>
        );
    }
}

const mapStateToProps  = (state)=>({
    rootNodes : state && state.engines ? state.engines.rootNodes : null,
    treeNodes : state && state.engines ? state.engines.nodes : null   
});

const mapDispatchToProps = (dispatch) =>({
    onLoadNode: id => { 
        const nodeid = (id && id>0)? id: null; 
        dispatch(fetchEngineNodes(nodeid)); 
    }
});

export default  connect(  mapStateToProps,  mapDispatchToProps)(EnginesTreeComponent); 
