import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPersonFill } from 'react-icons/bs';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Update the path accordingly

const FashionList = () => {
  const [fashionItems, setFashionItems] = useState([]);
  const [filters, setFilters] = useState({ name: '', minPrice: '', maxPrice: '', minYear: '', maxYear: '' });

  useEffect(() => {
    const fetchFashionItems = async () => {
      try {
        const q = buildQuery(filters); // Build query based on filters
        const data = await getDocs(q);
        const items = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFashionItems(items);
      } catch (error) {
        console.error('Error fetching fashion items', error);
      }
    };

    fetchFashionItems();
  }, [filters]); // Run effect whenever filters change

  const buildQuery = (filters) => {
    let q = query(collection(db, 'fashionItems'));
  
    // Apply filters
    if (filters.name.trim() !== '') {
      // Split the search query into individual words
      const searchKeywords = filters.name.trim().toLowerCase().split(/\s+/);
  
      // Use array-contains for each keyword
      searchKeywords.forEach((keyword) => {
        q = query(q, where('name', 'array-contains', keyword));
      });
    }
  
    if (filters.minPrice.trim() !== '') {
      q = query(q, where('price', '>=', parseInt(filters.minPrice)));
    }
  
    if (filters.maxPrice.trim() !== '') {
      q = query(q, where('price', '<=', parseInt(filters.maxPrice)));
    }
  
    if (filters.minYear.trim() !== '') {
      q = query(q, where('year', '>=', parseInt(filters.minYear)));
    }
  
    if (filters.maxYear.trim() !== '') {
      q = query(q, where('year', '<=', parseInt(filters.maxYear)));
    }
  
    return q;
  };
  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Fashion List</h2>
        <Link to="/profile">
          <BsPersonFill size={30} />
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', right: '60px' }}>
          <Link to="/updateprofile">Update Profile</Link>
          <Link to="/try-on">Try Try-On</Link>
          <Link to="/favoritelist">Favorite List</Link>
          <Link to="/ratinglist">Rating List</Link>
        </div>
      </div>

      <div>
        <h3>Filter:</h3>
        <form>
          <label>
            Name:
            <input type="text" name="name" value={filters.name} onChange={handleFilterChange} />
          </label>

          <label>
            Min Price:
            <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
          </label>

          <label>
            Max Price:
            <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
          </label>

          <label>
            Min Year:
            <input type="number" name="minYear" value={filters.minYear} onChange={handleFilterChange} />
          </label>

          <label>
            Max Year:
            <input type="number" name="maxYear" value={filters.maxYear} onChange={handleFilterChange} />
          </label>
        </form>
      </div>

      <ul>
        {fashionItems.map((item) => (
          <li key={item.id}>
            <Link to={`/fashion/${item.id}`}>
              <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px' }} />
              <p>{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FashionList;


