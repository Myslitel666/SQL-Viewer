<script>
  import { Button, DataGrid, Modal, TextField } from "svelte-elegant";
  import { DatabasePro, NotebookPro, Plus } from "svelte-elegant/icons-elegant";

  import { onMount } from "svelte";
  import { themeMode } from "svelte-elegant/stores";
  let databaseName = "";
  let tablesList = [{ table_name: "" }];
  let columnsList = [{}];
  let columns = [{}];
  let ignoreTables = [
    //"spatial_ref_sys",
    //"geography_columns",
    //"geometry_columns",
    //"pg_stat_statements_info",
    //"raster_columns",
    //"pg_stat_statements",
  ];

  let selectedTable = "";
  let isOpenModal = false;

  onMount(async () => {
    databaseName = await getDbName();
    tablesList = await getTablesList();
    //Удаляем таблицы ЧС
    tablesList = tablesList.filter(
      (table) => !ignoreTables.includes(table.table_name)
    );
    selectedTable = tablesList.length > 0 ? tablesList[0].table_name : "";
    columnsList = await getColumnsList();
    // Преобразуем в нужный формат
    columnsListToColumns();
  });

  // Функция для форматирования названий колонок (например, "user_name" → "User Name")
  function formatHeader(columnName) {
    return columnName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  async function getDbName() {
    const response = await fetch("/api/home/getDatabaseName");
    const data = await response.json();

    return data.database;
  }

  async function getTablesList() {
    const response = await fetch("/api/home/getTablesList");
    const data = await response.json();

    return data;
  }

  async function getColumnsList() {
    const response = await fetch(
      `/api/home/getColumnsList?table=${selectedTable}`
    );
    const data = await response.json();

    return data;
  }

  function columnsListToColumns() {
    // Преобразуем в нужный формат
    columns = columnsList.map((col) => ({
      field: col.column_name,
      header: formatHeader(col.column_name), // Функция для форматирования заголовка
      width: "7.5rem", // Можно настроить индивидуально
    }));
  }

  async function handleTableClick(tableName) {
    selectedTable = tableName;
    columnsList = await getColumnsList();

    columnsListToColumns();
  }
  //Styles
  let primary = "#5bb056";
  let lg = "en";
</script>

<div class="content">
  <div class="menu">
    <Modal bind:isOpen={isOpenModal}>
      <div>
        <p>Name</p>
      </div>
    </Modal>
    <div
      style:display="flex"
      style:align-items="center"
      style:margin-bottom="0.5rem"
    >
      <DatabasePro size="2.5rem" />
      <p>{databaseName}</p>
    </div>

    {#each tablesList as tableName}
      <button
        style:display="flex"
        style:align-items="center"
        style:margin-left="2rem"
        style:margin-top="0.5rem"
        onclick={() => {
          handleTableClick(tableName.table_name);
        }}
      >
        <NotebookPro size="2rem" />
        <!-- Передаем название таблицы в компонент -->
        <p
          style:margin-left="0.5rem"
          style:font-weight={tableName.table_name === selectedTable ? 600 : 400}
        >
          {tableName.table_name}
        </p>
      </button>
    {/each}
    <Button
      marginTop="0.5rem"
      width="15rem"
      variant="Outlined"
      onClick={() => {
        isOpenModal = true;
      }}
    >
      <Plus />Create Table
    </Button>
  </div>
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
      <DataGrid {columns} />
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
