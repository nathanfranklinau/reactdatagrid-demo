import logo from './logo.svg';
import './App.scss';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'
import {useCallback, useState} from "react";

const colCount = 100;
const groups = ['group1', 'group2', 'group3', 'group4', 'group5']
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


function App3() {

	const [cellSelection, setCellSelection] = useState({});
	const [activeCell, setActiveCell] = useState([]);
	const [expandedNodes, setExpandedNodes] = useState({});


	const gridStyle = { minHeight: 550 }

	const [dataSource, setDataSource] = useState(d);

	const handleCellSelectionChange = useCallback((selected) => {
		const sel = Object.keys(selected)
			.filter((key) => {
				const rowId = key.substring(0, key.indexOf(','));
				const fieldId = key.substring(key.indexOf(',')+1);
				return !fieldId.includes('name') && rowId.indexOf('/') > -1;
			})
			.reduce((cur, key) => { return Object.assign(cur, { [key]: selected[key] })}, {});
		setCellSelection(sel);
	}, [])

	const onExpandedNodesChange = useCallback(({ expandedNodes }) => {
		setExpandedNodes(expandedNodes)
	}, [])

	const handleActiveCellChange  = useCallback((activecell) => {
		setActiveCell(activecell);
	}, [])

	const handleMouseUp = () => {
		setCellSelection([]);
		// setActiveCell([]);
	};

	return (
		<div className="App">

			<div onMouseUp={handleMouseUp}>
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
		</div>
	);
}

export default App3;
