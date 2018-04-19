import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Treebeard,decorators} from 'react-treebeard';
import {treeStyles} from './../constants/styles';




class GenericWFTree extends Component {
    
    constructor (props) {
        super(props);
        const {title, rootNodes, nodes}=props;
        this.state ={
            tree: this.buildInitialTree(title, rootNodes, nodes,null),
            activeNode:null
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps && nextProps.rootNodes){
          const {title,rootNodes, nodes} = nextProps;
          const finalTree =this.buildInitialTree(title,rootNodes, nodes,this.state.activeNode);
          this.setState({
            tree:finalTree
          });
        }
      }

    buildInitialTree = (title, rootNodes, nodes, activeNode) =>{
        let nodeId = (activeNode) ? activeNode : (this.state) ? this.state.activeNode:null;
        const data = {
            id: "-1",
            name: title,
            toggled: rootNodes && rootNodes.length>0,
            children: (rootNodes) ? this.buildChildrenTree(rootNodes, nodes,nodeId) : [],
            hasChildren: true
        }
        this.onToggle = this.onToggle.bind(this);
        this.selectNode= this.selectNode.bind(this);
        return data;
    }

    buildChildrenTree = (nodes, nodesMap,nodeId) =>{
        return nodes.map((idNode)=>{
            const elem = nodesMap[idNode];
            let children = elem.hasChildren ? [] : null;
            children =(elem.children && elem.children.length>0) ? this.buildChildrenTree(elem.children, nodesMap,nodeId):children;
            return {
                id: elem.id,
                name: elem.title,
                description: elem.description,
                toggled: elem.children && elem.children.length>0, 
                hasChildren: elem.hasChildren,
                type: elem.type,
                active: elem.id === nodeId,
                children
            }
        })

    }

    onToggle(node){
        const {id, toggled}=node;
        // call fetch from web Service
         if (node.hasChildren && node.children.length === 0){
          node.toggled=true;
          node.loading = true;
          this.props.onLoadNode(id);
          this.setState({activeNode:id});
        }else if (this.refs.treeRef){
            let newTree = this.findNodeAndChangeProperties(this.refs.treeRef.props.data, node.id, !toggled);
            this.setState({tree:newTree, activeNode:id});
        }
        
    }

    selectNode = (node)=>{        
        //force beard tree re-render
        const finalTree  = this.findNodeAndChangeProperties(this.refs.treeRef.props.data, node.id, null);
         this.setState({
           tree:finalTree, 
           activeNode: node.id
        });
       
    }
    findNodeAndChangeProperties = (node, id, toggled)=>{
        if (node.id === id){
            node.active=true;
            node.toggled= (toggled!=null) ? toggled : node.toggled;
        }else{
            node.active=false;
        }        
        if (node.children){            
            node.children = node.children.map((child)=>{
                return this.findNodeAndChangeProperties(child, id, toggled);
            });
        }
        return node;
    }


    drawNode = (props)=>{
        console.log("Drawing node");
        const {node} = props;
        const {id, toggled, name,  hasChildren,description,type} = node;
        const active = (this.state.activeNode && this.state.activeNode===id) ;

        return (
            <div style={{cursor:"pointer"}}>
                {this.drawToggleArea(hasChildren, node,toggled)}
                {this.drawMainNodeArea(node, active, type, name, description)}                
            </div>
            )
    }

    drawMainNodeArea = (node, active, type, name, description) =>{
        return (<span title={description} onClick={()=>{this.selectNode(node)}}
                style={{display: 'table-cell', fontWeight: active?'bolder':'normal'}}>
                    <i className={translateTypeToIcon(type)} style={{marginRight:5}}> </i>
                    {name}
                </span>);
    }
    
    drawToggleArea = (hasChildren, node,toggled)=>{
        return (<div style={{width: '20px', display: 'table-cell'}}   
                onClick={()=>{hasChildren ? this.onToggle(node, !toggled) : null}}    > 
             {hasChildren ? <i  className={"fa  " + (toggled ? 'fa-caret-down' : 'fa-caret-right')} style={{position:'absolute', top:'1px'}}></i> : <i></i>} 
            </div>)
    }


    render() {
        decorators.Container =this.drawNode;
        return (            
            <div>
                <Treebeard data={this.state.tree} decorators={decorators}  style={treeStyles} ref="treeRef" />
            </div>
        );
    }
}


const translateTypeToIcon= (type)=>{
    switch(type){
       case "CATEGORY": return "fa fa-folder ";
       case "TEMPLATE": return "fa fa-list-alt ";
       case "INSTANCE" : return "fa fa-file";
       default: return "fa fa-folder";
    }
}

GenericWFTree.propTypes = {
    title: PropTypes.string.isRequired,
    rootNodes: PropTypes.array,
   // nodes: PropTypes.node
};

export default GenericWFTree;