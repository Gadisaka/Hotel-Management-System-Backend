# Hotel Management System Backend

This is the backend for the Hotel Management System, built using Node.js, Express and prisma with postgres.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/gadisaka04/hotel-management-system-backend.git
    ```
2. Navigate to the project directory:
    ```sh
    cd hotel-management-system-backend
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the server:
    ```sh
    npm run dev
    ```
2. The server will run on `http://localhost:3000`.

## Routes

- `/employee` - Employee related operations
- `/room` - Room related operations
- `/customer` - Customer related operations
- `/booking` - Booking related operations

## Error Handling

- 404 errors are handled by sending a "Page not found!" message.
- Additional error handling middleware can be added as needed.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.


feel free to reach out for any suggestions : gadisaka@gmail.com

## License

This project is licensed under the MIT License.
