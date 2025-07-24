<script>
  import { AutoComplete, ColorThemeSwitch, Header } from "svelte-elegant";
  import { themeStore } from "svelte-elegant/stores";
  import { languageStore } from "../../stores/language";

  let lg = "en";
  let theme;

  $: if (lg) $languageStore = lg;
  // Подписываемся на изменения темы
  themeStore.subscribe((value) => {
    theme = value;
  });

  //Styles
  $: primary = theme?.palette.primary;
</script>

<Header>
  <a href="/home" style:text-decoration="none">
    <button>
      <img src="./USD-Coin-Logo-PNG-Color.png" class="logo" alt="logo" />
      <p class="logo-p">
        <span style:color={primary}> SQL Viewer </span>
      </p>
    </button>
  </a>
  <div
    style:display="flex"
    style:align-items="center"
    style:margin-left="auto"
    style:width="10.5rem"
    style:position="sticky"
    style:gap="0.5rem"
  >
    <ColorThemeSwitch />
    <AutoComplete
      options={["en", "ru"]}
      bind:value={lg}
      label="Lang"
      width="5rem"
    />
  </div>
</Header>

<style>
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
