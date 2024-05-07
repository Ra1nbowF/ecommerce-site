import React, { useState } from 'react';
import * as styles from './buyback.module.css';

// Assuming you have these components defined elsewhere
import Layout from '../components/Layout/Layout';
import Container from '../components/Container';
import Button from '../components/Button';
import FormInputField from '../components/FormInputField/FormInputField';

const BuybackPage = () => {
  // State for contact form
  const [contactInfo, setContactInfo] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    passportSeries: '',
    passportNumber: '',
    passportIssuedBy: '',
    passportIssuedDate: '',
    taxId: '',
  });

  // State for product forms (array of objects)
  const [products, setProducts] = useState([{
    productLink: '',
    productImage: '',
    productPrice: '',
    quantity: 1,
    chinaDelivery: '',
    commission: 0,
    total: 0,
    productName: '',
    size: '',
    color: '',
  }]);

  // Function to handle changes in contact form
  const handleContactChange = (id, value) => {
    setContactInfo({ ...contactInfo, [id]: value });
  };

  // Function to handle changes in product forms
  const handleProductChange = (index, id, value) => {
    const newProducts = [...products];
    newProducts[index][id] = value;
    // Calculate commission and total (update based on your logic)
    newProducts[index].commission = parseFloat(newProducts[index].productPrice) * 0.05;
    newProducts[index].total = parseFloat(newProducts[index].productPrice) + 
                              parseFloat(newProducts[index].chinaDelivery) +
                              newProducts[index].commission;
    setProducts(newProducts);
  };

  // Function to add a new product form
  const addProduct = () => {
    setProducts([...products, { 
      productLink: '',
      productImage: '',
      productPrice: '',
      quantity: 1,
      chinaDelivery: '',
      commission: 0,
      total: 0,
      productName: '',
      size: '',
      color: '', 
    }]);
  };

  // Function to remove a product form
  const removeProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  // Function to handle form submission (replace with your API call)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Info:', contactInfo);
    console.log('Products:', products);
    // Add your API call or form submission logic here
  };

  return (
    <Layout>
      <Container>
        <h1>Buyback Request</h1>
        <form onSubmit={handleSubmit}>
          <h2>Contact Information</h2>
          {/* Contact Form Fields */}
          <FormInputField 
            id="lastName" 
            labelName="Last Name" 
            value={contactInfo.lastName} 
            handleChange={handleContactChange} 
          />
          {/* ... add other contact form fields ... */}

          <h2>Product Details</h2>
          {products.map((product, index) => (
            <div key={index} className={styles.productForm}>
              <h3>Product {index + 1}</h3>
              <FormInputField 
                id="productLink" 
                labelName="Product Link" 
                value={product.productLink} 
                handleChange={(id, value) => handleProductChange(index, id, value)} 
              />
              {/* ... add other product form fields ... */}
              <button type="button" onClick={() => removeProduct(index)}>
                Remove Product
              </button>
            </div>
          ))}
          <button type="button" onClick={addProduct}>Add Another Product</button>

          <Button type="submit" level="primary">
            Submit Request
          </Button>
        </form>
      </Container>
    </Layout>
  );
};

export default BuybackPage;