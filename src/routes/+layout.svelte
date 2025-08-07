<script>
  import { ThemeProvider } from "svelte-elegant";

  import Header from "../components/layout/Header.svelte";
</script>

<ThemeProvider>
  <Header />
  <div class="app">
    <main>
      <slot />
    </main>
  </div>
</ThemeProvider>

<style>
  .app {
    padding-left: 0.5rem;
  }
</style>
