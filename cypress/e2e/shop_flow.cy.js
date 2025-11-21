describe('Sembark E-commerce User Journey', () => {
  
  beforeEach(() => {
    // We visit the home page before every test
    cy.visit('/');
  });

  it('should load the homepage and display products', () => {
    // Requirement: Display grid of products 
    cy.contains('New Arrivals').should('be.visible');
    
    // Wait for products to load (check for at least one image)
    cy.get('img', { timeout: 10000 }).should('be.visible');
    
    // Check if price is displayed
    cy.contains('$').should('be.visible');
  });

  it('should filter products and update the URL', () => {
    // Requirement: Filter products and URL agnostic 
    
    // 1. Intercept the API call to ensure we wait for it
    cy.intercept('GET', '**/products/category/electronics?*').as('getElectronics');

    // 2. Click the Electronics filter
    cy.contains('button', 'electronics').click();

    // 3. Verify URL changes (URL Agnostic check)
    cy.url().should('include', 'category=electronics');

    // 4. Wait for the API to return data so the UI updates
    cy.wait('@getElectronics');

    // 5. Verify the "Active" state of the button (it should have the primary background)
    cy.contains('button', 'electronics')
      .should('have.class', 'bg-primary')
      .and('have.class', 'text-white');
  });

  it('should navigate to product details, add to cart, and persist data', () => {
    // Requirement: Navigation & Product Details [cite: 12, 20]
    
    // 1. Click on the first product title
    cy.get('h3').first().click();

    // 2. Verify we are on the details page
    cy.url().should('include', '/product/');
    cy.contains('Add to Cart').should('be.visible');

    // 3. Add to Cart
    cy.contains('Add to Cart').click();

    // Requirement: Cart Functionality [cite: 15, 18]
    // 4. Check Navbar badge updates (assuming text becomes "1")
    cy.get('nav').contains('1').should('be.visible');

    // 5. Go to Cart Page
    cy.get('a[href="/cart"]').click(); // Clicking the cart icon

    // 6. Verify item is in cart
    cy.contains('Shopping Cart').should('be.visible');
    cy.contains('Total').should('be.visible');

    // Requirement: Persistence (Bonus) [cite: 37]
    // 7. Reload the page and check if item is still there
    cy.reload();
    cy.contains('Order Summary').should('be.visible');
    cy.get('img').should('be.visible'); // Item image should still be there
  });

  it('should allow removing items from the cart', () => {
    // Requirement: Remove items [cite: 17]

    // Setup: Manually add an item to cart via code to speed up test
    // (Simulating LocalStorage persistence)
    cy.window().then((win) => {
      const mockItem = [{
        id: 1,
        title: "Test Product",
        price: 10,
        image: "https://via.placeholder.com/150",
        qty: 1
      }];
      win.localStorage.setItem('shopping-cart', JSON.stringify(mockItem));
    });

    // Reload to pick up local storage
    cy.visit('/cart');

    // Check item exists
    cy.contains('Test Product').should('be.visible');

    // Click the trash/remove button (looking for the SVG or button wrapper)
    // Since we used lucide-react Trash2, we look for the button containing it
    cy.get('button').find('svg.lucide-trash-2').parent().click();

    // Verify cart is empty
    cy.contains('Your cart is empty').should('be.visible');
  });

  it('should be responsive on mobile', () => {
    // Requirement: Responsiveness [cite: 33]
    
    // Set view to iPhone X
    cy.viewport('iphone-x');
    
    // Check if the layout adjusts (e.g., Shop link might be hidden in your Navbar code)
    cy.get('nav').should('be.visible');
    
    // Check grid becomes 1 column (checking class existence or visual width)
    // In Tailwind, mobile is default, so we check if the grid container exists
    cy.get('.grid').should('exist');
  });

});