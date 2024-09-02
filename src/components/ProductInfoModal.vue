<template>
	<div id="product-info-modal" uk-modal>
		<div class="uk-modal-dialog uk-modal-body uk-width-3-5">
			<button class="uk-modal-close-default" type="button" uk-close></button>
			<div class="uk-grid uk-child-width-1-2@m uk-grid-match">
				<div>
					<img :src="details.imageUrl" alt="Product Image" height="300" width="300" />
				</div>
				<div>
					<div>
						<h2 class="uk-modal-title title">{{ details.name }}</h2>
						<p>Price: ${{ details.price }}</p>
						<p>Available Stock: {{ details.quantity_available }} {{ details.quantity_available > 1 ? "pcs" : "pc" }}</p>
						<p v-if="details.msrp && details.msrp > details.price">
							MSRP: <del>${{ details.msrp }}</del>
						</p>
						<p v-else>MSRP: N/A</p>
						<p>{{ details.description }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	details: {
		type: Object,
		required: true,
	},
});
</script>
