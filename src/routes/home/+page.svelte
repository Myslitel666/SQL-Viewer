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

  let xWindow;

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
    xMobile = isMobile();

    window.addEventListener("resize", updateXWindow); // При изменении высоты окна
    async function updateXWindow() {
      if (window.innerWidth) {
        xWindow = window.innerWidth;
      }
    }
  });
</script>

<div class="content">
  {#if xWindow > 750 || !$selectedTable}
    <DatabaseExplorer width={xMobile ? "100%" : "16rem"} />
  {/if}
  {#if (xMobile && $selectedTable) || !xMobile}
    <div class="table">
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
  {/if}
</div>

<style>
  .content {
    display: flex;
    margin-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .table {
    width: 70%;
    margin-left: 1rem;
  }

  @media (max-width: 900px) {
    .table {
      width: 62.5%;
    }
  }

  @media (max-width: 750px) {
    .table {
      width: 100%;
      margin-left: 0;
    }

    .content {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
</style>
