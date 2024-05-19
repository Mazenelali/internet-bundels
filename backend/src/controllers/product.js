import productService from "../services/product.js";

// POST /products - Add a new product
export async function addProduct(req, res) {
    try {
        const { productData } = req.body;

        const newProduct = await productService.createNewProduct(productData);


        res.status(201).json({
            message: "Product added successfully",
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add product",
            error: error.message,
        });
    }
}
export async function editProduct(req, res) {
    const data = req.body;
    const { id } = req.params;
    const modifyProduct = await productService.modifyProduct(id, data);
    res.status(201).json({
        message: "Product modify successfully",
        product: modifyProduct,
    });
}

export async function getAllProducts(_, res) {
    const listProducts = await productService.listAllProducts();
    res.status(201).json(listProducts);
}
export async function getProductById(req, res) {
    const { id } = req.params;
    const getProduct = await productService.findProductById(id);

    res.status(201).json(getProduct);
}

// Other methods remain similar, handling only product-specific logic
