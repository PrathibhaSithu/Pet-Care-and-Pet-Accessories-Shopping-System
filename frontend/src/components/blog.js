
import React from 'react';
import './blog.scss';
import Header from './store/Header/Header';
import Footer from './store/Footer'

const blogData = [
  {
    id: 1,
    image: require('../assets/service1.jpg'),
    title: 'Pet Grooming',
    description: 'Pamper your feline companion with our gentle grooming services, ensuring they look and feel their best, while promoting overall well-being and hygiene.',
    link: 'https://www.dkfindout.com/us/animals-and-nature/pet-care/'
  },
  {
    id: 2,
    image: require('../assets/service2.jpg'),
    title: 'Pet Training',
    description: "Unlock your pet's potential with our experienced trainers, who utilize positive reinforcement techniques to teach obedience and enhance socialization skills. Watch your pet flourish!",
    link: 'https://www.dkfindout.com/us/animals-and-nature/pet-care/'
  },
  {
    id: 3,
    image: require('../assets/service3.jpg'),
    title: 'Pet Feeding Service',
    description: "Reliable and convenient pet feeding service providing nutritious meals, portion control, and special dietary needs catered to ensure your pet's well-being and happiness.",
    link: 'https://www.dkfindout.com/us/animals-and-nature/pet-care/'
  },
  {
    id: 4,
    image: require('../assets/service4.jpg'),
    title: 'Pet Walking',
    description: 'Professional and dedicated pet walkers ensuring your furry friends get regular exercise, fresh air, and companionship for their overall health and happiness.',
    link: 'https://www.dkfindout.com/us/animals-and-nature/pet-care/'
  },
  {
    id: 5,
    image: require('../assets/service6.jpg'),
    title: 'Pet Sitting',
    description: 'Reliable and trustworthy pet sitters providing in-home care, giving your pets companionship, feeding, and personalized attention while you are away.',
    link: 'https://www.dkfindout.com/us/animals-and-nature/pet-care/'
  },
  {
    id: 6,
    image: require('../assets/service5.jpg'),
    title: 'Pet Dental Care',
    description: 'Professional dental care services to maintain your pet\'s oral health, including cleanings, examinations, and treatments to prevent dental diseases.',
    link: 'https://www.dkfindout.com/us/animals-and-nature/pet-care/'
  }
];

function AppBlog() {
  return (
    <div>
    <Header />
    <section id="blog" className="block blog-block" style={{marginTop: '70px'}}>
      <div className="container-fluid">
        <div className="title-holder">
          <h2 style={{ color: '#7D5FFF' }}>Our Services</h2>
          <div className="subtitle">Reliable and Trustworthy Pet Care</div>
        </div>
        <div className="row">
          {blogData.map(blog => (
            <div className="col-sm-4" key={blog.id}>
              <div className="holder">
                <div className="card">
                  <img src={blog.image} className="card-img-top" alt={blog.title} />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.description}</p>
                    <a href={blog.link} className="btn btn-primary">Read More <i className="fas fa-chevron-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
    </div>
  );
}

export default AppBlog