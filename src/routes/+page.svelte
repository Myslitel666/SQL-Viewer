<script lang='ts'>
	import { ThemeProvider } from "svelte-elegant";

	//Styles
	let primary = '#5bb056';
</script>

<ThemeProvider>
	<div class = 'header'>
		<button>
			<img src = './USD-Coin-Logo-PNG-Color.png' class = 'logo'>
			<p class = 'logo-p'>
				<span style:color={primary}>
					SQL Viewer
				</span> 
			</p>
		</button>
	</div>
	<p 
		class = 'title'
		style:color = {primary}
	>
		Getting Started
	</p>
	<p class = 'text'>
		Welcome to SQL Viewer — the powerful tool designed for easy interaction with databases.
	</p>
	<p class = 'text'>
		SQL Viewer is aimed at simplifying the processes of reading, editing, and deleting records in a database, providing users with an intuitive interface and quick access to data.
	</p>
	<p 
		class = 'title'
		style:color = {primary}
	>
		Key Features
	</p>
	<ul class = 'list'>
		<li>Data Reading: Easily view all records in your tables. Access important information with just a few clicks;</li>

		<li>Record Editing: Modify existing data without diving into SQL queries. Select the desired record, make changes, and save them with the click of a button;</li>
		
		<li>Data Deletion: Remove unnecessary records from your tables, eliminating clutter in your database while using an intuitive interface.</li>
	</ul>
	<p 
		class = 'title'
		style:color = {primary}
	>
		PostgreSQL Support
	</p>
	<p class = 'text'>
		Currently, SQL Viewer only supports PostgreSQL databases, ensuring reliable and secure interaction with this database management system. We plan to expand functionality and support other DBMSs in the future.
	</p>
	<p 
		class = 'title'
		style:color = {primary}
	>
		Why Use SQL Viewer?
	</p>
	<p class = 'text'>
		Not all cloud platforms and hosting services provide an interface for data management. Usually, you have to rely on third-party libraries and utilities for these tasks. Additionally, there are still few universal tools in SQL programming that allow interaction with various DBMSs through a single interface.
	</p>
	<p class = 'text'>
		With SQL Viewer, you can:
	</p>
	<ul class = 'list'>
		<li>Simplify data handling without the need for additional libraries;</li>
		<li>Record Editing: Modify existing data without diving into SQL queries. Select the desired record, make changes, and save them with the click of a button;</li>
		<li>Data Deletion: Remove unnecessary records from your tables, eliminating clutter in your database while using an intuitive interface.</li>
	</ul>
	<p class = 'text'>
		We hope that SQL Viewer becomes your indispensable assistant in the world of databases. If you have any suggestions or ideas for improvement, feel free to reach out to us!
	</p>
	<p class = 'text'>
		Start right now and discover the convenience of working with databases!
	</p>
</ThemeProvider>

<style>
	.header {
		height: 4rem;
		display: flex;
		align-items: center; /* Центрирует по вертикали */
	}

	.logo {
		margin-left: 0.5rem;
		width: 3rem;
		height: 3rem;
		transition: transform 0.5s;
	}

	.logo-p {
		margin-left: 0.5rem;
		font-size: 26px;
	}

	.logo:hover {
		transform: scale(1.2);
	}

	.title {
		font-size: 24px;
		margin-left: 4rem;
		margin-top: 0.25rem;
		line-height: 1.5;   /* Полуторный межстрочный интервал */
	}

	.text {
		margin-top: 0.5rem;
		margin-left: 1rem;
		margin-bottom: 0.5rem;
		text-indent: 3rem; /* Отступ первой строки */
		line-height: 1.5;   /* Полуторный межстрочный интервал */
	}

	.list {
		margin-top: 0.5rem;
		margin-left: 3.5rem;
		text-indent: 0.1rem; /* Отступ первой строки */
		margin-bottom: 0.5rem;
		line-height: 1.5;   /* Полуторный межстрочный интервал */
	}
</style>