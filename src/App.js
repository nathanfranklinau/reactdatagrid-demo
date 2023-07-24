import logo from './logo.svg';
import './App.scss';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'
import filter from '@inovua/reactdatagrid-community/filter'
import {useCallback, useState} from "react";

const defaultFilterValue = [
	{ name: 'name', operator: 'startsWith', type: 'string', value: 'B' }
]

const ds2 = [
	{ id: 1, name: 'John McQueen', age: 35 },
	{ id: 2, name: 'Mary Stones', age: 25 },
	{ id: 3, name: 'Robert Fil', age: 27 },
	{ id: 4, name: 'Roger Robson', age: 81 },
	{ id: 5, name: 'Billary Konwik', age: 18 },
	{ id: 6, name: 'Bob Martin', age: 18 },
	{ id: 7, name: 'Matthew Richardson', age: 54 },
	{ id: 8, name: 'Ritchie Peterson', age: 54 },
	{ id: 9, name: 'Bryan Martin', age: 40 },
	{ id: 10, name: 'Mark Martin', age: 44 },
	{ id: 11, name: 'Michelle Sebastian', age: 24 },
	{ id: 12, name: 'Michelle Sullivan', age: 61 },
	{ id: 13, name: 'Jordan Bike', age: 16 },
	{ id: 14, name: 'Nelson Ford', age: 34 },
	{ id: 15, name: 'Tim Cheap', age: 3 },
	{ id: 16, name: 'Robert Carlson', age: 31 },
	{ id: 17, name: 'Johny Perterson', age: 40 }
];

const data = [
	{ id: "nathan", group: 'group1', name: 'John McQueen', visible: false, age: 35},
	{ id: 2, group: 'group1', name: 'Mary Stones', age: 25 },
	{ id: 3, group: 'group1', name: 'Robert Fil', age: 27 },
	{ id: 4, group: 'group1', name: 'Roger Robson', age: 81 },
	{ id: 5, group: 'group1', name: 'Billary Konwik', age: 18 },
	{ id: 6, group: 'group2', name: 'Bob Martin', age: 18 },
	{ id: 7, group: 'group2', name: 'Matthew Richardson', age: 54 },
	{ id: 8, group: 'group2', name: 'Ritchie Peterson', age: 54 },
	{ id: 9, group: 'group2', name: 'Bryan Martin', age: 40 },
	{ id: 10, group: 'group3', name: 'Mark Martin', age: 44 },
	{ id: 11, group: 'group3', name: 'Michelle Sebastian', age: 24 },
	{ id: 12, group: 'group3', name: 'Michelle Sullivan', age: 61 },
	{ id: 13, group: 'group3', blah:true, name: 'Jordan Bike', age: 16 },
	{ id: 14, group: 'group4', name: 'Nelson Ford', age: 34 },
	{ id: 15, group: 'group4', name: 'Tim Cheap', age: 3 },
	{ id: 16, group: 'group4', name: 'Robert Carlson', age: 31 },
	{ id: 17, group: 'group4', name: 'Johny Perterson', age: 40 }
];

function App() {
	const initialData = useCallback(() => { console.log('here'); return filter(data, defaultFilterValue) }, []);

	const [groupBy, setGroupBy] = useState(['group']);
	const [gridRef, setGridRef] = useState(null);
	const [cellSelection, setCellSelection] = useState([]);
	const [activeCell, setActiveCell] = useState([]);
	const [expandedNodes, setExpandedNodes] = useState({});
	const [filterValue, setFilterValue] = useState(defaultFilterValue);


	const [columns, setColumns] = useState([
		{ name: 'name', header: 'Name', minWidth: 50, defaultFlex: 2 },
		{ name: 'age', header: 'Age', maxWidth: 1000, defaultFlex: 1, visible: true, onRender: (cellProps, {data}) => {
			//cellProps.style.background = data.age > 30 ? '#251c0c' : '#252854';
		}},
		{
			name: 'group', header: 'Group', minWidth: 80,
			render: ({data}) => data.group ? 'Yes' : 'No'
		}
	]);

	const gridStyle = { minHeight: 550 }

	const [dataSource, setDataSource] = useState(initialData);

	const renderRowContextMenu = useCallback((menuProps, {rowProps, cellProps}) => {
		menuProps.autoDismiss = true
		menuProps.items = [
			{
				label: 'Row ' + rowProps.rowIndex
			},
			{
				label: 'Want to visit ' + rowProps.data.country + '?'
			}
		]
	}, [])

	const renderColumnContextMenu = useCallback((menuProps, { cellProps }) => {
		menuProps.items = [
			{
				label: 'Custom item for "' + cellProps.name + '"',
				onClick: () => {
					alert('clicked');
					menuProps.onDismiss()
				}
			},
			{
				label: 'Another custom menu item',
				onClick: () => {
					alert('clicked');
					menuProps.onDismiss()
				}
			}
		]
	}, [])

	const onExpandedNodesChange = useCallback(({ expandedNodes }) => {
		setExpandedNodes(expandedNodes)
	}, [])

	const handleCellSelectionChange = useCallback((selected) => {
		console.log(selected);
		const sel = Object.keys(selected)
			.filter((key) => {
				const rowId = key.substring(0, key.indexOf(','));
				const fieldId = key.substring(key.indexOf(',')+1);
				return !fieldId.includes('name');
			})
			.reduce((cur, key) => { return Object.assign(cur, { [key]: selected[key] })}, {});

		// const sel = selected.filter((item) => {
		// 	sel
		// });
		setCellSelection(sel);
		setActiveCell([]);
	}, [])

	const handleClicker = () => {
		// const ds = [...dataSource];
		// console.log(ds);
		// ds[0].name = 'Nathan';
		// setDataSource(ds);

		gridRef.current.deselectAll();
	}

	const handleMouseDown = () => {
	};

	const handleMouseUp = () => {
		setCellSelection([]);
		setActiveCell([]);
	};

	const onFilterValueChange = useCallback((filterValue) => {
		const data1 = filter(data, filterValue)

		setFilterValue(filterValue);
		setDataSource(data1);

	}, [])

	return (
		<div className="App">
			<button onClick={handleClicker}>Click</button>

			<p>Selected cells: {cellSelection.length == 0 ? 'none' : JSON.stringify(cellSelection, null, 2)}.
			</p>

			<div onMouseDown={handleMouseDown}
			     onMouseUp={handleMouseUp}>
				<ReactDataGrid
					filterValue={filterValue}
					onFilterValueChange={onFilterValueChange}
					treeColumn="name"
					expandedNodes={expandedNodes}
					onExpandedNodesChange={onExpandedNodesChange}
					onReady={setGridRef}
					activeCell={activeCell}
					renderColumnContextMenu={renderColumnContextMenu}
					renderRowContextMenu={renderRowContextMenu}
					style={gridStyle}
					idProperty="id"
					showGroupColumn={false}
					disableGroupByToolbar={true}
					stickyGroupRows={true}
					defaultGroupBy={groupBy}
					columns={columns}
					dataSource={dataSource}
					cellSelection={cellSelection}
					onCellSelectionChange={handleCellSelectionChange}
					selectOnDrag={true}
					pagination={false}
				></ReactDataGrid>
			</div>
		</div>
	);
}

export default App;
