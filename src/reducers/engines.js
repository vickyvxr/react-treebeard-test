import _ from 'lodash';
import {ENGINES_GETENGINES} from './../actions/actionTypes';

const engines = (state = [], action) => {
        switch (action.type) {      
          case ENGINES_GETENGINES:{
            return normalizeEnginesTree(action.meta, action.payload, state);
          }
          default:
            return state
      }
}

/** Create 2 entries in the state:
 * rootNodes: the arraylist with the rootNodes
 * nodes: the treeNodes indexed By ids
 * If ID is null we are requesting the rootNodes
 * If ID is not null the rootNodes property doesn't change
 * but the parent nodes must add the ids of its children to the children attribute
 */

const normalizeEnginesTree = (meta, fetchResult, state)=>{
  const {id} = meta;
  const data = fetchResult.data;

  const rootNodes = !id ?  _.map(data, 'id') : state.rootNodes;
  let nodes = null;
  if (id){
    nodes = {...state.nodes,  ..._.keyBy(data, 'id')};
    //add the children array
    nodes[id].children =  _.map(data, 'id');
  }else{
    nodes = _.keyBy(data, 'id');
  }
  return {
    rootNodes,
    nodes
  };
};



export default engines;