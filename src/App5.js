import logo from './logo.svg';
import './App.scss';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'
import {useCallback, useState} from "react";

const colCount = 10;
const groups = ['group1', 'group2', 'group3', 'group4', 'group5']
const nonGroupRows = [];
let d=[];

for(let j=0;j<groups.length;j++) {
	let row = {nodes: [], id: j, name: groups[j]};

	for (let a = 0; a < 2000; a++) {
		let node = {id: a};

		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < 10) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}

		for (let i = 0; i < colCount; i++) {
			node['col' + i] = a + ' - ' + i; //result;
		}

		node['name'] = result;

		row.nodes.push(node);
	}

	d.push(row);
}

console.log(d);

const columns = [
	{ name: 'name', header: 'Name', groupBy: false, minWidth: 100, defaultFlex: 2 }
];
for (let i = 0; i < colCount; i++) {
	columns.push({ name: 'col' + i, header: 'Col ' + i, minWidth: 70, defaultFlex: 2 })
}

const gridStyle = { minHeight: 550 }

function App5() {

	const [cellSelection, setCellSelection] = useState({});
	const [expandedNodes, setExpandedNodes] = useState({});
	const [dataSource, setDataSource] = useState(d);

	const handleCellSelectionChange = useCallback((selected) => {
		setCellSelection(selected);
	}, [])

	const onExpandedNodesChange = useCallback(({ expandedNodes }) => {
		setExpandedNodes(expandedNodes)
	}, [])

	return (
		<div className="App">

			<ReactDataGrid
				expandedNodes={expandedNodes}
				onExpandedNodesChange={onExpandedNodesChange}
				style={gridStyle}
				idProperty="id"
				treeColumn="name"
				columns={columns}
				dataSource={dataSource}
				cellSelection={cellSelection}
				onCellSelectionChange={handleCellSelectionChange}
				selectOnDrag={true}
				pagination={false}
				enableKeyboardNavigation={false}
			></ReactDataGrid>
		</div>
	);
}

export default App5;
