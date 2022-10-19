<script>
	import "@capacitor-community/http";
	import {Plugins} from "@capacitor/core";
	const Http = Plugins.CapacitorHttp;
	let invalid_description = "";
	let invalid_category = "";
	let invalid_amount = "";
	let invalid_destination_account = "";
	let invalid_source_account = "";
	let get_api_info = false;
	let confirm_transaction = false;
	let working = false;
	let new_template = false;
	let template = {};
	let api_key = localStorage.getItem("api_key");
	let api_end = localStorage.getItem("api_end");
	if (api_key === null || api_end === null) get_api_info = true;
	let templates = JSON.parse(localStorage.getItem("templates"));

	if (templates === null) {
		templates = [];
		localStorage.setItem("templates", JSON.stringify(templates));
	}

	function save() {
		if (api_key === null || api_end === null) return;
		localStorage.setItem("api_end", api_end);
		localStorage.setItem("api_key", api_key);
		get_api_info = false;
	}

	let last = "";
	async function send() {
		
		let error = false;

		const options = {
			url: api_end + "/transactions",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization:
					"Bearer " + api_key,
			},
			
			data: JSON.stringify( { "transactions": [ template ] } )
		};

		await Http.post(options)
			.then((response) => {
				if (response.status !== 200) {
					error = true;
				}
				console.log("RESPONSE:");
				console.log(response);
				last = JSON.stringify(response);
			})
			.catch((err) => {
				error = true;
				console.log(err);
			});



		return error;
	}

	async function confirm() {
		template.date = new Date().toISOString();
		template.notes = "Added through FAST FIREFLY III app.";
		working = true;
	}

	function go_home() {
		working = false;
		confirm_transaction = false;
		new_template = false;
		invalid_description = "";
		invalid_amount = "";
		invalid_destination_account = "";
		invalid_source_account = "";
		invalid_category = "";
	}

	function newtemplate() {
		template = {};
		new_template = true;
	}

	function save_template() {
		let vd = validate_description();
		let va = validate_amount();
		let vda = validate_destination_account();
		let vsa = validate_source_account();
		let vc = validate_category();

		if (va && vd && vda && vsa && vc) {
			console.log("valid");
			working = true;
			templates.push({
				type: template.type,
				amount: template.amount.toFixed(2),
				description: template.description,
				source_name: template.source_name,
				destination_name: template.destination_name,
				category_name: template.category_name
			});
			localStorage.setItem("templates", JSON.stringify(templates));
		}
	}

	function delete_template(){
		let index = templates.findIndex(element=> element === template)
		templates.splice(index, 1)
		go_home()
		template = {}
		localStorage.setItem("templates", JSON.stringify(templates))
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

<h1 class="text-center">FAST FLY III</h1>
{#if get_api_info}
	<h3>endpoint:</h3>
	<input type="text" bind:value={api_end} />
	<h3>api key:</h3>
	<input type="text" bind:value={api_key} />
	<button on:click={save}>Save</button>
{:else if confirm_transaction}
	{#if working}
		{#await send()}
			to do spinner here
		{:then error}
			{#if error === true}
				An error has occured TODO offer info or delete keys
				{last}
			{:else}
				success! TODO check icon here
				{last}
			{/if}
			<div class="d-flex  justify-content-center">
				<button on:click={go_home} class="p-2 btn btn-outline-primary"
					>Go Back</button
				>
			</div>
		{/await}
	{:else}
		<h3 class="text-center">Actions:</h3>
		<div class="d-flex flex-column align-items-center">
			<p>Description: {template.description}</p>
			<p>Source Account: {template.source_name}</p>
			<p>Destination Account: {template.destination_name}</p>
			<p>Type: {template.type}</p>
			<p>Amount: ${template.amount}</p>
		</div>
		<div class="d-flex  justify-content-center">
			<button on:click={confirm} class="p-2 btn btn-success m-2"
				>Send Transaction</button
			>
			<button on:click={delete_template} class="p-2 btn btn-danger m-2"
				>Delete Template</button
			>
			<button on:click={go_home} class="p-2 btn btn-outline-dark m-2"
				>Cancel</button
			>
		</div>
	{/if}
{:else if new_template}
	{#if working}
		<h1>Saved!</h1>
		<div class="d-flex  justify-content-center">
			<button on:click={go_home} class="p-2 btn btn-outline-primary"
				>Go Back</button
			>
		</div>
	{:else}
		<h1 class="text-center">New Template</h1>

		<div class="input-group mb-3">
			<span class="input-group-text">Transaction Type</span>
			<select bind:value={template.type} class="form-select ">
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
				bind:value={template.source_name}
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
				bind:value={template.destination_name}
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
				bind:value={template.amount}
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
				bind:value={template.description}
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
				bind:value={template.category_name}
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
	{/if}
{:else}
	<!-- LIST TRANSACTIONS -->
	{#each templates as t, index}
		<hr />
		<div
			on:click={() => {
				confirm_transaction = true;
				template = templates[index];
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
{/if}

<style>
	.debug {
		border-style: solid;
		border-color: red;
		border-width: 3px;
	}
</style>
