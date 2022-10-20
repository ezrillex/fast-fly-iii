<script>
	import {templateStore} from "src/templateStore"
    import { push } from "svelte-spa-router";

	let invalid_description = "";
	let invalid_category = "";
	let invalid_amount = "";
	let invalid_destination_account = "";
	let invalid_source_account = "";

	function go_home() {
		invalid_description = "";
		invalid_amount = "";
		invalid_destination_account = "";
		invalid_source_account = "";
		invalid_category = "";
		push("/")
	}

	
	function validate_category(){
		if (
			typeof template.category_name !== "string" ||
			template.category_name.trim().length === 0
		) {
			invalid_category = " is-invalid ";
			return false;
		} else {
			invalid_category = "";
			return true;
		}
	}

	function validate_description() {
		if (
			typeof template.description !== "string" ||
			template.description.trim().length === 0
		) {
			invalid_description = " is-invalid ";
			return false;
		} else {
			invalid_description = "";
			return true;
		}
	}

	function validate_destination_account() {
		if (
			typeof template.destination_name !== "string" ||
			template.destination_name.trim().length === 0
		) {
			invalid_destination_account = " is-invalid ";
			return false;
		} else {
			invalid_destination_account = "";
			return true;
		}
	}

	function validate_source_account() {
		if (
			typeof template.source_name !== "string" ||
			template.source_name.trim().length === 0
		) {
			invalid_source_account = " is-invalid ";
			return false;
		} else {
			invalid_source_account = "";
			return true;
		}
	}

	function validate_amount() {
		// console.log("triggered validate amount")
		// console.log(template.amount)
		if (
			typeof template.amount !== "number" ||
			template.amount === undefined ||
			template.amount === null ||
			template.amount < 0.01
		) {
			invalid_amount = " is-invalid ";
			return false;
		} else {
			invalid_amount = "";
			return true;
		}
	}


</script>
<h1>New Page</h1>

<h1 class="text-center">New Template</h1>

<div class="input-group mb-3">
    <span class="input-group-text">Transaction Type</span>
    <select bind:value={$templateStore.type} class="form-select ">
        <option value="withdrawal"> Withdrawal </option>
        <option value="deposit"> Deposit </option>
        <option value="transfer"> Transfer </option>
    </select>
</div>

<!-- TODO Fetch this from the api instead of requiring exact value -->
<div class="input-group mb-3">
    <span class="input-group-text">Source Account</span>
    <input
        type="text"
        class={"form-control" + invalid_source_account}
        bind:value={$templateStore.source_name}
        aria-describedby="srcValidation"
        on:change={validate_source_account}
    />
    <div id="srcValidation" class="invalid-feedback">
        The field 'source account' is required.
    </div>
</div>
<div class="input-group mb-3">
    <span class="input-group-text">Destination Account</span>
    <input
        type="text"
        class={"form-control" + invalid_destination_account}
        bind:value={$templateStore.destination_name}
        aria-describedby="destValidation"
        on:change={validate_destination_account}
    />
    <div id="destValidation" class="invalid-feedback">
        The field 'destination account' is required.
    </div>
</div>
<div class="input-group mb-3">
    <span class="input-group-text">$</span>
    <input
        bind:value={$templateStore.amount}
        type="number"
        step="0.01"
        min="0.01"
        class={"form-control" + invalid_amount}
        aria-describedby="amtValidation"
        on:change={validate_amount}
    />
    <div id="amtValidation" class="invalid-feedback">
        The field 'amount' is required.
    </div>
</div>

<div class="input-group mb-3 ">
    <span class="input-group-text">Description</span>
    <input
        bind:value={$templateStore.description}
        type="text"
        on:change={validate_description}
        class={"form-control" + invalid_description}
        aria-describedby="descValidation"
    />
    <div id="descValidation" class="invalid-feedback">
        The field 'description' is required
    </div>
</div>

<div class="input-group mb-3 ">
    <span class="input-group-text">Category</span>
    <input
        bind:value={$templateStore.category_name}
        type="text"
        on:change={validate_category}
        class={"form-control" + invalid_category}
        aria-describedby="catValidation"
    />
    <div id="catValidation" class="invalid-feedback">
        The field 'description' is required
    </div>
</div>

<div class="d-flex  justify-content-center">
    <button
        type="submit"
        on:click={save_template}
        class="p-2 btn btn-success m-2">Save Template</button
    >
    <button class="p-2 btn btn-outline-danger m-2" on:click={go_home}
        >Cancel</button
    >
</div>
