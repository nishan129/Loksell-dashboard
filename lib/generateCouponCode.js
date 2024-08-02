export const generateCouponCode = (title='', expiryDate='') => {
    // Format the title to upper case and remove spaces
    const formattedTitle = title.toUpperCase().replace(/\s+/g, '');
  
    // Format the expiry date to "DDMMYYYY"
    const date = new Date(expiryDate);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    const formattedExpiryDate = `${day}${month}${year}`;
  
    // Combine the formatted title and expiry date to create the coupon code
    const couponCode = `${formattedTitle}-${formattedExpiryDate}`;
  
    return couponCode;
  };
  