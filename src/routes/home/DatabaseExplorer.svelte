<!-- src/components/DatabaseMenu.svelte -->
<script>
  import { Button, Modal } from "svelte-elegant";
  import { DatabasePro, NotebookPro, Plus } from "svelte-elegant/icons-elegant";
  import { onMount } from "svelte";
  import {
    databaseName,
    tablesList,
    selectedTable,
    databaseActions,
  } from "$lib/stores/databaseExplorerStore";
  import { isMobile } from "svelte-elegant/utils";

  let isOpenModal = false;

  onMount(() => {
    databaseActions.loadDatabase();
  });
</script>

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
    <p style:font-weight="600">{$databaseName}</p>
  </div>

  {#each $tablesList as table}
    <button
      style:font-size="16px"
      style:display="flex"
      style:align-items="center"
      style:margin-left="2rem"
      style:margin-top="0.5rem"
      on:click={() => {
        databaseActions.loadTableColumns(table.table_name);
        $selectedTable = table.table_name;
      }}
    >
      <NotebookPro size="2rem" />
      <p
        style:margin-left="0.5rem"
        style:font-weight={table.table_name === $selectedTable ? 600 : 400}
      >
        {table.table_name}
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
    <div style:margin-top="0.25rem" style:margin-left="-0.66rem">
      <Plus />
    </div>
    Create Table
  </Button>
</div>
