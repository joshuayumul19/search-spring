import axios from "axios";

export const searchProducts = async (query, page = 1) => {
	try {
		const response = await axios.get("https://api.searchspring.net/api/search/search.json", {
			params: {
				siteId: "scmq7n",
				q: query,
				resultsFormat: "native",
				page: page,
			},
		});

		return {
			products: response.data.results.map((item) => ({
				id: item.id,
				name: item.name,
				price: item.price,
				msrp: item.msrp,
				thumbnailImageUrl: item.thumbnailImageUrl,
				imageUrl: item.imageUrl,
				on_sale: item.on_sale[0],
				description: item.description,
				quantity_available: item.quantity_available[0],
			})),
			hasMoreResults: response.data.pagination.totalPages > page,
		};
	} catch (error) {
		console.error("Error fetching products:", error);
		return {
			products: [],
			hasMoreResults: false,
		};
	}
};
