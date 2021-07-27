import mockProductImage from "./mockProductImage"

const mockStore = {
    id: 1,
    name: 'Mock Store',
    address: '99 Mock St.',
    description: 'Mock description',
    subMenus: [
        {
            id: 1,
            name: 'Food',
            products: [
                {
                    id: 1,
                    name: 'Food 1',
                    price: 200,
                    image: mockProductImage,
                    description: 'Best seller'
                },
                {
                    id: 2,
                    name: 'Food 2',
                    price: 300,
                    image: mockProductImage,
                },
                {
                    id: 4,
                    name: 'Food 3',
                    price: 300,
                    image: mockProductImage,
                },
                {
                    id: 5,
                    name: 'Food 4',
                    price: 300,
                    image: mockProductImage,
                },
            ]
        },
        {
            id: 2,
            name: 'Drinks',
            products: [
                {
                    id: 3,
                    name: 'Drinks 1',
                    price: 200,
                    image: mockProductImage,
                },
                {
                    id: 4,
                    name: 'Drinks 2',
                    price: 300,
                    image: mockProductImage,
                },
            ]
        }
    ]
}
export default mockStore