import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProducts, saveProducts } from "../storage.js";

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products] = useState(() => getProducts());
  const product = id ? products.find(item => item.id === id) : null;

  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [category, setCategory] = useState(product ? product.category : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [error, setError] = useState("");

  if (id && !product) {
    return (
      <main className="container py-4">
        <h1 className="mb-4">Редактирование товара</h1>
        <div className="alert alert-danger" role="alert">
          Товар не найден
        </div>
        <Link to="/admin/products" className="btn btn-secondary">
          Вернуться к каталогу
        </Link>
      </main>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || price === "") {
      setError("Заполните название и цену.");
      return;
    }

    const savedProducts = getProducts();
    const fields = {
      name: name.trim(),
      price: Number(price),
      category: category.trim(),
      description: description.trim(),
    };

    const updatedProducts = id
      ? savedProducts.map(item =>
          item.id === id ? { ...item, ...fields } : item
        )
      : [...savedProducts, { id: crypto.randomUUID(), ...fields }];

    saveProducts(updatedProducts);
    navigate("/admin/products");
  }

  return (
    <main className="container py-4">
      <h1 className="mb-4">
        {id ? "Редактирование товара" : "Новый товар"}
      </h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Название товара
          </label>
          <input
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">
              Цена
            </label>
            <input
              id="price"
              name="price"
              type="number"
              className="form-control"
              value={price}
              onChange={event => setPrice(event.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="category" className="form-label">
              Категория
            </label>
            <input
              id="category"
              name="category"
              className="form-control"
              value={category}
              onChange={event => setCategory(event.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="3"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Сохранить
        </button>
        <Link to="/admin/products" className="btn btn-secondary">
          Отмена
        </Link>
      </form>
    </main>
  );
}
