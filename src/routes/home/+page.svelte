<script lang='ts'>
	import { ThemeProvider } from "svelte-elegant";
	import AutoComplete from "../../components/AutoComplete.svelte";
    import Database from 'svelte-elegant/icons-elegant/Database';
    import { Notepad } from "svelte-elegant/icons-elegant";

    import { onMount } from 'svelte';
    let databaseName = '';
    let tablesList = [];
    let columnsList = '';

    let selectedTable = '';

    onMount(async () => {
        databaseName = await getDbName();
        tablesList = await getTablesList();
        selectedTable = tablesList.length > 0 ? tablesList[0].table_name : '';
        columnsList = await getColumnsList();
    });

    async function getDbName() {
        const response = await fetch('/api/home/getDatabaseName');
        const data = await response.json();

        return data.database;
    };

    async function getTablesList() {
        const response = await fetch('/api/home/getTablesList');
        const data = await response.json();

        return data;
    };

    async function getColumnsList() {
        const response = await fetch(`/api/home/getColumnsList?table=${selectedTable}`);
        const data = await response.json();

        return data;
    };

    async function handleTableClick(tableName) {
        selectedTable = tableName;
        columnsList = await getColumnsList();
    }
	//Styles
	let primary = '#5bb056';
	let lg = 'en';
</script>

<ThemeProvider>
	<div class = 'header'>
		<a 
			href = '/home'
			style:text-decoration = none
		>
			<button>
				<img src = './USD-Coin-Logo-PNG-Color.png' class = 'logo'>
				<p class = 'logo-p'>
					<span style:color={primary}>
						SQL Viewer
					</span> 
				</p>
			</button>
		</a>
		<div 
			style:display=flex
			style:align-items = center
			style:margin-left = auto
			style:margin-right = 0.5rem
			style:width = 5.6rem
		>
			<span style:margin-right=0.5rem>lg:</span>
			<AutoComplete
				bind:selectedOption = {lg}
			/>
		</div>
	</div>
    <div class = "content">
        <div class = 'menu'>
            <div 
                style:display=flex
                style:align-items=center
            >
                <Database size=2rem/><p>{databaseName}</p>
            </div>
            {#each tablesList as tableName}
                <button
                    style:display=flex
                    style:align-items=center
                    style:margin-left=3rem
                    style:margin-top=0.5rem
                    onclick = {() => {
                        handleTableClick(tableName.table_name);
                    }}
                >
                    <Notepad size=2rem /> <!-- Передаем название таблицы в компонент -->
                    <p
                        style:margin-left=0.5rem
                        style:font-weight={tableName.table_name === selectedTable ? 600 : 400}
                    >
                        {tableName.table_name}
                    </p>
                </button>
            {/each}
        </div>
        <div
            class = 'table'
            style:margin-left = 1rem
            style:width = 100%
            style:height = 5rem
            style:background-color = #f7f7f7
        >
        <div 
            style:display=flex
            style:justify-content=center
            style:border-radius=2rem
        >
            {#each columnsList as columnName}
                <div
                    style:margin-top=0.5rem
                >
                    <span
                        style:margin-left=0.5rem
                    >
                        {columnName.column_name}
                    </span>
                </div>
            {/each}
        </div>
        </div>
    </div>
</ThemeProvider>

<style>
    .content {
        display: flex;
        padding-left: 4rem;
        padding-right: 4rem;
    }

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
</style>