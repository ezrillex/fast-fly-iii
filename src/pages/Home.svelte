<script>
    import {templateStore} from "src/templateStore";
    import {selectedStore} from "src/selectedStore";

    import { push } from "svelte-spa-router";

    console.log($templateStore)

    function newtemplate() {
		$selectedStore = {};
		// new_template = true;
        push("/new")
	}
</script>

<!-- LIST TRANSACTIONS -->
{#each $templateStore as t}
<hr />
<div
    on:click={() => {
       
        $selectedStore = t;
        push("/confirm")
    }}
    class="pt-3 pb-3"
>
    {t.description} ${t.amount} <br />
    {t.source_name} -> {t.destination_name} <br />
    {t.type} {t.category_name}
</div>
{/each}
<hr />

<div class="d-flex  justify-content-center">
<button on:click={newtemplate} class="p-2 btn btn-outline-dark"
    >New Template</button
>
</div>