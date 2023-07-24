import logo from './logo.svg';
import './App.scss';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'
import {useCallback, useState} from "react";

const data = [
	{ id: 1, groupingid: 'group1', name: 'John McQueen', visible: false, age: 35},
	{ id: 2, groupingid: 'group1', name: 'Mary Stones', age: 25 },
	{ id: 3, groupingid: 'group1', name: 'Robert Fil', age: 27 },
	{ id: 4, groupingid: 'group1', name: 'Roger Robson', age: 81 },
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

function App2() {

	const [groupBy, setGroupBy] = useState(['groupingid']);
	const [cellSelection, setCellSelection] = useState({});
	const [activeCell, setActiveCell] = useState([]);


	const [columns, setColumns] = useState([
		{ name: 'name', header: 'Name', groupBy: false, minWidth: 50, defaultFlex: 2 },
		{ name: 'age', header: 'Age', groupBy: false, maxWidth: 1000, defaultFlex: 1, visible: true },
		{ name: 'groupingid', header: 'Grouping', minWidth: 80 }
	]);

	const gridStyle = { minHeight: 550 }

	const [dataSource, setDataSource] = useState(data);

	const handleCellSelectionChange = useCallback((selected) => {
		setCellSelection(selected);
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

					style={gridStyle}
					idProperty="id"

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

export default App2;
