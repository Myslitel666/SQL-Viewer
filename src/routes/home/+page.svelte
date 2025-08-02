<script>
  import { DataGrid } from "svelte-elegant";
  import { PostgresProvider } from "$lib/providers/PostgresProvider";
  import DatabaseExplorer from "./DatabaseExplorer.svelte";
  import * as columnsUtils from "./columnsUtils";

  import {
    databaseName,
    tablesList,
    selectedTable,
  } from "$lib/stores/databaseExplorerStore";

  import { onMount } from "svelte";

  let columnsList = {};
  let columns = [];

  // Подписка на изменения selectedTable
  selectedTable.subscribe(async (table) => {
    if (table) {
      columns = await columnsUtils.loadColumns(table);
    }
  });

  onMount(async () => {
    $databaseName = await PostgresProvider.getDbName();
    $tablesList = await PostgresProvider.getTablesList(
      PostgresProvider.ignoreTables
    );
    //Удаляем таблицы ЧС
    $tablesList = $tablesList.filter(
      (table) => !PostgresProvider.ignoreTables.includes(table.table_name)
    );
    $selectedTable = $tablesList.length > 0 ? $tablesList[0].table_name : "";
    columnsList = await PostgresProvider.getColumnsList($selectedTable);
    columns = columnsUtils.columnsListToColumns(columns, columnsList);
  });
</script>

<div class="content">
  <DatabaseExplorer />
  <div
    class="table"
    style:margin-left="1rem"
    style:width="100%"
    style:height="5rem"
  >
    <div
      style:display="flex"
      style:justify-content="center"
      style:border-radius="2rem"
    >
      {#if columns.length > 0}
        <DataGrid {columns} />
      {:else}
        <p>No columns to display</p>
      {/if}
    </div>
  </div>
</div>

<style>
  .content {
    display: flex;
    margin-top: 0.5rem;
    padding-left: 4rem;
    padding-right: 4rem;
  }
</style>
