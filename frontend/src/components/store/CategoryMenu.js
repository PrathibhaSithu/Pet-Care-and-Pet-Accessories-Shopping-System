import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
`
const CategoryList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`
const Category = styled.li`
    margin: 10px 4px;
    cursor: pointer;
    color: ${({ isSelected }) => isSelected ? '#5F27CD' : '#444'};
    font-weight: ${({ isSelected }) => isSelected ? '600' : 'normal'};
    transition: all 0.2s ease-in-out;

    &:hover {
        color: #5F27CD;
        font-weight: 600;
    }
`

const categories = ["All Products", "Dog", "Cat", "Fish", "Rabbit", "Bird", "Cattle", "Pig", "Hamster"];

const CategoryMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  }

  return (
    <Container>
        <Title>Shop by Category</Title>
        <CategoryList>
          {categories.map((category) => (
            <Link 
            to={category === "All Products" ? "/store" : `/store?category=${category}`}
            style={{textDecoration: 'none', color: 'inherit'}}>
              <Category
                key={category} 
                isSelected={category === selectedCategory} 
                onClick={() => handleCategoryClick(category)}
              >
                  {category}
              </Category>
            </Link>
          ))}
        </CategoryList>
    </Container>
  )
}

export default CategoryMenu
