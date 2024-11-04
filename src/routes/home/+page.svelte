<script lang='ts'>
	import { ThemeProvider } from "svelte-elegant";
	import AutoComplete from "../../components/AutoComplete.svelte";
    import Database from "../../components/icons/Database.svelte";
    import Table from "../../components/icons/Table.svelte";

    import { onMount } from 'svelte';
    let databaseName = '';
    let tablesList = []

    onMount(async () => {
        databaseName = await getDbName();

        tablesList = await getTablesList();
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
        <div 
            style:display=flex
            style:align-items=center
        >
            <Database/><p>{databaseName}</p>
        </div>
        {#each tablesList as tableName}
            <div
                style:display=flex
                style:align-items=center
                style:margin-left=3rem
                style:margin-top=0.5rem
            >
                <Table /> <!-- Передаем название таблицы в компонент -->
                <p
                    style:margin-left=0.5rem
                >
                    {tableName.table_name}
                </p>
            </div>
        {/each}
    </div>
</ThemeProvider>

<style>
    .content {
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