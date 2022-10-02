<script>
    

    let invalid_description = ""
    let invalid_amount = ""

	let api_key = localStorage.getItem("api_key");
	let api_end = localStorage.getItem("api_end");

	let get_api_info = false;

	let confirm_transaction = false;

	let working = false;

	let new_template = false;

	let template = { notes: "Automatically added by bot."};

	if (api_key === null || api_end === null) get_api_info = true;

	function save() {
		if (api_key === null || api_end === null) return;
		localStorage.setItem("api_end", api_end);
		localStorage.setItem("api_key", api_key);
		get_api_info = false;
	}

	
	async function send() {
		
		console.log("sending...");
		// todo if fail offer to reset keys
		return "response parsed here";
	}

	function confirm() {
		working = true;
	}

	function go_home() {
		working = false;
		confirm_transaction = false;
		new_template = false;
		invalid_description = ""
    		invalid_amount = ""
	}

	function newtemplate() {
		template = { notes: "Automatically added by bot."};
		new_template = true;
	}

	function save_template(){
		if(!validate_description()){ }
		else if(!validate_amount()){
			//template.amount = template.amount.toFixed(2)
			console.log("invalid")

		}
		else{
			console.log("valid")
			console.log(template)

		}

	}

	function validate_description(){
		if(typeof template.description !== 'string' || template.description.trim().length === 0){
			invalid_description = " is-invalid "
			return false
		}
		else{
			invalid_description = ""
			return true
		}
	}
	function validate_amount(){
		console.log("triggered validate amount")
		// console.log(template.amount)
		if(typeof template.amount !== 'number' || template.amount ===undefined || template.amount === null || template.amount < 0.01  ){
			invalid_amount = " is-invalid "
			return false
		}
		else{
			invalid_amount = ""
			return true
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
		{:then data}
			{data}
			<div class="d-flex  justify-content-center">
				<button
					on:click={go_home}
					class="p-2 btn btn-outline-primary"
					>Go Back</button
				>
			</div>
		{/await}
	{:else}
		<h3 class="text-center">Are you sure?</h3>
		<div class="d-flex flex-column align-items-center">
			<p>transaction details here list</p>
			<p>transaction details here list</p>
			<p>transaction details here list</p>
			<p>transaction details here list</p>
			<p>transaction details here list</p>
		</div>
		<div class="d-flex  justify-content-center">
			<button
				on:click={confirm}
				class="p-2 btn btn-success m-2">Confirm</button
			>
			<button class="p-2 btn btn-outline-danger m-2"
				>Cancel</button
			>
		</div>
	{/if}
{:else if new_template}
<!-- TODO validate input of the elements -->
	<h1>New Template</h1>
	

	

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
			class="form-control"
			bind:value={template.source_name}
		/>
	</div>
	<div class="input-group mb-3">
		<span class="input-group-text">Destination Account</span>
		<input
			type="text"
			class="form-control"
			bind:value={template.destination_name}
		/>
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
		<div id="amtValidation" class="invalid-feedback">The field 'amount' is required.</div>
	</div>

	<div class="input-group mb-3 ">
		<span class="input-group-text" >Description</span>
		<input bind:value={template.description} type="text" on:change={validate_description} class={"form-control" + invalid_description} aria-describedby="descValidation">
		<div id="descValidation" class="invalid-feedback">The field 'description' is required</div>
		
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
	<button on:click={() => console.log(template)}>debug</button>
{:else}
	<!-- LIST TRANSACTIONS -->
	<hr />
	<div
		on:click={() => (confirm_transaction = true)}
		class="debug pt-3 pb-3"
	>
		Soda $1.35
	</div>

	<hr />
	<div class="debug pt-3 pb-3">Soda $1.35</div>
	<hr />
	<div class="debug pt-3 pb-3">Soda $1.35</div>
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
