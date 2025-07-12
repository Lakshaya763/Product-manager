import { useEffect } from "react";
import { useProductStore } from "../store/product";

export default function ProductList() {
	const { products, fetchProducts } = useProductStore();

	useEffect(() => {
		console.log("🔄 mounting, will fetch…");
		fetchProducts();
	}, []);

	return (
		<div>
			<h2>🛍 Product List</h2>
			{products.length === 0 ? (
				<p>No products yet.</p>
			) : (
				<ul>
					{products.map((product) => (
						<li key={product._id}>
							<h4>{product.name}</h4>
							<p>₹{product.price}</p>
							<img src={product.image} alt={product.name} width="150" />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
