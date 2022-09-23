<script>
  let api_key = localStorage.getItem("api_key");
  let api_end = localStorage.getItem("api_end");

  let get_api_info = false;

  if (api_key === null || api_end === null) get_api_info = true;

  function save() {
    if (api_key === null || api_end === null) return;
    localStorage.setItem("api_end", api_end);
    localStorage.setItem("api_key", api_key);
    get_api_info = false;
  }


</script>

<h1 class="text-center">TURBO FLY III</h1>
{#if get_api_info}
  <h3>endpoint:</h3>
  <input type="text" bind:value={api_end} />
  <h3>api key:</h3>
  <input type="text" bind:value={api_key} />
  <button on:click={save}>Save</button>
{:else}
  <hr />
  <div class="debug pt-3 pb-3">Soda $1.35</div>
  
  <hr />
  <div class="debug pt-3 pb-3">Soda $1.35</div>
  <hr />
  <div class="debug pt-3 pb-3">Soda $1.35</div>
  <hr />
{/if}

<style>
  .debug {
    border-style: solid;
    border-color: red;
    border-width: 3px;
  }
</style>