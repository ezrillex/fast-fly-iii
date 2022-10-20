<script>

    import { push } from "svelte-spa-router";


    // TODO do the other logic of go_home here on the push
    // function go_home() {
	// 	working = false;
	// 	confirm_transaction = false;
	// 	new_template = false;
	// 	invalid_description = "";
	// 	invalid_amount = "";
	// 	invalid_destination_account = "";
	// 	invalid_source_account = "";
	// 	invalid_category = "";
	// }
</script>

<h1>Saved!</h1>
<div class="d-flex  justify-content-center">
    <button on:click={()=>push("/")} class="p-2 btn btn-outline-primary"
        >Go Back</button
    >
</div>
