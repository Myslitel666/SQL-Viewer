<script>
  import { DataGrid } from "svelte-elegant";
  import { PostgresProvider } from "$lib/providers/PostgresProvider";
  import DatabaseExplorer from "./DatabaseExplorer.svelte";
  import * as columnsUtils from "./columnsUtils";
  import { isMobile } from "svelte-elegant/utils";

  import {
    databaseName,
    tablesList,
    selectedTable,
  } from "$lib/stores/databaseExplorerStore";

  import { onMount } from "svelte";

  let columnsList = {};
  let columns = [];
  let xMobile = false;

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
    columnsList = await PostgresProvider.getColumnsList($selectedTable);
    columns = columnsUtils.columnsListToColumns(columns, columnsList);
    if (!isMobile()) $selectedTable = $tablesList[0]?.table_name || "";
    //Paddings Test
    else {
      $selectedTable = $tablesList[5]?.table_name;
    }
    xMobile = isMobile();
  });
</script>

<div
  class="content"
  style:padding-left={xMobile ? "10px" : "4rem"}
  style:padding-right={xMobile ? "10px" : "4rem"}
>
  {#if !xMobile || !$selectedTable}
    <DatabaseExplorer width={xMobile ? "100%" : "30%"} />
  {/if}
  <div class="table" style:width={xMobile ? "100%" : "70%"}>
    <div
      style:display="flex"
      style:justify-content="center"
      style:border-radius="2rem"
    >
      {#if $selectedTable}
        {#if columns.length > 0}
          <DataGrid maxWidth="100%" {columns} />
        {:else}
          <p>No columns to display</p>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style>
  .content {
    display: flex;
    margin-top: 0.5rem;
  }
</style>
