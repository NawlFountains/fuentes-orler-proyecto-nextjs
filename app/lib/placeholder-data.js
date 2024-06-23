// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id : 'f93b8ae9-036c-4591-8111-2372531be642',
    name: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
  },
];
const products = [
  {id: '9a9b4019-e995-4db4-9c08-c5d20587c564', name: 'Blue jeans', category : 'pants', description: 'Blue jeans description', price : 1000, imageURL: 'https://res.cloudinary.com/dzbaziutc/image/upload/v1717533921/blue-jeans_ays0r6.jpg'},
  {id: '2f8bfeee-0e3d-4f76-b2c1-fe6d9cdf2ea5', name: 'Brown pants', category : 'pants', description: 'Brown pants description' , price : 2000 , imageURL: 'https://res.cloudinary.com/dzbaziutc/image/upload/v1718844167/brown-pants_glyjpd.jpg'},
  {id: '16395760-7c26-40ee-8b71-1c0c2756c49b', name: 'Fit Tshirt black', category: 'tshirt', description: 'Fit tshirt black description' , price : 2000 , imageURL: 'https://res.cloudinary.com/dzbaziutc/image/upload/v1718844166/fit-tshirt-black_ac5xo1.webp'},
  {id: '5c28cf88-7f6c-41df-80cd-700f4540dc81', name: 'Piluso', category: 'hat', description: 'Piluso description', price : 2000 , imageURL: 'https://res.cloudinary.com/dzbaziutc/image/upload/v1718844166/piluso_nwtftw.jpg'},
  {id: '17192456-c83f-4f58-ad2b-189f6f96cce4', name: 'Tshirt white', category: 'tshirt', description: 'Tshirt white description', price : 2000 , imageURL: 'https://res.cloudinary.com/dzbaziutc/image/upload/v1718844166/tshirt-white_sxwbjw.webp'},
  {id: 'afc14587-9d9c-455a-93bc-e5dea72b746c', name: 'Classic shoe' , category: 'shoes', description: 'Classic shoe description', price : 2000 , imageURL: 'https://res.cloudinary.com/dzbaziutc/image/upload/v1718844166/classic-shoe_kl6rgb.jpg'},
  {id: '57f95e53-6beb-4734-a625-8c3d3d275e4e', name: 'Formal shoe' , category: 'shoes', description: 'Formal shoe description', price : 2000 , imageURL: 'https://res.cloudinary.com/dzbaziutc/image/upload/v1718844166/formal-shoe_ljvxt8.webp'},
];
module.exports = {
  users,
  products,
};
