
export const convertNodesToTree = (title, rootNodes, nodes, selectedNode) =>{
    let nodeId = (selectedNode) ? selectedNode : null;
    const data = {
        id: "-1",
        name: title,
        toggled: rootNodes && rootNodes.length>0,
        children: (rootNodes) ? buildChildrenTree(rootNodes, nodes,nodeId) : [],
        hasChildren: true
    }
    return data;
};

const buildChildrenTree = (nodes, nodesMap,nodeId) =>{
    return nodes.map((idNode)=>{
        const elem = nodesMap[idNode];
        let children = elem.hasChildren ? [] : null;
        children =(elem.children && elem.children.length>0) ? buildChildrenTree(elem.children, nodesMap,nodeId):children;
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