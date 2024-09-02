<template>
	<div class="search-page uk-container uk-margin-top">
		<h1 class="uk-heading-primary title uk-text-center">Unlock the world of style with our product search</h1>
		<div class="uk-margin">
			<div class="uk-flex uk-flex-middle">
				<input v-model="query" @keyup.enter="searchProducts(true)" class="uk-input uk-form-large" type="text" placeholder="Search for products using Color, Type, Brand..." />
				<button @click="searchProducts(true)" class="uk-button uk-button-primary uk-button-large primary-button">Search</button>
			</div>
		</div>
		<div v-if="!products.length" class="uk-margin-top uk-text-center uk-margin">
			<span uk-spinner="ratio: 4.5"></span>
			<h1 class="title">Fetching Products</h1>
		</div>
		<div v-if="products.length" class="uk-margin-top uk-text-center uk-margin">
			<button @click="previousPage" :disabled="currentPage === 1" class="uk-button uk-button-default secondary-button">Previous</button>
			<span class="uk-padding uk-padding-remove-vertical page-label">Page {{ currentPage }}</span>
			<button @click="nextPage" :disabled="!hasMoreResults" class="uk-button uk-button-default secondary-button">Next</button>
		</div>

		<div v-if="products.length" class="uk-grid uk-grid-match uk-grid-small uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2@s uk-margin-top">
			<div v-for="product in products" :key="product.id">
				<div class="uk-card uk-card-default uk-card-hover uk-card-body product-card">
					<div v-if="product.on_sale === 'Yes'" class="uk-card-badge uk-label sale-badge">Sale</div>
					<div class="uk-card-media-top">
						<img :src="product.thumbnailImageUrl" @error="handleImageError(product.imageUrl, $event)" :alt="product.name" class="uk-width-1-1 uk-object-cover product-image" />
					</div>
					<div class="uk-card-body uk-margin-top">
						<h2 class="uk-card-title uk-text-truncate product-name">{{ product.name }}</h2>
						<p v-if="product.msrp && product.msrp > product.price" class="uk-text-meta uk-flex uk-flex-middle uk-margin-top">
							<span class="uk-text-danger old-price uk-margin-small-right">
								<del>${{ product.msrp }}</del>
							</span>
							<span class="sale-price">${{ product.price }}</span>
						</p>
						<p v-else class="uk-text-meta uk-margin-top">
							<span class="sale-price">${{ product.price }}</span>
						</p>
						<div class="product-buttons uk-margin-top">
							<button class="uk-button uk-button-default primary-button uk-width-1-1 uk-border-pill">Buy Now</button>
							<button class="uk-button uk-button-default tertiary-button uk-margin-small-top uk-width-1-1 uk-border-pill" @click="viewDetailsModal(product)">View Details</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="products.length" class="uk-margin-top uk-text-center">
			<button @click="previousPage" :disabled="currentPage === 1" class="uk-button uk-button-default secondary-button">Previous</button>
			<span class="uk-padding uk-padding-remove-vertical page-label">Page {{ currentPage }}</span>
			<button @click="nextPage" :disabled="!hasMoreResults" class="uk-button uk-button-default secondary-button">Next</button>
		</div>

		<ProductInfoModal v-if="selectedProduct" :details="selectedProduct" />
	</div>
</template>

<script setup>
import ProductInfoModal from "./ProductInfoModal.vue";
import { ref, onMounted } from "vue";
import UIkit from "uikit";
import { searchProducts as fetchProducts } from "../services/api";

const query = ref("");
const products = ref([]);
const currentPage = ref(1);
const hasMoreResults = ref(false);
const selectedProduct = ref(null);
const defaultImage = "src/public/assets/placeholder.png";

const searchProducts = async (isNewSearch = false) => {
	if (isNewSearch) {
		currentPage.value = 1;
	}

	const result = await fetchProducts(query.value, currentPage.value);
	products.value = result.products;
	hasMoreResults.value = result.hasMoreResults;
};

const nextPage = () => {
	if (hasMoreResults.value) {
		currentPage.value++;
		searchProducts();
	}
};

const previousPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
		searchProducts();
	}
};

const viewDetailsModal = async (product) => {
	selectedProduct.value = product;
	console.log(product);

	await new Promise((resolve) => setTimeout(resolve, 0));

	const modal = UIkit.modal("#product-info-modal");
	if (modal) {
		modal.show();
	} else {
		console.error("Modal instance not found");
	}
};

const handleImageError = (imageUrl, event) => {
	event.target.src = imageUrl ?? defaultImage; // Replace broken image with default
};

// Call searchProducts when the component is mounted
onMounted(() => {
	searchProducts();
});
</script>
