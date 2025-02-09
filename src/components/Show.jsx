import React, { useEffect, useState } from 'react';
import useData from '../context/data';
import TodoCard from './TodoCard';
import { allTodos, completedTodos, pendingTodos } from '../utils/filter';

function Show() {
	const { todos, toggleComplete, deleteTodo, deleteAllTodo } = useData();
	const [performedTodos, setPerformedTodos] = useState([]);
	const [filter, setFilter] = useState('all');
	const [sorted, setSorted] = useState('default');

	const sortTodos = (todos) => {
		return todos.sort((a, b) => {
			if (sorted === 'default') return 0;
			if (sorted === 'ascending') {
				return new Date(a.date) - new Date(b.date);
			} else {
				return new Date(b.date) - new Date(a.date);
			}
		});
	};

	useEffect(() => {
		let filteredTodos;
		switch (filter) {
			case 'all':
				filteredTodos = allTodos(todos);
				break;
			case 'completed':
				filteredTodos = completedTodos(todos);
				break;
			case 'pending':
				filteredTodos = pendingTodos(todos);
				break;
			default:
				filteredTodos = todos;
		}
		setPerformedTodos(sortTodos(filteredTodos));
	}, [todos, filter, sorted]);

	return (
		<div className='flex flex-col w-full p-4'>
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
				<div className='flex flex-row gap-4 text-white p-2 rounded-lg items-center justify-center flex-grow'>
					<label className='text-[#B3C5EF]'>Filter</label>
					<select
						className='bg-[#1D283A] text-white p-2 rounded-lg flex items-center justify-center hover:bg-[#202e42]'
						onChange={(e) => setFilter(e.target.value)}
					>
						<option value='all'>All</option>
						<option value='completed'>Completed</option>
						<option value='pending'>Pending</option>
					</select>
				</div>
				<div className='flex flex-row gap-4 text-white p-2 rounded-lg items-center justify-center flex-grow'>
					<label className='text-[#B3C5EF]'>Sort</label>
					<select
						className='bg-[#1D283A] text-white p-2 rounded-lg flex items-center justify-center hover:bg-[#202e42]'
						onChange={(e) => setSorted(e.target.value)}
					>
						<option value='default'>Default</option>
						<option value='ascending'>Ascending</option>
						<option value='descending'>Descending</option>
					</select>
				</div>
				<button
					className='bg-[#828DF8] text-white p-2 rounded-lg flex flex-grow items-center justify-center hover:bg-blue-800'
					onClick={() => deleteAllTodo()}
				>
					Clear All
				</button>
			</div>

			<div className='flex flex-col gap-1 mt-4'>
				{performedTodos.map((todo, index) => (
					<TodoCard
						key={index}
						todo={todo}
						onStatusChange={() => toggleComplete(todo.id)}
						onDelete={() => deleteTodo(todo.id)}
					/>
				))}
			</div>
		</div>
	);
}

export default Show;
