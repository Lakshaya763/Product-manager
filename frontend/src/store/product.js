import { create } from "zustand";
const API = import.meta.env.VITE_API_URL;
await fetch(`${API}/products`);
export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),

	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		try {
			const res = await fetch(`${API}/products`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newProduct),
			});
			const data = await res.json();
			set((state) => ({ products: [...state.products, data.data] }));
			return { success: true, message: "Product created successfully" };
		} catch (err) {
			return { success: false, message: "Server error. Try again later." };
		}
	},

	fetchProducts: async () => {
		try {
			const res = await fetch(`${API}/products`);
			const data = await res.json();
			set({ products: data.data });
		} catch (err) {
			console.error("Fetch error:", err);
		}
	},

	deleteProduct: async (pid) => {
		try {
			const res = await fetch(`${API}/products/${pid}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!data.success) return { success: false, message: data.message };

			set((state) => ({
				products: state.products.filter((product) => product._id !== pid),
			}));
			return { success: true, message: data.message };
		} catch (err) {
			return { success: false, message: "Server error while deleting product." };
		}
	},

	updateProduct: async (pid, updatedProduct) => {
		try {
			const res = await fetch(`${API}/products/${pid}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedProduct),
			});
			const data = await res.json();
			if (!data.success) return { success: false, message: data.message };

			set((state) => ({
				products: state.products.map((product) =>
					product._id === pid ? data.data : product
				),
			}));
			return { success: true, message: data.message };
		} catch (err) {
			return { success: false, message: "Server error while updating product." };
		}
	},
}));
