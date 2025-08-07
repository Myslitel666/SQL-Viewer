<script>
  import { Button, DataGrid } from "svelte-elegant";
  import { PostgresProvider } from "$lib/providers/PostgresProvider";
  import DatabaseExplorer from "./DatabaseExplorer.svelte";
  import * as columnsUtils from "./columnsUtils";
  import Enter from "svelte-elegant/Enter";
  import { themeStore } from "svelte-elegant/stores";

  import {
    databaseName,
    tablesList,
    selectedTable,
  } from "$lib/stores/databaseExplorerStore";

  import { onMount } from "svelte";

  let columnsList = {};
  let columns = [];
  let theme;
  let xMobile = false;
  let xWindow;

  themeStore.subscribe((value) => {
    theme = value; //Инициализация объекта темы
  });

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

    window.addEventListener("resize", updateXWindow); // При изменении высоты окна
    async function updateXWindow() {
      if (window.innerWidth) {
        xWindow = window.innerWidth;

        if (xWindow > 750) xMobile = false;
        else xMobile = true;

        if (!xMobile && !$selectedTable)
          $selectedTable = $tablesList[0]?.table_name || "";
      }
    }

    await updateXWindow();
    if (!xMobile) $selectedTable = $tablesList[0]?.table_name || "";
  });
</script>

<div class="content">
  {#if !xMobile || !$selectedTable}
    <DatabaseExplorer width={xMobile ? "100%" : "16rem"} />
  {/if}
  {#if (xMobile && $selectedTable) || !xMobile}
    <div class="table" style:display="flex" style:justify-content="center">
      <div
        style:border-radius="2rem"
        style:display="flex"
        style:flex-direction={xMobile ? "column" : ""}
        style:justify-content="center"
        style:width={xMobile ? "" : "100%"}
        style:max-width={xMobile ? "100%" : ""}
      >
        {#if $selectedTable}
          {#if xMobile}
            <div
              style:margin-top={xMobile ? "" : "0.5rem"}
              style:margin-bottom="0.25rem"
              style:display="flex"
              style:justify-content="center"
              style:align-items="center"
              style:flex-direction="column"
              style:gap="0.33rem"
            >
              <div>
                <span style:font-weight="600" style:margin-right="0.25rem"
                  >Table:</span
                ><span>{$selectedTable}</span>
              </div>
              <Button
                variant="Text"
                marginBottom="0.25rem"
                onClick={() => {
                  $selectedTable = "";
                }}
              >
                <div style:margin-left="-0.66rem" style:margin-top="0.25rem">
                  <Enter fill={theme.palette.primary} size="2.25rem" />
                </div>
                Go back to the tables
              </Button>
            </div>
          {/if}
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
    padding-top: 0.5rem;
  }

  .table {
    /* Ключевые свойства для того, чтобы DataGrid анимал всё доступное пространство */
    flex: 1;
    min-width: 0;
    /* *************************************************************************** */
    padding-left: 0.5rem;
  }
</style>
