<script>
  import { ColorThemeSwitch, Header, LangSelector } from "svelte-elegant";
  import { themeStore } from "svelte-elegant/stores";
  import { languageStore } from "$lib/stores/language";

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

<Header {...$$props}>
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
    style:margin-right="0.25rem"
  >
    <LangSelector marginRight="0.25rem" />
    <ColorThemeSwitch />
  </div>
</Header>

<style>
  .logo {
    width: 3rem;
    height: 3rem;
    transition: transform 0.5s;
  }

  .logo-p {
    margin-left: 0.25rem;
    font-size: 26px;
  }

  .logo:hover {
    transform: scale(1.2);
  }
</style>
