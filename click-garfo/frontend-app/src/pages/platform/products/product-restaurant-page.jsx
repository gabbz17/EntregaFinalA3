import { useState } from "react";
import logo from "/Logo_secondary.svg";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Refri Gelado",
            category: "Bebida",
            price: 35,
            image: "/refrigerantes.svg",
            status: "Disponível",
        },
        {
            id: 2,
            name: "Hamburguer",
            category: "Comida",
            price: 10,
            image: "/hamburguer.svg",
            status: "Indisponível",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        price: "",
        image: "",
        status: "Disponível",
    });

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este produto?");
        if (confirmDelete) {
            setProducts(products.filter((p) => p.id !== id));
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const id = Date.now();
        setProducts([...products, { id, ...newProduct, price: parseFloat(newProduct.price) }]);
        setNewProduct({
            name: "",
            category: "",
            price: "",
            image: "",
            status: "Disponível",
        });
        setIsModalOpen(false);
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-[1440px] mx-auto p-8 lg:p-0">
            <div className="flex items-center justify-center gap-2 lg:justify-between">
        <Link to="/order-page" className="flex items-center gap-2 mb-6">
          <ArrowLeft className="text-orange-500" />
          Voltar
        </Link>
        <img src={logo} className="w-40 h-40" alt="" />
      </div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#E67E22]">Produtos</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#E67E22] text-white px-4 py-2 rounded hover:opacity-90 transition cursor-pointer"
                >
                    + Novo Produto
                </button>
            </div>

            <input
                type="text"
                placeholder="Buscar produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-6 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            />

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                    <thead>
                        <tr className="border-b border-gray-200 text-left">
                            <th className="p-3">Imagem</th>
                            <th className="p-3">Nome</th>
                            <th className="p-3">Categoria</th>
                            <th className="p-3">Preço</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-3">
                                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                                </td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3">R$ {product.price.toFixed(2)}</td>
                                <td className={`p-3 font-medium ${product.status === "Disponível" ? "text-green-600" : "text-red-500"}`}>
                                    {product.status}
                                </td>
                                <td className="p-3 space-x-2">
                                    <button className="text-[#E62E27] hover:underline cursor-pointer">Editar</button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline cursor-pointer">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-6 text-center text-gray-400">
                                    Nenhum produto encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-[#E67E22]">Adicionar Produto</h2>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nome do produto"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Categoria"
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Preço"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="file"
                                placeholder="URL da imagem"
                                value={newProduct.image}
                                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                            />
                            <select
                                value={newProduct.status}
                                onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                            >
                                <option value="Disponível">Disponível</option>
                                <option value="Indisponível">Indisponível</option>
                            </select>
                            <div className="flex justify-end space-x-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#E67E22] text-white px-4 py-2 rounded hover:opacity-90 cursor-pointer"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
