// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6449b',
    name: 'admin',
    email: 'admin@nextmail.com',
    password: 'admin',
  },
];
const products = [
  { id: '1', name: 'Blue jeans', type: 'pants', description: 'Blue jeans description', price : 1000, imageURL: 'https://res.cloudinary.com/dzbaziutc/image/upload/v1717533921/blue-jeans_ays0r6.jpg'},
  { id: '2', name: 'Brown pants', type : 'pants', description: 'Brown pants description' , price : 2000 , imageURL: ''},
  { id: '3',name: 'Fit Tshirt black', type: 'tshirt', description: 'Fit tshirt black description' , price : 2000 , imageURL: ''},
  { id: '4',name: 'Piluso', type: 'hat', description: 'Piluso description', price : 2000 , imageURL: ''},
  { id: '5',name: 'Tshirt white', type: 'tshirt', description: 'Tshirt white description', price : 2000 , imageURL: ''},
  { id: '6',name: 'Classic shoe' , type: 'shoes', description: 'Classic shoe description', price : 2000 , imageURL: ''},
  { id: '7',name: 'Formal shoe' , type: 'shoes', description: 'Formal shoe description', price : 2000 , imageURL: ''},
];
module.exports = {
  users,
  products,
};
