<script>
	import Router from "svelte-spa-router"

	import "@capacitor-community/http";
	import {Plugins} from "@capacitor/core";
    import Home from "./pages/Home.svelte";
    import New from "src/pages/New.svelte"
	const Http = Plugins.CapacitorHttp;
	
	let get_api_info = false;
	let confirm_transaction = false;
	let working = false;
	let template = {};
	let api_key = localStorage.getItem("api_key");
	let api_end = localStorage.getItem("api_end");
	if (api_key === null || api_end === null) get_api_info = true;
	

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

	const routes = {
		"/": Home,
		"/new": New,
	}

</script>
<main>
	<h1 class="text-center">FAST FLY III</h1>

	<Router {routes}></Router>
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
	{/if}
	
</main>

<style>
	.debug {
		border-style: solid;
		border-color: red;
		border-width: 3px;
	}
</style>
