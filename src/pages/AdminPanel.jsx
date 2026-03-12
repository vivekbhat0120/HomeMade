import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context/ProductContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.scss';

const AdminPanel = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', unit: '', description: '', newprice: '', oldprice: '', rating: '', category: '', image: '', images: '', offer: '' });
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name || '',
        unit: selected.unit || '',
        description: selected.description || '',
        newprice: selected.newprice || '',
        oldprice: selected.oldprice || '',
        rating: selected.rating || '',
        category: selected.category || '',
        image: selected.image || '',
        images: (selected.images || []).join(', '),
        offer: selected.offer || '',
        id: selected.id
      });
      setIsNew(false);
    }
  }, [selected]);

  const handleSelect = (p) => {
    setSelected(p);
  };

  const toNumber = (v) => {
    if (v === null || v === undefined) return null;
    const s = String(v).trim();
    if (s === '') return null;
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : null;
  };

  const formatFixed = (n) => {
    if (n === null || n === undefined || Number.isNaN(n)) return '';
    return (Math.round(n * 100) / 100).toFixed(2);
  };

  const handleChange = (field, value) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };

      // When old/new prices change, compute offer% (discount)
      if (field === 'oldprice' || field === 'newprice') {
        const oldN = toNumber(field === 'oldprice' ? value : prev.oldprice);
        const newN = toNumber(field === 'newprice' ? value : prev.newprice);
        if (oldN !== null && newN !== null && oldN !== 0) {
          const offerCalc = ((oldN - newN) / oldN) * 100;
          next.offer = formatFixed(offerCalc);
        } else {
          next.offer = '';
        }
      }

      // When offer% changes, compute new price (if old price present)
      // or compute old price (if new price present and old missing)
      if (field === 'offer') {
        const offerN = toNumber(value);
        const oldN = toNumber(prev.oldprice);
        const newN = toNumber(prev.newprice);
        if (offerN !== null) {
          if (oldN !== null) {
            const computedNew = oldN * (1 - offerN / 100);
            next.newprice = formatFixed(computedNew);
          } else if (newN !== null && (1 - offerN / 100) !== 0) {
            const computedOld = newN / (1 - offerN / 100);
            next.oldprice = formatFixed(computedOld);
          }
        } else {
          // offer cleared -> leave prices as-is
        }
      }

      return next;
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      id: form.id,
      name: form.name,
      unit: form.unit,
      description: form.description,
      newprice: parseFloat(form.newprice) || 0,
      oldprice: parseFloat(form.oldprice) || 0,
      rating: parseFloat(form.rating) || 0,
      category: form.category,
      image: form.image,
      offer: parseFloat(form.offer) || 0,
      images: form.images.split(',').map(s => s.trim()).filter(Boolean),
    };
    if (isNew) {
      addProduct(payload);
      setSelected(null);
      setIsNew(false);
      setForm({ name: '', unit: '', description: '', newprice: '', oldprice: '', rating: '', category: '', image: '', images: '', offer: '' });
    } else {
      updateProduct(payload);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      deleteProduct(id);
      setSelected(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/');
  };

  const handleNew = () => {
    setIsNew(true);
    setSelected(null);
    setForm({ name: '', unit: '', description: '', newprice: '', oldprice: '', rating: '', category: '', image: '', images: '', offer: '' });
  };

  const filtered = products.filter(p =>
    (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
    ((p.category || '')).toLowerCase().includes(search.toLowerCase())
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleChange('image', reader.result);
      handleChange('images', (form.images ? form.images + ', ' : '') + reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        
            <button className="btn-primary" onClick={handleLogout}>Logout</button>
          <button className="btn-outline" onClick={handleNew}>Add Product</button>
        
      </div>

      <div className="admin-body">
        <div className="admin-left">
          <div className="admin-search">
            <input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="admin-list">
            {filtered.map(p => (
              <div key={p.id} className={`admin-item ${selected && selected.id === p.id ? 'active' : ''}`} onClick={() => handleSelect(p)}>
                <img src={p.image} alt={p.name} />
                <div className="info">
                  <strong>{p.name}</strong>
                  <span className="muted">{p.category}</span>
                  <span className="price">Rs {p.newprice}</span>
                </div>
                <div className="item-actions">
                  <button className="btn-sm" onClick={(e) => { e.stopPropagation(); setSelected(p); }}>Edit</button>
                  <button className="btn-sm btn-danger" onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-right">
          <form className="admin-form" onSubmit={handleSave}>
            <h2>{isNew ? 'Add New Product' : (selected ? `Edit: ${selected.name}` : 'Select a product or click Add Product')}</h2>

            <div className="form-field">
              <label>Product Name</label>
              <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>

            <div className="admin-form-grid">
              <div className="form-field">
                <label>Quantity</label>
                <input value={form.unit} onChange={(e) => handleChange('unit', e.target.value)} />
              </div>
              <div className="form-field">
                <label>Category</label>
                <input value={form.category} onChange={(e) => handleChange('category', e.target.value)} />
              </div>
              <div className="form-field">
                <label>Rating</label>
                <input type="text" value={form.rating} onChange={(e) => handleChange('rating', e.target.value)} />
              </div>
              <div className="form-field">
                <label>Old Price</label>
                <input type="text" value={form.oldprice} onChange={(e) => handleChange('oldprice', e.target.value)} />
              </div>
              <div className="form-field">
                <label>New Price</label>
                <input type="text" value={form.newprice} onChange={(e) => handleChange('newprice', e.target.value)} />
              </div>
              <div className="form-field">
                <label>Offer</label>
                <input type="text" value={form.offer} onChange={(e) => handleChange('offer', e.target.value)} />
              </div>
            </div>

            <label>Image URL / Base64</label>
            <input value={form.image} onChange={(e) => handleChange('image', e.target.value)} />
            <input type="file" onChange={handleImageUpload} />

            <label>Other images (comma separated URLs)</label>
            <textarea value={form.images} onChange={(e) => handleChange('images', e.target.value)} rows={3} />

            <label>Description</label>
            <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={5} />

            <div className="form-actions">
              <button className="btn-outline" type="submit">{isNew ? 'Add Product' : 'Save Changes'}</button>
              {!isNew && selected && <button type="button" className="btn-outline" onClick={() => { setSelected(null); setForm({ name: '', unit: '', description: '', newprice: '', oldprice: '', rating: '', category: '', image: '', images: '', offer: '' }); }}>Clear</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
