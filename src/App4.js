import logo from './logo.svg';
import './App.scss';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'
import {useCallback, useState} from "react";

const groups = ['group1', 'group2', 'group3', 'group4', 'group5']
let d=[];

for(let j=0;j<groups.length;j++) {
	let row = {nodes: []};

	row.name = groups[j];

	for (let a = 0; a < 2000; a++) {
		let node = [];

		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < 10) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}

		for (let i = 0; i < 100; i++) {
			node['col' + i] = result;
		}

		node['name'] = result;

		row.nodes.push(node);
	}

	d.push(row);
}

const data = [
	{ id: 1, groupingid: 'group1', name: 'John McQueen', visible: false, age: 35, nodes: [
			{
				id: 1,
				name: 'App store',
				age: '4.5Mb'
			},
			{
				id: 2,
				name: 'iMovie',
				age: '106Mb'
			},
			{
				id: 3,
				name: 'IRecall',
				age: '200Mb'
			}
		]},
	{ id: 2, groupingid: 'group1', name: 'Mary Stones', age: 25, nodes: [
			{
				id: 1,
				name: 'App store',
				age: '4.5Mb'
			},
			{
				id: 2,
				name: 'iMovie',
				age: '106Mb'
			},
			{
				id: 3,
				name: 'IRecall',
				age: '200Mb'
			}
		] },
	{ id: 3, groupingid: 'group1', name: 'Robert Fil', age: 27, nodes: [
			{
				id: 1,
				name: 'App store',
				age: '4.5Mb'
			},
			{
				id: 2,
				name: 'iMovie',
				age: '106Mb'
			},
			{
				id: 3,
				name: 'IRecall',
				age: '200Mb'
			}
		] },
	{ id: 4, groupingid: 'group1', name: 'Roger Robson', age: 81, nodes: [
			{
				id: 1,
				name: 'App store',
				age: '4.5Mb'
			},
			{
				id: 2,
				name: 'iMovie',
				age: '106Mb'
			},
			{
				id: 3,
				name: 'IRecall',
				age: '200Mb'
			}
		] },
	{ id: 5, groupingid: 'group1', name: 'Billary Konwik', age: 18 },
	{ id: 6, groupingid: 'group2', name: 'Bob Martin', age: 18 },
	{ id: 7, groupingid: 'group2', name: 'Matthew Richardson', age: 54 },
	{ id: 8, groupingid: 'group2', name: 'Ritchie Peterson', age: 54 },
	{ id: 9, groupingid: 'group2', name: 'Bryan Martin', age: 40 },
	{ id: 10, groupingid: 'group3', name: 'Mark Martin', age: 44 },
	{ id: 11, groupingid: 'group3', name: 'Michelle Sebastian', age: 24 },
	{ id: 12, groupingid: 'group3', name: 'Michelle Sullivan', age: 61 },
	{ id: 13, groupingid: 'group3', blah:true, name: 'Jordan Bike', age: 16 },
	{ id: 14, groupingid: 'group4', name: 'Nelson Ford', age: 34 },
	{ id: 15, groupingid: 'group4', name: 'Tim Cheap', age: 3 },
	{ id: 16, groupingid: 'group4', name: 'Robert Carlson', age: 31 },
	{ id: 17, groupingid: 'group4', name: 'Johny Perterson', age: 40 }
];

function App3() {

	const [groupBy, setGroupBy] = useState(['groupingid']);
	const [cellSelection, setCellSelection] = useState({});
	const [activeCell, setActiveCell] = useState([]);
	const [expandedNodes, setExpandedNodes] = useState({});


	const [columns, setColumns] = useState([
		{ name: 'name', header: 'Name', groupBy: false, minWidth: 50, defaultFlex: 2 },
		{ name: 'age', header: 'Age', groupBy: false, maxWidth: 1000, defaultFlex: 1, visible: true }
	]);

	const gridStyle = { minHeight: 550 }

	const [dataSource, setDataSource] = useState(data);

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
			<p>Selected cells: {cellSelection.length == 0 ? 'none' : JSON.stringify(cellSelection, null, 2)}.
			</p>

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
