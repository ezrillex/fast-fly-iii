<script>
	let api_key = localStorage.getItem("api_key");
	let api_end = localStorage.getItem("api_end");

	let get_api_info = false;

	let confirm_transaction = false;

	let working = false;

	if (api_key === null || api_end === null) get_api_info = true;

	function save() {
		if (api_key === null || api_end === null) return;
		localStorage.setItem("api_end", api_end);
		localStorage.setItem("api_key", api_key);
		get_api_info = false;
	}

	async function send() {
		console.log("sending...");
		return "response parsed here";
	}

	function confirm() {
		working = true;
	}

	function go_home() {
		working = false;
		confirm_transaction = false;
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
				<button on:click={go_home} class="p-2 btn btn-outline-primary"
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
			<button on:click={confirm} class="p-2 btn btn-success m-2">Confirm</button
			>
			<button class="p-2 btn btn-outline-danger m-2">Cancel</button>
		</div>
	{/if}
{:else}
	<hr />
	<div on:click={() => (confirm_transaction = true)} class="debug pt-3 pb-3">
		Soda $1.35
	</div>

	<hr />
	<div class="debug pt-3 pb-3">Soda $1.35</div>
	<hr />
	<div class="debug pt-3 pb-3">Soda $1.35</div>
	<hr />
	<div class="d-flex  justify-content-center">
		<button class="p-2 btn btn-outline-dark">New Template</button>
	</div>
{/if}

<style>
	.debug {
		border-style: solid;
		border-color: red;
		border-width: 3px;
	}
</style>
