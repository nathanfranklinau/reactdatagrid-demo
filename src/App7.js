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
		node['group'] = groups[Math.floor(Math.random() * groups.length)];

		row.nodes.push(node);

		nonGroupRows.push(node);
	}

	d.push(row);

	break;
}

console.log(nonGroupRows);

const columns = [
	{ draggable: false, name: 'name', header: 'Name', minWidth: 100, defaultFlex: 1 },
	{ draggable: false, name: 'group', header: 'Group', minWidth: 100, defaultFlex: 1 }
];
for (let i = 0; i < colCount; i++) {
	columns.push({ draggable: false, name: 'col' + i, header: 'Col ' + i, minWidth: 70, defaultFlex: 1 })
}

const gridStyle = { minHeight: 550 }

function App7() {

	const [gridRef, setGridRef] = useState(null);
	const [groupBy, setGroupBy] = useState(['group']);
	const [unselected, setUnselected] = useState({});
	const [selected, setSelected] = useState({});
	const [cellSelection, setCellSelection] = useState({});
	const [expandedNodes, setExpandedNodes] = useState({});

	//const [dataSource, setDataSource] = useState(d);
	const [dataSource, setDataSource] = useState(nonGroupRows);

	const handleCellSelectionChange = (selected) => {
		console.log(cellSelection, selected);
		//setCellSelection({'0,col3': true, '0,col4': true, '0,col5': true, '0,col6': true});
		setCellSelection(selected);
	}

	const handleSelectionChange = ({selected, unselected}) => {
		console.log('here');
		setSelected(selected);
		setUnselected(unselected)
	}

	const onExpandedNodesChange = ({ expandedNodes }) => {
		setExpandedNodes(expandedNodes)
	}

	const [activeCell, setActiveCell] = useState([]);

	const handleMouseUp = () => {
		// setCellSelection({});
		// setActiveCell([]);
		// gridRef.current.deselectAll();
	};

	return (
		<div className="App">

			<div onMouseUp={handleMouseUp}>
				<ReactDataGrid
					key={"grid1"}
					onReady={setGridRef}
					expandedNodes={expandedNodes}
					onExpandedNodesChange={onExpandedNodesChange}
					style={gridStyle}
					idProperty="id"
					showGroupColumn={false}
					disableGroupByToolbar={true}
					stickyGroupRows={true}
					defaultGroupBy={groupBy}
					sortable={false}
					columns={columns}
					dataSource={dataSource}
					enableSelection={false}
					cellSelection={cellSelection}
					onCellSelectionChange={handleCellSelectionChange}
					selectOnDrag={true}
					pagination={false}
					enableKeyboardNavigation={false}
					activeCell={activeCell}
					onActiveCellChange={setActiveCell}
					unselected={unselected}
					onSelectionChange={handleSelectionChange}
					selected={selected}
				></ReactDataGrid>
			</div>
		</div>
	);
}

export default App7;
